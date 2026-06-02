type InterestNames = {
    en: string
    he: string
}

const healthInterestNames: Record<string, InterestNames> = {
    'rehabilitation': { en: 'Rehabilitation', he: 'שיקום' },
    'physical-therapy': { en: 'Physical Therapy', he: 'פיזיותרפיה' },
    'occupational-therapy': { en: 'Occupational Therapy', he: 'ריפוי בעיסוק' },
    'mobility': { en: 'Mobility', he: 'ניידות ותנועה' },
    'injury-recovery': { en: 'Injury Recovery', he: 'החלמה מפציעה' },
    'surgery-recovery': { en: 'Surgery Recovery', he: 'החלמה מניתוח' },
    'chronic-pain': { en: 'Chronic Pain', he: 'כאב כרוני' },
    'pain-management': { en: 'Pain Management', he: 'ניהול כאב' },
    'neurological-recovery': { en: 'Neurological Recovery', he: 'שיקום נוירולוגי' },
    'strength-building': { en: 'Strength Building', he: 'בניית כוח' },
    'nutrition': { en: 'Nutrition', he: 'תזונה' },
    'sleep': { en: 'Sleep & Rest', he: 'שינה ומנוחה' },
    'healthy-habits': { en: 'Healthy Habits', he: 'הרגלים בריאים' },
    'fitness': { en: 'Physical Fitness', he: 'כושר גופני' },
    'self-care': { en: 'Self Care', he: 'טיפול עצמי' },
    'mental-health': { en: 'Mental Health', he: 'בריאות נפשית' },
    'emotional-wellbeing': { en: 'Emotional Wellbeing', he: 'רווחה רגשית' },
    'stress-management': { en: 'Stress Management', he: 'ניהול מתחים' },
    'mindfulness': { en: 'Mindfulness', he: 'מיינדפולנס' },
    'meditation': { en: 'Meditation', he: 'מדיטציה' },
    'motivation': { en: 'Motivation', he: 'מוטיבציה' },
    'peer-support': { en: 'Peer Support', he: 'תמיכת עמיתים' },
    'disability-support': { en: 'Disability Support', he: 'תמיכה במוגבלויות' },
    'goal-progress': { en: 'Goals & Progress', he: 'התקדמות ומטרות' }
}

export const getInterestName = (
    slug: string,
    locale: string
): string => {
    const names = healthInterestNames[slug]
    if (!names) return slug
    return locale === 'he-IL' ? names.he : names.en
}
