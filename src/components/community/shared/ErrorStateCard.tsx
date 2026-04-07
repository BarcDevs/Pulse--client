'use client'

type ErrorStateCardProps = {
    message: string
}

export const ErrorStateCard = ({
    message
}: ErrorStateCardProps) => (
    <div className={'rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive'}>
        {message}
    </div>
)
