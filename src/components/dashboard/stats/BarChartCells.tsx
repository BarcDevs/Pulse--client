import {Cell} from 'recharts'

type BarChartData = {
    day: string
    value: number
}

type BarChartCellsProps = {
    data: BarChartData[]
    highlightDay?: string
    highlightColor?: string
    defaultColor?: string
}

export const BarChartCells = ({
    data,
    highlightDay = 'THU',
    highlightColor = 'var(--primary)',
    defaultColor = 'var(--primary-light)'
}: BarChartCellsProps) => (
    <>
        {data.map((entry, index) => (
            <Cell
                key={`cell-${index}`}
                fill={entry.day === highlightDay ?
                    highlightColor :
                    defaultColor
                }
            />
        ))}
    </>
)