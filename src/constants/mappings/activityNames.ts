type ActivityNames = {
    en: string
    he: string
}

const activityNames: Record<string, ActivityNames> = {
    'walking':     { en: 'Walking',              he: 'הליכה' },
    'exercise':    { en: 'Exercise',             he: 'פעילות גופנית' },
    'stretching':  { en: 'Stretching',           he: 'מתיחות' },
    'therapy':     { en: 'Therapy Session',      he: 'טיפול' },
    'work':        { en: 'Work',                 he: 'עבודה' },
    'study':       { en: 'Study',                he: 'לימודים' },
    'household':   { en: 'Household Tasks',      he: 'עבודות בית' },
    'socializing': { en: 'Socializing',          he: 'חברות' },
    'rest':        { en: 'Rest',                 he: 'מנוחה' },
    'hobbies':     { en: 'Hobbies',              he: 'תחביבים' },
    'outdoors':    { en: 'Time Outdoors',        he: 'זמן בחוץ' },
    'mindfulness': { en: 'Mindfulness',          he: 'מיינדפולנס' },
    'meditation':  { en: 'Meditation',           he: 'מדיטציה' },
    'yoga':        { en: 'Yoga',                 he: 'יוגה' },
    'self-care':   { en: 'Self Care',            he: 'טיפוח עצמי' },
    'medical':     { en: 'Medical Appointment',  he: 'תור רפואי' }
}

export const activitySlugs = Object.keys(activityNames)

export const getActivityName = (
    slug: string,
    locale: string
): string => {
    const names = activityNames[slug]
    if (!names) return slug
    return locale === 'he-IL' ? names.he : names.en
}
