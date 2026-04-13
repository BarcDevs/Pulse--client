import Link from 'next/link'

import { footerNavigationLinks }
    from '@/constants/componentData'
import { footer } from '@/constants/componentTexts/ui/footer'

export const FooterLinks = () => (
    <div>
        <h3 className={'font-semibold mb-4'}>
            {footer.quickLinksTitle}
        </h3>
        <ul className={'space-y-2'}>
            {footerNavigationLinks.quick.map(link => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={'text-sm text-muted-foreground hover:text-foreground transition-colors'}
                    >
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)
