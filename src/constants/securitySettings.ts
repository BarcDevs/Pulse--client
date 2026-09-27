export const securitySettingStyles = {
    default: {
        container: 'flex items-center justify-between p-4 rounded-xl bg-surface-section',
        label: 'font-medium text-foreground',
        button: 'h-8 w-8 p-0 rounded-lg hover:bg-muted-foreground/10'
    },
    destructive: {
        container: 'flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5',
        label: 'font-medium text-destructive',
        button: ''
    }
}
