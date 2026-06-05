import { GoalDetailPageContent } from '@/components/goals/GoalDetailPageContent'

type GoalDetailPageProps = {
    params: Promise<{ goalId: string }>
}

const GoalDetailPage = async ({
    params
}: GoalDetailPageProps) => {
    const { goalId } = await params
    return <GoalDetailPageContent goalId={goalId}/>
}

export default GoalDetailPage
