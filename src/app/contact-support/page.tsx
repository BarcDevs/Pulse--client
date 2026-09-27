import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import {
    SUPPORT_CONTACT_ANCHOR
} from '@/constants/support'

const ContactSupportPage = () => redirect(`${ROUTES.SUPPORT}#${SUPPORT_CONTACT_ANCHOR}`)

export default ContactSupportPage
