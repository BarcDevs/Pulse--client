import {Button} from '@/components/ui/button'

import {COMMUNITY_CATEGORIES_WITH_ICONS}
    from '@/constants/communityMaps'
import * as CommunityTexts from '@/constants/communityTexts'

import {CategoryCard} from './CategoryCard'

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
                <CategoryCard
                    key={category.title}
                    id={category.id+''}
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
