import { chromium } from 'playwright'
const url = 'http://localhost:5173'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(e => console.log('goto:', e.message))
console.log('PAGE OPEN at', url, '— holding idle, HMR socket alive')
// keep process + tab alive indefinitely; poll a heartbeat so the connection stays warm
setInterval(() => {}, 60000)
