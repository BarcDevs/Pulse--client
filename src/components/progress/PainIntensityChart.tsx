'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

const painData = [
  { day: 1, level1: 2, level2: 1.5 },
  { day: 2, level1: 3, level2: 2 },
  { day: 3, level1: 2.5, level2: 2 },
  { day: 4, level1: 4, level2: 3 },
  { day: 5, level1: 3, level2: 2.5 },
  { day: 6, level1: 2, level2: 1.5 },
  { day: 7, level1: 2.5, level2: 2 },
]

export function PainIntensityChart() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  
  const maxValue = 10
  const chartHeight = 160

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pain Intensity</h3>
          <p className="text-sm text-muted-foreground">Tracking physical progression over time</p>
        </div>
        
        <div className="flex gap-1 rounded-lg bg-[var(--surface-section)] p-1">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                activeTab === tab
                  ? 'bg-[var(--surface-card)] text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative" style={{ height: chartHeight }}>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[10, 8, 6, 4, 2, 0].map((val) => (
            <div key={val} className="flex items-center gap-2 w-full">
              <span className="text-xs text-muted-foreground w-4">{val}</span>
              <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
            </div>
          ))}
        </div>

        {/* Area chart SVG */}
        <svg className="absolute inset-0 ml-6" preserveAspectRatio="none">
          {/* Area fill */}
          <defs>
            <linearGradient id="painGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path
            fill="url(#painGradient)"
            d={`
              M 0,${chartHeight}
              ${painData.map((d, i) => {
                const x = (i / (painData.length - 1)) * 100
                const y = chartHeight - (d.level1 / maxValue) * chartHeight
                return `L ${x}%,${y}`
              }).join(' ')}
              L 100%,${chartHeight}
              Z
            `}
          />
          
          {/* Pain level line */}
          <polyline
            fill="none"
            stroke="var(--secondary)"
            strokeWidth="2"
            points={painData
              .map((d, i) => {
                const x = (i / (painData.length - 1)) * 100
                const y = chartHeight - (d.level1 / maxValue) * chartHeight
                return `${x}%,${y}`
              })
              .join(' ')}
          />
          
          {/* Data points */}
          {painData.map((d, i) => {
            const x = (i / (painData.length - 1)) * 100
            const y = chartHeight - (d.level1 / maxValue) * chartHeight
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={y}
                r="4"
                fill="var(--secondary)"
              />
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-secondary" />
          <span className="text-xs text-muted-foreground">Pain Level (Joints)</span>
        </div>
      </div>
    </div>
  )
}
