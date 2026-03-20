import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { SettingsContent } from '@/components/settings/SettingsContent'

export default function SettingsPage() {
  return (
    <AppShell>
      <Header 
        title="Settings" 
        subtitle="Customize your HealEase experience"
      />
      <SettingsContent />
    </AppShell>
  )
}
