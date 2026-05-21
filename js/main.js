// -------------------- Load partial HTML --------------------
async function loadPartial(url, containerId, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const response = await fetch(url + '?v=' + Date.now());
  if (!response.ok) {
    container.innerHTML = `<p>Could not load ${url}</p>`;
    return;
  }

  const html = await response.text();

  // Use <template> for safe fragment parsing — handles SVG, dialogs, etc.
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  container.innerHTML = '';
  container.appendChild(tpl.content.cloneNode(true));
  // Move any dialogs to body so they aren't clipped by grid/overflow containers
  container.querySelectorAll('dialog').forEach(dialog => {
    document.body.appendChild(dialog);
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });
  if (containerId === 'footer-container') {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }

  if (typeof callback === 'function') callback();
}

// -------------------- Load static partials --------------------
loadPartial('partials/presentation.html', 'presentation-container');
loadPartial('partials/experience.html', 'experience-container');
loadPartial('partials/footer.html', 'footer-container');
loadPartial('partials/projects/modals.html', 'modals-container');

// -------------------- Projects Pagination --------------------
const projects = [
  { url: 'partials/projects/stoms.html',       containerId: 'stoms-container' },
  { url: 'partials/projects/asa.html',         containerId: 'asa-container' },
  { url: 'partials/projects/koi.html',         containerId: 'koi-container' },
  { url: 'partials/projects/watchstore.html',  containerId: 'watch-container' },
  { url: 'partials/projects/1946studio.html',  containerId: 'studio1946-container' },
  { url: 'partials/projects/firewarrior.html', containerId: 'firewarrior-container' },
  { url: 'partials/projects/icequest.html',    containerId: 'icequest-container' },
  { url: 'partials/projects/spaceexplorer.html', containerId: 'spaceexplorer-container' },
];

const projectsPerPage = 6;
let currentPage = 1;

async function renderProjectsPage() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const currentHeight = container.offsetHeight;
  if (currentHeight > 0) {
    container.style.minHeight = `${currentHeight}px`;
    container.style.transition = 'min-height 0.3s ease-in-out';
  }

  container.innerHTML = '';

  const start = (currentPage - 1) * projectsPerPage;
  const end   = start + projectsPerPage;
  const pageProjects = projects.slice(start, end);

  for (const proj of pageProjects) {
    const div = document.createElement('div');
    div.id = proj.containerId;
    div.className = 'h-full';
    container.appendChild(div);
    await loadPartial(proj.url, proj.containerId);
  }

  setTimeout(() => {
    container.style.minHeight = '';
    setTimeout(() => { container.style.transition = ''; }, 300);
  }, 50);

  const pageInfo = document.getElementById('page-info');
  if (pageInfo) {
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(projects.length / projectsPerPage)}`;
  }

  updatePaginationButtons();
}

function updatePaginationButtons() {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === Math.ceil(projects.length / projectsPerPage);
}

loadPartial('partials/projects.html', 'projects-container-wrapper', () => {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; renderProjectsPage(); }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < Math.ceil(projects.length / projectsPerPage)) { currentPage++; renderProjectsPage(); }
    });
  }

  renderProjectsPage();
});
