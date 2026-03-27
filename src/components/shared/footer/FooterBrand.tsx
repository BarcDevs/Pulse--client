import {footer} from '@/constants/componentTexts/ui/footer'

import {Logo} from '../Logo'

export const FooterBrand = () => (
    <div>
        <Logo/>
        <p className={'text-sm text-muted-foreground mt-4'}>
            {footer.brandTagline}
        </p>
    </div>
)
