import { DashboardContent } from '@/components/dashboard/DashboardContent'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'

export default function DashboardPage() {
  return (
    <AppShell>
      <Header 
        title="Dashboard" 
        subtitle="Welcome back, Alex"
      />
      <DashboardContent />
    </AppShell>
  )
}
