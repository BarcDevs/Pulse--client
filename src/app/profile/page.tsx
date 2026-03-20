import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { ProfileContent } from '@/components/profile/ProfileContent'

export default function ProfilePage() {
  return (
    <AppShell>
      <Header 
        title="Profile" 
        subtitle="Manage your recovery identity"
      />
      <ProfileContent />
    </AppShell>
  )
}
