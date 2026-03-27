import {AlertCards} from './AlertCards'
import {BehavioralPatterns} from './BehavioralPatterns'
import {InsightsTopRow} from './InsightsTopRow'
import {InsightsSummary} from './Summary'

export const InsightsPageContent = () => (
  <div className={'p-6 space-y-6'}>
    <InsightsTopRow/>
    <AlertCards/>
    <BehavioralPatterns/>
    <InsightsSummary/>
  </div>
)
