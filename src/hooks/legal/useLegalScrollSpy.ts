import {
    useEffect,
    useRef,
    useState
} from 'react'

const SCROLL_OFFSET = 120
const JUMP_OFFSET = 80

export const useLegalScrollSpy = (sectionIds: string[]) => {
    const [activeId, setActiveId] = useState(sectionIds[0])
    const scrollerRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

    useEffect(() => {
        const scroller = scrollerRef.current

        if (!scroller) return

        const handleScroll = () => {
            let current = sectionIds[0]

            for (const id of sectionIds) {
                const el = sectionRefs.current[id]

                if (el && el.offsetTop - SCROLL_OFFSET <= scroller.scrollTop)
                    current = id
            }

            setActiveId(current)
        }

        scroller.addEventListener('scroll', handleScroll)

        return () => scroller.removeEventListener('scroll', handleScroll)
    }, [sectionIds])

    const registerSection = (id: string) => (el: HTMLElement | null) => {
        sectionRefs.current[id] = el
    }

    const jumpTo = (id: string) => {
        const el = sectionRefs.current[id]
        const scroller = scrollerRef.current

        if (el && scroller) {
            scroller.scrollTo({
                top: el.offsetTop - JUMP_OFFSET,
                behavior: 'smooth'
            })
        }
    }

    return {
        activeId,
        scrollerRef,
        registerSection,
        jumpTo
    }
}
