import {
    useEffect,
    useRef,
    useState
} from 'react'

const SCROLL_OFFSET = 120
const JUMP_OFFSET = 80

export const useLegalScrollSpy = (sectionIds: string[]) => {
    const [activeId, setActiveId] = useState(sectionIds[0])
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

    useEffect(() => {
        const handleScroll = () => {
            let current = sectionIds[0]

            for (const id of sectionIds) {
                const el = sectionRefs.current[id]

                if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET)
                    current = id
            }

            setActiveId(current)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [sectionIds])

    const registerSection = (id: string) => (el: HTMLElement | null) => {
        sectionRefs.current[id] = el
    }

    const jumpTo = (id: string) => {
        const el = sectionRefs.current[id]

        if (el) {
            window.scrollTo({
                top: window.scrollY + el.getBoundingClientRect().top - JUMP_OFFSET,
                behavior: 'smooth'
            })
        }
    }

    return {
        activeId,
        registerSection,
        jumpTo
    }
}
