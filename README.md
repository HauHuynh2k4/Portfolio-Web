# 🧑‍💻 Huynh Ngoc Hau — Portfolio Website

> A personal portfolio website built with vanilla HTML, Tailwind CSS, and DaisyUI — no build step, no framework, just a static site served with Live Server.

---

## 📖 About

This is my personal portfolio website showcasing my projects, resume, and contact information. The site is structured around reusable HTML partials loaded dynamically via `fetch`, with a paginated project grid and modal-based project detail views.

---

## 🛠️ Tech Stack

| Technology | Details |
|---|---|
| HTML / CSS / JavaScript | Vanilla, no framework |
| Tailwind CSS | Via CDN |
| DaisyUI | Component library on top of Tailwind (via CDN) |
| EmailJS | Contact form email delivery |
| Google Fonts | Hubot Sans |
| Live Server | Local development server |

---

## 🏛️ Project Structure

```
Portfolio-Web/
├── index.html                        # Single entry point
├── assets/                           # Images, avatar, CV PDF, project thumbnails
├── js/
│   └── main.js                       # Partial loader, project pagination logic
├── partials/
│   ├── presentation.html             # Hero section
│   ├── experience.html               # Resume section
│   ├── projects.html                 # Projects grid wrapper + pagination controls
│   ├── footer.html                   # Footer
│   ├── contact.html                  # Contact form
│   └── projects/
│       ├── stoms.html                # Project cards (one file per project)
│       ├── asa.html
│       ├── koi.html
│       ├── watchstore.html
│       ├── 1946studio.html
│       ├── firewarrior.html
│       ├── icequest.html
│       ├── spaceexplorer.html
│       └── modals.html               # All project detail modals
└── docs/
    └── add-project.md                # Guide for adding new projects
```

---

## ⚙️ How It Works

### Partial Loading
All sections are separate HTML files loaded at runtime via `fetch` in `js/main.js`. This keeps `index.html` clean and makes each section independently editable.

```javascript
loadPartial('partials/presentation.html', 'presentation-container');
loadPartial('partials/experience.html', 'experience-container');
```

Dialogs inside partials are automatically moved to `document.body` after loading to prevent clipping by overflow containers.

### Project Pagination
Projects are defined as an array in `main.js`. Each entry has a `url` (card HTML file) and a `containerId`. The grid renders 6 projects per page and supports prev/next navigation.

```javascript
const projects = [
  { url: 'partials/projects/stoms.html', containerId: 'stoms-container' },
  // ...
];
```

### Project Modals
Each project card has a "Read more" button that opens a `<dialog>` element. All dialogs live in `partials/projects/modals.html` and are loaded once into `#modals-container` at startup.

---

## 🚀 Running Locally

No build step required. Just open with Live Server:

1. Clone the repository
2. Open the folder in VS Code
3. Install the **Live Server** extension if not already installed
4. Right-click `index.html` → **Open with Live Server**

The site runs on `http://127.0.0.1:5500` by default.

> **Note:** The site must be served via HTTP (not opened as a `file://` URL) because it uses `fetch` to load partials. Opening `index.html` directly in a browser will not work.

---

## ➕ Adding a New Project

See [`docs/add-project.md`](docs/add-project.md) for the full step-by-step guide.

The short version:
1. Create `partials/projects/<name>.html` — the card
2. Add a `<dialog>` block to `partials/projects/modals.html` — the detail modal
3. Add one line to the `projects` array in `js/main.js`

---

## 📋 Current Projects

| Project | Type | Course |
|---|---|---|
| STOMS | Web App — ASP.NET Core | SEP490 Capstone |
| ASA Platform | Web App — ASP.NET Core | EXE201 Startup |
| Koi Feng Shui Consulting | Web App — ASP.NET Core + React | SWP391 |
| Watch Store Website | Web App — Java / JSP | PRJ301 |
| 1946 Studio | Web App — React + MediaPipe | VNR202 |
| Fire Warrior in the Demon World | 2D Game — Unity | PRU212 |
| Ice Quest | 2D Game — Unity | PRU212 |
| Space Explorer | 2D Game — Unity | PRU212 |

---

## 📝 Notes

- Do NOT use SVG icons inside card buttons — Live Server injects a script tag into long SVG paths which truncates the HTML and hides buttons after it
- Do NOT use apostrophes in partial HTML text — causes parse issues when loaded via `fetch`
- All dialogs must live in `modals.html`, not inside individual card files
