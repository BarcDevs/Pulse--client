'use client'

import { Edit2 } from 'lucide-react'

import { Button } from '@/components/ui/Button'

const fields = [
  { label: 'Legal Name', value: 'Alexander J. Rivera' },
  { label: 'Email Address', value: 'a.rivera@example.com' },
  { label: 'Date of Birth', value: 'May 12, 1992' },
  { label: 'Primary Support Contact', value: 'Dr. Sarah Chen (Clinician)' },
]

export function BasicInformation() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          <Edit2 className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {field.label}
            </p>
            <p className="mt-1 text-sm text-foreground">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
