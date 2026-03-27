import {Button} from '@/components/ui/button'

type PostVotesProps = {
    votes: number
}

export const PostVotes = ({
    votes
}: PostVotesProps) => (
    <div className={'flex flex-col items-center gap-1'}>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-6 w-6 p-0 text-muted-foreground hover:text-primary'}
        >
            {/*todo: extract svg*/}
            <svg
                className={'h-5 w-5'}
                fill={'none'}
                viewBox={'0 0 24 24'}
                stroke={'currentColor'}
            >
                <path
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                    strokeWidth={2}
                    d={'M5 15l7-7 7 7'}
                />
            </svg>
        </Button>
        <span className={'text-sm font-semibold text-foreground'}>
            {votes}
        </span>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-6 w-6 p-0 text-muted-foreground hover:text-primary'}
        >
            {/*todo: extract svg*/}
            <svg
                className={'h-5 w-5'}
                fill={'none'}
                viewBox={'0 0 24 24'}
                stroke={'currentColor'}
            >
                <path
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                    strokeWidth={2}
                    d={'M19 9l-7 7-7-7'}
                />
            </svg>
        </Button>
    </div>
)
