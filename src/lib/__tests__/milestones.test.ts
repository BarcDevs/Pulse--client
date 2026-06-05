import {
    describe,
    expect,
    it
} from 'vitest'

import type { GoalMilestone } from '@/types/goals'
import { MilestoneStatus } from '@/types/goals'

import {
    getInsightColor,
    getMilestoneCardConfig,
    getMilestoneIconColor
} from '@/lib/milestones'

const mockLocales = {
    milestoneCardLabels: {
        completedFormat: 'completed-label',
        activeFormat: 'active-label',
        lockedFormat: 'locked-label'
    }
}

const mockMilestone = (status: MilestoneStatus, order = 1): GoalMilestone => ({
    id: 'm-1',
    goalId: 'g-1',
    title: 'Step 1',
    status,
    order,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
})

// ==================== getMilestoneIconColor ====================
describe('getMilestoneIconColor', () => {
    it('returns bg-secondary for COMPLETED', () => {
        expect(getMilestoneIconColor(MilestoneStatus.COMPLETED)).toBe('bg-secondary')
    })

    it('returns bg-primary for ACTIVE', () => {
        expect(getMilestoneIconColor(MilestoneStatus.ACTIVE)).toBe('bg-primary')
    })

    it('returns bg-surface-container-highest for LOCKED', () => {
        expect(getMilestoneIconColor(MilestoneStatus.LOCKED)).toBe('bg-surface-container-highest')
    })
})

// ==================== getInsightColor ====================
describe('getInsightColor', () => {
    it('returns bg-blue-50 for MOTIVATIONAL', () => {
        expect(getInsightColor('MOTIVATIONAL')).toBe('bg-blue-50')
    })

    it('returns bg-purple-50 for MOOD_DROP_ALERT', () => {
        expect(getInsightColor('MOOD_DROP_ALERT')).toBe('bg-purple-50')
    })

    it('returns bg-green-50 for WEEKLY_SUMMARY', () => {
        expect(getInsightColor('WEEKLY_SUMMARY')).toBe('bg-green-50')
    })

    it('returns bg-slate-50 for unknown type', () => {
        expect(getInsightColor('UNKNOWN')).toBe('bg-slate-50')
    })
})

// ==================== getMilestoneCardConfig ====================
describe('getMilestoneCardConfig', () => {
    describe('ACTIVE milestone', () => {
        it('has correct bgClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE), mockLocales)
            expect(config.bgClass).toBe('bg-surface-container-lowest')
        })

        it('has border-primary in borderClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE), mockLocales)
            expect(config.borderClass).toContain('border-primary')
        })

        it('has empty opacityClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE), mockLocales)
            expect(config.opacityClass).toBe('')
        })

        it('has padding p-5', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE), mockLocales)
            expect(config.padding).toBe('p-5')
        })

        it('has statusLabelKey = active-label', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE), mockLocales)
            expect(config.statusLabelKey).toBe('active-label')
        })

        it('has titleSize text-2xl', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE), mockLocales)
            expect(config.titleSize).toBe('text-2xl')
        })
    })

    describe('COMPLETED milestone', () => {
        it('has correct bgClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.COMPLETED), mockLocales)
            expect(config.bgClass).toBe('bg-surface-container-low')
        })

        it('has empty borderClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.COMPLETED), mockLocales)
            expect(config.borderClass).toBe('')
        })

        it('has empty opacityClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.COMPLETED), mockLocales)
            expect(config.opacityClass).toBe('')
        })

        it('has padding p-4', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.COMPLETED), mockLocales)
            expect(config.padding).toBe('p-4')
        })

        it('has statusLabelKey = completed-label', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.COMPLETED), mockLocales)
            expect(config.statusLabelKey).toBe('completed-label')
        })

        it('statusBadgeClass contains text-secondary', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.COMPLETED), mockLocales)
            expect(config.statusBadgeClass).toContain('text-secondary')
        })
    })

    describe('LOCKED milestone', () => {
        it('has correct bgClass', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.LOCKED), mockLocales)
            expect(config.bgClass).toBe('bg-surface-container-low')
        })

        it('has opacityClass opacity-50 grayscale', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.LOCKED), mockLocales)
            expect(config.opacityClass).toBe('opacity-50 grayscale')
        })

        it('has statusLabelKey = locked-label', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.LOCKED), mockLocales)
            expect(config.statusLabelKey).toBe('locked-label')
        })

        it('statusBadgeClass contains text-outline', () => {
            const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.LOCKED), mockLocales)
            expect(config.statusBadgeClass).toContain('text-outline')
        })
    })

    it('statusLabelOrder equals milestone.order', () => {
        const config = getMilestoneCardConfig(mockMilestone(MilestoneStatus.ACTIVE, 3), mockLocales)
        expect(config.statusLabelOrder).toBe(3)
    })
})
