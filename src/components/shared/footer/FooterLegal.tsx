import Link from 'next/link'

import {FOOTER_LINKS} from '@/constants/componentData'
import {FOOTER_LEGAL_TITLE} from '@/constants/footerTexts'

export const FooterLegal = () => (
    <div>
        <h3 className={'font-semibold mb-4'}>
            {FOOTER_LEGAL_TITLE}
        </h3>
        <ul className={'space-y-2'}>
            {FOOTER_LINKS.legal.map(link => (
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
