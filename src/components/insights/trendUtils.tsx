import {
    AlertCircle,
    CheckCircle,
    TrendingUp
} from 'lucide-react'

export const getTrendIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
        case 'trendy_up':
        case 'trendingup':
        case 'arrow_upward':
            return <TrendingUp className={'size-4'}/>
        case 'alertcircle':
        case 'priority_high':
            return <AlertCircle className={'size-4'}/>
        case 'checkcircle':
        case 'check_circle':
            return <CheckCircle className={'size-4'}/>
        default:
            return null
    }
}

export const parseTrendText = (trend: string) => {
    const iconNames = [
        'arrow_upward',
        'priority_high',
        'check_circle',
        'trending_up'
    ]
    let text = trend
    let iconName = ''

    for (const name of iconNames) {
        if (trend.includes(name)) {
            iconName = name
            text = trend
                .replace(name, '')
                .trim()
            break
        }
    }

    return {iconName, text}
}