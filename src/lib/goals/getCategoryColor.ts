import { GoalCategory } from '@/types/goals'

export const getCategoryColor = (
    category: GoalCategory
) => {
    switch (category) {
        case GoalCategory.PHYSICAL:
            return 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 [&:hover]:text-on-secondary-container'
        case GoalCategory.MENTAL:
            return 'bg-tertiary-fixed text-tertiary hover:bg-tertiary-fixed-dim [&:hover]:text-tertiary'
        case GoalCategory.LIFESTYLE:
            return 'bg-primary-light text-primary hover:bg-primary-light/80 [&:hover]:text-primary'
    }
}
