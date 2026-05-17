export const validationLocales = {
    email: {
        required: 'validation.email.required',
        invalid: 'validation.email.invalid'
    },
    password: {
        required: 'validation.password.required',
        current: {
            required: 'validation.password.current.required'
        },
        new: {
            required: 'validation.password.new.required'
        },
        confirm: {
            required: 'validation.password.confirm.required',
            please: 'validation.password.confirm.please'
        },
        noMatch: 'validation.password.noMatch',
        tooShort: 'validation.password.tooShort',
        format: 'validation.password.format'
    },
    otp: {
        required: 'validation.otp.required',
        tooShort: 'validation.otp.tooShort',
        invalid: 'validation.otp.invalid'
    },
    name: {
        firstName: {
            required: 'validation.name.firstName.required',
            empty: 'validation.name.firstName.empty',
            tooLong: 'validation.name.firstName.tooLong'
        },
        lastName: {
            required: 'validation.name.lastName.required',
            empty: 'validation.name.lastName.empty',
            tooLong: 'validation.name.lastName.tooLong'
        },
        location: {
            tooLong: 'validation.name.location.tooLong'
        }
    },
    post: {
        category: {
            required: 'validation.post.category.required',
            invalid: 'validation.post.category.invalid'
        },
        title: {
            required: 'validation.post.title.required',
            tooShort: 'validation.post.title.tooShort',
            tooLong: 'validation.post.title.tooLong'
        },
        content: {
            required: 'validation.post.content.required',
            tooShort: 'validation.post.content.tooShort',
            tooShortMin: 'validation.post.content.tooShortMin',
            tooLong: 'validation.post.content.tooLong'
        },
        tag: {
            tooShort: 'validation.post.tag.tooShort',
            tooLong: 'validation.post.tag.tooLong',
            required: 'validation.post.tag.required',
            tooMany: 'validation.post.tag.tooMany'
        }
    },
    checkIn: {
        activity: {
            empty: 'validation.checkIn.activity.empty',
            tooLong: 'validation.checkIn.activity.tooLong',
            required: 'validation.checkIn.activity.required'
        },
        notes: {
            tooLong: 'validation.checkIn.notes.tooLong'
        }
    },
    goal: {
        title: {
            required: 'validation.goal.title.required',
            tooLong: 'validation.goal.title.tooLong'
        },
        description: {
            tooLong: 'validation.goal.description.tooLong'
        },
        targetDate: {
            future: 'validation.goal.targetDate.future'
        }
    },
    milestone: {
        title: {
            required: 'validation.milestone.title.required',
            tooLong: 'validation.milestone.title.tooLong'
        },
        description: {
            tooLong: 'validation.milestone.description.tooLong'
        }
    },
    profile: {
        bio: {
            tooLong: 'validation.profile.bio.tooLong'
        }
    }
} as const
