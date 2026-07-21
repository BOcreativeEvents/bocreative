import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const CLOUD_NAME = 'dwlznbqoi'
const SECRET = process.env.VIDEO_SECRET ?? ''
const TTL = 60 * 60 * 2 // 2-hour token lifetime

function hmac(payload: string) {
    return createHmac('sha256', SECRET).update(payload).digest('base64url')
}

function extractPublicId(url: string) {
    return url
        .replace(/^.*\/video\/upload\//, '')
        .replace(/\.(mp4|mov|webm)$/i, '')
}

export async function GET(req: NextRequest) {
    if (!SECRET) return NextResponse.json({ error: 'not configured' }, { status: 500 })

    const { searchParams } = req.nextUrl
    const rawUrl = searchParams.get('url')

    /* ── Token-generation mode (/api/signed-video?url=CLOUDINARY_URL) ── */
    if (rawUrl) {
        if (!rawUrl.includes(`res.cloudinary.com/${CLOUD_NAME}/video/upload/`)) {
            return NextResponse.json({ error: 'invalid origin' }, { status: 400 })
        }
        const id  = extractPublicId(rawUrl)
        const exp = Math.floor(Date.now() / 1000) + TTL
        const sig = hmac(`${id}:${exp}`)
        const src = `/api/signed-video?id=${encodeURIComponent(id)}&exp=${exp}&sig=${encodeURIComponent(sig)}`
        return NextResponse.json({ src }, { headers: { 'Cache-Control': 'no-store' } })
    }

    /* ── Playback mode (/api/signed-video?id=…&exp=…&sig=…) ── */
    const id  = searchParams.get('id')
    const exp = searchParams.get('exp')
    const sig = searchParams.get('sig')

    if (!id || !exp || !sig) {
        return NextResponse.json({ error: 'missing params' }, { status: 400 })
    }
    if (Math.floor(Date.now() / 1000) > parseInt(exp, 10)) {
        return NextResponse.json({ error: 'token expired' }, { status: 403 })
    }
    if (hmac(`${id}:${exp}`) !== sig) {
        return NextResponse.json({ error: 'invalid signature' }, { status: 403 })
    }

    const cloudinaryUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${id}.mp4`

    // Proxy — Cloudinary URL never reaches the browser
    const range = req.headers.get('range') ?? undefined
    const upstream = await fetch(cloudinaryUrl, {
        headers: range ? { Range: range } : {},
    })

    const out = new Headers({
        'Content-Type':  upstream.headers.get('Content-Type')  ?? 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'private, no-store',
    })
    const cr = upstream.headers.get('Content-Range')
    const cl = upstream.headers.get('Content-Length')
    if (cr) out.set('Content-Range',  cr)
    if (cl) out.set('Content-Length', cl)

    return new NextResponse(upstream.body, { status: upstream.status, headers: out })
}
