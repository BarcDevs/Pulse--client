import Link from 'next/link'

import {ArrowRight, ClipboardCheck} from 'lucide-react'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

import {dashboardPageTexts} from '@/constants/componentTexts/dashboard'

export const DashboardCheckInCard = () => (
    <div className={'relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-gradient-start to-primary-gradient-end p-6 text-white'}>
        <div className={'relative z-10'}>
            <Badge className={'mb-4 border-0 bg-white/20 text-white hover:bg-white/30'}>
                {dashboardPageTexts.checkIn.badge}
            </Badge>
            <h2 className={'mb-2 text-2xl font-semibold'}>
                {dashboardPageTexts.checkIn.title}
            </h2>
            <p className={'mb-6 max-w-md text-white/90'}>
                {dashboardPageTexts.checkIn.description}
            </p>
            <Button
                asChild
                variant={'outline'}
                className={'border-white/30 bg-white text-primary hover:bg-white/90 hover:text-primary'}
            >
                <Link href={'/check-in'}>
                    {dashboardPageTexts.checkIn.button}
                    <ArrowRight className={'ml-2 size-4'}/>
                </Link>
            </Button>
        </div>

        <div className={'absolute -right-4 -bottom-4 opacity-20'}>
            <ClipboardCheck className={'size-48'}/>
        </div>
    </div>
)
