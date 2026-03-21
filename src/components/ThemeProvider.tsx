'use client'

import * as React from 'react'

import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from 'next-themes'

const ThemeProvider = ({children, ...props}: ThemeProviderProps) => (
    <NextThemesProvider {...props}>
        {children}
    </NextThemesProvider>
)

export {ThemeProvider}
