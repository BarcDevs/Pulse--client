'use client'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import {COMMUNITY_CATEGORIES_WITH_ICONS}
    from '@/constants/communityMaps'
import * as CommunityTexts from '@/constants/communityTexts'

export const Categories = () => (
    <div>
        <div className={'flex items-center justify-between mb-4'}>
            <h2 className={'text-lg font-semibold text-foreground'}>
                {CommunityTexts.COMMUNITY_BROWSE_CATEGORIES}
            </h2>
            <Button
                variant={'link'}
                className={'h-auto p-0 text-sm text-primary hover:underline'}
            >
                {CommunityTexts.COMMUNITY_VIEW_ALL}
            </Button>
        </div>

        <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4'}>
            {COMMUNITY_CATEGORIES_WITH_ICONS.map((category) => (
                <div
                    key={category.id}
                    className={'rounded-2xl bg-surface-card p-5 hover:shadow-md transition-shadow cursor-pointer'}
                >
                    <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl', category.color)}>
                        <category.icon className={'h-6 w-6'}/>
                    </div>
                    <h3 className={'mt-3 font-medium text-foreground'}>
                        {category.title}
                    </h3>
                    <p className={'mt-1 text-sm text-muted-foreground'}>
                        {category.description}
                    </p>
                    <p className={'mt-2 text-xs text-primary font-medium'}>
                        {category.count}
                    </p>
                </div>
            ))}
        </div>
    </div>
)
