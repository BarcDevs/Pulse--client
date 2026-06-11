import { mainNavItems } from '@/constants/navigationItems'

export const MOBILE_NAV_ITEMS = [
    {
        ...mainNavItems[0],
        id: 'dashboard'
    },
    {
        ...mainNavItems[1],
        id: 'checkin'
    },
    {
        ...mainNavItems[2],
        id: 'progress'
    },
    {
        ...mainNavItems[5],
        id: 'community'
    },
    {
        ...mainNavItems[3],
        id: 'goals'
    }
]
