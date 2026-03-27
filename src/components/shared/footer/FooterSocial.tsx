import {Icon} from '@/components/shared/ui/Icon'

import {FOOTER_SOCIAL_TITLE} from '@/constants/footerTexts'
import {SOCIAL_LINKS} from '@/constants/socialConfig'

export const FooterSocial = () => (
    <div>
        <h3 className={'font-semibold mb-4'}>
            {FOOTER_SOCIAL_TITLE}
        </h3>
        <div className={'flex gap-4'}>
            {SOCIAL_LINKS.map(link => (
                <a
                    key={link.href}
                    href={link.href}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    className={
                        'inline-flex transition-transform hover:scale-110 active:scale-95'
                    }
                    aria-label={link.title}
                >
                    <Icon
                        name={link.icon}
                        size={24}
                    />
                </a>
            ))}
        </div>
    </div>
)
