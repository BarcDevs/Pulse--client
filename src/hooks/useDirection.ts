'use client'

import {useState} from 'react'

export const useDirection = () => {
    const [dir] = useState<'ltr' | 'rtl'>(() => {
        if (typeof document === 'undefined')
            return 'ltr'

        return (
            (document.documentElement.dir as 'ltr' | 'rtl') ||
            'ltr'
        )
    })

    return dir
}
