'use client'

import Link from 'next/link'

import { communityPageTexts } from '@/constants/componentTexts/community'

export const UnauthenticatedReplyPrompt = () => (
    <div className={'rounded-md bg-secondary/50 border border-border p-4 text-center'}>
        <p className={'text-sm text-muted-foreground mb-3'}>
            {communityPageTexts.postDetail.loginToReply}
        </p>
        <Link
            href={'/login'}
            className={'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'}
        >
            {communityPageTexts.postDetail.loginButton}
        </Link>
    </div>
)
