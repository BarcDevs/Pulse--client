import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render, screen } from '@testing-library/react'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/components/dashboard/charts/HistoryChart', () => ({
    DashboardHistoryChart: () => <div data-testid={'history-chart'}/>
}))

vi.mock('@/components/dashboard/cards/AiInsight', () => ({
    DashboardAIInsight: () => <div data-testid={'ai-insight'}/>
}))

vi.mock('@/components/dashboard/community/CommunityActivity', () => ({
    CommunityActivity: ({ fullHeight }: { fullHeight: boolean }) => (
        <div
            data-testid={'community'}
            data-full-height={String(fullHeight)}
        />
    )
}))

import { DashboardChartSidebar } from '@/components/dashboard/DashboardChartSidebar'

describe('DashboardChartSidebar', () => {
    it('asks for a check-in instead of showing old insights when none was made today', () => {
        render(<DashboardChartSidebar showInsightPrompt={true}/>)

        expect(screen.getByText('dashboard.aiInsight.checkInPrompt'))
            .toBeTruthy()
        expect(screen.queryByTestId('ai-insight')).toBeNull()
    })

    it('shows neither the prompt nor insights once today\'s check-in exists', () => {
        render(<DashboardChartSidebar showInsightPrompt={false}/>)

        expect(screen.queryByText('dashboard.aiInsight.checkInPrompt'))
            .toBeNull()
        expect(screen.queryByTestId('ai-insight')).toBeNull()
    })

    it('gives the community card the full height only without the prompt', () => {
        const { rerender } = render(
            <DashboardChartSidebar showInsightPrompt={true}/>
        )

        expect(screen.getByTestId('community').dataset.fullHeight)
            .toBe('false')

        rerender(<DashboardChartSidebar showInsightPrompt={false}/>)

        expect(screen.getByTestId('community').dataset.fullHeight)
            .toBe('true')
    })
})
