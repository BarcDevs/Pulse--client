'use client'

import Link from 'next/link'

import { Home } from 'lucide-react'

import Icon from '@/components/shared/ui/Icon'

const NotFoundPage = () => {
    const handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back()
        }
    }

    return (
        <main
            className={
                'flex-grow flex flex-col items-center justify-center ' +
                'relative px-6 py-20 bg-soft-gradient'
            }
        >
            <div
                className={
                    'absolute top-1/4 -left-20 w-96 h-96 ' +
                    'bg-primary/5 rounded-full blur-3xl'
                }
            />
            <div
                className={
                    'absolute bottom-1/4 -right-20 w-80 h-80 ' +
                    'bg-secondary/5 rounded-full blur-3xl'
                }
            />

            <div
                className={
                    'max-w-4xl w-full flex flex-col md:flex-row ' +
                    'items-center gap-12 relative z-10'
                }
            >
                <div
                    className={
                        'w-full md:w-1/2 flex justify-center md:justify-end ' +
                        'order-1 md:order-2'
                    }
                >
                    <div className='relative'>
                        <div
                            className={
                                'w-64 h-64 md:w-80 md:h-80 rounded-full ' +
                                'bg-white shadow-2xl flex items-center ' +
                                'justify-center p-8 border border-white/50'
                            }
                        >
                            <div
                                className={
                                    'absolute inset-0 rounded-full border-2 ' +
                                    'border-dashed border-primary/20 ' +
                                    'animate-[spin_20s_linear_infinite]'
                                }
                            />
                            <div className='absolute opacity-20'>
                                <Icon
                                    name='error/explore'
                                    size={128}
                                />
                            </div>
                            <img
                                alt='Calm natural scenery'
                                className={
                                    'w-full h-full object-cover rounded-full ' +
                                    'shadow-inner opacity-90'
                                }
                                src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
                            />
                        </div>
                        <div
                            className={
                                'absolute -bottom-4 -left-4 ' +
                                'bg-white/70 backdrop-blur-xl px-6 py-3 ' +
                                'rounded-xl shadow-lg border border-white/40'
                            }
                        >
                            <span
                                className={
                                    'font-headline font-extrabold text-4xl ' +
                                    'text-primary tracking-tighter'
                                }
                            >
                                404
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        'w-full md:w-1/2 text-center md:text-left ' +
                        'order-2 md:order-1'
                    }
                >
                    <div
                        className={
                            'inline-flex items-center gap-2 px-3 py-1 ' +
                            'rounded-full bg-primary-fixed ' +
                            'text-on-primary-fixed-variant text-xs ' +
                            'font-semibold tracking-wider mb-6'
                        }
                    >
                        <Icon
                            name='error/map'
                            size={16}
                        />
                        COMPASS LOST
                    </div>

                    <h1
                        className={
                            'font-headline text-4xl md:text-6xl font-extrabold ' +
                            'text-on-surface mb-6 leading-tight tracking-tight'
                        }
                    >
                        This path seems to have
                        {' '}
                        <span className='text-primary italic'>
                            wandered off...
                        </span>
                    </h1>

                    <p
                        className={
                            'font-body text-on-surface-variant ' +
                            'text-lg md:text-xl max-w-md mb-10 leading-relaxed'
                        }
                    >
                        Recovery is a journey of many trails. Sometimes
                        we take a turn that leads to a quiet clearing.
                        Let's guide you back to your sanctuary.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <Link
                            href='/dashboard'
                            className={
                                'group relative inline-flex items-center ' +
                                'justify-center gap-3 ' +
                                'bg-gradient-to-r from-primary ' +
                                'to-blue-700 text-white ' +
                                'px-8 py-4 rounded-xl font-headline font-bold ' +
                                'shadow-lg shadow-primary/20 ' +
                                'hover:shadow-primary/40 ' +
                                'transition-all duration-300 active:scale-95'
                            }
                        >
                            <Home className='w-5 h-5' />
                            Return to Dashboard
                        </Link>
                        <button
                            onClick={handleGoBack}
                            className={
                                'inline-flex items-center justify-center gap-2 ' +
                                'text-primary font-headline font-bold ' +
                                'px-6 py-4 hover:bg-primary/5 rounded-xl ' +
                                'transition-all'
                            }
                        >
                            <Icon
                                name='error/arrow-back'
                                size={20}
                            />
                            Previous Page
                        </button>
                    </div>

                    <div
                        className={
                            'mt-16 grid grid-cols-2 gap-6 opacity-60'
                        }
                    >
                        <div className='flex flex-col gap-1'>
                            <span
                                className={
                                    'text-[10px] uppercase font-bold ' +
                                    'tracking-widest text-outline'
                                }
                            >
                                Resource Center
                            </span>
                            <Link
                                href='/check-in'
                                className='text-sm font-semibold hover:text-primary transition-colors'
                            >
                                Daily Journal
                            </Link>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span
                                className={
                                    'text-[10px] uppercase font-bold ' +
                                    'tracking-widest text-outline'
                                }
                            >
                                Support Hub
                            </span>
                            <Link
                                href='/community'
                                className='text-sm font-semibold hover:text-primary transition-colors'
                            >
                                Group Meetings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NotFoundPage
