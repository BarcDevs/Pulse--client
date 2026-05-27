'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
    Check,
    ChevronDown,
    SlidersHorizontal
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'

import { useForumCategoryCounts } from '@/hooks/queries/useForumCategoryCounts'

import { cn } from '@/lib/utils'

import categories from '@/data/forum/categories'
import { communityLocales } from '@/locales/communityLocales'

type Category = typeof categories[number]

type CategoryOptionProps = {
    category: Category | null
    isSelected: boolean
    count: number | null
    label: string
    onSelect: () => void
}

const CategoryOption = ({
    category,
    isSelected,
    count,
    label,
    onSelect
}: CategoryOptionProps) => (
    <Button
        variant={'ghost'}
        onClick={onSelect}
        className={cn(
            'w-full justify-start gap-2.5 text-sm font-normal',
            isSelected && 'bg-primary/10 font-semibold text-primary hover:bg-primary/15 hover:text-primary'
        )}
    >
        {category
            ? <span
                className={'h-2.5 w-2.5 rounded-full shrink-0'}
                style={{ backgroundColor: category.color.text }}
            />
            : <span className={'h-2.5 w-2.5 rounded border border-muted-foreground shrink-0'}/>
        }
        <span className={'flex-1 text-left'}>
            {label}
        </span>
        {count !== null && (
            <span className={'text-xs text-muted-foreground tabular-nums'}>
                {count}
            </span>
        )}
        {isSelected && (
            <Check className={'h-4 w-4'}/>
        )}
    </Button>
)

type PostListCategoryFilterProps = {
    value: string | null
    onChangeAction: (category: string | null) => void
}

export const PostListCategoryFilter = ({
    value,
    onChangeAction
}: PostListCategoryFilterProps) => {
    const t = useTranslations()
    const tCategoryNames = useTranslations('community.categories.names')
    const [open, setOpen] = useState(false)
    const { data: counts } = useForumCategoryCounts()

    const selected = value ? categories.find(c => c.key === value) : null
    const getCount = (key: string) => counts
        ?.find(c => c.category === key)?.count ?? 0

    const handleSelect = (key: string | null) => {
        onChangeAction(key)
        setOpen(false)
    }

    const allKeys: Array<string | null> = [
        null,
        ...categories.map(c => c.key)
    ]

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    size={'sm'}
                    className={cn(
                        'gap-1.5 text-sm font-semibold',
                        selected && 'border-primary text-primary'
                    )}
                >
                    <SlidersHorizontal className={'h-3.5 w-3.5'}/>
                    {selected
                        ? tCategoryNames(selected.key)
                        : t(communityLocales.posts.allCategories)}
                    <ChevronDown className={'h-3.5 w-3.5'}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align={'end'}
                className={'w-72 p-1.5'}
            >
                <p className={'px-2.5 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide'}>
                    {t(communityLocales.posts.filterByCategory)}
                </p>
                {allKeys.map(key => {
                    const category = key ? (categories.find(c => c.key === key) ?? null) : null
                    const count = key ? getCount(key) : (counts?.find(c => c.category === 'all')?.count ?? null)
                    const label = key
                        ? tCategoryNames(key)
                        : t(communityLocales.posts.allCategories)
                    return (
                        <CategoryOption
                            key={key ?? 'all'}
                            category={category}
                            isSelected={value === key}
                            count={count}
                            label={label}
                            onSelect={() => handleSelect(key)}
                        />
                    )
                })}
            </PopoverContent>
        </Popover>
    )
}
