import { CheckInContent } from '@/components/checkin/CheckinContent'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'

export default function DailyCheckInPage() {
  return (
    <AppShell>
      <Header 
        title="Health Overview" 
      />
      <CheckInContent />
    </AppShell>
  )
}
