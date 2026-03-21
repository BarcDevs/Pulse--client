'use client'

import {Moon, Quote, TrendingUp} from 'lucide-react'

import {Badge} from '@/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Progress} from '@/components/ui/progress'

import {
    CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION,
    CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL,
    CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE,
    CHAT_SIDEBAR_INSIGHTS_TIMEFRAME,
    CHAT_SIDEBAR_INSIGHTS_TITLE,
    CHAT_SIDEBAR_NEXT_MILESTONE_BADGE,
    CHAT_SIDEBAR_NEXT_MILESTONE_LABEL,
    CHAT_SIDEBAR_NEXT_MILESTONE_TITLE,
    CHAT_SIDEBAR_QUOTE,
    CHAT_SIDEBAR_QUOTE_AUTHOR,
    CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION,
    CHAT_SIDEBAR_SLEEP_QUALITY_LABEL,
    CHAT_SIDEBAR_SLEEP_QUALITY_TITLE,
} from '@/constants/chatTexts'

const ChatPanel = () => (
    <aside className={'hidden w-80 shrink-0 border-l border-border bg-surface-card p-4 lg:block'}>
        <div className={'space-y-4'}>
            {/* Recent Insights */}
            <Card className={'border-0 bg-surface-section shadow-none'}>
                <CardHeader className={'pb-2'}>
                    <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                        {CHAT_SIDEBAR_INSIGHTS_TITLE}
                    </CardTitle>
                    <p className={'text-xs text-muted-foreground'}>
                        {CHAT_SIDEBAR_INSIGHTS_TIMEFRAME}
                    </p>
                </CardHeader>
                <CardContent className={'space-y-4'}>
                    {/* Insight 1 */}
                    <div className={'flex gap-3'}>
                        <div className={'flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100'}>
                            <TrendingUp className={'size-4 text-amber-600'}/>
                        </div>
                        <div>
                            <p className={'text-xs font-medium uppercase text-amber-600'}>
                                {CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL}
                            </p>
                            <p className={'text-sm font-semibold text-foreground'}>
                                {CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE}
                            </p>
                            <p className={'text-xs text-muted-foreground'}>
                                {CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION}
                            </p>
                        </div>
                    </div>

                    {/* Insight 2 */}
                    <div className={'flex gap-3'}>
                        <div className={'flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100'}>
                            <Moon className={'size-4 text-primary'}/>
                        </div>
                        <div>
                            <p className={'text-xs font-medium uppercase text-primary'}>
                                {CHAT_SIDEBAR_SLEEP_QUALITY_LABEL}
                            </p>
                            <p className={'text-sm font-semibold text-foreground'}>
                                {CHAT_SIDEBAR_SLEEP_QUALITY_TITLE}
                            </p>
                            <p className={'text-xs text-muted-foreground'}>
                                {CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Next Milestone */}
            <Card className={'border-0 bg-primary text-white shadow-none'}>
                <CardContent className={'pt-6'}>
                    <p className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
                        {CHAT_SIDEBAR_NEXT_MILESTONE_LABEL}
                    </p>
                    <h3 className={'mt-1 text-lg font-semibold'}>
                        {CHAT_SIDEBAR_NEXT_MILESTONE_TITLE}
                    </h3>
                    <Badge className={'mt-2 border-0 bg-white/20 text-white'}>
                        {CHAT_SIDEBAR_NEXT_MILESTONE_BADGE}
                    </Badge>
                    <Progress value={87} className={'mt-4 h-2 bg-white/20'}/>
                </CardContent>
            </Card>

            {/* Quote */}
            <div className={'rounded-xl bg-surface-section p-4'}>
                <Quote className={'size-6 text-muted-foreground'}/>
                <p className={'mt-2 text-sm italic text-foreground'}>
                    {`"${CHAT_SIDEBAR_QUOTE}"`}
                </p>
                <p className={'mt-2 text-xs text-muted-foreground'}>
                    {'- '}
                    {CHAT_SIDEBAR_QUOTE_AUTHOR}
                </p>
            </div>
        </div>
    </aside>
)

export {ChatPanel}
