import { Language } from '@/types'

const languages : Record<string, Language> = {
    en: {
        name: 'English',
        nativeName: 'English',
        code: 'en-US',
        shortCode: 'EN',
        dir: 'ltr'
    },
    he: {
        name: 'Hebrew',
        nativeName: 'עברית',
        code: 'he-IL',
        shortCode: 'HE',
        dir: 'rtl'
    }
}

export default languages