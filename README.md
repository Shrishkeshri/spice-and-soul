# Spice & Soul 🍔 — Four-Page Restaurant Website

A responsive, modern, Gen-Z-style **college web-development assignment**, written with **plain HTML5, CSS3, and JavaScript**. No React, npm, database, or paid services are required.

> **Important:** This is a fictional/student-demo restaurant. Menu prices, opening hours, neighborhood, and contact details are sample data. Update them before using this as a real business website. **A reservation request is not a confirmed table.**

## 🔗 Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, highlights, popular dishes, restaurant story, call to action |
| `menu.html` | Full menu table with category filters, 13 dishes, and a print button |
| `gallery.html` | Nine pictures, clickable lightbox, and bundled promo video with controls |
| `booking.html` | Request form with custom validation, demo/Netlify submission, and embedded Google Map |

All pages use **one** `css/style.css` file and **one** `js/main.js` file. Shared navigation and footer appear on all four pages; current page is highlighted with `aria-current="page"`.

## 📁 Project structure

```text
spice-and-soul/
├── index.html
├── menu.html
├── gallery.html
├── booking.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── logo.svg, favicon.svg
│   │   ├── interior.svg, dining.svg
│   │   ├── burger.svg, pasta.svg, pizza.svg
│   │   ├── tacos.svg, fries.svg, mocktail.svg, dessert.svg
│   │   └── video-poster.svg
│   └── media/
│       └── spice-and-soul-promo.mp4
├── netlify.toml
├── .gitignore
└── README.md
```

## 💻 Run it on your Mac

1. Download and unzip the folder.
2. Open the folder in **VS Code** (or another code editor).
3. Open `index.html` in your browser **or**, for more reliable local testing, run this in Terminal **inside the project folder**:

   ```bash
   python3 -m http.server 5500
   ```

4. Visit `http://localhost:5500` in Chrome or Safari. Stop the server with `Control + C`.
5. Try **Home → Menu → Gallery → Book a table**. Resize the browser to test the mobile menu.

## ✅ What the assignment requires (and where it is)

- **At least four pages:** `index.html`, `menu.html`, `gallery.html`, `booking.html`.
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` across the site.
- **Table:** `menu.html` includes `<caption>`, `<thead>`, `<tbody>`, column headers, 13 food/drink data rows, and category rows using **`colspan="4"`**.
- **At least six input types:** `booking.html` uses `text`, `email`, `tel`, `number`, `date`, `radio`, `checkbox`, plus a `select` dropdown and `textarea`.
- **Form labels and validation:** `required`, `pattern`, `min`, `max`, `minlength`, and custom JavaScript messages below fields.
- **At least six images with alt text:** home, menu, and gallery; gallery has 9 unique pictures.
- **Video with controls:** `gallery.html` plays the **included** original `.mp4` video (no external video dependency).
- **Iframe:** Google Maps embed in `booking.html` (Google Maps requires internet).
- **Grid/Flexbox + responsive:** shared CSS includes desktop, tablet, and mobile breakpoints.
- **Dark/light theme:** toggle in header, preference stored in `localStorage`, automatically applied on every page.
- **Additional features:** mobile hamburger menu, image lightbox, live form errors, back-to-top button, sticky navbar, printable menu, category filters.

## 🧾 Booking form: understand demo vs real submissions

### When running locally, or using GitHub Pages

The form performs field validation and saves **demo entries only in that browser's `localStorage`**, under `spice-demo-reservations`. These entries are **not sent to the restaurant** and are **not visible on other devices**.

To inspect your demo submissions in Chrome DevTools → Console:

```js
JSON.parse(localStorage.getItem('spice-demo-reservations') || '[]')
```

To clear the demo entries:

```js
localStorage.removeItem('spice-demo-reservations')
```

### To receive real form submissions for free: deploy to Netlify

This project contains a static **Netlify Forms**-compatible HTML form. When deployed on Netlify's default `*.netlify.app` domain, valid submissions use `POST /` with `application/x-www-form-urlencoded`. Netlify collects entries in your site's **Forms** dashboard; no database or custom server code is needed for the assignment. Usage limits and plan rules are set by Netlify.

1. Push these files to GitHub (see below).
2. Sign in to [Netlify](https://app.netlify.com/) and select **Add new project → Import an existing project**.
3. Connect GitHub; choose the `spice-and-soul` repository.
4. **Build command:** leave blank. **Publish directory:** `.` (repository root).
5. In your site’s Netlify dashboard, open **Forms** and click **Enable form detection** if it is not already enabled; then deploy or **redeploy** your site.
6. Check **Forms**: the detected form should be named `reservations` after deployment.
7. Submit a test request on the **Netlify site URL**, then confirm it appears under **Forms → reservations**. Configure form email notifications in **Forms → Submission notifications** if desired.
8. Remember: **requests need staff review**. This project does not check real-time table inventory, process payments, or automatically confirm reservations.

**If using a custom Netlify domain:** the demo/production switch in `js/main.js` currently recognizes Netlify's default domain. Adjust `isNetlifyHost()` to include your own verified custom domain before launch.

**If using GitHub Pages:** the site displays and all UI features work, but there is **no server-side form inbox**. Use the Netlify URL for the real submission demo.

## ⬆️ Push to GitHub

Create an empty repo named `spice-and-soul`, then run inside the extracted project directory:

```bash
git init
# Make three meaningful commits, as the assignment requests:
git add index.html menu.html gallery.html booking.html assets/
git commit -m "Add four restaurant pages and visual assets"
git add css/style.css
git commit -m "Add responsive styling and light-dark themes"
git add js/main.js README.md netlify.toml .gitignore
git commit -m "Add JavaScript interactions, booking form and documentation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/spice-and-soul.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If you already cloned a repository, skip `git init` and `git remote add origin` as appropriate.

To host the **visual website** on GitHub Pages: GitHub repository → **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Netlify is recommended when your assignment demo needs actual form submissions.

## 🧪 Simple test checklist

- [ ] All four pages open; links and navbar active states work.
- [ ] Theme toggle saves your choice across pages and refreshes.
- [ ] On a narrow window, hamburger opens and closes.
- [ ] Menu table has 13 items. Filters show one category at a time; Print resets filters.
- [ ] Click gallery images to open lightbox, then use ←/→ and Escape.
- [ ] Play/pause the gallery promo video (file is bundled).
- [ ] Submit an empty booking form to see messages below the fields.
- [ ] Try a past date, invalid mobile number, 13+ guests, and missing consent.
- [ ] Fill every required field and submit; see demo success locally, or a real Netlify Forms entry after deployment.
- [ ] Scroll down to show the back-to-top button; test the Google Maps iframe online.
- [ ] Open Chrome DevTools → Device Toolbar to test widths 375, 768, and 1440 pixels.

## 🎨 Customize the project

- **Brand name/logo:** find `Spice & Soul` and `spice&` / `soul` in the HTML files; edit `assets/images/logo.svg` if needed.
- **Colors:** update CSS variables under `:root` (dark mode) and `:root[data-theme="light"]`.
- **Menu/price:** change data rows in `menu.html` directly.
- **Contact/location/hours:** change the footer in each of the four HTML files, and the location/map in `booking.html`.
- **Photos:** the pages reference Unsplash photos online, and each has a bundled local SVG fallback if images are unavailable. To make the website photo-independent, replace the remote `<img src="https://images.unsplash.com/...">` with local image files.
- **Form:** change input options in `booking.html`; rules/messages live in `js/main.js`.

## 📷 Image credits

Website photographs are retrieved from public Unsplash image URLs, subject to the [Unsplash License](https://unsplash.com/license). Optional photos include restaurant interiors, burgers, pasta, pizza, drinks, tacos, dessert, and fries. The SVG illustrations, brand icon and promo video were created for this project and are bundled as local files.

## 🎤 60-second viva explanation

> “My project is Spice & Soul, a responsive four-page restaurant website created using HTML5, CSS3 and JavaScript. The home page has a hero section and highlights; the menu page uses a semantic HTML table with thirteen menu items; the gallery has a lightbox and a locally stored MP4 video; and the booking page uses a validated form with an embedded Google Map. I used CSS Grid, Flexbox and media queries for responsiveness. JavaScript powers the saved theme toggle, hamburger navigation, menu filters, lightbox and custom form validation. When hosted on Netlify, reservations are collected through Netlify Forms. On localhost and GitHub Pages, the form is only a browser demo.”

### Viva questions you can practice

1. **Why use separate HTML pages?** The assignment requires navigation between distinct site sections. They share one stylesheet and script for consistency.
2. **What is semantic HTML?** Tags like `<main>` and `<article>` describe the content's meaning and improve structure and accessibility.
3. **What is `colspan`?** It makes the menu category heading stretch across all four columns.
4. **What are CSS media queries?** Conditions that adapt layout and typography to different device widths.
5. **What is `localStorage`?** Browser storage used here to remember color theme and keep local demo requests.
6. **How does validation work?** HTML `required`, `pattern`, `min` and other constraints are checked with the JavaScript `validity` API, which displays custom messages.
7. **What is an iframe?** It embeds another webpage, here a Google Map.
8. **What is a lightbox?** A photo viewer that displays a larger image in a native HTML `<dialog>`.
9. **Does this website have a backend?** No custom backend. Netlify Forms provides hosted collection of booking requests; local testing remains demo-only.

---

Built for learning. Keep code readable, understand it, and customize before submitting. 🌶️
