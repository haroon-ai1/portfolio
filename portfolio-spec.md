# Portfolio Website — Build Spec

**Owner:** Muhammad Haroon
**Reference:** Bedimcode "Bianca" portfolio — https://github.com/bedimcode/responsive-porfolio-website-Bianca (repo has scaffold only; full code is in the 2.5h tutorial at https://youtu.be/JSFIGIA9Zrk). Use the scaffold structure + this spec.

Build a fully responsive, mobile-first single-page portfolio. Vanilla HTML5 + CSS3 + JavaScript. No frameworks, no build step — deploys as a static site to Vercel.

---

## 1. Owner details

- Muhammad Haroon — 6th-semester BS Artificial Intelligence, SZABIST Islamabad
- Career focus: Computer Vision and ML Engineering
- Location: Islamabad, Pakistan
- GitHub: https://github.com/haroon-ai1
- LinkedIn: https://linkedin.com/in/haroon-ai
- Email: `[REPLACE_WITH_YOUR_EMAIL]`
- Target: AI/ML internship in Pakistan by Nov 2026, then MS in Germany (Fall 2027)

---

## 2. Tech stack

- HTML5, semantic + BEM class naming (e.g. `nav__logo`, `home__container`, `work__card`)
- CSS3, mobile-first, HSL variable system so a hue switcher can be added later
- Vanilla JavaScript, no frameworks

### CDN dependencies (exact versions)

- Remix Icons **4.9.0**: `https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css`
- Swiper **12**: `https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css` and `.min.js` (testimonials carousel)
- ScrollReveal **4.0.9**: `https://cdnjs.cloudflare.com/ajax/libs/scrollReveal.js/4.0.9/scrollreveal.min.js`
- Typed.js **2.1.0**: `https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.min.js`
- EmailJS **v4**: `https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`

### Fonts (Google Fonts)

- Body: **Poppins** (weights 400, 500, 600)
- Display signature italic: **Playfair Display** (weight 400/500, italic variant)

---

## 3. Color palette — dark blue + black

```css
:root {
  --hue: 220; /* deep blue base; hue switcher will vary this */

  --bg-body: #060B14;         /* near-black with blue tint */
  --bg-card: #0D1220;
  --bg-elevated: #131A2C;
  --border: #172036;
  --border-strong: #22304F;

  --accent-primary: #60A5FA;  /* bright blue — italic signatures, highlights */
  --accent-deep: #3B82F6;     /* medium blue — buttons, glow origin */
  --accent-darkest: #1E3A8A;  /* deep royal — gradient bottoms */

  --text-primary: #E2E8F0;
  --text-secondary: #94A3B8;
  --text-muted: #6B7A94;

  --shadow-glow: 0 12px 40px rgba(96, 165, 250, 0.25);
  --shadow-ring: 0 0 24px rgba(96, 165, 250, 0.18), inset 0 0 0 1px rgba(96, 165, 250, 0.22);
}
```

Dark theme is the default and only theme in v1. Do NOT ship a light variant — the design is dark-native.

---

## 4. Section order & IDs

Match the Bianca scaffold exactly:

1. `<header id="header">` — sticky nav
2. `<section id="home">` — hero
3. `<section id="about">` — about
4. `<section id="work">` — projects
5. `<section id="service">` — focus areas (note: singular id, plural class)
6. `<section id="skills">` — skills
7. `<section>` — testimonials (no id — not in nav)
8. `<section id="contact">` — contact
9. `<footer>` — footer + socials + copyright
10. `<a id="scroll-up">` — scroll-to-top button

---

## 5. Nav

- Logo: `Haroon` (top-left)
- Links: **Home** · **Works** · **My Services** · **Skills** · **Contact me** (last one is a pill-shaped button in `--accent-primary`, dark text)
- Mobile: hamburger opens a full-screen overlay menu, close button top-right
- On scroll > 50px: add `.scroll-header` class → subtle blur backdrop + border-bottom
- Active-link highlighting based on scroll position (compute with `getBoundingClientRect`)

---

## 6. Home (hero) section

Layout: centered on mobile, portrait right / text left on desktop.

- Eyebrow (small, `--text-secondary`): `Hi! I'm Haroon — Based in Islamabad`
- Big two-line heading:
  - Line 1: `Computer Vision &` (Poppins, weight 500, `--text-primary`)
  - Line 2: `ML Engineer` (Playfair Display **italic**, weight 500, `--accent-primary`) — this italic accent is the signature move, do not skip it
- Sub-heading (`--text-secondary`): `I build vision systems that ship — from research to production.`
- Portrait: in a card-shaped frame (rounded ~18px) with a blue gradient background and a soft blue glow beneath (`--shadow-glow`). Circular badge overlapping bottom-right with text `CV/ML`.
- Portrait image path: `assets/img/haroon.jpg` — until it exists, render a fallback with initials `MH` on a `linear-gradient(180deg, #60A5FA, #1E3A8A)` circle
- Primary CTA: `Hire me` (filled blue pill button) → smooth-scrolls to `#contact`
- Social row below: GitHub, LinkedIn, X, Mail (Remix icons, `--text-secondary`, hover → `--accent-primary`)

Do NOT use Typed.js in v1 — the italic signature word is stronger than a typing animation. Reserve Typed.js for v2 if needed.

---

## 7. About section

Two-column on desktop, stacked on mobile.

- Left: portrait/photo, same styling language as hero (card frame)
- Right:
  - Small eyebrow (`--accent-primary`, uppercase, letter-spacing): `— ABOUT ME`
  - Heading with italic accent: `Building intelligent vision` + italic blue `systems`
  - Body paragraph (`--text-primary`, line-height 1.7):
    > "I'm a 6th-semester BS AI student at SZABIST Islamabad, focused on **computer vision** and **production deployment**. I've shipped PixSearch (mAP 0.93 on Hugging Face Spaces), open-sourced Valurex on GitHub, and I'm building toward an MS in Germany for Fall 2027."
  - Highlight the words **computer vision** and **production deployment** in `--accent-primary` (inline `<span>`)
  - Stats row (3 items with big numbers in Playfair italic blue, label below in `--text-secondary`):
    - `4+` Projects shipped
    - `0.93` mAP · PixSearch
    - `Live` on HF Spaces
  - Button: `Download CV` (outlined, links to `assets/cv/Muhammad_Haroon_CV.pdf`)

---

## 8. Work section — projects

Title: `View My ` + italic blue `Work`

**Filter tabs** (chip-style, active tab has `--accent-primary` background): `All` · `ML` · `CV` · `Mobile` · `NLP`

**Numbered project cards** in a grid (1 col mobile, 2 cols tablet, 3 cols desktop). Each card:

- Project image at top (rounded 8px)
- Small circular button top-right corner of image: blue background, `ri-arrow-right-up-line` icon in dark — links to project URL
- Big number in Playfair italic blue below image (e.g. `01`, `02`)
- Project title (`--text-primary`, weight 500)
- One-line description (`--text-secondary`, 12–13px, line-height 1.5)
- Card has subtle `--shadow-ring` glow on hover

**Projects to include** (in this order):

- **01 — PixSearch** — ML, CV — "Content-based image retrieval engine. ResNet-50 + CLIP ViT-B/32 + FAISS. mAP 0.93 on 10k-image benchmark. Live on Hugging Face Spaces." — Link: `https://huggingface.co/spaces/haroon8124/pixsearch`
- **02 — Valurex** — Mobile — "Native Android personal-finance app. Jetpack Compose, MVVM, Room. Open-source on GitHub." — Link: GitHub repo (haroon-ai1)
- **03 — AgriVision-Pro** — ML, CV — "CNN-based plant-disease classifier. 79% accuracy on custom leaf dataset. Deployed via Streamlit." — Link: GitHub
- **04 — SupportGenie** — NLP — "RAG customer-support chatbot. FastAPI + LangChain + FAISS + Groq API. Retrieval over docs corpus." — Link: GitHub

Data-attribute each card with its category (`data-category="ml cv"`) so the filter tabs can show/hide with a CSS `display: none` toggle in vanilla JS.

Below the grid: pagination dots or a "View all on GitHub" link.

---

## 9. Services section — focus areas

Title: `My ` + italic blue `Services`
Three cards in a grid (1/2/3 col responsive). Each card:

- Remix icon in blue circle
- Title
- Two-line description
- Text link `View more →` that opens a **modal popup** (Bedimcode signature) with a longer description + bullet list of what's included

**Three services:**

1. **Computer Vision** — icon `ri-eye-line` — "Object detection, image retrieval, segmentation. Custom datasets, transfer learning, evaluation."
2. **Machine Learning** — icon `ri-brain-line` — "Model training, evaluation, debiasing. PyTorch and TensorFlow. Research-grade rigor."
3. **Deployment & MLOps** — icon `ri-rocket-line` — "FastAPI, Docker, Hugging Face Spaces. Ship models to production endpoints."

Modal: fixed overlay with dark scrim, card in center, close button, `Escape` key + backdrop click both close.

---

## 10. Skills section

Title: `My ` + italic blue `Skills`

Three category cards. Each card is a wide horizontal card (dark bg, subtle border) with:
- Category name on the left (e.g. `Programming`)
- Row of tag pills on the right, each with a Remix icon + label

**Categories:**

1. **Programming** — Python, C++, SQL, Kotlin
2. **ML / CV** — PyTorch, TensorFlow, OpenCV, YOLOv8, CLIP, FAISS
3. **Deployment** — FastAPI, Docker, Hugging Face, Git

---

## 11. Testimonials section

Title: `What They ` + italic blue `Say`

Swiper carousel (Swiper 12), 1 slide mobile / 2 desktop, draggable, with dot pagination in blue.

**IMPORTANT:** Ship v1 with 3 PLACEHOLDER cards. Each card has:
- 5-star rating (Remix `ri-star-fill`, `--accent-primary`)
- Quote paragraph (placeholder Lorem-style prose)
- Avatar circle (initials fallback) + name + role
- Add HTML comment at the top of the section:
  ```html
  <!-- TODO: REPLACE with real quotes from professors, mentors, or project collaborators before shipping to recruiters -->
  ```

Placeholder names/roles: `Prof. [Name]` / `Supervisor [Name]` / `Peer collaborator` — clearly fake, easy to swap.

---

## 12. Contact section

Title: `Contact ` + italic blue `Me`

Two-column on desktop, stacked mobile.

**Left column — form:**
- Input: Name
- Input: Email
- Textarea: Project details / message
- Submit button: `Send message` (filled blue pill)
- Wire to EmailJS with the following placeholder keys in `main.js`:
  ```js
  const EMAILJS_SERVICE_ID = 'REPLACE_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'REPLACE_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'REPLACE_PUBLIC_KEY';
  ```
- If any key still contains `REPLACE_`, the submit handler should fall back to opening a `mailto:` link with the form contents pre-filled. This way the form works day one even without EmailJS setup.
- On success: show inline success message in blue below the form.

**Right column — info cards:**
- Email card: icon + label + email address
- Location card: icon + `Islamabad, Pakistan`
- Availability card: icon + `Available for internships · Nov 2026`

---

## 13. Footer

- Big statement text spanning the width, mixed regular + italic:
  > `COLLABORATE AND START BUILDING VISION SYSTEMS THAT ` + italic blue `SHIP TODAY.`
- Small nav row: Works · Services · Skills
- Social icons row: GitHub, LinkedIn, X, Mail
- Copyright bottom line: `© 2026 Muhammad Haroon. All rights reserved.`

---

## 14. Extra interactions

- **Sticky scroll-up button**: fixed bottom-right, appears when `window.scrollY > 350`. Blue background, dark arrow icon, smooth scroll to top on click.
- **ScrollReveal**: init with `{ origin: 'top', distance: '60px', duration: 2000, delay: 200 }`. Apply to hero content, about columns, project cards (staggered), skill cards, testimonials, contact columns.
- **Smooth scroll** on all in-page anchor links.
- **Custom cursor** (desktop only, disabled if `matchMedia('(pointer: coarse)').matches`): small blue dot that follows the mouse, grows on hover over links/buttons.
- **Reduced motion**: wrap ScrollReveal init and cursor init in `if (!matchMedia('(prefers-reduced-motion: reduce)').matches)`.

---

## 15. File structure

```
portfolio/
├── index.html
├── robots.txt              # Allow: /
├── README.md               # setup, deploy, replace-me checklist
├── vercel.json             # optional — headers only
└── assets/
    ├── css/
    │   └── styles.css      # all CSS, mobile-first, ~700–900 lines
    ├── js/
    │   └── main.js         # all JS, well-commented
    ├── img/
    │   ├── favicon.png     # placeholder — replace
    │   ├── haroon.jpg      # placeholder — replace with real headshot
    │   └── projects/
    │       ├── pixsearch.png
    │       ├── valurex.png
    │       ├── agrivision.png
    │       └── supportgenie.png
    └── cv/
        └── Muhammad_Haroon_CV.pdf   # placeholder — replace with real PDF
```

---

## 16. Responsive breakpoints

Mobile-first. Add breakpoints at:
- `576px` — small tablets (adjust padding, small grid changes)
- `768px` — tablets (2-col grids for work/services/skills)
- `1150px` — desktop (final layout, 3-col grids, hero side-by-side)

---

## 17. Accessibility (must-haves)

- `aria-label` on all icon-only buttons (menu toggle, close, scroll-up, socials)
- `alt` text on all images
- Focus-visible outlines in `--accent-primary` on all interactive elements
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Verify contrast passes WCAG AA against `#060B14` background — `--text-primary` and `--accent-primary` both pass; `--text-muted` should only be used for decorative labels, never body copy

---

## 18. Placeholders to replace before shipping

Every one of these has a TODO comment in the code:

- [ ] `assets/img/haroon.jpg` — real headshot
- [ ] `assets/img/projects/*.png` — 4 project screenshots
- [ ] `assets/img/favicon.png` — real favicon
- [ ] `assets/cv/Muhammad_Haroon_CV.pdf` — real CV
- [ ] Email address in contact info + `<a href="mailto:...">`
- [ ] Optional phone number (or omit that card)
- [ ] Testimonials: 3× real quotes
- [ ] EmailJS keys in `main.js` (or leave as `REPLACE_` to use mailto fallback)

---

## 19. Deployment

1. `git init`, commit, push to `github.com/haroon-ai1/portfolio`
2. On vercel.com: New Project → import the GitHub repo → deploy (no config needed, static site)
3. Live at `haroon-portfolio.vercel.app` — swap to custom domain later if desired

No environment variables needed. No build step. Vercel serves `index.html` directly from the repo root.
