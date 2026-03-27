import {FormConfig} from '@/types/forms'

import config from '@/config/schema/checkInForm'

const checkInFormConfig: FormConfig = {
    fields: {
        moodScore: {
            type: 'slider',
            label: 'Mood',
            min: config.moodScore.min,
            max: config.moodScore.max,
            step: 1,
            required: true
        },
        painLevel: {
            type: 'slider',
            label: 'Pain Level',
            min: config.painLevel.min,
            max: config.painLevel.max,
            step: 1,
            required: true
        },
        notes: {
            type: 'textarea',
            label: 'Notes',
            placeholder: 'How are you feeling today?',
            maxLength: config.notes.maxLength,
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
