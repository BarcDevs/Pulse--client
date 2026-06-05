export const checkInFormSchema = {
    moodScore: {
        min: 1,
        max: 10
    },
    painLevel: {
        min: 1,
        max: 10
    },
    activities: {
        minCount: 0,
        minLength: 1,
        maxLength: 100
    },
    notes: {
        maxLength: 500
    }
}