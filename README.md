# ✦ Portfolio
> A premium, dark-themed personal portfolio built with **React** · **Tailwind CDN** · **Playfair Display** & **Montserrat** fonts · Gold gradient design system.

---

## 🖥️ Preview

| Section | Description |
|---|---|
| **Hero** | Full-screen animated intro with floating gold particles & scroll indicator |
| **About** | Two-column layout with portrait, gold stats, and animated reveals |
| **Expertise** | Three skill cards with icon hover, gold top-border slide, and tech tags |
| **Portfolio** | Project grid with image zoom, overlay CTA on hover |
| **Contact** | Split layout — info cards + animated floating-label form |
| **Footer** | Social icon buttons with gold hover lift |

---

## 🚀 Quick Start

### Prerequisites
| Tool | Minimum Version |
|---|---|
| **Node.js** | v16.x or later |
| **npm** | v8.x or later |
| **Git** | Any recent version |

### 1 · Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### 2 · Install dependencies
```bash
npm install
```

### 3 · Start development server
```bash
npm start
```
Open **http://localhost:3000** in your browser. Hot-reload is enabled — any saved change reflects instantly.

### 4 · Build for production
```bash
npm run build
```
The optimised output lands in `build/`. Serve it with any static host.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html          ← HTML shell (Tailwind CDN + Google Fonts injected here)
│   └── resume.pdf          ← ⬅ PLACE YOUR RESUME HERE (see §Resumé below)
│
├── src/
│   ├── App.js              ← All React components & page sections
│   ├── App.css             ← Full premium design system (animations, layout, components)
│   ├── index.js            ← React root entry-point
│   └── index.css           ← Minimal global reset (keep empty or minimal)
│
├── full_page.html          ← Original Stitch reference (screens merged — full page)
├── hero.html               ← Original Stitch screen: Hero & About
├── skills.html             ← Original Stitch screen: Skills & Projects
├── contact.html            ← Original Stitch screen: Contact
│
├── full_page.png           ← Screenshot: full page
├── hero.png                ← Screenshot: hero section
├── skills.png              ← Screenshot: skills section
├── contact.png             ← Screenshot: contact section
│
├── package.json
└── README.md
```

---

## 📄 Resume Download

The **"Download Resume"** button in the Hero section links to `/resume.pdf`.

**To add your resume:**

1. Export your CV as a PDF file.
2. Rename it exactly to `resume.pdf`.
3. Place it inside the `public/` folder:

```
portfolio/
└── public/
    └── resume.pdf   ✅  ← here
```

The React build automatically copies everything in `public/` to the build output root, so `/resume.pdf` will be accessible in production too.

---

## ✏️ Personalisation Guide

All personal content lives in **`src/App.js`**. Here is every field you need to replace:

### 👤 Identity

| Location in App.js | Placeholder | Replace with |
|---|---|---|
| Navbar logo | `AB` | Your initials |
| Hero tagline | `Software Engineering Student & Aspiring Architect · New York` | Your title & city |
| Hero `<h1>` | `Alexander Black` | Your full name |
| Hero subtitle | `Crafting bespoke digital experiences…` | Your personal pitch |
| About `<h2>` + italic | `Driven Academic` / `Excellence` | Your own headline |
| About sub-label | `Top 5% of Software Engineering Class` | Your own achievement |
| About paragraph 1 & 2 | Full sentences | Your bio |
| Portrait badge | `4.0 GPA` | Any key stat |
| Stat card 1 | `Fortune 500` / `Internship Experience` | Your achievement |
| Stat card 2 | `Dean's List` / `Academic Excellence & Open Source` | Your achievement |
| Footer name | `Alexander Black` | Your full name |
| Footer copyright | `© 2024 Alexander Black` | Your name & year |

### 📞 Contact Details (`ContactRow` values)

| Field | Current placeholder | Replace with |
|---|---|---|
| Email `value` | `alexander.black@portfolio.com` | Your real email |
| Email `href` | `mailto:alexander.black@portfolio.com` | `mailto:YOUR@EMAIL` |
| Location `value` | `New York, USA` | Your city/country |
| LinkedIn `value` & `href` | `linkedin.com/in/alexanderblack` | Your LinkedIn URL |
| GitHub `value` & `href` | `github.com/alexanderblack` | Your GitHub URL |

### 🌐 Social Links (Footer)

In the `footer-social` array near the bottom of `App.js`:

```js
{ label: 'LI', href: 'https://linkedin.com/in/alexanderblack',  title: 'LinkedIn'  },
{ label: 'GH', href: 'https://github.com/alexanderblack',        title: 'GitHub'    },
{ label: 'DR', href: 'https://dribbble.com/alexanderblack',       title: 'Dribbble'  },
{ label: 'IG', href: 'https://instagram.com/alexanderblack',      title: 'Instagram' },
```

Replace each `href` with your own profile URL.

### 🗂️ Projects

Find the three `<ProjectCard />` usages in `App.js` and update:

| Prop | What to change |
|---|---|
| `img` | URL or local path to project screenshot |
| `alt` | Descriptive alt text for the image |
| `title` | Project name |
| `category` | Short description (e.g. `Mobile App · React Native`) |

To use a **local image** place it in `public/images/project1.png` and set `img="/images/project1.png"`.

### 🎨 Colours

All colour tokens are CSS custom properties at the top of `src/App.css`:

```css
:root {
  --matte-black:   #0B0B0B;
  --gold-primary:  #FFD700;
  --gold-dark:     #C9A227;
  --gold-light:    #FFF3B0;
  --gold-gradient: linear-gradient(135deg, #FFD700 0%, #C9A227 50%, #FFF3B0 100%);
}
```

Change these to restyle the entire site instantly.

### 🔠 Typography

Fonts are loaded in `public/index.html` via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?
  family=Montserrat:wght@300;400;500;600;700
  &family=Playfair+Display:ital,wght@0,400;0,700;1,400
  &display=swap" rel="stylesheet"/>
```

To use different fonts, change this URL and update `--font-*` references in `App.css`.

---

## 🚢 Deployment

### Netlify (recommended — free)
1. `npm run build`
2. Drag the `build/` folder onto [netlify.com/drop](https://app.netlify.com/drop)

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json → "homepage": "https://YOUR_USERNAME.github.io/portfolio"
npm run build
npx gh-pages -d build
```

---

## 🛠️ Scripts Reference

| Command | Action |
|---|---|
| `npm start` | Start dev server at http://localhost:3000 |
| `npm run build` | Create optimised production build in `build/` |
| `npm test` | Run tests in watch mode |

---

## 📜 License

MIT — free to use, modify, and distribute. Attribution appreciated but not required.
