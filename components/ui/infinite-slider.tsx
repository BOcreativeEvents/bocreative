'use client'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react'

interface InfiniteSliderProps {
    children: React.ReactNode
    speed?: number
    speedOnHover?: number
    gap?: number
    className?: string
}

export function InfiniteSlider({ children, speed = 40, speedOnHover, gap = 16, className }: InfiniteSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const isHovered = useRef(false)

    useAnimationFrame((_, delta) => {
        const currentSpeed = isHovered.current && speedOnHover ? speedOnHover : speed
        const moveBy = (currentSpeed * delta) / 1000
        const containerWidth = containerRef.current ? containerRef.current.scrollWidth / 2 : 0

        x.set(x.get() - moveBy)
        if (containerWidth && x.get() < -containerWidth) {
            x.set(0)
        }
    })

    const xTransform = useTransform(x, (v) => `${v}px`)

    return (
        <div
            className={cn('overflow-hidden', className)}
            onMouseEnter={() => { isHovered.current = true }}
            onMouseLeave={() => { isHovered.current = false }}>
            <motion.div
                ref={containerRef}
                className="flex w-max"
                style={{ x: xTransform, gap }}>
                {children}
                {children}
            </motion.div>
        </div>
    )
}
