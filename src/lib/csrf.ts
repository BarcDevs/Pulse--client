'use client'

let csrfToken: string | null = null

export const getCsrfToken = (): string | null =>
    csrfToken

export const setCsrfToken = (
    token: string | null
): void => {
    csrfToken = token
}

export const clearCsrfToken = (): void => {
    csrfToken = null
}
