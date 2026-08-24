# Jude Anyanwu — Fiscal Architecture

A premium, production-ready 3D portfolio for **Jude Anyanwu**, Professional Accountant, Financial Consultant & Tax Advisor.

> _"Turning Numbers into Strategic Business Growth."_

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [VS Code Setup](#vs-code-setup)
7. [Project Structure](#project-structure)
8. [Design System](#design-system)
9. [Integrations](#integrations)
   - [Mail Sender (Contact Form)](#mail-sender-contact-form)
   - [Newsletter Subscription](#newsletter-subscription)
   - [Map Embed](#map-embed)
   - [File Uploads — CV & Images](#file-uploads--cv--images)
10. [Admin Panel](#admin-panel)
11. [Building for Production](#building-for-production)
12. [Deployment](#deployment)
    - [Publish on Base44](#publish-on-base44)
    - [Deploy on Vercel](#deploy-on-vercel)
    - [Custom Domain Setup](#custom-domain-setup)
    - [Other Hosting Platforms](#other-hosting-platforms)
13. [Environment Variables & Secrets](#environment-variables--secrets)
14. [Troubleshooting](#troubleshooting)
15. [License](#license)

---

## Overview

An institutional-grade digital presence built on the **"Ledger Grid"** design system — mathematical balance, expansive white space, and the stability of Swiss modernism. Subtle, elegant 3D interactions rather than flashy effects.

- **3D Hero** — a "Crystalized Bar Chart" of frosted-glass pillars that rotate and lean toward the cursor (raw Three.js, performant).
- **Sections** — Hero, About (animated stats), Services (bento glass grid), Skills (floating cards), Experience (fiscal timeline), Portfolio (result-metric cards), Testimonials (carousel), FAQ, Tax Estimator (US & Nigeria), Blog, Contact (working email), Footer.
- **Admin Panel** — upload your CV and images from your computer; manage newsletter subscribers.
- **Extras** — loader, custom cursor, scroll progress bar, back-to-top, smooth scrolling, accessibility (focus states, `prefers-reduced-motion`, ARIA).

---

## Features

| Feature | Status |
| --- | --- |
| 3D animated hero (Three.js) | ✅ |
| Working contact form (email integration) | ✅ |
| Tax estimator — US & Nigeria | ✅ |
| Newsletter subscription (email + database) | ✅ |
| CV upload & download | ✅ |
| Image upload from your PC | ✅ |
| Admin content manager | ✅ |
| OpenStreetMap embed | ✅ |
| Fully responsive (mobile + desktop) | ✅ |
| `prefers-reduced-motion` support | ✅ |
| Custom cursor (desktop only) | ✅ |

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 + Vite |
| Styling | Tailwind CSS (custom design tokens) |
| 3D | Three.js (custom scene, no extra deps) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Backend / Hosting | Base44 platform (auth, database, email, file storage) |
| Maps | OpenStreetMap (iframe embed, no API key needed) |

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
| --- | --- | --- |
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9.x | bundled with Node.js |
| Git | ≥ 2.x | [git-scm.com](https://git-scm.com) |

Verify your installation:

```bash
node --version
npm --version
git --version
```

---

## Installation

### 1. Get the code

If you're working on the Base44 platform, the code is already in your workspace — skip to step 3.

If you have a local copy (e.g., cloned from GitHub):

```bash
git clone <your-repo-url> fiscal-architecture
cd fiscal-architecture
```

### 2. Install dependencies

```bash
npm install
```

This installs all required packages: React, Vite, Tailwind CSS, Three.js, Framer Motion, lucide-react, and the Base44 SDK.

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### 4. Build for production

```bash
npm run build
```

The optimized output is generated in the `dist/` directory.

### 5. Preview the production build

```bash
npm run preview
```

---

## VS Code Setup

### Recommended Extensions

Install these extensions for the best development experience:

| Extension | ID | Purpose |
| --- | --- | --- |
| ES7+ React/Redux snippets | `dsznajder.es7-react-js-snippets` | React code snippets |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Tailwind class autocomplete |
| Prettier | `esbenp.prettier-vscode` | Code formatting |
| ESLint | `dbaeumer.vscode-eslint` | Linting |
| Auto Rename Tag | `formulahendry.auto-rename-tag` | Rename paired HTML/JSX tags |
| Path Intellisense | `christian-kohler.path-intellisense` | Autocomplete file paths |

You can install all at once from the terminal:

```bash
code --install-extension dsznajder.es7-react-js-snippets \
     --install-extension bradlc.vscode-tailwindcss \
     --install-extension esbenp.prettier-vscode \
     --install-extension dbaeumer.vscode-eslint \
     --install-extension formulahendry.auto-rename-tag \
     --install-extension christian-kohler.path-intellisense
```

### Recommended Settings

Create or update `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.eol": "\n",
  "emmet.includeLanguages": { "javascript": "javascriptreact" },
  "tailwindCSS.includeLanguages": { "javascript": "javascriptreact", "typescriptreact": "javascriptreact" },
  "tailwindCSS.experimental.classRegex": [
    ["className=\"([^\"]*)\"", "\"([^\"]*)\""],
    ["className=\\{`([^`]*)`", "`([^`]*)`"]
  ]
}
```

### Running the dev server in VS Code

1. Open the project folder: `File → Open Folder → fiscal-architecture`
2. Open the integrated terminal: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)
3. Run:

```bash
npm install   # first time only
npm run dev
```

4. Click the `http://localhost:5173` link in the terminal, or open it in your browser.

**Tip:** Use the VS Code Live Preview extension (`ms-vscode.live-server`) for auto-refresh on save, or just rely on Vite's built-in Hot Module Replacement (HMR) which updates the browser instantly.

---

## Project Structure

```
fiscal-architecture/
├── base44/
│   ├── entities/
│   │   ├── SiteAsset.jsonc       # CV & image file URLs
│   │   └── Subscriber.jsonc      # Newsletter subscribers
│   └── config.jsonc              # Base44 app config
├── src/
│   ├── api/
│   │   └── base44Client.js       # Pre-initialized Base44 SDK
│   ├── components/
│   │   ├── admin/
│   │   │   └── UploadSlot.jsx    # Reusable file upload widget
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # 3D hero + Download CV button
│   │   │   ├── About.jsx          # Bio + profile portrait
│   │   │   ├── Services.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── ParallaxBanner.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── TaxCalculator.jsx  # US & Nigeria tax estimator
│   │   │   ├── Blog.jsx
│   │   │   ├── Contact.jsx        # Contact form (email)
│   │   │   └── Footer.jsx         # Newsletter subscription
│   │   ├── three/
│   │   │   └── Hero3D.jsx         # Three.js bar chart scene
│   │   ├── Navbar.jsx
│   │   ├── Loader.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── BackToTop.jsx
│   │   └── ui/                    # shadcn/ui components
│   ├── data/
│   │   └── portfolio.js          # All site content (single source of truth)
│   ├── hooks/
│   │   ├── useInView.js
│   │   ├── useCountUp.js
│   │   └── useSiteAsset.js       # Fetch uploaded assets by key
│   ├── pages/
│   │   ├── Home.jsx              # Main single-page portfolio
│   │   ├── Admin.jsx             # Content manager (protected)
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── App.jsx                   # Router + auth providers
│   ├── index.css                 # Design tokens & global styles
│   └── main.jsx                  # Vite entry point
├── tailwind.config.js            # Tailwind theme mapping
├── index.html                    # HTML shell, meta tags, fonts
└── package.json
```

---

## Design System

The **"Ledger Grid"** design system uses CSS custom properties defined in `src/index.css` and mapped to Tailwind classes in `tailwind.config.js`.

| Token | Variable | Hex Value |
| --- | --- | --- |
| Primary (Deep Midnight) | `--primary` | `#0F172A` |
| Background (Basalt White) | `--background` | `#F8FAFC` |
| Secondary (Cobalt Trust) | `--secondary` | `#1E40AF` |
| Accent (Burnished Gold) | `--accent` | `#B45309` |
| Border | `--border` | `#E2E8F0` |
| Muted Foreground | `--muted-foreground` | `#64748B` |

| Typography | Font | Weights |
| --- | --- | --- |
| Headings & Body | Inter | 300–900 |
| Data / Labels | JetBrains Mono | 400–600 |

To change a color, update the HSL value in `src/index.css` under `:root`. The Tailwind classes (`bg-primary`, `text-accent`, etc.) update automatically.

---

## Integrations

### Mail Sender (Contact Form)

The contact form sends real emails using the Base44 **SendEmail** integration. No external API keys are required — it's built into the platform.

**How it works:**

1. Visitor fills out the form in the Contact section.
2. The form calls `base44.integrations.Core.SendEmail()` with the visitor's name, email, phone, company, subject, and message.
3. The email is delivered to Jude's inbox.
4. The visitor sees a success or error message.

**Configuration:**

The recipient email is defined at the top of `src/components/sections/Contact.jsx`:

```javascript
const CONTACT_RECIPIENT = "jude.anyanwu@fiscal-architecture.com";
```

To change where messages are sent, update this constant.

**Code location:** `src/components/sections/Contact.jsx` → `onSubmit()` function.

**Requirements:**
- On the Base44 platform: works out of the box for registered app users.
- To send to email addresses that are **not** registered app users, you need a paid Base44 plan with a custom domain enabled. See [Base44 documentation](https://docs.base44.com) for details.

---

### Newsletter Subscription

The newsletter form in the footer does two things on submit:

1. **Sends an email notification** to Jude via `base44.integrations.Core.SendEmail()` — so Jude is immediately notified of every new subscriber.
2. **Saves the subscriber** to the `Subscriber` entity in the Base44 database — so subscribers can be managed and exported from the admin panel.

**Code location:** `src/components/sections/Footer.jsx` → `onSubscribe()` function.

**Entity:** `base44/entities/Subscriber.jsonc`

**Managing subscribers:**
- Visit `/admin` → scroll to the "Newsletter Subscribers" section.
- View all subscribers, see subscription dates, and delete entries.

**Customizing the notification email:**

Edit the `body` string in `Footer.jsx`:

```javascript
body: `A new visitor subscribed to the quarterly briefing.\n\nEmail: ${subEmail}`
```

**Connecting to an external email service (Mailchimp, ConvertKit, etc.):**

If you prefer to use an external email marketing service instead of the built-in database:

1. Sign up for Mailchimp, ConvertKit, or your preferred service.
2. Get your API key and list/audience ID.
3. Replace the `onSubscribe` function body with a `fetch()` call to your provider's API:

```javascript
const onSubscribe = async (e) => {
  e.preventDefault();
  setSubStatus("sending");
  try {
    await fetch("https://your-provider-api-endpoint.com/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: subEmail }),
    });
    setSubStatus("sent");
    setSubEmail("");
  } catch {
    setSubStatus("error");
  }
};
```

4. Store your API key as a secret (see [Environment Variables & Secrets](#environment-variables--secrets)).

---

### Map Embed

The contact section includes an interactive map using **OpenStreetMap** — no API key required.

**How it works:**

An `<iframe>` embeds an OpenStreetMap tile centered on Jude's office location:

```html
<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=-74.012%2C40.700%2C-73.990%2C40.715&layer=mapnik"
  className="h-full w-full grayscale"
  loading="lazy"
/>
```

**Code location:** `src/components/sections/Contact.jsx`

**Changing the location:**

1. Go to [openstreetmap.org](https://www.openstreetmap.org)
2. Search for your location and zoom to the desired level
3. Click **Export** → **Embed HTML**
4. Copy the `bbox` values from the generated URL
5. Replace the `bbox` parameter in the `src` attribute in `Contact.jsx`

**Using Google Maps instead:**

Replace the iframe with a Google Maps embed:

```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  className="h-full w-full grayscale"
  loading="lazy"
/>
```

Get your embed code from [Google Maps → Share → Embed a map](https://www.google.com/maps).

**Using Mapbox or Leaflet (interactive):**

The `react-leaflet` package is already installed. For a fully interactive map with markers and popups:

1. Create a component using `react-leaflet`:

```jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer center={[40.708, -74.001]} zoom={14} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[40.708, -74.001]}>
        <Popup>Jude Anyanwu — Fiscal Architecture</Popup>
      </Marker>
    </MapContainer>
  );
}
```

2. Replace the iframe in `Contact.jsx` with `<Map />`.

---

### File Uploads — CV & Images

The admin panel at `/admin` lets you upload files from your computer. Uploaded files are stored via the Base44 **UploadFile** integration and their URLs are saved in the `SiteAsset` entity.

**How it works:**

1. Navigate to `/admin` (requires login).
2. Upload a CV PDF → the URL is saved with key `"cv"`.
3. Upload a profile portrait → the URL is saved with key `"profile_image"`.
4. Upload portfolio images → URLs are saved with keys `"portfolio_1"` through `"portfolio_4"`.
5. The public site automatically fetches these URLs and displays them:
   - The **Download CV** button in the hero links to the uploaded CV.
   - The **About** section portrait shows the uploaded profile image.
6. Use the **copy** button on any uploaded image to grab its URL for embedding in content.

**Code locations:**
- Admin page: `src/pages/Admin.jsx`
- Upload widget: `src/components/admin/UploadSlot.jsx`
- Asset fetch hook: `src/hooks/useSiteAsset.js`
- CV button wiring: `src/components/sections/Hero.jsx`
- Portrait wiring: `src/components/sections/About.jsx`

**Entity:** `base44/entities/SiteAsset.jsonc`

**Supported file types:**
- CV: PDF files (`.pdf`)
- Images: JPG, PNG, WebP, GIF (`image/*`)

---

## Admin Panel

The admin panel is a protected page at `/admin` where you can:

- **Upload your CV** (PDF) — automatically links to the "Download CV" button on the homepage.
- **Upload your profile portrait** — automatically replaces the placeholder in the About section.
- **Upload portfolio images** — get shareable URLs to embed in your content.
- **View and manage newsletter subscribers** — see who subscribed and when; delete entries.

### Accessing the admin panel

1. Navigate to `your-domain.com/admin`
2. If you're not logged in, you'll be redirected to the login page.
3. Log in with your Base44 account credentials.
4. You'll be taken to the Content Manager.

### First-time setup

1. Go to `/admin`.
2. Upload your CV PDF in the "Essential Assets" section.
3. Upload your profile portrait.
4. Optionally upload portfolio images and copy their URLs.
5. Visit the homepage to verify the CV button and portrait update.

---

## Building for Production

```bash
# Clean install (optional, ensures no stale deps)
rm -rf node_modules package-lock.json
npm install

# Build the optimized bundle
npm run build

# Preview locally before deploying
npm run preview
```

The production build is output to `dist/`. It contains static HTML, CSS, and JavaScript that can be served by any static hosting provider or the Base44 platform.

---

## Deployment

### Publish on Base44

The primary and recommended way to deploy is through the Base44 platform — it handles hosting, SSL, CDN, and all backend integrations automatically.

1. Open your app in the Base44 builder.
2. Click **Publish** in the top-right corner.
3. Your app is live at `your-app-name.base44.app`.
4. To add a custom domain, see [Custom Domain Setup](#custom-domain-setup).

**Benefits of Base44 hosting:**
- Zero-config deployment
- Automatic SSL certificates
- Built-in email, file storage, and database integrations
- No environment variables to manage — everything is handled by the platform
- Global CDN

---

### Deploy on Vercel

If you want to host the frontend separately on Vercel (while keeping the Base44 backend for integrations), follow these steps:

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/fiscal-architecture.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New → Project**.
3. Import your GitHub repository.
4. Vercel auto-detects Vite. Confirm the settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Click **Deploy**.

#### Step 3: Configure Environment Variables

In the Vercel dashboard → **Settings → Environment Variables**, add any required variables. For a Base44 app, the SDK configuration is typically embedded in the build — check `src/api/base44Client.js` and `base44/config.jsonc` for any values that need to be set as environment variables.

#### Step 4: Deploy

Vercel automatically deploys on every push to `main`. You can also trigger manual deploys from the dashboard.

> **⚠️ Important:** The Base44 integrations (SendEmail, UploadFile) and entity database calls are handled by the Base44 backend. When deploying the frontend to Vercel, these API calls are proxied to the Base44 platform. Make sure your Base44 app is published and the SDK client is correctly configured. If you encounter CORS or authentication issues, use Base44's built-in hosting instead.

---

### Custom Domain Setup

#### On Base44

1. Open your app in the Base44 builder.
2. Go to **Settings → Custom Domain**.
3. Enter your domain (e.g., `www.judeanyanwu.com`).
4. Base44 provides DNS records to add:
   - Add an **A record** or **CNAME record** pointing to the provided value.
   - Add the provided **TXT record** for verification.
5. Wait for DNS propagation (usually 5–30 minutes).
6. Base44 automatically provisions an SSL certificate.
7. Your site is live at your custom domain.

#### DNS Configuration Example

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `your-app.base44.app` |
| A | `@` | (provided IP) |
| TXT | `@` | (verification token) |

#### On Vercel

1. Go to your project in the Vercel dashboard.
2. **Settings → Domains**.
3. Enter your custom domain and click **Add**.
4. Vercel provides DNS instructions:
   - Add a **CNAME record** (for subdomains like `www`): point to `cname.vercel-dns.com`.
   - Add an **A record** (for apex domains like `example.com`): point to `76.76.21.21`.
5. Once DNS is configured, Vercel automatically provisions an SSL certificate.
6. Your site is live at your custom domain with HTTPS.

#### Purchasing a Domain

If you don't have a domain yet, you can purchase one from:

| Provider | URL |
| --- | --- |
| Namecheap | [namecheap.com](https://www.namecheap.com) |
| Google Domains | [domains.google](https://domains.google) |
| Cloudflare | [cloudflare.com](https://www.cloudflare.com/products/registrar/) |
| GoDaddy | [godaddy.com](https://www.godaddy.com) |

---

### Other Hosting Platforms

Since the production build is static (`dist/`), you can host it on any static hosting provider:

#### Netlify

1. Push to GitHub.
2. Go to [netlify.com](https://www.netlify.com) → **Add new site → Import from Git**.
3. Select your repo.
4. Build settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |

5. Click **Deploy site**.
6. Add a custom domain under **Domain settings → Add custom domain**.

#### Cloudflare Pages

1. Push to GitHub.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project**.
3. Connect your GitHub repo.
4. Build settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |

5. Click **Deploy**.
6. Add a custom domain under **Custom domains → Set up a custom domain**.

#### GitHub Pages

1. Add a `base` path in `vite.config.js` if deploying to a sub-path:

```javascript
export default defineConfig({
  base: "/your-repo-name/",
  // ...
});
```

2. Build and deploy:

```bash
npm run build
npx gh-pages -d dist
```

3. Your site is live at `https://your-username.github.io/your-repo-name/`.

#### Traditional hosting (Apache, Nginx, shared hosting)

1. Build the project:

```bash
npm run build
```

2. Upload the contents of `dist/` to your web server's public directory (e.g., `public_html/` or `/var/www/html/`).
3. For SPA routing, configure your server to redirect all routes to `index.html`:

**Nginx:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (`.htaccess` in the `dist/` directory):**

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Environment Variables & Secrets

On the Base44 platform, integrations (email, file upload, database) are configured automatically — no environment variables are needed for the built-in features.

If you add external integrations (e.g., Mailchimp API, Google Maps API key, Stripe), you can manage secrets through the Base44 builder:

1. In the Base44 builder, go to **Secrets** (or use the `set_secrets` tool).
2. Add a secret (e.g., `MAILCHIMP_API_KEY`).
3. Reference it in your code as `process.env.MAILCHIMP_API_KEY` (in backend functions only).

For Vercel deployments, add environment variables in **Settings → Environment Variables**.

---

## Troubleshooting

### The 3D hero doesn't load

- Ensure your browser supports WebGL (most modern browsers do).
- Check the browser console for errors.
- The 3D scene uses `Suspense` with a `null` fallback — if Three.js fails to load, the hero text still renders.

### Contact form emails aren't arriving

- Verify the `CONTACT_RECIPIENT` email in `src/components/sections/Contact.jsx`.
- Check that the recipient is a registered app user (or that you have a paid plan with custom domain enabled for external recipients).
- Check the browser console for API errors.

### Newsletter subscription fails

- The `Subscriber` entity may not be accessible to unauthenticated users. The form sends an email notification regardless, so Jude will still be notified.
- If you need public subscriber creation, configure entity permissions in the Base44 builder.

### Admin page shows "Failed to load data"

- Make sure you're logged in. Navigate to `/login` and sign in with your Base44 account.
- The admin page requires authentication to read/write entities and upload files.

### Download CV button doesn't work

- Upload a CV PDF in the admin panel at `/admin`.
- The button falls back to scrolling to the About section if no CV is uploaded.

### Build fails on Vercel

- Ensure `@base44/sdk` and `@base44/vite-plugin` are in `package.json` dependencies (they're required).
- If you get module resolution errors, try `npm install` locally and commit `package-lock.json`.

### Styles look broken

- Run `npm install` to ensure all dependencies are installed.
- Check that `tailwind.config.js` and `src/index.css` are present and unmodified.
- Clear browser cache and hard-refresh.

### Custom domain not working

- Verify DNS records are correctly configured (see [Custom Domain Setup](#custom-domain-setup)).
- Wait for DNS propagation (can take up to 48 hours, usually much faster).
- Check that the SSL certificate was provisioned (automatic on Base44 and Vercel).

---

## License

© Jude Anyanwu. All rights reserved.