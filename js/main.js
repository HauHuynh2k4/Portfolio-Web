// -------------------- Load partial HTML --------------------
async function loadPartial(url, containerId, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const response = await fetch(url);
  if (!response.ok) {
    container.innerHTML = `<p>Could not load ${url}</p>`;
    return;
  }

  const html = await response.text();
  container.innerHTML = html;

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

// -------------------- Projects Pagination --------------------
const projects = [
  { url: 'partials/projects/stoms.html',      containerId: 'stoms-container' },
  { url: 'partials/projects/koi.html',        containerId: 'koi-container' },
  { url: 'partials/projects/watchstore.html', containerId: 'watch-container' },
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
