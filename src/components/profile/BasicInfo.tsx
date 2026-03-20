import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const infoFields = [
  { label: 'LEGAL NAME', value: 'Alexander J. Rivera' },
  { label: 'EMAIL ADDRESS', value: 'a.rivera@example.com' },
  { label: 'DATE OF BIRTH', value: 'May 12, 1992' },
  { label: 'PRIMARY SUPPORT CONTACT', value: 'Dr. Sarah Chen (Clinician)' },
]

export function ProfileBasicInfo() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
        <Button variant="ghost" size="sm" className="gap-2 text-[var(--primary)]">
          <Pencil className="size-4" />
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {infoFields.map((field) => (
            <div key={field.label}>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                {field.label}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
