/** Drops the query string and fragment from a URL or path. Query strings can
 * carry what the user typed (location search) or other personal data */
export const stripQueryString = (url: string): string =>
    url.split(/[?#]/)[0]
