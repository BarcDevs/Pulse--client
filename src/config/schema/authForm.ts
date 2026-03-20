import {
    OTP_PATTERN,
    PASSWORD_PATTERN
} from '@/config/regex'

export default {
    password: {
        minLength: 8,
        format: PASSWORD_PATTERN,
        formatMessage: 'Password must be at least 8 characters and contain letters and numbers.'
    },
    otp: {
        length: 6,
        pattern: OTP_PATTERN
    }
}
