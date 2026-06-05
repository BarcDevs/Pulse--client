import {
    otpPattern,
    passwordPattern,
    passwordSpecialCharPattern
} from '@/config/regex'

export default {
    password: {
        minLength: 8,
        format: passwordPattern,
        specialCharPattern: passwordSpecialCharPattern
    },
    otp: {
        length: 6,
        pattern: otpPattern
    }
}
