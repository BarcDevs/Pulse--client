import { Icon } from '@/components/shared/ui/Icon'

import { footer } from '@/constants/componentTexts/ui/footer'
import { socialMediaLinks }
    from '@/constants/socialConfig'

export const FooterSocial = () => (
    <div>
        <h3 className={'font-semibold mb-4'}>
            {footer.socialTitle}
        </h3>
        <div className={'flex gap-4'}>
            {socialMediaLinks.map(link => (
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
