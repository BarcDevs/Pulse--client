import {
    otpPattern,
    passwordPattern,
    passwordSpecialCharPattern,
    strongPasswordPattern
} from '@/config/regex'

export default {
    password: {
        minLength: 8,
        format: passwordPattern,
        strongFormat: strongPasswordPattern,
        specialCharPattern: passwordSpecialCharPattern
    },
    otp: {
        length: 6,
        pattern: otpPattern
    }
}
