type DataNotificationProps = {
    message: string
}

export const DataNotification = ({
    message
}: DataNotificationProps) => (
    <div className={'absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg'}>
        <p className={'text-center text-muted-foreground text-sm font-medium px-4'}>
            {message}
        </p>
    </div>
)
