# ETECH IT Services — Conversion-Optimized Website

A premium cybersecurity-focused MSP website built for **Google Search Ads** conversion. Dark aesthetic, pain-point driven copy, inline hero form, sticky CTA, and a dedicated thank-you page for conversion tracking.

## Stack

- **Pure HTML/CSS/JS** — zero build step, instant deploy
- **Google Fonts** — Plus Jakarta Sans + Fira Code
- **FormSubmit.co** — serverless contact form (no backend)
- **Cloudflare Pages** — hosting, CDN, edge security

## Files

```
├── index.html         # Main landing page (hero form + full contact)
├── thank-you.html     # Post-submission page (conversion tracking pixel goes here)
├── 404.html           # Custom 404 page
├── _headers           # Cloudflare security headers
├── wrangler.jsonc     # Cloudflare Pages deployment config
└── README.md          # This file
```

## Deploy to Cloudflare Pages

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "ETECH website v2 — conversion optimized"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/etech-website.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. Click **"Create a project"** → **"Connect to Git"**
3. Select your GitHub repo
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** `npx wrangler deploy`
   - **Build output directory:** `./`
5. Click **"Save and Deploy"**

### 3. Custom Domain

1. In Cloudflare Pages → your project → **Custom Domains**
2. Add `etechitsupport.com` and `www.etechitsupport.com`
3. Cloudflare handles SSL automatically

## Google Ads Setup

### Conversion Tracking

1. In Google Ads, create a conversion action (type: "Website" → "Submit lead form")
2. Copy the Global Site Tag and Event Snippet
3. Add the Global Site Tag to `index.html` `<head>`
4. Add the Event Snippet to `thank-you.html` `<head>` (it's pre-commented there — just uncomment and replace with your IDs)

### Recommended Campaign Structure

| Campaign | Match Type | Example Keywords |
|----------|-----------|-----------------|
| Brand    | Exact     | `etech it services`, `etech miami` |
| Service  | Phrase    | `managed it services miami`, `cybersecurity company miami` |
| Problem  | Broad Mod | `ransomware protection business`, `hipaa compliance it` |

### Landing Page Quality Score Tips

- The page already includes keywords naturally in headings, body, and meta tags
- Phone number is visible (enable call extensions in Google Ads)
- Form is above the fold (hero form)
- Mobile responsive with fast load time
- SSL via Cloudflare (required for ads)

## Contact Form Setup

Uses [FormSubmit.co](https://formsubmit.co/) — zero config, free.

1. First submission triggers a confirmation email to `info@etechitsupport.com`
2. Click the confirmation link to activate
3. All subsequent submissions go directly to your inbox

**To change the email:** update the `action` attribute in both forms in `index.html` and the form in `thank-you.html`:

```html
<form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
```

## Customization

### Phone Number
Search and replace `(305) 555-0100` and `+13055550100` with your real number.

### Colors
Edit CSS variables in `:root` at the top of `index.html`:
```css
--cyan: #00d4ff;     /* primary accent */
--emerald: #34d399;  /* success/positive */
--bg: #080b12;       /* page background */
```

### Stats
Update the numbers in the `.proof-stats` section to match your real metrics.

### Testimonials
Update the quotes, names, and roles in the `.testimonials` section.

## Performance

- All CSS is inlined (no external stylesheet request)
- No JavaScript frameworks — vanilla JS only
- Animations use GPU-composited `transform` and `opacity` only
- Fonts loaded with `preconnect` for faster fetch
- Images: none (SVG/CSS only) — zero image requests
- Thank-you page is `noindex` to prevent it from appearing in search

## License

© 2025 ETECH IT Services. All rights reserved.
