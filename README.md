## FINAL UPDATE — ORIGINAL CERTIFICATES (23 Nov 2026)

The developer certificates page (`/#/certificates`) and About section (`/#/about#portfolio-certificates`) now show **8 real certificate images from user uploads**, with category search, original-image preview, mobile layout, local downloadable image and source verification links (including two Cisco QR-code verification URLs). The original certificate source data is in `CERTIFICATES-SOURCE-DETAILS.json`. See `CERTIFICATES-UPDATE-PASHTO.md`. No fabricated certificate images are used.

# I ♡ Book — Emerald Digital Library

**Updated real-book edition:** 53 curated Pashto titles, including 23 novels and stories, grouped in six subject groups. Each title has its own details screen, an original-site metadata record and an external cover image. More information in **VERIFIED_BOOK_SOURCES.md**.

A responsive, frontend-only **React + Vite** digital library with a premium cream, sage and emerald visual design. It connects to the Gutendex book metadata API and links readers to the **official Project Gutenberg landing pages** for reading and download options.

## 1. How to run (له صفر څخه)

**Required:** Node.js 20.19+ or 22+, npm, internet access for the first install.

1. Unzip `Emerald_Digital_Library.zip`.
2. Open the `Emerald_Digital_Library` folder in **VS Code**.
3. Open Terminal → New Terminal.
4. Run:

```powershell
npm install
npm run dev
```

5. Open **http://localhost:5173/** in your browser.

**Build and preview:**

```powershell
npm run build
npm run preview
```

Vite writes the production website to `dist/`.

**If PowerShell blocks npm.ps1:** open a Command Prompt terminal in VS Code, or run `npm.cmd install` and `npm.cmd run dev`.

**If npm reports ECONNRESET/EAI_AGAIN:** check your internet/proxy/DNS and retry `npm install`. Dependencies are fetched from npm the first time.

## 2. Website pages / د پروژې پاڼې

- Home — Header, navbar, hero, editorial cards, book grid, featured categories, footer.
- Catalog — live 32-books-per-page pagination, search, topic filter, language filter, page-local A–Z option.
- Categories — 30 browsable categories (some niche categories may have few matching public-domain titles).
- Book details — real titles/authors/subjects, original-source cover images and external reading/download links. For Pashto titles, reader access and downloading depend on the original publisher.
- Reading guide — official archive navigation, not an in-app full-text reader.
- Favorites — stores real book objects in this browser's localStorage.
- Curated Collections — six handpicked categories.
- Dashboard — live API count when online; charts based on a clearly labelled **current sample**; saved and recent book metrics.
- Pashto Library — 53 real titles including 23 novels/stories, six categories, filter, search and 12 cards per page.
- About — developer portrait, full-stack web developer biography, frontend/backend/database skill groups and selected academic projects.
- Contact — WhatsApp, email, phone, LinkedIn and a mailto-based form.
- Help, Privacy, custom 404 page.

Includes responsive mobile navigation, search modal, dark/light mode and skeleton loaders. The English classic fallback now uses **remote Project Gutenberg cover links** — no invented cover art.

## 3. Real Pashto book references and cover use

- The locally curated book metadata lives in `src/data/pashtoCatalog.json`; 53 entries from Ketabton, Aksos Book Store, Hasa Book Store and Apple Books, with direct URLs to each source page.
- Cover images are loaded directly from the original sources, **not included as copied copyrighted files**. Browsers need internet access and the source server must allow image requests. If a source image is unavailable, the site displays the book title, **not a fabricated cover**.
- Visit `/#/pashto` for the special Pashto shelf, and click any book card to see its local `/#/books/ps-...` detail page.
- The `Read` and `Download options` buttons lead to the source page; they are **not a promise that the publisher offers a free downloadable PDF**. Some websites require accounts or restrict access.
- See `VERIFIED_BOOK_SOURCES.md` for the complete, editable 53-title source list.

## 4. APIs and licensing

- Gutendex API: https://gutendex.com/ (no key required)
- Project Gutenberg linking policy: https://www.gutenberg.org/policy/linking.html
- Gutenberg terms: https://www.gutenberg.org/policy/terms_of_use.html

**Important:** Book metadata comes from Gutendex. The main catalog filters for titles marked public domain **in the U.S.** Copyright rules can differ by country. The app does **not** deep-link ebook files or host copyrighted books; the **Read at source** and **Download options** buttons open the book's official Project Gutenberg catalog page, where the reader chooses an available format. Project Gutenberg asks websites not to hotlink individual book files. The app does not sell books or promise a copyrighted modern bestseller catalog.

If the API is unavailable, the app displays **16 genuine English classic title entries** with remotely hosted Project Gutenberg covers and a visible offline/demo notice. They may not render when the internet is unavailable. Live totals/charts are not fabricated.

## 5. GitHub Pages deployment (وړیا Hosting)

No extra router configuration is required: this project uses `HashRouter` and `base: './'` so links work on GitHub Pages project URLs.

1. Visit https://github.com/new and create a public repository, e.g. `emerald-library`. **Do not** add a GitHub README, since this project already includes one.
2. From inside the unzipped project in VS Code Terminal:

```powershell
git init
git add .
git commit -m "Build Emerald Digital Library"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/emerald-library.git
git push -u origin main
```

3. Go to **Repository → Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. The included `.github/workflows/deploy.yml` automatically builds and deploys the site on pushes to `main`.
5. After the GitHub Actions run succeeds, open:

```
https://YOUR_USERNAME.github.io/emerald-library/
```

A catalog URL looks like `https://YOUR_USERNAME.github.io/emerald-library/#/catalog`.

If you change the repository name, the relative Vite base still works — no hardcoded username or repository name is built in.

## 6. Update developer/contact information (شخصي معلومات)

Edit **`src/components/Footer.jsx`**. The `CONTACT` object includes:

```js
export const CONTACT = {
  whatsapp: 'https://wa.me/93731597286',
  email: 'atefullahdarman@gmail.com',
  phone: '0786354525',
  linkedin: 'https://www.linkedin.com/in/atefullah-zafar-zoy-2a7019399'
};
```

GitHub: `https://github.com/dashboard` is **not a public profile URL**, so it was deliberately **not added** as a public social link. Add the real public profile URL when you have it, e.g. `https://github.com/YOUR_USERNAME`.

Developer portrait: `public/images/developer.webp`, supplied by the user. About biography: `src/pages/About.jsx`.

**Privacy reminder:** the phone, WhatsApp, email and portrait are publicly visible to anyone who opens a deployed site. Remove any detail you do not want public before publishing.

## 6. Project structure

```
Emerald_Digital_Library/
├── .github/workflows/deploy.yml     GitHub Pages deployment
├── index.html
├── package.json
├── vite.config.js                    Relative base for Pages
├── public/
│   ├── favicon.svg
│   ├── images/developer.webp
│   └── covers/                       16 original fallback covers
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── components/                    Header, Footer, BookCard, etc.
│   ├── context/LibraryContext.jsx    Favorites, theme, recent, home API state
│   ├── data/categories.js           30 category definitions
│   ├── data/demoBooks.js            Clearly-labelled fallback sample titles
│   ├── lib/books.js                 API fetch & helpers
│   └── pages/                       11+ routes
└── scripts/check-project.mjs
```

## 7. Preview files

`DESIGN_PREVIEW.html` is a **non-interactive static layout sample** for looking at the homepage visual styling without installing Node.js. The actual working site is the React application started via `npm run dev`. Desktop and mobile screenshots of the static layout are in `previews/`.

## 8. Notes and limits

- This is a **frontend-only** project, not a backend system: no real user accounts, password authentication, admin CRUD, cloud sync or owned ebook file hosting.
- If favorites are saved on Laptop A, they do not sync to Phone B.
- Most book covers are loaded from the third-party API in live mode. A network connection is needed for new titles, metadata and remote covers.
- The contact form composes a mailto: email; it does not send messages itself.
- The dashboard's topic chart counts matches *within the fetched sample*, not the global archive; one book may match multiple topics.
- The UI is authored in English to match the reference; the accompanying guide contains Pashto instructions.
- If you want backend authentication, admin accounts or upload features later, connect a real backend such as Laravel/Express plus database and file hosting.

## Cover authenticity and availability
This project requests book cover images from Open Library (known ISBNs/metadata), Project Gutenberg, and the original Pashto-source catalog pages. It does NOT package fabricated edition art and does not rehost third-party cover files. Availability depends on the reader’s connection and publishers’ servers. On failure it displays a labelled fallback, never a random cover.
