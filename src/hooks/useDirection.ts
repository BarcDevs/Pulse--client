'use client'

export const useDirection = () =>
    (document.documentElement.dir as 'ltr' | 'rtl') ||
    'ltr'
