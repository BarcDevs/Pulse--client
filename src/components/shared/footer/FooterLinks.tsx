import Link from 'next/link'

import {FOOTER_LINKS} from '@/constants/componentData'
import {FOOTER_QUICK_LINKS_TITLE} from '@/constants/footerTexts'

export const FooterLinks = () => (
    <div>
        <h3 className={'font-semibold mb-4'}>
            {FOOTER_QUICK_LINKS_TITLE}
        </h3>
        <ul className={'space-y-2'}>
            {FOOTER_LINKS.quick.map(link => (
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
