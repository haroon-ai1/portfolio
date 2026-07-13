# Portfolio — Muhammad Haroon

Vanilla HTML5 + CSS3 + JavaScript. No frameworks, no build step. Deploys as a static site to Vercel.

Dark blue + black palette. Mobile-first. Sections: Home · About · Work · Services · Skills · Testimonials · Contact.

## Local preview

Any static server works. From the project root:

```powershell
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

## Deploy

1. `git init && git add . && git commit -m "initial portfolio"`
2. Push to `github.com/haroon-ai1/portfolio`
3. On vercel.com: New Project → import the GitHub repo → deploy. No env vars, no build step.

## Replace-me checklist

Search the codebase for `REPLACE_` and `TODO:` to find every placeholder.

- [ ] `assets/img/haroon.jpg` — real headshot (until it exists, the site renders `MH` initials on a blue gradient)
- [ ] `assets/img/projects/pixsearch.png`
- [ ] `assets/img/projects/valurex.png`
- [ ] `assets/img/projects/agrivision.png`
- [ ] `assets/img/projects/supportgenie.png`
- [ ] `assets/img/favicon.png` — real favicon
- [ ] `assets/cv/Muhammad_Haroon_CV.pdf` — real CV
- [ ] Email address in `index.html` (search `REPLACE_WITH_YOUR_EMAIL`)
- [ ] Testimonials — 3× real quotes from professors, mentors, or collaborators (search `TODO: REPLACE`)
- [ ] EmailJS keys in `assets/js/main.js` (`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`). If left as `REPLACE_`, the contact form falls back to a `mailto:` link automatically.

## Structure

```
portfolio/
├── index.html
├── robots.txt
├── vercel.json
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── img/
    │   ├── favicon.png
    │   ├── haroon.jpg
    │   └── projects/
    │       ├── pixsearch.png
    │       ├── valurex.png
    │       ├── agrivision.png
    │       └── supportgenie.png
    └── cv/
        └── Muhammad_Haroon_CV.pdf
```

## Tech notes

- Fonts: Poppins (body) + Playfair Display Italic (signature words).
- Icons: Remix Icons 4.9.0 (CDN).
- Testimonials carousel: Swiper 12 (CDN).
- Reveal animations: ScrollReveal 4.0.9 (CDN, disabled when `prefers-reduced-motion`).
- Contact form: EmailJS v4 (CDN) with automatic `mailto:` fallback.
- Custom cursor is auto-disabled on touch devices and when reduced motion is requested.
