type ErrorProps = {
    error: string
}

export const Error = ({error}: ErrorProps) => (
    <p className={'mt-2 text-sm font-semibold text-red-500'}>
        {error}
    </p>
)
