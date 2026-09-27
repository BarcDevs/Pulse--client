import { ROUTES } from '@/constants/routes'
import { SUPPORT_CONTACT_ANCHOR } from '@/constants/support'

export const RICH_TEXT_LINKS: Record<string, string> = {
    privacy: ROUTES.PRIVACY,
    terms: ROUTES.TERMS,
    support: ROUTES.SUPPORT,
    contact: `${ROUTES.SUPPORT}#${SUPPORT_CONTACT_ANCHOR}`,
    settings: ROUTES.PROFILE_SETTINGS
}
