import Link from 'next/link'

import { footer } from '@/constants/componentTexts/ui/footer'
import { footerLinks } from '@/constants/config/navigation'

export const FooterLegal = () => (
    <div>
        <h3 className={'font-semibold mb-4'}>
            {footer.legalTitle}
        </h3>
        <ul className={'space-y-2'}>
            {footerLinks.legal.map(link => (
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
