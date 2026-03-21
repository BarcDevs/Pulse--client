import {Download, Share2} from 'lucide-react'

import {AppShell} from '@/components/layout/AppShell'
import {Header} from '@/components/layout/Header'
import {ProgressContent} from '@/components/progress/ProgressContent'
import {Button} from '@/components/ui/button'

import * as ProgressTexts from '@/constants/progressTexts'

const ProgressPage = () => (
    <AppShell>
        <Header
            title={ProgressTexts.PROGRESS_TITLE}
            subtitle={ProgressTexts.PROGRESS_SUBTITLE}
            actions={
                <div
                    className={'flex items-center gap-2'}
                >
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className={
                            'text-muted-foreground'
                        }
                    >
                        <Download
                            className={'h-4 w-4 mr-2'}
                        />
                        {ProgressTexts.PROGRESS_EXPORT_PDF}
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className={
                            'text-muted-foreground'
                        }
                    >
                        <Share2
                            className={'h-4 w-4 mr-2'}
                        />
                        {ProgressTexts.PROGRESS_SHARE_JOURNEY}
                    </Button>
                </div>
            }
        />
        <ProgressContent />
    </AppShell>
)

export default ProgressPage
