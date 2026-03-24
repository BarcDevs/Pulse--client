'use client'

import {cn} from '@/lib/utils'

import {PROFILE_RECOVERY_IDENTITY_FOCUS_AREAS_WITH_ICONS}
    from '@/constants/profileMaps'
import {
    PROFILE_RECOVERY_IDENTITY_QUOTE,
    PROFILE_RECOVERY_IDENTITY_SUBTITLE,
    PROFILE_RECOVERY_IDENTITY_TITLE
} from '@/constants/profileTexts'

export const RecoveryIdentity = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <h3 className={'text-lg font-semibold text-foreground mb-2'}>{PROFILE_RECOVERY_IDENTITY_TITLE}</h3>
        <p className={'text-sm text-muted-foreground mb-6'}>{PROFILE_RECOVERY_IDENTITY_SUBTITLE}</p>

        <div className={'flex flex-wrap gap-3 mb-6'}>
            {PROFILE_RECOVERY_IDENTITY_FOCUS_AREAS_WITH_ICONS
                .map((area) => (
                    <div
                        key={area.label}
                        className={cn(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                            area.color
                        )}
                    >
                        <area.icon className={'h-4 w-4'}/>
                        <span className={'text-sm font-medium'}>
                            {area.label}
                        </span>
                    </div>
                ))}
        </div>

        <div className={'bg-surface-section rounded-xl p-4'}>
            <p className={'text-sm text-muted-foreground italic leading-relaxed'}>
                &quot;{PROFILE_RECOVERY_IDENTITY_QUOTE}&quot;
            </p>
        </div>
    </div>
)
