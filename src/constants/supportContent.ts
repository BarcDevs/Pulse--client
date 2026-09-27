import {
    Activity,
    Heart,
    type LucideIcon,
    MessageCircle,
    Phone,
    Shield,
    Sparkles,
    Target,
    Users
} from 'lucide-react'

import { supportLocales } from '@/locales/supportLocales'

type QuickHelpItem = {
    id: string
    icon: LucideIcon
    titleKey: string
    descKey: string
    actionKey: string
    textClass: string
    bgClass: string
}

type TopicItem = {
    id: string
    icon: LucideIcon
    titleKey: string
    descKey: string
    count: number
    textClass: string
    bgClass: string
    hoverClass: string
}

export const QUICK_HELP_ITEMS: QuickHelpItem[] = [
    {
        id: 'chat',
        icon: MessageCircle,
        titleKey: supportLocales.quickHelp.chat.title,
        descKey: supportLocales.quickHelp.chat.desc,
        actionKey: supportLocales.quickHelp.chat.action,
        textClass: 'text-primary',
        bgClass: 'bg-primary/10'
    },
    {
        id: 'careTeam',
        icon: Heart,
        titleKey: supportLocales.quickHelp.careTeam.title,
        descKey: supportLocales.quickHelp.careTeam.desc,
        actionKey: supportLocales.quickHelp.careTeam.action,
        textClass: 'text-pink-500',
        bgClass: 'bg-pink-500/10'
    },
    {
        id: 'crisis',
        icon: Phone,
        titleKey: supportLocales.quickHelp.crisis.title,
        descKey: supportLocales.quickHelp.crisis.desc,
        actionKey: supportLocales.quickHelp.crisis.action,
        textClass: 'text-destructive',
        bgClass: 'bg-destructive/10'
    }
]

export const TOPIC_ITEMS: TopicItem[] = [
    {
        id: 'gettingStarted',
        icon: Sparkles,
        titleKey: supportLocales.topics.gettingStarted.title,
        descKey: supportLocales.topics.gettingStarted.desc,
        count: 12,
        textClass: 'text-primary',
        bgClass: 'bg-primary-light',
        hoverClass: 'hover:border-primary hover:shadow-primary/15'
    },
    {
        id: 'tracking',
        icon: Activity,
        titleKey: supportLocales.topics.tracking.title,
        descKey: supportLocales.topics.tracking.desc,
        count: 18,
        textClass: 'text-accent-ai',
        bgClass: 'bg-accent-ai-light',
        hoverClass: 'hover:border-accent-ai hover:shadow-accent-ai/15'
    },
    {
        id: 'goals',
        icon: Target,
        titleKey: supportLocales.topics.goals.title,
        descKey: supportLocales.topics.goals.desc,
        count: 9,
        textClass: 'text-secondary',
        bgClass: 'bg-secondary-light',
        hoverClass: 'hover:border-secondary hover:shadow-secondary/15'
    },
    {
        id: 'community',
        icon: Users,
        titleKey: supportLocales.topics.community.title,
        descKey: supportLocales.topics.community.desc,
        count: 14,
        textClass: 'text-fuchsia-700',
        bgClass: 'bg-fuchsia-100',
        hoverClass: 'hover:border-fuchsia-700 hover:shadow-fuchsia-700/15'
    },
    {
        id: 'careTeam',
        icon: Heart,
        titleKey: supportLocales.topics.careTeam.title,
        descKey: supportLocales.topics.careTeam.desc,
        count: 7,
        textClass: 'text-pink-500',
        bgClass: 'bg-pink-100',
        hoverClass: 'hover:border-pink-500 hover:shadow-pink-500/15'
    },
    {
        id: 'privacy',
        icon: Shield,
        titleKey: supportLocales.topics.privacy.title,
        descKey: supportLocales.topics.privacy.desc,
        count: 11,
        textClass: 'text-sky-500',
        bgClass: 'bg-sky-100',
        hoverClass: 'hover:border-sky-500 hover:shadow-sky-500/15'
    }
]
