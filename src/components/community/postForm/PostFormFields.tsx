'use client'

import { useTranslations } from 'next-intl'

import { UseFormReturn } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

import categories from '@/data/forum/categories'
import { communityLocales } from '@/locales/communityLocales'

type PostFormFieldsProps = {
    form: UseFormReturn<any>
}

export const PostFormFields = ({
    form
}: PostFormFieldsProps) => {
    const t = useTranslations()
    const tCategories = useTranslations('community.categories')

    return (
        <>
            <FormField
                control={form.control}
                name={'title'}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {t(communityLocales.postForm.title)}
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder={t(communityLocales.postForm.titlePlaceholder)}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={'category'}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {t(communityLocales.postForm.category)}
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger className={'cursor-pointer'}>
                                    <SelectValue placeholder={t(communityLocales.postForm.categoryPlaceholder)}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(
                                        (cat) => (
                                            <SelectItem
                                                key={cat.key}
                                                value={cat.key}
                                            >
                                                {tCategories(cat.key)}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </>
    )
}
