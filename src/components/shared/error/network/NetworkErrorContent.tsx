import { networkErrorPageTexts } from '@/constants/componentTexts/ui/errors'

export const NetworkErrorContent = () => (
    <div className={'space-y-6'}>
        <h1 className={'font-headline text-5xl md:text-6xl font-extrabold text-foreground tracking-tight'}>
            {networkErrorPageTexts.title}
        </h1>
        <p className={'text-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto'}>
            {networkErrorPageTexts.description}
        </p>
    </div>
)