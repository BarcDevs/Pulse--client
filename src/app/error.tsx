'use client'

import { useRouter } from 'next/navigation'

import { RotateCcw } from 'lucide-react'

import Icon from '@/components/shared/ui/Icon'

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({
    error,
    reset
}: ErrorProps) => {
    const router = useRouter()
    const isDev = process.env.NODE_ENV === 'development'

    const handleContactSupport = () => {
        router.push('/contact-support')
    }

    return (
        <div
            className={
                'flex-1 flex flex-col items-center justify-center ' +
                'px-4 py-8 md:py-16 max-w-3xl mx-auto w-full text-center'
            }
        >
            <div className='relative mb-8'>
                <div
                    className={
                        'absolute inset-0 bg-primary/5 rounded-full ' +
                        'blur-3xl transform scale-150'
                    }
                />
                <div className='relative flex items-center justify-center'>
                    <div
                        className={
                            'w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 ' +
                            'rounded-3xl shadow-xl flex items-center justify-center ' +
                            'transform -rotate-3 border border-outline-variant/10'
                        }
                    >
                        <Icon
                            name='error/shield'
                            size={64}
                        />
                    </div>
                    <div
                        className={
                            'absolute -bottom-2 -right-2 w-12 h-12 md:w-16 md:h-16 ' +
                            'bg-secondary-container text-on-secondary-container ' +
                            'rounded-2xl shadow-lg flex items-center justify-center ' +
                            'transform rotate-6'
                        }
                    >
                        <Icon
                            name='error/tools'
                            size={32}
                        />
                    </div>
                </div>
            </div>

            <div className='space-y-4 max-w-2xl'>
                <span
                    className={
                        'inline-flex items-center px-3 py-1 rounded-full ' +
                        'bg-error-container text-on-error-container ' +
                        'text-xs font-bold tracking-widest uppercase'
                    }
                >
                    Error 500
                </span>
                <h1
                    className={
                        'text-3xl md:text-4xl font-extrabold ' +
                        'text-blue-900 dark:text-blue-50 ' +
                        'tracking-tight leading-tight'
                    }
                >
                    Deep breaths.
                    <br />
                    <span className='text-primary'>
                        We're adjusting things.
                    </span>
                </h1>
                <p
                    className={
                        'text-sm md:text-base text-on-surface-variant font-body ' +
                        'leading-relaxed px-2'
                    }
                >
                    Something went wrong on our end, but we're working
                    on it. Your progress is safe—this is just a
                    momentary pause in our system.
                </p>
            </div>

            <div
                className={
                    'mt-8 flex flex-col sm:flex-row items-center gap-3 ' +
                    'w-full justify-center'
                }
            >
                <button
                    onClick={reset}
                    className={
                        'w-full sm:w-auto px-8 py-3 ' +
                        'bg-gradient-to-br from-primary to-blue-700 ' +
                        'text-white rounded-xl font-bold ' +
                        'flex items-center justify-center gap-2 ' +
                        'hover:shadow-lg hover:shadow-primary/20 ' +
                        'transition-all active:scale-95 duration-150 group text-sm'
                    }
                >
                    <RotateCcw
                        className='w-4 h-4 group-hover:rotate-180 transition-transform duration-500'
                    />
                    Try Refreshing
                </button>
                <button
                    onClick={handleContactSupport}
                    className={
                        'w-full sm:w-auto px-8 py-3 ' +
                        'bg-surface-container-low text-primary rounded-xl ' +
                        'font-bold flex items-center justify-center gap-2 ' +
                        'hover:bg-surface-container-high transition-all ' +
                        'active:scale-95 duration-150 text-sm'
                    }
                >
                    <Icon
                        name='error/support-agent'
                        size={20}
                    />
                    Contact Support
                </button>
            </div>

            <div className='mt-10 text-slate-400 text-xs'>
                <p>
                    If you're in immediate crisis, please call our
                    24/7 hotline at
                    {' '}
                    <span
                        className={
                            'text-blue-700 dark:text-blue-400 font-semibold ' +
                            'underline underline-offset-2 decoration-blue-200'
                        }
                    >
                        1-800-HEAL-NOW
                    </span>
                </p>
            </div>

            <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left'>
                <div
                    className={
                        'p-6 bg-surface-container-low rounded-xl ' +
                        'border border-outline-variant/5'
                    }
                >
                    <div className='mb-3'>
                        <Icon
                            name='error/clinical-notes'
                            size={24}
                        />
                    </div>
                    <h4 className='font-bold text-blue-900 mb-1'>
                        Journal Saved
                    </h4>
                    <p className='text-xs text-on-surface-variant'>
                        Your last entry was automatically synced 4
                        minutes ago.
                    </p>
                </div>
                <div
                    className={
                        'p-6 bg-surface-container-low rounded-xl ' +
                        'border border-outline-variant/5'
                    }
                >
                    <div className='mb-3'>
                        <Icon
                            name='error/cloud-done'
                            size={24}
                        />
                    </div>
                    <h4 className='font-bold text-blue-900 mb-1'>
                        System Health
                    </h4>
                    <p className='text-xs text-on-surface-variant'>
                        Most services are operational. We're isolating
                        this hiccup.
                    </p>
                </div>
                <div
                    className={
                        'p-6 bg-surface-container-low rounded-xl ' +
                        'border border-outline-variant/5'
                    }
                >
                    <div className='mb-3'>
                        <Icon
                            name='error/history'
                            size={24}
                        />
                    </div>
                    <h4 className='font-bold text-blue-900 mb-1'>
                        Auto-Recovery
                    </h4>
                    <p className='text-xs text-on-surface-variant'>
                        Our team has been notified and is fixing this
                        as you read this.
                    </p>
                </div>
            </div>

            {isDev && error?.message && (
                <div
                    className={
                        'mt-16 p-4 bg-destructive/10 border border-destructive/20 ' +
                        'rounded-lg text-left max-w-2xl'
                    }
                >
                    <p className='text-xs text-destructive font-mono'>
                        {error.message}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ErrorPage
