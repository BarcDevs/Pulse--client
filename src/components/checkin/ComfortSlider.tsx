'use client'

import { Activity } from 'lucide-react'

interface ComfortSliderProps {
  value: number
  onChange: (value: number) => void
}

export function ComfortSlider({ value, onChange }: ComfortSliderProps) {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-5 w-5 text-primary" />
        <span className="font-medium text-foreground">Physical Comfort</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-[var(--surface-section)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div 
          className="absolute top-0 left-0 h-2 bg-primary rounded-full pointer-events-none"
          style={{ width: `${value}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-3">
        <span className="text-xs text-muted-foreground">Soreness</span>
        <span className="text-xs text-muted-foreground">Energetic</span>
      </div>
    </div>
  )
}
