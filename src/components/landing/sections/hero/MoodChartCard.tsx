import { MoodChartSvg } from './MoodChartSvg'

export const MoodChartCard = () => (
    <div className={'w-70 rounded-2xl bg-surface-card/90 px-4.5 pb-3.5 pt-4.5 shadow-lg backdrop-blur-md'}>
        <div className={'mb-3.5 flex items-baseline justify-between'}>
            <div>
                <p className={'mb-0.5 text-[10px] uppercase tracking-widest text-muted-foreground'}>
                    {'Last 14 days'}
                </p>
                <p className={'text-[15px] font-bold text-foreground'}>
                    {'Feeling steadier'}
                </p>
            </div>
            <span className={'rounded-full bg-secondary-light px-2 py-0.5 text-[11px] font-bold text-secondary'}>
                {'+18%'}
            </span>
        </div>

        <MoodChartSvg/>

        <div className={'mt-2 flex justify-between text-[10px] text-muted-foreground'}>
            <span>{'Apr 15'}</span>
            <span>{'Apr 22'}</span>
            <span>{'Today'}</span>
        </div>
    </div>
)
