import { Download, Share2 } from 'lucide-react'

import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { ProgressContent } from '@/components/progress/ProgressContent'
import { Button } from '@/components/ui/Button'

export default function ProgressPage() {
  return (
    <AppShell>
      <Header 
        title="Progress" 
        subtitle="Visualizing your recovery journey. Small steps lead to big milestones."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-muted-foreground">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="text-muted-foreground">
              <Share2 className="h-4 w-4 mr-2" />
              Share Journey
            </Button>
          </div>
        }
      />
      <ProgressContent />
    </AppShell>
  )
}
