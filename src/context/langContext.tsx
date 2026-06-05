import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

import { Language } from '@/types'
import { ContextProps } from '@/types/react'

import languages from '@/data/languages'

type ContextValue = {
    lang: Language,
    changeLang: (lang: Language) => void
}

//region LocalStorage
const getLangFromStorage = () => {
    const lang = localStorage.getItem('language')
    return languages[lang || 'en']
}

const saveLangInStorage = (lang: Language) => {
    localStorage.setItem('language', lang.code)
}
//endregion

const LangContext = createContext<ContextValue>({
    lang: languages.en,
    changeLang: () => {
    }
})

const useLanguage = () => useContext(LangContext)

const LangProvider = ({ children }: ContextProps) => {
    const [lang, setLang] = useState<Language>(getLangFromStorage())

    useEffect(() => {
        const htmlElement = document.documentElement
        htmlElement.lang = lang.code
        htmlElement.dir = lang.dir
    }, [lang])

    const changeLang = (lang: Language) => {
        setLang(lang)
        saveLangInStorage(lang)
    }

    return (
        <LangContext.Provider value={{ lang, changeLang }}>
            {children}
        </LangContext.Provider>
    )
}

export { LangProvider, useLanguage }
