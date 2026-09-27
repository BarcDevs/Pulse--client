import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'
import type { SupportSchema } from '@/validations/forms/supportSchema'

export const sendSupportMessage = async (
    data: SupportSchema
): Promise<void> => {
    await api.post(
        ENDPOINTS.support.contact,
        data
    )
}
