import { Button } from '@/components/ui/button'

import { communityPageTexts } from '@/constants/componentTexts/community'
import { communityCategoriesWithIcons }
    from '@/constants/mappings/community'

import { CategoryCard } from './CategoryCard'

// todo: integrate with categories API for dynamic counts
export const Categories = () => (
    <div>
        <div className={'flex items-center justify-between mb-4'}>
            <h2 className={'text-lg font-semibold text-foreground'}>
                {communityPageTexts.categories.browseTitle}
            </h2>
            <Button
                variant={'link'}
                className={'h-auto p-0 text-sm text-primary hover:underline'}
            >
                {communityPageTexts.categories.viewAll}
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
