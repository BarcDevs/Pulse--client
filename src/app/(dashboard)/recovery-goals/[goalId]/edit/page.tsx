import { GoalFormPageContent } from '@/components/goals/GoalFormPageContent'

type EditGoalPageProps = {
    params: Promise<{ goalId: string }>
}

const EditGoalPage = async ({
    params
}: EditGoalPageProps) => {
    const { goalId } = await params

    return (
        <GoalFormPageContent
            mode={'edit'}
            goalId={goalId}
        />
    )
}

export default EditGoalPage
