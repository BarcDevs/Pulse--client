type InterestNames = {
    en: string
    he: string
    category: string
}

export const categoryOrder = [
    'physical-recovery',
    'wellness',
    'mental-emotional',
    'community-support'
]

const healthInterestNames: Record<string, InterestNames> = {
    'rehabilitation': {
        en: 'Rehabilitation',
        he: 'שיקום',
        category: 'physical-recovery'
    },
    'physical-therapy': {
        en: 'Physical Therapy',
        he: 'פיזיותרפיה',
        category: 'physical-recovery'
    },
    'occupational-therapy': {
        en: 'Occupational Therapy',
        he: 'ריפוי בעיסוק',
        category: 'physical-recovery'
    },
    'mobility': {
        en: 'Mobility',
        he: 'ניידות ותנועה',
        category: 'physical-recovery'
    },
    'injury-recovery': {
        en: 'Injury Recovery',
        he: 'החלמה מפציעה',
        category: 'physical-recovery'
    },
    'surgery-recovery': {
        en: 'Surgery Recovery',
        he: 'החלמה מניתוח',
        category: 'physical-recovery'
    },
    'chronic-pain': {
        en: 'Chronic Pain',
        he: 'כאב כרוני',
        category: 'physical-recovery'
    },
    'pain-management': {
        en: 'Pain Management',
        he: 'התמודדות עם כאב',
        category: 'physical-recovery'
    },
    'neurological-recovery': {
        en: 'Neurological Recovery',
        he: 'שיקום נוירולוגי',
        category: 'physical-recovery'
    },
    'strength-building': {
        en: 'Strength Building',
        he: 'חיזוק הגוף',
        category: 'physical-recovery'
    },
    'nutrition': {
        en: 'Nutrition',
        he: 'תזונה',
        category: 'wellness'
    },
    'sleep': {
        en: 'Sleep & Rest',
        he: 'שינה ומנוחה',
        category: 'wellness'
    },
    'healthy-habits': {
        en: 'Healthy Habits',
        he: 'הרגלים בריאים',
        category: 'wellness'
    },
    'fitness': {
        en: 'Physical Fitness',
        he: 'כושר גופני',
        category: 'wellness'
    },
    'self-care': {
        en: 'Self Care',
        he: 'טיפוח עצמי',
        category: 'wellness'
    },
    'mental-health': {
        en: 'Mental Health',
        he: 'בריאות נפשית',
        category: 'mental-emotional'
    },
    'emotional-wellbeing': {
        en: 'Emotional Wellbeing',
        he: 'רווחה רגשית',
        category: 'mental-emotional'
    },
    'stress-management': {
        en: 'Stress Management',
        he: 'התמודדות עם לחץ',
        category: 'mental-emotional'
    },
    'mindfulness': {
        en: 'Mindfulness',
        he: 'מיינדפולנס',
        category: 'mental-emotional'
    },
    'meditation': {
        en: 'Meditation',
        he: 'מדיטציה',
        category: 'mental-emotional'
    },
    'motivation': {
        en: 'Motivation',
        he: 'מוטיבציה',
        category: 'mental-emotional'
    },
    'peer-support': {
        en: 'Peer Support',
        he: 'תמיכת עמיתים',
        category: 'community-support'
    },
    'disability-support': {
        en: 'Disability Support',
        he: 'תמיכה במוגבלויות',
        category: 'community-support'
    },
    'goal-progress': {
        en: 'Goals & Progress',
        he: 'מטרות והתקדמות',
        category: 'community-support'
    }
}

export const healthInterestSlugs = Object.keys(healthInterestNames)

export const getInterestName = (
    slug: string,
    locale: string
): string => {
    const names = healthInterestNames[slug]
    if (!names) return slug
    return locale === 'he-IL' ? names.he : names.en
}

export const getInterestCategory = (slug: string): string | undefined =>
    healthInterestNames[slug]?.category
