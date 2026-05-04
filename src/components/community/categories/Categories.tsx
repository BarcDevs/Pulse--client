'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { communityCategoriesWithIcons }
    from '@/constants/mappings/community'

import { communityLocales } from '@/locales/communityLocales'

import { CategoryCard } from './CategoryCard'

// todo: integrate with categories API for dynamic counts
export const Categories = () => {
    const t = useTranslations()

    return (
        <div>
            <div className={'flex items-center justify-between mb-4'}>
                <h2 className={'text-lg font-semibold text-foreground'}>
                    {t(communityLocales.categories.browseTitle)}
                </h2>
                <Button
                    variant={'link'}
                    className={'h-auto p-0 text-sm text-primary hover:underline'}
                >
                    {t(communityLocales.categories.viewAll)}
                </Button>
        </div>

            <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4'}>
                {communityCategoriesWithIcons.map((category) => (
                    <CategoryCard
                        key={category.title}
                        id={category.id + ''}
                        icon={<category.icon className={'h-6 w-6'}/>}
                        color={category.color}
                        title={category.title}
                        description={category.description}
                        count={category.count}
                    />
                ))}
            </div>
        </div>
    )
}
