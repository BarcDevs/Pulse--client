import { type TranslatorFn } from '@/types/i18n'

const messages: Record<string, string> = {
    'validation.email.required': 'Email is required',
    'validation.email.invalid': 'Invalid email',
    'validation.password.required': 'Password is required',
    'validation.password.current.required': 'Current password is required',
    'validation.password.new.required': 'New password is required',
    'validation.password.confirm.required': 'Confirm password is required',
    'validation.password.confirm.please': 'Please confirm your password',
    'validation.password.noMatch': 'Passwords do not match',
    'validation.password.tooShort': 'Password must be at least {min} characters',
    'validation.password.format':
        'Password must be at least 8 characters and contain letters and numbers.',
    'validation.otp.required': 'OTP is required',
    'validation.otp.tooShort': 'OTP is too short',
    'validation.otp.invalid': 'Invalid OTP',
    'validation.name.firstName.required': 'First name is required',
    'validation.name.firstName.empty': 'First name cannot be empty',
    'validation.name.firstName.tooLong': 'First name must be at most {max} characters',
    'validation.name.lastName.required': 'Last name is required',
    'validation.name.lastName.empty': 'Last name cannot be empty',
    'validation.name.lastName.tooLong': 'Last name must be at most {max} characters',
    'validation.name.location.tooLong': 'Location must be at most {max} characters',
    'validation.post.category.required': 'Category is required',
    'validation.post.category.invalid': 'Category is invalid',
    'validation.post.title.required': 'Title is required',
    'validation.post.title.tooShort': 'Title is too short',
    'validation.post.title.tooLong': 'Title is too long',
    'validation.post.content.required': 'Content is required',
    'validation.post.content.tooShort': 'Content is too short',
    'validation.post.content.tooShortMin':
        'Content is too short (minimum {min} characters)',
    'validation.post.content.tooLong': 'Content must be less than {max} characters',
    'validation.post.tag.tooShort': 'Tag is too short',
    'validation.post.tag.tooLong': 'Tag is too long',
    'validation.post.tag.required': 'At least one tag is required',
    'validation.post.tag.tooMany': 'Cannot have more than {max} tags',
    'validation.checkIn.activity.empty': 'Activity cannot be empty',
    'validation.checkIn.activity.tooLong': 'Activity must be under {max} characters',
    'validation.checkIn.activity.required': 'At least one activity is required',
    'validation.checkIn.notes.tooLong': 'Notes must be under {max} characters',
    'validation.goal.title.required': 'Goal title is required',
    'validation.goal.title.tooLong': 'Goal title must be {max} characters or less',
    'validation.goal.description.tooLong': 'Description must be {max} characters or less',
    'validation.goal.targetDate.future': 'Target date must be in the future',
    'validation.milestone.title.required': 'Milestone title is required',
    'validation.milestone.title.tooLong':
        'Milestone title must be {max} characters or less',
    'validation.milestone.description.tooLong':
        'Description must be {max} characters or less',
    'validation.profile.bio.tooLong': 'Bio must be at most {max} characters'
}

export const mockLocales: TranslatorFn = (key, values) => {
    let msg = messages[key] ?? key
    if (values) {
        for (const [k, v] of Object.entries(values)) {
            msg = msg.replace(`{${k}}`, String(v))
        }
    }
    return msg
}
