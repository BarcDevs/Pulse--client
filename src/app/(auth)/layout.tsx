'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LayoutProps } from '@/types'

import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'

import { globalLocales } from '@/locales/globalLocales'

const AuthLayout = ({ children }: LayoutProps) => {
    const t = useTranslations()

    return (
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
                        {t(globalLocales.nav.help)}
                    </Link>
                    <Link
                        href={'/about'}
                        className={'text-muted-foreground hover:text-foreground'}
                    >
                        {t(globalLocales.nav.about)}
                    </Link>
                    <LanguageSwitcher/>
                </nav>
            </header>

            <main className={'flex--center flex-1 p-4'}>
                {children}
            </main>

            <footer className={'p-4 text-center text-xs text-muted-foreground'}>
                <p>{t(globalLocales.footer.copyright)}</p>
                <div className={'mt-2 flex--center gap-4'}>
                    <Link
                        href={'/support'}
                        className={'hover:text-foreground'}
                    >
                        {t(globalLocales.footer.support)}
                    </Link>
                    <Link
                        href={'/privacy'}
                        className={'hover:text-foreground'}
                    >
                        {t(globalLocales.footer.privacy)}
                    </Link>
                    <Link
                        href={'/terms'}
                        className={'hover:text-foreground'}
                    >
                        {t(globalLocales.footer.terms)}
                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default AuthLayout
