'use client'

import { Control } from 'react-hook-form'

import { GoalCategory } from '@/types/goals'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { getCategoryColor } from '@/lib/goals'
import { cn } from '@/lib/utils'

import { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'

import { GoalSchema }
    from '@/validations/forms/goalSchema'

type CategoryChipSelectorProps = {
    control: Control<GoalSchema>
}

export const CategoryChipSelector = ({
    control
}: CategoryChipSelectorProps) => (
    <FormField
        control={control}
        name={'category'}
        render={({ field, fieldState }) => (
            <FormItem>
                <FormLabel>
                    {pageTexts.goalForm.fields.categoryLabel}
                </FormLabel>
                <FormControl>
                    <div className={'flex gap-3'}>
                        {Object.values(GoalCategory).map(
                            (cat) => {
                                const isSelected = field.value === cat
                                const categoryColor = getCategoryColor(cat)

                                return (
                                    <Button
                                        key={cat}
                                        type={'button'}
                                        onClick={() => field.onChange(cat)}
                                        className={cn(
                                            'px-4 py-2 rounded-full text-sm font-medium transition-all',
                                            isSelected
                                                ? `${categoryColor} shadow-md hover:shadow-lg`
                                                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:shadow-sm [&:hover]:text-on-surface-variant'
                                        )}
                                        variant={'ghost'}
                                    >
                                        {pageTexts.categoryLabels[cat]}
                                    </Button>
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
