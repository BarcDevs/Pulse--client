import { footer } from '@/constants/componentTexts/ui/footer'

import { Logo } from '../brand/Logo'

export const FooterBrand = () => (
    <div>
        <Logo/>
        <p className={'text-sm text-muted-foreground mt-4'}>
            {footer.brandTagline}
        </p>
    </div>
)
