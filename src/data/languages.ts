import { Language } from '@/types'

const languages : Record<string, Language> = {
    en: {
        name: 'English',
        nativeName: 'English',
        code: 'en',
        dir: 'ltr'
    },
    he: {
        name: 'Hebrew',
        nativeName: 'עברית',
        code: 'he',
        dir: 'rtl'
    }
}

export default languages
