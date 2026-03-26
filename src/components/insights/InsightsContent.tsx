import {AlertCards} from './AlertCards'
import {BehavioralPatterns} from './BehavioralPatterns'
import {InsightsSummary} from './Summary'
import {InsightsTopRow} from './InsightsTopRow'

export const InsightsContent = () => (
  <div className={'p-6 space-y-6'}>
    <InsightsTopRow/>
    <AlertCards/>
    <BehavioralPatterns/>
    <InsightsSummary/>
  </div>
)
