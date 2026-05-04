'use server'

import { cookies } from 'next/headers'

import { updateProfile } from '@/api/profile'

export const switchLocale = async (locale: string) => {
    const cookieStore = await cookies()
    cookieStore.set('NEXT_LOCALE', locale)

    if (typeof window === 'undefined') {
        try {
            await updateProfile({ language: locale })
        } catch (error) {
            console.error(
                'Failed to update language preference:',
                error
            )
        }
    }
}
