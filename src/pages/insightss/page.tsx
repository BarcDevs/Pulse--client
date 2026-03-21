'use client'

import {Sparkles} from 'lucide-react'

import {AlertCards} from '@/components/insights/AlertCards'
import {InsightsHeader} from '@/components/insights/Header'
import {InsightsMilestone} from '@/components/insights/Milestone'
import {InsightsPatterns} from '@/components/insights/Patterns'
import {InsightsSummary} from '@/components/insights/Summary'
import {Badge} from '@/components/ui/badge'
import {SidebarProvider} from '@/components/ui/sidebar'

const InsightsPage = () => (
    <SidebarProvider>
        <div className={'flex min-h-screen flex-col'}>
            <header
                className={
                    'sticky top-0 z-10 flex h-16 ' +
                    'items-center justify-between ' +
                    'border-b border-border ' +
                    'bg-surface-card px-4 md:px-6'
                }
            >
                <div className={'flex items-center gap-4'}>
                    <div>
                        <h1
                            className={
                                'text-lg font-semibold ' +
                                'text-foreground'
                            }
                        >
                            AI Insights
                        </h1>
                        <p
                            className={
                                'text-sm ' +
                                'text-muted-foreground'
                            }
                        >
                            Smart observations about
                            your recovery
                        </p>
                    </div>
                </div>
                <Badge
                    className={
                        'gap-2 bg-secondary-light ' +
                        'text-secondary'
                    }
                >
                    <Sparkles className={'size-3'} />
                    AI ANALYSIS ACTIVE
                </Badge>
            </header>

            <main className={'flex-1 p-4 md:p-6'}>
                <div className={'mx-auto max-w-7xl'}>
                    <div
                        className={
                            'grid gap-6 ' +
                            'lg:grid-cols-[1fr_300px]'
                        }
                    >
                        <InsightsHeader />
                        <InsightsMilestone />
                    </div>

                    <AlertCards />

                    <InsightsPatterns />

                    <InsightsSummary />
                </div>
            </main>
        </div>
    </SidebarProvider>
)

export {InsightsPage as default}
