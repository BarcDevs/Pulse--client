'use server'

import { cookies } from 'next/headers'

export const switchLocale = async (locale: string) => {
    const cookieStore = await cookies()
    cookieStore.set('NEXT_LOCALE', locale)
}
