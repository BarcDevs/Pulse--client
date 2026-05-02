import { Button } from '@/components/ui/button'

type MilestoneFormActionsProps = {
    isSubmitting?: boolean
    onCloseAction?: () => void
}

export const MilestoneFormActions = ({
    isSubmitting = false,
    onCloseAction
}: MilestoneFormActionsProps) => (
    <div className={'flex gap-3'}>
        <Button
            type={'submit'}
            disabled={isSubmitting}
            className={'flex-1'}
        >
            {isSubmitting ? 'Adding...' : 'Add Milestone'}
        </Button>
        {onCloseAction && (
            <Button
                type={'button'}
                variant={'outline'}
                disabled={isSubmitting}
                onClick={onCloseAction}
                className={'flex-1'}
            >
                Cancel
            </Button>
        )}
    </div>
)
