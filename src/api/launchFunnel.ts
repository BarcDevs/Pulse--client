import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'

export const recordLaunchOpen = async (
    token: string
): Promise<void> => {
    await api.post(
        ENDPOINTS.launchFunnel.open,
        { token }
    )
}
