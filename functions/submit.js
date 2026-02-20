function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const isAssessment = data.formType === 'assessment';
  const subject = isAssessment
    ? '🔒 New Lead: Free Security Assessment'
    : '📩 New Contact: ETECH Website';

  let html;
  if (isAssessment) {
    html = `
      <h2 style="color:#1a1a2e">New Security Assessment Request</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:15px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name || '—')}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(data.company || '—')}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email || '—')}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone || '—')}</td></tr>
        <tr><td><strong>Interest</strong></td><td>${escapeHtml(data.interest || '—')}</td></tr>
      </table>
    `;
  } else {
    html = `
      <h2 style="color:#1a1a2e">New Contact Form Submission</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:15px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml((data.firstName || '') + ' ' + (data.lastName || ''))}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email || '—')}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone || '—')}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(data.company || '—')}</td></tr>
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${escapeHtml(data.message || '—')}</td></tr>
      </table>
    `;
  }

  const emailPayload = {
    from: 'ETECH IT Website <no-reply@etechitsupport.com>',
    to: ['info@etechitsupport.com'],
    subject,
    html,
  };

  if (data.email) {
    emailPayload.reply_to = data.email;
  }

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (resendRes.ok) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const errBody = await resendRes.text();
  console.error('Resend API error:', resendRes.status, errBody);
  return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
    status: 502,
    headers: { 'Content-Type': 'application/json' },
  });
}
