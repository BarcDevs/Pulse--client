'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { useQueryClient } from '@tanstack/react-query'

import type { Goal } from '@/types/goals'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { goalsLocales } from '@/locales/goalsLocales'

type GoalDetailBreadcrumbProps = {
    goalId: string
}

export const GoalDetailBreadcrumb = ({
    goalId
}: GoalDetailBreadcrumbProps) => {
    const t = useTranslations()
    const queryClient = useQueryClient()
    const goal = queryClient.getQueryData<Goal>(
        recoveryGoalsQueryKeys.goal(goalId)
    )

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={ROUTES.RECOVERY_GOALS}>
                            {t(goalsLocales.header.title)}
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
