import {ERROR_PAGE} from '@/constants/errorMessages'

export const ErrorContent = () => (
    <div className={'space-y-4 max-w-2xl'}>
        <span className={'inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold tracking-widest uppercase'}>
            {ERROR_PAGE.badge}
        </span>
        <h1 className={'text-3xl md:text-4xl font-extrabold tracking-tight leading-tight'}>
            <span className={'text-primary-gradient-start dark:text-primary-gradient-start'}>
                {ERROR_PAGE.mainHeading}
            </span>
            <br/>
            <span className={'text-primary'}>
                {ERROR_PAGE.subHeading}
            </span>
        </h1>
        <p className={'text-sm md:text-base text-on-surface-variant font-body leading-relaxed px-2'}>
            {ERROR_PAGE.description}
        </p>
    </div>
)
