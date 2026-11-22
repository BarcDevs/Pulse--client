// @vitest-environment node
import { spawnSync } from 'child_process'
import path from 'path'
import { describe, expect, it } from 'vitest'

const toPosix = (relative: string) => path
    .resolve(__dirname, relative)
    .split(path.sep)
    .join('/')

const redeployPath = toPosix('../../../scripts/deploy/ec2-redeploy.sh')
const fakeDocker = toPosix('./fixtures/fake-docker.sh')

const runRedeploy = (script: string, unhealthy = '') => spawnSync('bash', [
    '-c',
    `source "${redeployPath}" test-tag; source "${fakeDocker}"; ${script}`
], {
    encoding: 'utf8',
    env: {
        ...process.env,
        REDEPLOY_SOURCE_ONLY: '1',
        FAKE_UNHEALTHY: unhealthy
    }
}).stdout

const swap = (seed: string, unhealthy = '') => runRedeploy(
    `${seed}; if swap_client_edge 2>/dev/null; then echo "swap 0"; else echo "swap 1"; fi; for c in pulse-client pulse-client-prev pulse-client-candidate; do echo "$c=$(fake_state $c)"; done; fake_log`,
    unhealthy
)

const oldServing = 'fake_seed pulse-client "running old"'

describe('client ec2-redeploy.sh edge mode', () => {
    it('swaps with the candidate as a bridge and leaves only the new container', () => {
        const out = swap(oldServing)
        const at = (text: string) => out.indexOf(text)

        expect(out).toContain('swap 0')
        expect(out).toContain('pulse-client=running new')
        expect(out).toContain('pulse-client-prev=absent')
        expect(out).toContain('pulse-client-candidate=absent')
        expect(at('--name pulse-client-candidate --network pulse_edge --ip 172.30.0.21')).toBeLessThan(at('--ip 172.30.0.21 --alias client pulse_edge pulse-client-candidate'))
        expect(at('--alias client pulse_edge pulse-client-candidate')).toBeLessThan(at('docker rename pulse-client pulse-client-prev'))
        expect(at('docker rename pulse-client pulse-client-prev')).toBeLessThan(at('--name pulse-client --network pulse_edge --ip 172.30.0.20'))
        expect(out).toContain('--cap-drop ALL --security-opt no-new-privileges --pids-limit 512')
        expect(out).toContain('--restart=unless-stopped --network-alias client')
        expect(out).not.toContain(' -p ')
    })

    it('leaves production untouched when the candidate is unhealthy', () => {
        const out = swap(oldServing, 'pulse-client-candidate')

        expect(out).toContain('swap 1')
        expect(out).toContain('pulse-client=running old')
        expect(out).not.toContain('docker rename')
    })

    it('rolls back when the new container is unhealthy', () => {
        const out = swap(oldServing, 'pulse-client')

        expect(out).toContain('swap 1')
        expect(out).toContain('pulse-client=running old')
        expect(out).toContain('pulse-client-prev=absent')
        expect(out).toContain('pulse-client-candidate=absent')
    })

    it('restores the previous container after an interrupted run', () => {
        const out = runRedeploy('fake_seed pulse-client-prev "stopped old"; recover_interrupted_run 2>/dev/null; echo "$(fake_state pulse-client)|$(fake_state pulse-client-prev)"')

        expect(out.trim().split('\n').pop()).toBe('running old|absent')
    })

    it('uses edge mode only when pulse_edge exists', () => {
        const withNetwork = runRedeploy('docker() { return 0; }; if edge_mode; then echo edge; else echo legacy; fi')
        const without = runRedeploy('docker() { return 1; }; if edge_mode; then echo edge; else echo legacy; fi')

        expect(withNetwork.trim()).toBe('edge')
        expect(without.trim()).toBe('legacy')
    })
})
