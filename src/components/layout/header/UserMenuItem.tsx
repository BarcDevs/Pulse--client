import {useRouter} from 'next/navigation'

import {Button} from '@/components/ui/button'
import {DropdownMenuItem} from '@/components/ui/dropdown-menu'

import {bottomNavItems} from '@/constants/navigationItems'

import {logout} from '@/api/auth'

type UserMenuItemProps = {
    item: typeof bottomNavItems[0]
}

export const UserMenuItem = ({
    item
}: UserMenuItemProps) => {
    const router = useRouter()
    const isLogout = item.label === 'Logout'

    const handleClick = isLogout ?
        async () => {
            await logout()
            router.push('/login')
        }
        : () => router.push(item.href)

    return (
        <DropdownMenuItem
            key={item.href}
            asChild
        >
            <Button
                onClick={handleClick}
                className={'w-full flex justify-start px-2 py-1.5 text-sm cursor-pointer hover:bg-surface-section transition-colors'}
                variant={'ghost'}
            >
                <item.icon className={'mr-2 size-4'}/>
                <span>{item.label}</span>
            </Button>
        </DropdownMenuItem>
    )
}