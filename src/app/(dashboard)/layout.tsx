import { AppSidebar } from '@/components/AppSidebar'
import { SidebarInset,SidebarProvider } from '@/components/ui/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[var(--surface-page)]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
