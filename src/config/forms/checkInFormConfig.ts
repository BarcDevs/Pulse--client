import type {FormConfig} from '@/types/forms'

import {checkInFormSchema} from '@/config/schema/checkInForm'

const checkInFormConfig: FormConfig = {
    fields: {
        moodScore: {
            type: 'slider',
            label: 'Mood',
            min: checkInFormSchema.moodScore.min,
            max: checkInFormSchema.moodScore.max,
            step: 1,
            required: true
        },
        painLevel: {
            type: 'slider',
            label: 'Pain Level',
            min: checkInFormSchema.painLevel.min,
            max: checkInFormSchema.painLevel.max,
            step: 1,
            required: true
        },
        notes: {
            type: 'textarea',
            label: 'Notes',
            placeholder: 'How are you feeling today?',
            maxLength: checkInFormSchema.notes.maxLength,
            rows: 4,
            required: false
        }
    },
    buttons: {
        primary: {
            label: 'Save Check-in',
            loadingLabel: 'Saving...'
        }
    }
}

export default checkInFormConfig
