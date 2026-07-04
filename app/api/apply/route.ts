import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const formData = await req.formData()

    const name      = formData.get('name') as string
    const email     = formData.get('email') as string
    const phone     = formData.get('phone') as string
    const portfolio = formData.get('portfolio') as string
    const message   = formData.get('message') as string
    const role      = formData.get('role') as string
    const cvFile    = formData.get('cv') as File | null

    const attachments: { filename: string; content: Buffer }[] = []
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer())
      attachments.push({ filename: cvFile.name, content: buffer })
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to:   ['aymandomiaty@gmail.com'],
      replyTo: email,
      subject: `[BO Creative — Forward to HR] New Application: ${role}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#A35671;">New Job Application — ${role}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Portfolio / LinkedIn</td><td style="padding:8px 0;">${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : '—'}</td></tr>
          </table>
          ${message ? `<h3 style="color:#A35671;margin-top:24px;">Cover Note</h3><p style="line-height:1.7;color:#333;">${message.replace(/\n/g, '<br>')}</p>` : ''}
          ${cvFile ? `<p style="color:#666;margin-top:16px;">CV attached: <strong>${cvFile.name}</strong></p>` : '<p style="color:#666;margin-top:16px;">No CV attached.</p>'}
        </div>
      `,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 })
  }
}
