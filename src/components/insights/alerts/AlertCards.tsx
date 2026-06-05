import { ActionableStepAlert } from './ActionableStepAlert'
import { PainAlert } from './PainAlert'

export const AlertCards = () => (
    <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
        <PainAlert/>
        <ActionableStepAlert/>
    </div>
)
