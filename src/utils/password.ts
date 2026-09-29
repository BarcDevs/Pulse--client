const SIMPLE_RUN_LENGTH = 4

/** True if the password has 4+ repeated (aaaa, 1111) or sequential
 * (abcd, 4321) characters in a row. Mirrors the server rule. */
export const hasSimpleRun = (password: string): boolean => {
    const chars = password.toLowerCase()

    for (let i = 0; i + SIMPLE_RUN_LENGTH <= chars.length; i++) {
        const run = chars.slice(i, i + SIMPLE_RUN_LENGTH)

        if (/^(.)\1+$/.test(run)) return true
        if (!/^([a-z]+|\d+)$/.test(run)) continue

        const steps = [...run]
            .slice(1)
            .map((char, j) => char.charCodeAt(0) - run.charCodeAt(j))

        if (steps.every((step) => step === 1)) return true
        if (steps.every((step) => step === -1)) return true
    }

    return false
}
