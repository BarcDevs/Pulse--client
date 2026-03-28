import {Icon} from '@/components/shared/ui/Icon'
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
            <Icon
                name={'arrow-up'}
                size={20}
            />
        </Button>
        <span className={'text-sm font-semibold text-foreground'}>
            {votes}
        </span>
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'h-6 w-6 p-0 text-muted-foreground hover:text-primary'}
        >
            <Icon
                name={'arrow-down'}
                size={20}
            />
        </Button>
    </div>
)
