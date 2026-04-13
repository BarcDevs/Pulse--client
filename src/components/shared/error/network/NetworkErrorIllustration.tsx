import { Icon } from '@/components/shared/ui/Icon'

export const NetworkErrorIllustration = () => (
    <div className={'relative mb-8 group'}>
        <div className={'absolute inset-0 bg-secondary/5 blur-3xl rounded-full scale-150 transition-transform duration-700 group-hover:scale-125'}/>
        <div className={'relative flex justify-center'}>
            <div className={'w-64 h-64 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-[0px_12px_32px_rgba(24,28,30,0.06)]'}>
                <Icon
                    name={'error/pulse-wave'}
                    size={192}
                />
            </div>
        </div>
    </div>
)