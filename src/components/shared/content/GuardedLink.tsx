'use client'

import Link from 'next/link'

import { LayoutProps } from '@/types/react'

import { cn } from '@/lib/utils'

import { isProtectedHref } from '@/utils/isProtectedHref'

import { useAuth } from '@/context/AuthContext'

type GuardedLinkProps = LayoutProps & {
    href: string
    className?: string
    disabledClassName?: string
    openInNewTab?: boolean
}

/** A link that stays plain text for signed-out visitors when the page it
 * points to needs a signed-in user */
export const GuardedLink = ({
    href,
    className,
    disabledClassName,
    openInNewTab = false,
    children
}: GuardedLinkProps) => {
    const { user } = useAuth()

    if (!user && isProtectedHref(href)) {
        return (
            <span
                aria-disabled={'true'}
                className={cn('cursor-not-allowed opacity-60', disabledClassName)}
            >
                {children}
            </span>
        )
    }

    return (
        <Link
            href={href}
            className={className}
            {...(openInNewTab && {
                target: '_blank',
                rel: 'noopener noreferrer'
            })}
        >
            {children}
        </Link>
    )
}
