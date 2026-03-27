'use client'

import { useRouter } from 'next/navigation'

import { Headphones } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const SidebarBottomError = () => {
    const router = useRouter()

    const handleGetSupport = () => {
        router.push('/contact-support')
    }

    return (
        <div className={'border-t border-border px-4 py-4'}>
            <Button
                onClick={handleGetSupport}
                className={'w-full gap-3'}
            >
                <Headphones className={'size-4'} />
                <span className={'text-sm'}>
                    Get Support
                </span>
            </Button>
        </div>
    )
}
