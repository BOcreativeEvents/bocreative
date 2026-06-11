'use client'
import { cn } from '@/lib/utils'

interface ProgressiveBlurProps {
    className?: string
    direction?: 'left' | 'right'
    blurIntensity?: number
}

export function ProgressiveBlur({ className, direction = 'left', blurIntensity = 1 }: ProgressiveBlurProps) {
    return (
        <div
            className={cn('pointer-events-none', className)}
            style={{
                background:
                    direction === 'left'
                        ? `linear-gradient(to right, hsl(var(--background)), transparent)`
                        : `linear-gradient(to left, hsl(var(--background)), transparent)`,
                backdropFilter: `blur(${blurIntensity}px)`,
                maskImage:
                    direction === 'left'
                        ? 'linear-gradient(to right, black, transparent)'
                        : 'linear-gradient(to left, black, transparent)',
            }}
        />
    )
}
