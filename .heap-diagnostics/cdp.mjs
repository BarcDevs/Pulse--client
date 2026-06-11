// CDP client: inspect node inspector targets and take heap snapshots.
// Node 24 global WebSocket + fetch. No deps.
// usage:
//   node cdp.mjs info <port>                 -> list targets + heapUsed + argv
//   node cdp.mjs snap <port> <outfile.json>  -> write a heap snapshot
import fs from 'node:fs'

const [mode, portArg, outfile] = process.argv.slice(2)
const port = portArg || '9229'

const listTargets = async () => {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`)
    return res.json()
}

const pickTarget = targets => {
    // prefer a 'node' type target with a ws url
    const t = targets.find(x => x.webSocketDebuggerUrl)
    if (!t) throw new Error('no debuggable target on port ' + port)
    return t
}

const rpc = (ws, id, method, params = {}) =>
    new Promise((resolve, reject) => {
        const handler = ev => {
            const msg = JSON.parse(ev.data)
            if (msg.id === id) {
                ws.removeEventListener('message', handler)
                msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
            }
        }
        ws.addEventListener('message', handler)
        ws.send(JSON.stringify({ id, method, params }))
    })

const connect = url =>
    new Promise((resolve, reject) => {
        const ws = new WebSocket(url)
        ws.addEventListener('open', () => resolve(ws))
        ws.addEventListener('error', e => reject(new Error('ws error ' + (e.message || ''))))
    })

const main = async () => {
    const targets = await listTargets()
    const target = pickTarget(targets)
    const ws = await connect(target.webSocketDebuggerUrl)

    if (mode === 'info') {
        await rpc(ws, 1, 'Runtime.enable')
        const r = await rpc(ws, 2, 'Runtime.evaluate', {
            expression: 'JSON.stringify({heapMB: Math.round(process.memoryUsage().heapUsed/1048576), rssMB: Math.round(process.memoryUsage().rss/1048576), argv: process.argv.join(" ")})',
            returnByValue: true
        })
        console.log('port', port, 'target', target.title || target.url)
        console.log(r.result.value)
        ws.close()
        return
    }

    if (mode === 'snap') {
        // stream chunks straight to disk; joining in memory overflows V8 max string length
        const out = fs.createWriteStream(outfile)
        let bytes = 0
        const onMsg = ev => {
            const msg = JSON.parse(ev.data)
            if (msg.method === 'HeapProfiler.addHeapSnapshotChunk') {
                out.write(msg.params.chunk)
                bytes += msg.params.chunk.length
            }
        }
        ws.addEventListener('message', onMsg)
        await rpc(ws, 1, 'HeapProfiler.enable')
        // collectGarbage to drop ephemeral junk so the diff is meaningful
        await rpc(ws, 2, 'HeapProfiler.collectGarbage')
        await rpc(ws, 3, 'HeapProfiler.takeHeapSnapshot', { reportProgress: false, captureNumericValue: false })
        ws.removeEventListener('message', onMsg)
        await new Promise(r => out.end(r))
        console.log('wrote', outfile, 'bytes', bytes)
        ws.close()
        return
    }

    throw new Error('unknown mode: ' + mode)
}

main().catch(e => { console.error('ERR', e.message); process.exit(1) })
