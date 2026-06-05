export type TranslatorFn = (
    key: string,
    values?: Record<string, string | number>
) => string
