'use client'

import { useTranslations } from 'next-intl'

import { Control } from 'react-hook-form'

import { GoalCategory } from '@/types/goals'

import { ChipButton } from '@/components/shared/buttons/ChipButton'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { getCategoryColor } from '@/lib/goals/getCategoryColor'

import { goalsLocales } from '@/locales/goalsLocales'
import { GoalSchema }
    from '@/validations/forms/goalSchema'

type CategoryChipSelectorProps = {
    control: Control<GoalSchema>
}

export const CategoryChipSelector = ({
    control
}: CategoryChipSelectorProps) => {
    const t = useTranslations()

    return (
        <FormField
            control={control}
            name={'category'}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>
                        {t(goalsLocales.goalForm.fields.categoryLabel)}
                    </FormLabel>
                <FormControl>
                    <div className={'flex gap-3'}>
                        {Object.values(GoalCategory).map(
                            (cat) => {
                                const isSelected = field.value === cat
                                const categoryColor = getCategoryColor(cat)

                                return (
                                    <ChipButton
                                        key={cat}
                                        type={'button'}
                                        size={'md'}
                                        isSelected={isSelected}
                                        selectedClassName={categoryColor}
                                        onClick={() => field.onChange(cat)}
                                    >
                                        {t(goalsLocales.categoryLabels[cat])}
                                    </ChipButton>
                                )
                            }
                        )}
                    </div>
                </FormControl>
                {fieldState.error && (
                    <FormMessage>
                        {fieldState.error.message}
                    </FormMessage>
                )}
                </FormItem>
            )}
        />
    )
}
