'use client'

import {useState} from 'react'

import {Check} from 'lucide-react'

import {AppHeader} from '@/components/AppHeader'
import {CheckInActivities} from '@/components/checkIn/Activities'
import {CheckInJournal} from '@/components/checkIn/Journal'
import {CheckInQuote} from '@/components/checkIn/Quote'
import {CheckInSliders} from '@/components/checkIn/Sliders'
import {Button} from '@/components/ui/button'

import * as CheckInTexts from '@/constants/checkInTexts'

const CheckInPage = () => {
    const [mood, setMood] = useState(50)
    const [comfort, setComfort] = useState(50)
    const [selectedActivities, setSelectedActivities] = useState<string[]>([
        'Meditating',
        'Hydrated',
    ])
    const [journalEntry, setJournalEntry] = useState('')

    const handleSubmit = () => {
        // TODO: Implement check-in submission logic
    }

    return (
        <div className={'flex min-h-screen flex-col'}>
            <AppHeader
                title={CheckInTexts.CHECK_IN_HEADER_TITLE}
            />

            <main className={'flex-1 p-4 md:p-6'}>
                <div className={'mx-auto max-w-2xl'}>
                    <div className={'mb-8 text-center'}>
                        <h1
                            className={
                                'text-3xl font-semibold ' +
                                'text-foreground'
                            }
                        >
                            {CheckInTexts.CHECK_IN_PAGE_TITLE}
                        </h1>
                        <p
                            className={
                                'mt-2 text-muted-foreground'
                            }
                        >
                            {CheckInTexts.CHECK_IN_PAGE_SUBTITLE}
                        </p>
                    </div>

                    <CheckInSliders
                        mood={mood}
                        setMood={setMood}
                        comfort={comfort}
                        setComfort={setComfort}
                    />

                    <CheckInActivities
                        selectedActivities={
                            selectedActivities
                        }
                        setSelectedActivities={
                            setSelectedActivities
                        }
                    />

                    <CheckInJournal
                        value={journalEntry}
                        onChange={setJournalEntry}
                    />

                    <div
                        className={
                            'mt-8 flex justify-center'
                        }
                    >
                        <Button
                            onClick={handleSubmit}
                            size={'lg'}
                            className={
                                'min-w-[200px] ' +
                                'bg-primary text-white ' +
                                'hover:bg-primary/90'
                            }
                        >
                            <Check
                                className={
                                    'mr-2 size-5'
                                }
                            />
                            {CheckInTexts.CHECK_IN_SUBMIT_BUTTON}
                        </Button>
                    </div>

                    <p
                        className={
                            'mt-4 text-center text-xs ' +
                            'text-muted-foreground'
                        }
                    >
                        {CheckInTexts.CHECK_IN_AUTOSAVE_STATUS}
                    </p>

                    <CheckInQuote />
                </div>
            </main>
        </div>
    )
}

export default CheckInPage
