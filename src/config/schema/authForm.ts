import {
    otpPattern,
    passwordPattern,
    strongPasswordPattern
} from '@/config/regex'

export default {
    password: {
        minLength: 8,
        format: passwordPattern,
        strongFormat: strongPasswordPattern
    },
    otp: {
        length: 6,
        pattern: otpPattern
    }
}
