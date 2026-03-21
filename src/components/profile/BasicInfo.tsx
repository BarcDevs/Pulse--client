import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    PROFILE_BASIC_INFO_EDIT,
    PROFILE_BASIC_INFO_FIELDS,
    PROFILE_BASIC_INFO_TITLE,
} from '@/constants/profileTexts'

const infoFields = PROFILE_BASIC_INFO_FIELDS

export const ProfileBasicInfo = () => (
  <Card className={'border-0 shadow-sm'}>
    <CardHeader className={'flex flex-row items-center justify-between'}>
      <CardTitle className={'text-lg font-semibold'}>
        {PROFILE_BASIC_INFO_TITLE}
      </CardTitle>
      <Button
        variant={'ghost'}
        size={'sm'}
        className={'gap-2 text-primary'}
      >
        <Pencil className={'size-4'} />
        {PROFILE_BASIC_INFO_EDIT}
      </Button>
    </CardHeader>
    <CardContent>
      <div className={'grid gap-6 sm:grid-cols-2'}>
        {infoFields.map((field) => (
          <div key={field.label}>
            <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
              {field.label}
            </p>
            <p className={'mt-1 text-sm font-medium text-foreground'}>
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
