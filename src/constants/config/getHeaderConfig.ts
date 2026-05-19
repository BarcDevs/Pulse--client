import { headerPageConfigs }
    from '@/constants/config/headerPageConfigs'

import { dashboardLocales }
    from '@/locales/dashboardLocales'

export const getHeaderConfig = (pathname: string) => {
    if (headerPageConfigs[pathname])
        return headerPageConfigs[pathname]

    const prefix = pathname.split('/')
        .slice(0, -1).join('/')
    return headerPageConfigs[prefix]
        || { title: dashboardLocales.title }
}
