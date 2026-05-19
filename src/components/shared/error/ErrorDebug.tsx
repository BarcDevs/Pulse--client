import { isDev } from '@/config'

type ErrorDebugProps = {
    message?: string
}

export const ErrorDebug = ({
    message
}: ErrorDebugProps) => {
    if (!isDev || !message) {
        return null
    }

    return (
        <div className={'mt-16 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-left max-w-2xl'}>
            <p className={'text-xs font-bold text-destructive mb-2'}>
                Error Details
            </p>
            <p className={'text-xs text-destructive font-mono'}>
                {message}
            </p>
        </div>
    )
}
