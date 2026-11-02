/** Shared by every Sentry init (server, edge, client) so the privacy
 * settings cannot drift apart */
export const sentryDataCollection = {
    userInfo: false,
    cookies: false,
    httpBodies: [],
    urlQueryParams: false
}
