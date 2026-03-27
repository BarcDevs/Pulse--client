import {errorPageTexts} from '@/constants/componentTexts/ui/errors'

export const ErrorContent = () => (
    <div className={'space-y-4 max-w-2xl'}>
        <span className={'inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold tracking-widest uppercase'}>
            {errorPageTexts.badge}
        </span>
        <h1 className={'text-3xl md:text-4xl font-extrabold tracking-tight leading-tight'}>
            <span className={'text-primary-gradient-start dark:text-primary-gradient-start'}>
                {errorPageTexts.mainHeading}
            </span>
            <br/>
            <span className={'text-primary'}>
                {errorPageTexts.subHeading}
            </span>
        </h1>
        <p className={'text-sm md:text-base text-on-surface-variant font-body leading-relaxed px-2'}>
            {errorPageTexts.description}
        </p>
    </div>
)
