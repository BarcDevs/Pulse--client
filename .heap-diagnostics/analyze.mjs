import fs from 'node:fs'

const file = process.argv[2]
const raw = fs.readFileSync(file, 'utf8')
const snap = JSON.parse(raw)
const { node_fields, node_types, edge_fields } = snap.snapshot.meta
const nodes = snap.nodes
const strings = snap.strings
const NF = node_fields.length
const typeArr = node_types[0]
const typeIdx = node_fields.indexOf('type')
const nameIdx = node_fields.indexOf('name')
const selfSizeIdx = node_fields.indexOf('self_size')

const byType = {}        // node type -> {count, size}
const byName = {}        // constructor/name -> {count, size} for objects
let detached = { count: 0, size: 0 }

const nodeCount = nodes.length / NF
for (let i = 0; i < nodeCount; i++) {
  const base = i * NF
  const t = typeArr[nodes[base + typeIdx]]
  const name = strings[nodes[base + nameIdx]]
  const size = nodes[base + selfSizeIdx]
  byType[t] = byType[t] || { count: 0, size: 0 }
  byType[t].count++; byType[t].size += size
  if (t === 'object') {
    byName[name] = byName[name] || { count: 0, size: 0 }
    byName[name].count++; byName[name].size += size
  }
  if (typeof name === 'string' && name.toLowerCase().includes('detached')) {
    detached.count++; detached.size += size
  }
}

const mb = b => (b / 1048576).toFixed(1)
console.log('FILE', file, 'totalNodes', nodeCount)
console.log('\n== by node type (size) ==')
Object.entries(byType).sort((a,b)=>b[1].size-a[1].size).slice(0,12)
  .forEach(([k,v])=>console.log(mb(v.size).padStart(8)+'MB', String(v.count).padStart(8), k))
console.log('\n== top object constructors (size) ==')
Object.entries(byName).sort((a,b)=>b[1].size-a[1].size).slice(0,25)
  .forEach(([k,v])=>console.log(mb(v.size).padStart(8)+'MB', String(v.count).padStart(8), k))
console.log('\n== detached nodes (name contains "detached") ==')
console.log(mb(detached.size)+'MB', detached.count, 'nodes')
