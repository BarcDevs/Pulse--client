export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
// New passwords only; login and current-password checks keep the loose rule
export const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/
export const passwordSpecialCharPattern = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/
export const otpPattern = /^\d+$/
