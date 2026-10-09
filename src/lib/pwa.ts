const IOS_PATTERN = /iphone|ipad|ipod/i

export const isStandalone = (): boolean =>
    window.matchMedia('(display-mode: standalone)').matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true

export const isIos = (): boolean => IOS_PATTERN.test(navigator.userAgent)
