'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Check, ChevronDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'

import categories from '@/data/forum/categories'
import { communityLocales } from '@/locales/communityLocales'
import { type PostFormSchema } from '@/validations/forms/postFormSchema'

type PostFormCategoryFieldProps = {
    form: UseFormReturn<PostFormSchema>
}

export const PostFormCategoryField = ({
    form
}: PostFormCategoryFieldProps) => {
    const [open, setOpen] = useState(false)
    const t = useTranslations()
    const tCategoryNames = useTranslations('community.categories.names')
    const tCategoryDescs = useTranslations('community.categories.descriptions')

    return (
        <FormField
            control={form.control}
            name={'category'}
            render={({ field }) => {
                const selectedCat = categories.find(c => c.key === field.value) ?? null

                return (
                    <FormItem>
                        <div className={'flex items-baseline justify-between'}>
                            <FormLabel>
                                {t(communityLocales.postForm.category)}
                            </FormLabel>
                            <span className={'text-xs text-muted-foreground'}>
                                {t(communityLocales.postForm.categoryHint)}
                            </span>
                        </div>
                        <Popover
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    type={'button'}
                                    variant={'outline'}
                                    className={cn(
                                        'w-full h-auto py-2.5 px-3 justify-between text-start font-normal',
                                        !selectedCat && 'text-muted-foreground'
                                    )}
                                >
                                    {selectedCat ? (
                                        <div className={'flex items-center gap-2.5'}>
                                            <span
                                                className={'h-2.5 w-2.5 rounded-full shrink-0'}
                                                style={{ backgroundColor: selectedCat.color.text }}
                                            />
                                            <div>
                                                <p className={'text-sm font-semibold text-foreground'}>
                                                    {tCategoryNames(selectedCat.key)}
                                                </p>
                                                <p className={'text-xs text-muted-foreground'}>
                                                    {tCategoryDescs(selectedCat.key)}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <span>
                                            {t(communityLocales.postForm.categoryPlaceholder)}
                                        </span>
                                    )}
                                    <ChevronDown className={'h-4 w-4 opacity-50 shrink-0'}/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align={'start'}
                                className={'w-[--radix-popover-trigger-width] p-1.5 max-h-72 overflow-y-auto'}
                            >
                                {categories.map(cat => {
                                    const isSelected = field.value === cat.key
                                    return (
                                        <Button
                                            key={cat.key}
                                            type={'button'}
                                            variant={'ghost'}
                                            onClick={() => { field.onChange(cat.key); setOpen(false) }}
                                            className={cn(
                                                'w-full h-auto flex items-start justify-between gap-2.5 px-3 py-2.5 text-start',
                                                isSelected && 'bg-primary/10'
                                            )}
                                        >
                                            <div className={'flex items-start gap-2.5'}>
                                                <span
                                                    className={'h-2.5 w-2.5 rounded-full shrink-0 mt-1'}
                                                    style={{ backgroundColor: cat.color.text }}
                                                />
                                                <div>
                                                    <p className={cn(
                                                        'text-sm font-semibold',
                                                        isSelected ? 'text-primary' : 'text-foreground'
                                                    )}>
                                                        {tCategoryNames(cat.key)}
                                                    </p>
                                                    <p className={'text-xs text-muted-foreground'}>
                                                        {tCategoryDescs(cat.key)}
                                                    </p>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <Check className={'h-4 w-4 text-primary shrink-0 mt-0.5'}/>
                                            )}
                                        </Button>
                                    )
                                })}
                            </PopoverContent>
                        </Popover>
                        <FormMessage/>
                    </FormItem>
                )
            }}
        />
    )
}
