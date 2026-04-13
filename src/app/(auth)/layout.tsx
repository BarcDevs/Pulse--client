import Link from 'next/link'

import { LayoutProps } from '@/types'

const AuthLayout = ({ children }: LayoutProps) => (
    <div className={'flex min-h-screen flex-col bg-linear-to-br from-surface-page via-primary-light/30 to-accent-light/20'}>
        <header className={'flex-center-between p-4 md:p-6'}>
            <Link
                href={'/'}
                className={'text-xl font-semibold text-primary'}
            >
                HealEase
            </Link>
            <nav
                className={'flex items-center gap-4 text-sm'}
            >
                <Link
                    href={'/help'}
                    className={'text-muted-foreground hover:text-foreground'}
                >
                    Help
                </Link>
                <Link
                    href={'/about'}
                    className={'text-muted-foreground hover:text-foreground'}
                >
                    About
                </Link>
            </nav>
        </header>

        <main className={'flex--center flex-1 p-4'}>
            {children}
        </main>

        <footer className={'p-4 text-center text-xs text-muted-foreground'}>
            <p>2026 HEALEASE. ALL RIGHTS RESERVED.</p>
            <div className={'mt-2 flex--center gap-4'}>
                <Link
                    href={'/support'}
                    className={'hover:text-foreground'}
                >
                    SUPPORT
                </Link>
                <Link
                    href={'/privacy'}
                    className={'hover:text-foreground'}
                >
                    PRIVACY POLICY
                </Link>
                <Link
                    href={'/terms'}
                    className={'hover:text-foreground'}
                >
                    TERMS OF SERVICE
                </Link>
            </div>
        </footer>
    </div>
)

export default AuthLayout
