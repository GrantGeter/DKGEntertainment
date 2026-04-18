import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.DKG_FROM_EMAIL || 'DKG Entertainment <onboarding@resend.dev>'
const TEAM_EMAIL = process.env.DKG_TEAM_EMAIL || 'info@dkgentertainment.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// ── Shared HTML wrapper ───────────────────────────────────────────────────────
function wrap(body) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body { margin:0; padding:0; background:#0a0a0a; font-family: Arial, sans-serif; color:#ffffff; }
  .container { max-width:600px; margin:0 auto; padding:40px 24px; }
  .logo { font-size:22px; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; color:#c9a84c; margin-bottom:32px; }
  .divider { border:none; border-top:1px solid rgba(255,255,255,0.1); margin:24px 0; }
  .label { font-size:10px; font-weight:900; letter-spacing:0.3em; text-transform:uppercase; color:#c9a84c; margin-bottom:6px; }
  .value { font-size:15px; color:rgba(255,255,255,0.7); margin-bottom:16px; line-height:1.6; }
  .btn { display:inline-block; padding:14px 32px; background:#c9a84c; color:#000000; font-size:11px; font-weight:900; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none; }
  .footer { margin-top:40px; font-size:12px; color:rgba(255,255,255,0.3); line-height:1.6; }
  a { color:#c9a84c; }
  h1 { font-size:28px; font-weight:900; letter-spacing:-0.02em; text-transform:uppercase; margin:0 0 16px; color:#ffffff; }
  h2 { font-size:20px; font-weight:900; text-transform:uppercase; color:#ffffff; margin:0 0 12px; }
</style>
</head>
<body><div class="container">${body}</div></body></html>`
}

// ── Contact form ─────────────────────────────────────────────────────────────
export async function sendContactNotification({ name, email, phone, subject, message }) {
  return resend.emails.send({
    from: FROM,
    to: TEAM_EMAIL,
    subject: `New Contact: ${subject}`,
    html: wrap(`
      <div class="logo">DKG Entertainment</div>
      <h1>New Contact Form</h1>
      <hr class="divider">
      <div class="label">Name</div><div class="value">${name}</div>
      <div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div>
      ${phone ? `<div class="label">Phone</div><div class="value">${phone}</div>` : ''}
      <div class="label">Subject</div><div class="value">${subject}</div>
      <div class="label">Message</div><div class="value">${message.replace(/\n/g, '<br>')}</div>
    `),
  })
}

export async function sendContactAutoReply({ name, email }) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "We got your message — DKG Entertainment",
    html: wrap(`
      <div class="logo">DKG Entertainment</div>
      <h1>Thanks, ${name}.</h1>
      <p class="value">We received your message and someone from our team will be in touch shortly.</p>
      <hr class="divider">
      <div class="footer">DKG Entertainment · <a href="${SITE_URL}">${SITE_URL.replace('https://', '')}</a></div>
    `),
  })
}

// ── Booking inquiry ───────────────────────────────────────────────────────────
export async function sendBookingNotification({ name, email, phone, artist, eventDate, eventType, venue, city, budget, details }) {
  return resend.emails.send({
    from: FROM,
    to: TEAM_EMAIL,
    subject: `Booking Inquiry: ${artist} — ${name}`,
    html: wrap(`
      <div class="logo">DKG Entertainment</div>
      <h1>Booking Inquiry</h1>
      <hr class="divider">
      <div class="label">Artist Requested</div><div class="value">${artist}</div>
      <div class="label">Contact Name</div><div class="value">${name}</div>
      <div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div>
      ${phone ? `<div class="label">Phone</div><div class="value">${phone}</div>` : ''}
      <div class="label">Event Type</div><div class="value">${eventType}</div>
      <div class="label">Event Date</div><div class="value">${eventDate}</div>
      <div class="label">Venue / City</div><div class="value">${venue}${city ? ` · ${city}` : ''}</div>
      ${budget ? `<div class="label">Budget</div><div class="value">${budget}</div>` : ''}
      ${details ? `<div class="label">Additional Details</div><div class="value">${details.replace(/\n/g, '<br>')}</div>` : ''}
    `),
  })
}

export async function sendBookingAutoReply({ name, email, artist }) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Booking Inquiry Received — ${artist}`,
    html: wrap(`
      <div class="logo">DKG Entertainment</div>
      <h1>Inquiry Received</h1>
      <p class="value">Thanks ${name}, we've received your booking inquiry for <strong>${artist}</strong>. Our booking team will review your request and reach out within 2–3 business days.</p>
      <hr class="divider">
      <div class="footer">DKG Entertainment · <a href="${SITE_URL}">${SITE_URL.replace('https://', '')}</a></div>
    `),
  })
}

// ── Newsletter ────────────────────────────────────────────────────────────────
export async function sendSubscribeConfirmation({ email, name, token }) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're on the list — DKG Entertainment",
    html: wrap(`
      <div class="logo">DKG Entertainment</div>
      <h1>You're In.</h1>
      <p class="value">${name ? `Hey ${name}, you're` : "You're"} now subscribed to DKG Entertainment updates — new shows, news, and drops delivered straight to you.</p>
      <hr class="divider">
      <div class="footer">
        Don't want emails? <a href="${SITE_URL}/unsubscribe?token=${token}">Unsubscribe</a>
        &nbsp;·&nbsp; DKG Entertainment
      </div>
    `),
  })
}

export async function sendNewsBlast({ subscribers, post }) {
  const results = []
  for (const sub of subscribers) {
    try {
      const r = await resend.emails.send({
        from: FROM,
        to: sub.email,
        subject: post.title,
        html: wrap(`
          <div class="logo">DKG Entertainment</div>
          <div class="label">${post.category || 'News'}</div>
          <h1>${post.title}</h1>
          <p class="value">${post.excerpt}</p>
          <br>
          <a class="btn" href="${SITE_URL}/news/${post.slug}">Read More</a>
          <hr class="divider">
          <div class="footer">
            You're receiving this because you subscribed to DKG Entertainment updates.
            <br><a href="${SITE_URL}/unsubscribe?token=${sub.unsubscribe_token}">Unsubscribe</a>
          </div>
        `),
      })
      results.push({ email: sub.email, ok: true })
    } catch {
      results.push({ email: sub.email, ok: false })
    }
  }
  return results
}

export async function sendEventBlast({ subscribers, event }) {
  const results = []
  for (const sub of subscribers) {
    try {
      await resend.emails.send({
        from: FROM,
        to: sub.email,
        subject: `New Show Announced: ${event.title}`,
        html: wrap(`
          <div class="logo">DKG Entertainment</div>
          <div class="label">New ${event.type || 'Event'}</div>
          <h1>${event.title}</h1>
          ${event.date ? `<div class="label">Date</div><div class="value">${event.date}</div>` : ''}
          ${event.venue ? `<div class="label">Venue</div><div class="value">${event.venue}${event.location ? ` · ${event.location}` : ''}</div>` : ''}
          <p class="value">${event.description}</p>
          ${event.ticketUrl ? `<br><a class="btn" href="${event.ticketUrl}">Get Tickets</a>` : `<br><a class="btn" href="${SITE_URL}/events">View Events</a>`}
          <hr class="divider">
          <div class="footer">
            You're receiving this because you subscribed to DKG Entertainment updates.
            <br><a href="${SITE_URL}/unsubscribe?token=${sub.unsubscribe_token}">Unsubscribe</a>
          </div>
        `),
      })
      results.push({ email: sub.email, ok: true })
    } catch {
      results.push({ email: sub.email, ok: false })
    }
  }
  return results
}

export async function sendUnsubscribeConfirmation({ email }) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "You've been unsubscribed — DKG Entertainment",
    html: wrap(`
      <div class="logo">DKG Entertainment</div>
      <h1>Unsubscribed.</h1>
      <p class="value">You've been removed from the DKG Entertainment mailing list. You won't receive any more emails from us.</p>
      <p class="value">Changed your mind? <a href="${SITE_URL}">Visit our site</a> to sign up again.</p>
      <hr class="divider">
      <div class="footer">DKG Entertainment</div>
    `),
  })
}
