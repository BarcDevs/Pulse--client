import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const baseUrl = process.argv[2] ?? 'http://localhost:5173'
const outDir = 'public/legal'
const docs = ['privacy', 'terms']
const locales = ['en-US', 'he-IL']

const browser = await chromium.launch()
await mkdir(outDir, { recursive: true })

for (const locale of locales) {
    const context = await browser.newContext()
    await context.addCookies([{
        name: 'NEXT_LOCALE',
        value: locale,
        url: baseUrl
    }])
    const page = await context.newPage()

    for (const doc of docs) {
        await page.goto(`${baseUrl}/${doc}`, { waitUntil: 'networkidle' })
        await page.emulateMedia({ media: 'print' })
        await page.pdf({
            path: `${outDir}/${doc}-${locale}.pdf`,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '16mm',
                bottom: '16mm',
                left: '14mm',
                right: '14mm'
            }
        })
        console.log(`${outDir}/${doc}-${locale}.pdf`)
    }

    await context.close()
}

await browser.close()
