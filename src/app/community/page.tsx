import { Plus, Search } from 'lucide-react'

import { CommunityContent } from '@/components/community/CommunityContent'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'

export default function CommunityPage() {
  return (
    <AppShell>
      <Header 
        title="Community" 
        subtitle="Connect with others on their recovery journey"
        showSearch
        actions={
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        }
      />
      <CommunityContent />
    </AppShell>
  )
}
