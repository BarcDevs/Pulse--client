export type InstallChoice = {
    outcome: 'accepted' | 'dismissed'
    platform: string
}

export type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>
    userChoice: Promise<InstallChoice>
}
