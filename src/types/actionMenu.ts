import { LucideIcon } from 'lucide-react'

export type AdditionalAction = {
    id: string
    label: string
    icon: LucideIcon
    action: () => Promise<void>
    destructive?: boolean
    requiresConfirmation?: boolean
    confirmTitle?: string
    confirmDescription?: string
}
