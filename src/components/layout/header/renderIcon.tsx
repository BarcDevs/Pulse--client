import {
    Download,
    Plus,
    Share2
} from 'lucide-react'
import type { ReactNode } from 'react'

export const renderIcon = (
    icon: 'plus' | 'download' | 'share2' | undefined
): ReactNode => {
    const iconStyle = 'mr-2 h-4 w-4'

    switch (icon) {
        case 'plus':
            return <Plus className={iconStyle}/>
        case 'download':
            return <Download className={iconStyle}/>
        case 'share2':
            return <Share2 className={iconStyle}/>
        default:
            return null
    }
}