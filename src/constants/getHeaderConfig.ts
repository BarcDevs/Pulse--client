import {headerPageConfigs} from '@/constants/headerPageConfigs'

export const getHeaderConfig = (pathname: string) => {
    return headerPageConfigs[pathname] ||
        { title: 'Dashboard' }
}
