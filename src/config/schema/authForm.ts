import {
    otpPattern,
    passwordPattern,
    passwordSpecialCharPattern
} from '@/config/regex'

export default {
    password: {
        minLength: 8,
        format: passwordPattern,
        specialCharPattern: passwordSpecialCharPattern,
        formatMessage: 'Password must be at least 8 characters and contain letters and numbers.'
    },
    otp: {
        length: 6,
        pattern: otpPattern
    }
}
