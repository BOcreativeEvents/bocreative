import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, company, email, phone, brief } = await req.json()

    await resend.emails.send({
      from: 'hello@bocreative.me',
      to: ['domio@bocreative.me'],
      replyTo: email,
      subject: `[BO Creative] New Project Inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#A35671;">New Project Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Company</td><td style="padding:8px 0;">${company || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
          </table>
          ${brief ? `<h3 style="color:#A35671;margin-top:24px;">Project Brief</h3><p style="line-height:1.7;color:#333;">${brief.replace(/\n/g, '<br>')}</p>` : ''}
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Connect API error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 })
  }
}
