import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

const SUPPORTED = ['en-US', 'he-IL'] as const
type Locale = (typeof SUPPORTED)[number]
const DEFAULT_LOCALE: Locale = 'he-IL'

export default getRequestConfig(async ({ requestLocale }) => {
    const cookieStore = await cookies()
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value
    const requested = (await requestLocale) ?? undefined

    const candidate = cookieLocale
        ?? requested
        ?? DEFAULT_LOCALE

    const locale = SUPPORTED.includes(candidate as Locale)
        ? (candidate as Locale)
        : DEFAULT_LOCALE

    const messages =
        locale === 'he-IL'
            ? (await import('../../../messages/he-IL.json')).default
            : (await import('../../../messages/en-US.json')).default

    return {
        locale,
        messages
    }
})
