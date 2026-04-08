import type { ReactNode } from 'react'

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & unknown

export type LayoutProps = {
    children: ReactNode
}

export type Language = {
    name: string
    nativeName: string
    code: string
    dir: 'ltr' | 'rtl'
}

export type Theme = 'light' | 'dark'