export const basicInfoFormConfig = {
    name: { max: 100 },
    location: { max: 100 },
    username: {
        min: 3,
        max: 30,
        pattern: /^[a-zA-Z0-9_]+$/
    }
} as const
