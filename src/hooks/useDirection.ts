'use client'

import {
    useEffect,
    useState
} from 'react'

export const useDirection = () => {
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')

    useEffect(() => {
        setDir(
            (document?.documentElement?.dir as 'ltr' | 'rtl') ||
            'ltr'
        )
    }, [])

    return dir
}
