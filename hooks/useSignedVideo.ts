'use client'
import { useState, useEffect } from 'react'

export function useSignedVideo(cloudinaryUrl: string | undefined): string | undefined {
    const [src, setSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!cloudinaryUrl || !cloudinaryUrl.includes('/video/upload/')) {
            setSrc(cloudinaryUrl)
            return
        }
        let cancelled = false
        fetch(`/api/signed-video?url=${encodeURIComponent(cloudinaryUrl)}`)
            .then(r => r.json())
            .then(({ src }) => { if (!cancelled) setSrc(src) })
            .catch(() => { if (!cancelled) setSrc(cloudinaryUrl) }) // silent fallback
        return () => { cancelled = true }
    }, [cloudinaryUrl])

    return src
}
