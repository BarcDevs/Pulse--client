'use client'

import Link from 'next/link'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { useGoal } from '@/hooks/queries/useGoal'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { ROUTES } from '@/constants/routes'

type GoalDetailBreadcrumbProps = {
    goalId: string
}

export const GoalDetailBreadcrumb = ({
    goalId
}: GoalDetailBreadcrumbProps) => {
    const { data: goal } = useGoal(goalId)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={ROUTES.RECOVERY_GOALS}>
                            {recoveryGoalsPageTexts.header.title}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {goal?.title ?? ''}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
