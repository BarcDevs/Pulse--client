'use client'

import {useState} from 'react'

import {CheckInActivities} from './ActivitySelector'
import {CheckInJournal} from './Journal'
import {CheckInQuote} from './Quote'
import {CheckInSliders} from './Sliders'

export const CheckInContent = () => {
    const [mood, setMood] = useState(5)
    const [comfort, setComfort] = useState(5)
    const [journalEntry, setJournalEntry] = useState('')
    const [selectedActivities, setSelectedActivities] = useState<string[]>([])

    return (
        <div className={'space-y-6 p-6'}>
            <CheckInQuote/>
            <CheckInSliders
                mood={mood}
                setMood={setMood}
                comfort={comfort}
                setComfort={setComfort}
            />
            <CheckInJournal
                value={journalEntry}
                onChange={setJournalEntry}
            />
            <CheckInActivities
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
            />
        </div>
    )
}
