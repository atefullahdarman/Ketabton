# Darman Digital Library

React + Vite, frontend-only digital library. Premium cream, sage and teal design; English public-domain classics via Gutendex and 53 curated Pashto book records; category browsing, favorites, dashboard, developer portfolio, contact and privacy pages. The existing production origin is **https://ketabton.vercel.app/**. The brand is Darman Digital Library; the URL intentionally remains unchanged to preserve the existing Google indexing history.

## Run locally

Use Node.js 22 LTS (or compatible Node 20.19+) and npm. Open this folder, which contains `package.json`, in VS Code. Run:

```powershell
npm install
npm run check
npm run dev
```

Open the URL printed by Vite. Production test:

```powershell
npm run build
npm run preview
```

On Windows, use `npm.cmd` instead of `npm` if PowerShell blocks npm.ps1. An npm DNS/network error requires a working connection to the npm registry before installation can succeed.

## Update the existing Vercel project

1. Back up your existing source and keep its `.git` folder. Copy the source files from this archive into the existing repository. Remove files present in your old tree but absent in this archive (especially the former credential components, data and images). Preserve any existing Google verification file or verification meta tag and local configuration. Do not copy `node_modules` or `dist` into Git.
2. Test with the commands above. If using GitHub integration, commit and push to the branch linked to the same Vercel project:

```powershell
git add -A
git commit -m "Rebrand as Darman Digital Library and improve SEO"
git push origin main
```

If using Vercel CLI, run `vercel --prod` in the existing linked project. Verify the target is your existing project, not a new one. Vercel settings: Vite, build `npm run build`, output `dist`. Do not change the production domain. `vercel.json` enables direct React route navigation and refresh. Old `/#/catalog` style bookmarks are converted to regular paths on Vercel.

3. Test the live homepage, `/catalog`, `/pashto`, `/about`, `/dashboard`, `/robots.txt` and `/sitemap.xml`. Check mobile navigation and reload a deep route. In Google Search Console, submit `sitemap.xml` for the existing URL-prefix property, then inspect the home page and request indexing once after the deployment (if quota permits).

## SEO

- Static homepage title, description, Open Graph/Twitter data, requested keyword metadata and WebSite JSON-LD; responsive site branding; crawlable BrowserRouter URLs on Vercel; route-specific rendered titles, descriptions, canonicals and robots tags in `src/lib/seo.js`.
- `public/sitemap.xml` includes the main public pages, category URLs and curated Pashto book details; personal favorites/dashboard and reader guide are intentionally excluded. Google ignores the meta keywords tag for ranking. Descriptive titles and visible content are more important.
- Search engines decide when to recrawl and how to display or rank results. A client-rendered SPA does not provide the same per-route server-rendered HTML as SSR/SSG. Social crawlers may show the homepage card on shared internal routes.
- To change domains later, update the origin in `index.html`, `src/lib/seo.js`, `public/robots.txt`, and `public/sitemap.xml`, set a permanent redirect from the old domain, and configure Search Console for the new domain.

## Book sources and application limits

Gutendex returns titles identified as public domain in its source catalog, primarily under U.S. law. Rights may differ by country. The site links to original Gutenberg book pages instead of redistributing files. The Pashto catalog contains 53 curated bibliographic records, including 23 novels/stories, from the original publishers and libraries. Availability, access requirements and download permissions depend on the source. Covers load remotely and may fail; the UI has a labeled fallback. See `VERIFIED_BOOK_SOURCES.md` and `src/data/pashtoCatalog.json` for source records. No book source URLs were renamed as part of the rebrand.

Favorites, recent books, theme and reading goal are stored locally in the browser. Old localStorage keys are supported during migration so the rebrand can preserve existing preferences on the same origin. Dashboard statistics use actual API data or clearly labeled sample data. No server authentication, file hosting, database or cross-device sync is included. Contact uses mailto and external links; the developer portrait and previously supplied public contact information remain in the project.

## Alternative GitHub Pages deployment

The retained GitHub Actions workflow sets `VITE_ROUTER=hash` and uses a relative Vite base for GitHub Pages. For search discoverability, Vercel is the primary deployment; the sitemap and canonical origin intentionally refer to the Vercel URL. If moving to a different production host, adjust SEO settings to match it. Do not submit hash-fragment URLs to Google as independent sitemap pages.

## Validation

`npm run check` validates the project structure, relative imports, metadata, public sitemap and removed asset paths. A clean npm install and build is still needed before deployment.
