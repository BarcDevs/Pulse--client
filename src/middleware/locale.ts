import { NextRequest, NextResponse } from 'next/server'

export const localeMiddleware = (
    req: NextRequest,
    res: NextResponse
) => {
    const cookie = req.cookies.get('NEXT_LOCALE')?.value

    if (!cookie)
        res.cookies.set('NEXT_LOCALE', 'he-IL')

    return res
}
