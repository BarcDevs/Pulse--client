import { InsightsContent } from '@/components/insights/InsightsContent'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'

export default function InsightsPage() {
  return (
    <AppShell>
      <Header 
        title="AI Insights" 
        subtitle="Smart observations about your recovery"
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            AI Analysis Active
          </div>
        }
      />
      <InsightsContent />
    </AppShell>
  )
}
