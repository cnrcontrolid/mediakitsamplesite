# Project Specs — Preorder Sample Site Generator

## What It Does
A web app hosted on Vercel. Users upload one or more 3D book cover images and the app automatically generates a 5-page preorder sales funnel for each book, then deploys each generated site to its own Vercel project. The sites are **demo only** — used to show prospects what their preorder page could look like.

## Who Uses It
Chinmai (or Raymond's team) — they visit the live Vercel URL, click "Create Sample Pre-Order Site", upload book covers, and get back a live Vercel link for each generated demo site.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Image processing | Python 3 (`process_covers.py`) via API route |
| AI extraction | OpenAI Vision API — title, author, subtitle, colors |
| Deployment of generated sites | Vercel API (deploy each site as its own Vercel project) |
| Hosting of the app itself | Vercel |
| Fonts | Google Fonts — Oswald (headings), Raleway (body) |
| Icons | Flat social icons (IG, FB, X, LinkedIn) |

---

## Pages & User Flows

### Library page (`/` — `app/page.tsx`)
- Header: "Preorder Sample Site Generator"
- Subheadline + font note (non-functional site, for reference only)
- Toolbar: "Create Sample Pre-Order Site" button
- Table with 5 columns: #, Cover thumbnail, Author, Title & Subtitle, "View Site" button (opens new tab) + Delete button
- **60-second countdown timer** shown at the top during generation (starts when upload is submitted, disappears on success or failure)

### Generation flow (what happens after upload)
1. User clicks "Create Sample Pre-Order Site" → file picker opens
2. User selects one or more 3D cover images
3. For each cover:
   a. Backend removes background → transparent PNG
   b. Crop to 750×1000
   c. Extract title, subtitle, author, color palette via OpenAI Vision
   d. Generate 5 HTML pages
   e. Push site folder to Vercel via Vercel API → get live URL
   f. **Only if Vercel deploy succeeds** → add row to library table
   g. **If any step fails** → do NOT add row to table, show error message
4. 60-second countdown timer runs on the frontend during this process

### Per-book site (deployed as its own Vercel project)
1. `index.html` — Landing page → button links to order form
2. `order.html` — Order form → button links to confirmation
3. `confirmation.html` — Confirmation page
4. `terms.html` — Terms & Conditions
5. `privacy.html` — Privacy Policy
- Universal footer on all pages linking to Terms and Privacy

### Delete flow
- User clicks delete button on a row
- Confirmation prompt: "Are you sure?"
- On confirm:
  - Delete the site's project folder inside `/sites/`
  - Remove the row from the table
  - (Vercel project is not deleted — Vercel management is manual)

---

## Data Models

No database. State lives in:
- `/sites/` folder — one subfolder per book, named `Title - Author/`
- Book cover PNG inside the folder, renamed `Title - Author.png`
- Library table state persisted in a JSON file (`/sites/library.json`) — array of `{ id, title, subtitle, author, coverPath, vercelUrl, createdAt }`
- On page load, table is populated from `library.json`

### `library.json` entry shape
```json
{
  "id": "title-author",
  "title": "Book Title",
  "subtitle": "Book Subtitle",
  "author": "Author Name",
  "coverPath": "/sites/title-author/title-author.png",
  "vercelUrl": "https://title-author.vercel.app",
  "createdAt": "2026-04-07T00:00:00Z"
}
```

---

## API Routes

| Route | Method | What it does |
|---|---|---|
| `/api/generate` | POST | Receives cover image(s), runs full pipeline, returns result |
| `/api/delete` | DELETE | Receives site `id`, deletes folder + removes from `library.json` |

### `/api/generate` steps (server-side)
1. Receive image file
2. Remove background (Python subprocess or `rembg` lib)
3. Crop to 750×1000
4. Call OpenAI Vision → extract title, subtitle, author, primary/accent/neutral colors
5. Generate 5 HTML files from templates
6. Push to Vercel via Vercel Deploy API → get URL
7. If Vercel returns success → update `library.json` → return `{ success: true, entry }`
8. If anything fails → return `{ success: false, error: "..." }` — do NOT update `library.json`

---

## Frontend Behaviour

### 60-second countdown timer
- Appears at the top of the page when generation starts
- Counts down from 60 to 0
- If process completes before 60s → hide timer, show success
- If process fails → hide timer, show error banner
- If timer hits 0 and process is still running → show "Taking longer than expected…" message (don't kill the process)

### Error states
- Show a red error banner below the toolbar with the reason
- Row is NOT added to the table on any failure

### Delete confirmation
- Simple browser `confirm()` dialog is acceptable
- On confirm: call `/api/delete`, then remove the row from the DOM and from `library.json`

---

## Image Processing (per book cover)

1. Remove background → transparent PNG
2. Crop to 750×1000 with no whitespace
3. Extract via OpenAI Vision API: Author name, Title, Subtitle, primary color, accent color, neutral color
4. Generate all 5 HTML pages using extracted data + color palette
5. Deploy to Vercel
6. Only on Vercel success → write to `library.json`

---

## Design Requirements

**Fonts:** Oswald (H1/H2/headings), Raleway (body)

| Element | Size | Line Height | Notes |
|---|---|---|---|
| H1 | 55px | 60px | Use `clamp()` for responsive scaling on long titles |
| H2 | 40px | 45px | |
| Body | 18px | 23px | |

**General layout rules:**
- All 2-column sections: `gap: 64px`, horizontal padding `40px`
- Max container width: `960px`
- Trust badges (hero section): inline row, `white-space:nowrap`, icon + text each wrapped in `<span>`

**Landing Page sections:**
Use the screenshot from /screenshots/landing page.jpg to build this page

- S1: "Pre-Order Today And Get A Signed Copy!" — 32px/38px, bright accent BG
- S2: Hero — book image 420px wide, `secure order.png` badge below book, white BG, 60px padding, both columns vertically centered. Trust badges (🛡 Secure Checkout, ⭐ Satisfaction Guaranteed, 🔒 Privacy Protected) inline in a single row below CTA button
- S3: About the book — headline uses `clamp(28px, 4vw, 55px)` (NOT fixed 65px — scales down for long titles), subheadline uses `clamp(20px, 2.8vw, 36px)`, 3 paragraphs generic lorem ipsum ~250 words (neutral text, NOT book-specific), 2 columns
- S4: CTA "Ready To Reserve A Copy For Yourself" — dark BG from book, contrasting button
- S5: About author — 400px wide placeholder photo (750×1000 ratio), 18px body, IG/FB/LinkedIn flat icons, 3 paragraphs lorem ipsum ~250 words
- S6: Testimonials — 3 columns, dark BG from book
- S7: Pre-order box — white BG, dashed border in dark book color, max-width 780px, padding 40px 60px, "$19.99" H1, "Pre-Order Your Copy Today" + "And Get Your Own Signed Copy Of The Book" at 40px/45px, countdown timer

**Order Form page:**
Use the screenshot from /screenshots/order form.jpg to build this page
- S1: Title + subtitle, primary color BG
  - Title (H1): `clamp(16px, 3vw, 48px)`, uppercase, `white-space:nowrap` — always single line, scales down for long titles
  - Subtitle (H2): `clamp(14px, 1.8vw, 26px)` — full text always shown, no truncation, may wrap to 2 lines only if very long
- S2: Form (left) + 3D book (right), clear gap between columns

**Confirmation page:**
Use the screenshot from /screenshots/Confirmation page.jpg to build this page
- S1: "Order Confirmed 👍🏼" H1 (yellow), "Congrats! Your Book Is On The Way" H2 (white), dark BG from book, padding 50px 40px — wide enough so subtitle paragraph does NOT wrap. Paragraph max-width: 900px
- S2: Two columns — book cover 380px wide (LEFT), "Thank you!" + survey question + 5 radio options (RIGHT). Gap 60px. Survey title uses accent color `var(--a)`

**Terms & Conditions page:**
Use the screenshot from /screenshots/Terms & Condition page.jpg to build this page
- Top header bar: dark primary BG, "TERMS AND CONDITIONS" in **Oswald 56px uppercase**, padding 36px 40px
- Two-column layout: main content (left) + sidebar (right, 200px)
- H2 article headings: Raleway 26px bold
- Body: Raleway 14px, line-height 1.85

**Privacy Policy page:**
Use the screenshot from /screenshots/Privacy Policy page.jpg to build this page
- Top header bar: dark primary BG, "PRIVACY POLICY" in **Oswald 56px uppercase**, padding 36px 40px
- Two-column layout: main content (left) + sidebar (right, 200px) with green-labeled sidebar boxes
- H2 section headings: Raleway 26px bold
- Body: Raleway 14px, line-height 1.85

**Lorem ipsum rule:** All placeholder body text must be generic and neutral — do NOT use book-specific or thematic placeholder text. Text should apply to any non-fiction book.

---

## Existing Files (do not overwrite without asking)

| File | Purpose |
|---|---|
| `library.html` | Old static library page — will be replaced by Next.js app |
| `generate_sites.py` | Old Python generator for hardcoded books — reference only |
| `process_covers.py` | Image processing script — reuse logic in API route |
| `screenshots/` | Reference screenshots for all 5 page types — match exactly |
| `3D book covers/` | Sample source book cover PNGs |
| `sites/` | Output folder — one subfolder per book |
| `secure order.png` | Trust badge used in hero section |
| `preordermybook.html` | Old standalone upload flow — reference only |
| `vercel.json` | Vercel config — update as needed |

---

## What "Done" Looks Like

- App is live on Vercel
- User uploads a 3D book cover
- 60-second countdown timer appears immediately
- App removes background, crops, extracts title/author/subtitle/colors via AI
- 5 HTML pages are generated matching the screenshots exactly
- Site is deployed to Vercel as its own project
- **Only after successful Vercel deploy** → new row appears in library table
- "View Site" button opens the live Vercel URL in a new tab
- Book cover renamed `Title - Author.png` and stored in the site folder
- Delete button removes the row, the local `/sites/` folder, AND the GitHub repo (`preorder-{id}`)
- If anything fails → no row added, error shown to user
- `library.json` is persisted to the main GitHub repo via GitHub API (works on Vercel — no local filesystem dependency)
- Cover thumbnails in the library table load from `{vercelUrl}/cover.png` with fallback to `/api/cover?id=...`
- If a GitHub repo already exists when generating (e.g. retry after failure), reuse it instead of erroring

---

## What Is NOT in Scope

- Deleting the deployed Vercel project on delete (GitHub repo + local folder only)
- Real payment processing
- User accounts or login
- Mobile-only optimization (desktop-first is fine)
- CMS or admin dashboard
