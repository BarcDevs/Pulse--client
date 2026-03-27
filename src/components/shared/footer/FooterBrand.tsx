import {FOOTER_BRAND_TAGLINE} from '@/constants/footerTexts'

import {Logo} from '../Logo'

export const FooterBrand = () => (
    <div>
        <Logo />
        <p className={'text-sm text-muted-foreground mt-4'}>
            {FOOTER_BRAND_TAGLINE}
        </p>
    </div>
)
