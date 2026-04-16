type CreateGoalButtonProps = {
    onCreate?: () => void
}

export const CreateGoalButton = ({
    onCreate
}: CreateGoalButtonProps) => (
    <div className={'mt-16 flex flex-col items-center'}>
        <button
            onClick={onCreate}
            className={'bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-3'}
        >
            <span
                className={'material-symbols-outlined'}
                data-icon={'add_circle'}
            >
                add_circle
            </span>
            <span>Create New Recovery Goal</span>
        </button>
        <p className={'mt-6 text-on-surface-variant text-sm font-medium'}>
            Need guidance?
            {' '}
            <button className={'text-primary underline underline-offset-4 hover:text-primary-container'}>
                Talk to your AI Sanctuary Assistant.
            </button>
        </p>
    </div>
)
