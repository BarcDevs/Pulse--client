import { headerPageConfigs }
    from '@/constants/config/headerPageConfigs'

export const getHeaderConfig = (pathname: string) => {
    return headerPageConfigs[pathname]
        || { title: 'Dashboard' }
}
