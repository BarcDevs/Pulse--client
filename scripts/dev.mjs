import { createServer } from 'net'
import { spawn } from 'child_process'

const basePort = 5173
const args = process.argv.slice(2)

const isPortFreeOnHost = (port, host) => new Promise((resolve) => {
    const server = createServer()
    server.once('error', () => resolve(false))
    server.once('listening', () => server.close(() => resolve(true)))
    server.listen(port, host)
})

const isPortFree = async (port) =>
    (await isPortFreeOnHost(port, '0.0.0.0'))
    && (await isPortFreeOnHost(port, '::'))

const findFreePort = async (start) => {
    let port = start
    while (!(await isPortFree(port))) port++
    return port
}

const port = await findFreePort(basePort)
if (port !== basePort) {
    console.log(`Port ${basePort} is busy — starting on ${port} instead`)
}

const child = spawn(
    'next',
    ['dev', '-p', String(port), ...args],
    { stdio: 'inherit', shell: true }
)

child.on('exit', (code) => process.exit(code ?? 0))
