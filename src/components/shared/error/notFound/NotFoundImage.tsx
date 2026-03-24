import Image from 'next/image'

import Icon from '@/components/shared/ui/Icon'

export const NotFoundImage = () => (
    <div className={'w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2'}>
        <div className={'relative'}>
            <div className={'w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border border-white/50'}>
                <div className={'absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_20s_linear_infinite]'}/>
                <div className={'absolute opacity-20'}>
                    <Icon
                        name={'error/explore'}
                        size={128}
                    />
                </div>
                <Image
                    alt={'Calm natural scenery'}
                    className={'w-full h-full object-cover rounded-full shadow-inner opacity-90'}
                    src={'/assets/notFoundAnimation.webp'}
                    loading={'eager'}
                    width={320}
                    height={320}
                />
            </div>
            <div className={'absolute -bottom-4 -left-4 bg-white/70 backdrop-blur-xl px-6 py-3 rounded-xl shadow-lg border border-white/40'}>
                <span className={'font-headline font-extrabold text-4xl text-primary tracking-tighter'}>
                    404
                </span>
            </div>
        </div>
    </div>
)
