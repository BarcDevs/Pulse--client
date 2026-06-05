type Props = {
    message: string
}

export const SavingBanner = ({ message }: Props) => (
    <div className={'rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary'}>
        {message}
    </div>
)
