# How to Add a New Project

## File structure

Each project needs:
1. `partials/projects/<name>.html` — the card shown in the grid
2. A `<dialog>` entry added to `partials/projects/modals.html`
3. One line added to the `projects` array in `js/main.js`

---

## Step 1 — Create the card file

Save as `partials/projects/<yourkey>.html`. Copy this template exactly.

> IMPORTANT: Do NOT use SVG icons inside buttons. live-server injects a script tag
> into long SVG path data which truncates the HTML and hides buttons after it.
> Use text labels only for buttons.

```html
<div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] flex flex-col h-full">
  <figure class="px-4 pt-4">
    <img src="assets/YOUR_IMAGE.png" alt="Project Name" class="rounded-xl w-full h-48 object-contain bg-base-300" />
  </figure>
  <div class="card-body flex flex-col flex-1">
    <h2 class="text-xl font-bold text-base-content">Project Name</h2>
    <div class="badge badge-primary mb-2">Web App</div>
    <p class="text-base text-base-content">
      Short description of the project (1-2 sentences). Do not use apostrophes.
    </p>
    <div class="flex flex-wrap gap-2 my-3">
      <span class="badge badge-primary">Tech 1</span>
      <span class="badge badge-secondary">Tech 2</span>
      <span class="badge badge-accent">Tech 3</span>
      <span class="badge badge-neutral">Tech 4</span>
    </div>
    <div class="flex flex-wrap gap-2 pt-2 justify-end mt-auto">
      <!-- GitHub — always include -->
      <a href="https://github.com/YOUR_REPO" target="_blank" rel="noopener noreferrer" class="btn btn-neutral btn-sm">GitHub</a>

      <!-- Live Demo / Play Game — only if deployed -->
      <a href="https://your-deploy-url" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo</a>

      <!-- Read more — always include, links to modal -->
      <button onclick="document.getElementById('modal-YOURKEY').showModal()" class="btn btn-secondary btn-sm">Read more</button>
    </div>
  </div>
</div>
```

### Rules for the card
- Image: place in `assets/` folder. Use `object-contain bg-base-300` to show full image.
- Badge type: `Web App` / `Mobile App` / `Desktop App` / `2D Game` / `API` — pick one.
- Tech badges: rotate `badge-primary`, `badge-secondary`, `badge-accent`, `badge-neutral`.
- Modal id: format `modal-YOURKEY` — must match the dialog id in `modals.html`.
- **Do NOT put `<dialog>` inside this file.** Dialogs go in `modals.html` only.
- **Do NOT use SVG icons in buttons** — live-server truncates HTML at long SVG paths.
- **Do NOT use apostrophes in text** — causes HTML parse issues when loaded via fetch.

---

## Step 2 — Add the dialog to modals.html

Open `partials/projects/modals.html` and add a new block at the bottom.

The modal follows this fixed 4-section structure:

```html
<!-- ===== Your Project Modal ===== -->
<dialog id="modal-YOURKEY" class="modal">
  <div class="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
    <h3 class="font-bold text-2xl mb-1">Project Name</h3>
    <p class="text-sm text-base-content/60 mb-4">Type · Context · Organization</p>
    <div class="space-y-4 text-base">

      <!-- Section 1: Project overview (2-4 sentences) -->
      <p>
        What the project is, who it is for, team size, and duration.
      </p>

      <!-- Section 2: My role + contributions -->
      <div>
        <p class="font-bold mb-1">My role: Your Role Title</p>
        <p class="text-base-content/80 mb-2">Brief context sentence (e.g. "Led a team of X. Responsible for:").</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Module Name</strong> — what you built and how</li>
          <li><strong>Another Module</strong> — what you built and how</li>
        </ul>
      </div>

      <!-- Section 3: Key achievements and learnings -->
      <div>
        <p class="font-bold mb-1">Key achievements and learnings:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Concrete result or deliverable (e.g. delivered X in Y weeks)</li>
          <li>New technology learned and applied</li>
          <li>Soft skill gained (teamwork, time management, etc.)</li>
        </ul>
      </div>

      <!-- Section 4: Tech stack badges -->
      <div class="flex flex-wrap gap-2">
        <span class="badge badge-primary">Tech 1</span>
        <span class="badge badge-secondary">Tech 2</span>
        <span class="badge badge-accent">Tech 3</span>
        <span class="badge badge-neutral">Tech 4</span>
      </div>

    </div>
    <div class="modal-action">
      <button class="btn" onclick="document.getElementById('modal-YOURKEY').close()">Close</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
```

### Rules for the modal
- `id` must match the `onclick` in the card button exactly.
- Keep `max-h-[90vh] overflow-y-auto` — handles long content with scroll.
- Close button uses `onclick` with the same id.
- `modal-backdrop` form enables click-outside-to-close.
- Always follow the 4-section order: **Overview → My role → Key achievements and learnings → Tech badges**.
- Do NOT use apostrophes in text.

---

## Step 3 — Register in main.js

Open `js/main.js` and add one line to the `projects` array:

```js
const projects = [
  { url: 'partials/projects/stoms.html',       containerId: 'stoms-container' },
  { url: 'partials/projects/koi.html',         containerId: 'koi-container' },
  { url: 'partials/projects/watchstore.html',  containerId: 'watch-container' },
  { url: 'partials/projects/1946studio.html',  containerId: 'studio1946-container' },
  { url: 'partials/projects/firewarrior.html', containerId: 'firewarrior-container' },
  // Add your new project here:
  { url: 'partials/projects/YOURFILE.html',    containerId: 'YOURKEY-container' },
];
```

- `url`: path to your card file
- `containerId`: any unique string ending in `-container`

---

## Badge color reference

| Color | Class | Use for |
|-------|-------|---------|
| Blue | `badge-primary` | Main language / framework |
| Purple | `badge-secondary` | Secondary framework / DB |
| Teal | `badge-accent` | Tools / libraries |
| Gray | `badge-neutral` | Infrastructure / misc |

## Button reference

| Button | Class | When to use |
|--------|-------|-------------|
| GitHub | `btn-neutral` | Always |
| Live Demo / Play Game | `btn-primary` | Only if deployed |
| Read more | `btn-secondary` | Always (links to modal) |

## Current projects

| File | Modal ID | Notes |
|------|----------|-------|
| stoms.html | modal-stoms | 2 buttons |
| koi.html | modal-koi | 2 buttons |
| watchstore.html | modal-watch | 2 buttons |
| 1946studio.html | modal-studio1946 | 3 buttons (has Live Demo) |
| firewarrior.html | modal-firewarrior | 3 buttons (has Play Game) |
