import { Icon } from '@/components/shared/ui/Icon'

export const ErrorIllustration = () => (
    <div className={'relative mb-8'}>
        <div className={'absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-150'}/>
        <div className={'relative flex items-center justify-center'}>
            <div className={'w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-3 border border-outline-variant/10'}>
                <Icon
                    name={'error/shield'}
                    size={64}
               />
            </div>
            <div className={'absolute -bottom-2 -right-2 w-12 h-12 md:w-16 md:h-16 bg-secondary-fixed text-on-secondary-fixed rounded-2xl shadow-lg flex items-center justify-center transform rotate-6'}>
                <Icon
                    name={'error/tools'}
                    size={32}
               />
            </div>
        </div>
    </div>
)
