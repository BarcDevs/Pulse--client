import { LANDING_FEATURES } from '@/constants/landing/landingFeatures'

import { FeatureCard } from './FeatureCard'

export const FeatureCards = () => (
    <div className={'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'}>
        {LANDING_FEATURES.map(feature => (
            <FeatureCard
                key={feature.titleKey}
                icon={feature.icon}
                titleKey={feature.titleKey}
                descKey={feature.descKey}
                iconClassName={feature.iconClassName}
            />
        ))}
    </div>
)
