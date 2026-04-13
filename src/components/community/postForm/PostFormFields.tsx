'use client'

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

import { communityPageTexts } from '@/constants/componentTexts/community'

import categories from '@/data/forum/categories'

type PostFormFieldsProps = {
    form: UseFormReturn<any>
}

export const PostFormFields = ({
    form
}: PostFormFieldsProps) => (
    <>
        <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {communityPageTexts.postForm.title}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={communityPageTexts.postForm.titlePlaceholder}
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
                        {communityPageTexts.postForm.category}
                    </FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={communityPageTexts.postForm.categoryPlaceholder}/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(
                                    (cat) => (
                                        <SelectItem
                                            key={cat.key}
                                            value={cat.key}
                                        >
                                            {cat.name}
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
