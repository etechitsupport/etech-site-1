# ETECH IT Services — Website

A modern, cybersecurity-focused website for ETECH IT Services, Miami's premier MSP.

## Tech Stack

- **Pure HTML/CSS/JS** — no build step required
- **Google Fonts** — Outfit + JetBrains Mono
- **FormSubmit.co** — serverless contact form (no backend needed)
- **Cloudflare Pages** — hosting & CDN

## Deploy to Cloudflare Pages

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — ETECH website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/etech-website.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. Click **"Create a project"** → **"Connect to Git"**
3. Select your GitHub repo (`etech-website`)
4. Configure build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (root)
5. Click **"Save and Deploy"**

### 3. Custom Domain (etechitsupport.com)

1. In Cloudflare Pages → your project → **Custom Domains**
2. Click **"Set up a custom domain"**
3. Enter `etechitsupport.com`
4. Cloudflare will automatically configure DNS if the domain is already on Cloudflare
5. Also add `www.etechitsupport.com` and enable redirect to root

### Contact Form Setup

The form uses [FormSubmit.co](https://formsubmit.co/) for zero-config email delivery. On the first submission, FormSubmit will send a confirmation email to `info@etechitsupport.com`. Click the link in that email to activate the form.

To change the recipient email, update the `action` attribute on the `<form>` tag in `index.html`:

```html
<form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
```

## File Structure

```
├── index.html      # Main single-page website
├── 404.html         # Custom 404 error page
├── _headers         # Cloudflare security headers
├── _redirects       # Cloudflare URL redirects
└── README.md        # This file
```

## Customization

- **Colors:** Edit CSS variables in `:root` at the top of `index.html`
- **Content:** All text is directly in `index.html`
- **Form:** Update the FormSubmit action URL and hidden fields
- **Stats:** Update the numbers in the stats bar section

## License

© 2025 ETECH IT Services. All rights reserved.
