import {
    useEffect,
    useState
} from 'react'

const MOBILE_BREAKPOINT = 768

export const useIsMobile = () => {
    const [isMobile, setIsMobile] =
        useState<boolean | undefined>(
            undefined
        )

    useEffect(() => {
        const maxWidth = MOBILE_BREAKPOINT - 1

        const mql = window.matchMedia(
            `(max-width: ${maxWidth}px)`
        )

        const onChange = () => {
            setIsMobile(
                window.innerWidth
                < MOBILE_BREAKPOINT
            )
        }

        mql.addEventListener(
            'change',
            onChange
        )

        onChange()

        return () =>
            mql.removeEventListener(
                'change',
                onChange
            )
    }, [])

    return !!isMobile
}
