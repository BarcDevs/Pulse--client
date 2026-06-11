// Byte-scan a V8 heapsnapshot (no full-file stringify -> sidesteps 536MB string cap).
// Extracts per-node (type,name) constructor histogram. Diffs two snapshots.
import fs from 'node:fs'

const COMMA = 44, RB = 93, LB = 91, QUOTE = 34, ZERO = 48, NINE = 57

const extract = path => {
    const buf = fs.readFileSync(path) // Buffer (handles >536MB)
    const head = buf.subarray(0, 4096).toString('utf8')
    const typeEnum = JSON.parse(head.match(/"node_types":\[(\[[^\]]*\])/)[1])
    const NF = JSON.parse('[' + head.match(/"node_fields":\[([^\]]*)\]/)[1] + ']').length
    const tI = 0, nI = 1, sI = 3 // type, name, self_size positions in node_fields

    // ---- nodes array ----
    const nStart = buf.indexOf('"nodes":[') + '"nodes":['.length
    const byName = new Map() // nameIdx -> {count,size,type}
    let cur = 0, field = 0, nodeType = 0, nameIdx = 0, selfSize = 0, hasDigit = false
    let i = nStart
    for (; i < buf.length; i++) {
        const c = buf[i]
        if (c >= ZERO && c <= NINE) { cur = cur * 10 + (c - ZERO); hasDigit = true; continue }
        if (c === COMMA || c === RB) {
            if (hasDigit) {
                if (field === tI) nodeType = cur
                else if (field === nI) nameIdx = cur
                else if (field === sI) selfSize = cur
                field++
                if (field === NF) {
                    let e = byName.get(nameIdx)
                    if (!e) { e = { count: 0, size: 0, type: nodeType }; byName.set(nameIdx, e) }
                    e.count++; e.size += selfSize
                    field = 0
                }
                cur = 0; hasDigit = false
            }
            if (c === RB) break
        }
    }

    // ---- strings array (parse element-by-element; ']' may appear inside a string) ----
    const sStart = buf.indexOf('"strings":[', i) + '"strings":['.length
    const strings = []
    let j = sStart
    // skip to first non-space
    while (buf[j] === 32 || buf[j] === 10 || buf[j] === 13 || buf[j] === 9) j++
    while (j < buf.length) {
        if (buf[j] === RB) break
        if (buf[j] === QUOTE) {
            const start = j
            j++
            while (j < buf.length) {
                if (buf[j] === 92) { j += 2; continue } // backslash escape
                if (buf[j] === QUOTE) { j++; break }
                j++
            }
            strings.push(JSON.parse(buf.subarray(start, j).toString('utf8')))
        }
        // advance to next ',' or ']'
        while (j < buf.length && buf[j] !== COMMA && buf[j] !== RB) j++
        if (buf[j] === COMMA) j++
    }

    // ---- resolve labels ----
    const byLabel = new Map()
    for (const [idx, e] of byName) {
        const label = (typeEnum[e.type] || ('type' + e.type)) + '  ' + (strings[idx] ?? ('#' + idx))
        let t = byLabel.get(label)
        if (!t) { t = { count: 0, size: 0 }; byLabel.set(label, t) }
        t.count += e.count; t.size += e.size
    }
    return byLabel
}

const a = extract(process.argv[2])
const b = extract(process.argv[3])

const rows = []
for (const [label, bv] of b) {
    const av = a.get(label) || { count: 0, size: 0 }
    rows.push({ label, dCount: bv.count - av.count, dSize: bv.size - av.size, bCount: bv.count })
}
const mb = n => (n / 1048576).toFixed(1)
console.log('\n===== TOP GROWTH BY COUNT (B - A) =====')
rows.sort((x, y) => y.dCount - x.dCount).slice(0, 30).forEach(r =>
    console.log(String(r.dCount).padStart(9), (mb(r.dSize) + 'MB').padStart(10), 'now=' + r.bCount, ' ', r.label.slice(0, 70)))
console.log('\n===== TOP GROWTH BY SIZE (B - A) =====')
rows.sort((x, y) => y.dSize - x.dSize).slice(0, 20).forEach(r =>
    console.log((mb(r.dSize) + 'MB').padStart(10), '+' + r.dCount, ' ', r.label.slice(0, 70)))
