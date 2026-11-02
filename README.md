# Estep's Aerial website

Live site: https://aerial.estepssolutionsllc.com
Hosting: GitHub Pages (repo `bestep-gif/estepsaerial`, branch `main`, root folder)
Stack: plain HTML, CSS and JavaScript with no build step and no dependencies.

---

## Folder structure

```
index.html                       Homepage
construction-monitoring/
  index.html                     Construction monitoring page
404.html                         "Page not found" page
sitemap.xml, robots.txt          Search engine files
CNAME                            Custom domain (do not edit)
assets/
  css/site.css                   All styles
  js/config.js                   ← SITE SETTINGS (form, hero video, prices, …)
  js/projects.js                 ← PORTFOLIO + construction showcase data
  js/main.js                     Site behavior (normally no need to edit)
  img/                           Logos, favicon, social preview image
  hero/                          Your homepage background video/photo
  projects/<project-slug>/       Photos for each portfolio project
  projects/construction-demo/    Illustrated demo images (replace later)
  reports/                       PDF reports
tools/optimize_images.py         Makes web-sized versions of your photos
images/                          Old logo files from the first version (unused, safe to delete)
```

---

## Everyday edits

All of these are done by editing a file on GitHub (open the file → pencil icon → **Commit changes**). The site updates within about a minute.

### Connect the quote forms (do this first)
1. Create a free account at https://formspree.io (free plan: 50 submissions/month).
2. Click **New form**, name it "Estep's Aerial quotes", and use `bestep@estepssolutionsllc.com` as the email.
3. Copy the form endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
4. In `assets/js/config.js`, paste it into `formEndpoint: ""`.
5. Recommended, in Formspree's form settings:
   - **Restrict to domain:** `aerial.estepssolutionsllc.com`
   - Leave spam filtering on. The site already includes a hidden honeypot field (`_gotcha`), and Formspree applies its own rate limiting on its servers.
6. Submit a test request from the live site and confirm it arrives in your inbox.

Until `formEndpoint` is set, the forms open the visitor's email app with their request filled in and tell them to press Send. They never claim a message was delivered. The site only shows a "received" confirmation after Formspree confirms it.

The endpoint URL isn't a secret, so it's safe in the code. There are no passwords or API keys anywhere in this site.

### Add a portfolio project
1. Put your original photos in a folder on your computer.
2. Make web-sized copies:
   ```
   pip install pillow
   python tools/optimize_images.py ~/Pictures/my-shoot lakefront-listing
   ```
   This writes `assets/projects/lakefront-listing/photo-01-640.webp` (plus the 1280 and 1920 versions, and so on) and prints a snippet to paste.
3. Upload the new `assets/projects/lakefront-listing/` folder to GitHub.
4. In `assets/js/projects.js`, copy the **TEMPLATE** project, fill in the fields, and paste in the printed image lines. Write a real description for each `alt` (it's used by screen readers and Google).
5. Categories: `real-estate`, `construction`, `documentation`, `video`, `commercial`.

You can also skip the optimizer and use a single file: `{ src: "assets/projects/slug/photo.jpg", alt: "...", caption: "..." }`. That works, but it loads slower on phones.

### Add a video to a project
Set `videoUrl` to the normal YouTube link (for example `https://www.youtube.com/watch?v=XXXXXXXXXXX`). The card gets a "Video" badge, and the video opens first in the viewer.

### Homepage background video
1. Export a short (10–20 s), quiet clip of **your own footage**: 1920×1080, H.264 MP4, ideally under 8 MB. A WebM copy is optional.
2. Export a still frame as `hero-poster.webp`.
3. Upload both to `assets/hero/`, then fill in `hero` in `config.js`.

The video is muted, loops, plays inline on phones, and doesn't load at all for visitors with "reduce motion" turned on (they see the poster instead). If no hero media is set, the branded logo background is shown.

### Your portrait
Upload a photo to `assets/img/brandon.webp` (portrait orientation, about 1000×1150) and set `pilotPortrait: "assets/img/brandon.webp"` in `config.js`.

### Flight Studio demo video
Set `flightStudio.youtubeId` in `config.js`. It replaces the illustrated overlay in the Flight Studio section.

### Package prices
Fill in `packages.single.price`, `packages.monthly.price` and `packages.custom.price` in `config.js` (for example `"Starting at $___"`). If a price is left empty, the card shows "Custom quote".

### Sample construction report
`assets/reports/sample-construction-progress-report.pdf` is a **sample** made from the illustrations, and it's labeled that way on every page. To use a real report (only with the client's permission), upload it and update `sampleReportUrl`. Then set `sampleReportIsDemo: false` to remove the "sample" wording on the website.

### Replace the construction demo with a real project
In `projects.js`, edit `CONSTRUCTION_SHOWCASE`: replace each visit's `image`/`extra` with real photos, update the text, and set `sample: false` (this removes the "Demonstration" banner). For the before/after slider, `compare.before` and `compare.after` should be visits whose photos were taken from about the same position. Set `compare.enabled: false` if you don't have a matching pair.
Also remove or replace the `demo-construction` entry in `PORTFOLIO_PROJECTS`.

### Service area
Edit `serviceAreaShort` / `serviceAreaLong` in `config.js`. Also update the matching wording in the page `<title>`/description tags and in the `areaServed` structured data in both HTML files, which search engines read.

---

## Testing a change before it goes live

The live site deploys from the `main` branch. To review changes first:

1. In the repo, create a branch (e.g. `dev`) and commit the changes there.
2. Preview locally: download the branch (Code → Download ZIP), unzip it, then run
   ```
   cd estepsaerial-dev
   python3 -m http.server 8000
   ```
   and open http://localhost:8000. Opening `index.html` directly by double-clicking mostly works too, but the local server matches the live site exactly.
3. When it looks right, open a Pull Request from `dev` into `main` and merge it. GitHub Pages publishes within about a minute.

### Checklist after deploying
- Homepage and `/construction-monitoring/` load over HTTPS
- Menu works on a phone, and all buttons scroll to the right place
- Portfolio filters, the viewer (arrows, Esc key, swipe) and the construction timeline work
- A test quote arrives in your inbox (after Formspree is connected)
- Run https://pagespeed.web.dev on both pages (mobile)
- Submit `https://aerial.estepssolutionsllc.com/sitemap.xml` in Google Search Console

---

## Content rules (keep the site honest)
- Only show your own footage and photos, and get client permission before publishing their projects.
- Keep "Demo / Illustration" labels on anything that isn't real work.
- Don't add reviews, ratings, project counts, insurance claims or a street address unless they're real and verifiable.
- Flight Studio claims should match what the app actually does today.
