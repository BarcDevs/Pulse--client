import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Generates and returns the initials of the user based on the first characters of the first and last name.
 *
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @return {string} The uppercase initials of the user.
 */
export const getUserFallback = (
    firstName: string,
    lastName: string
): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
        .toUpperCase()
}
