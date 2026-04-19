
const state = {
  docs: [],
  filtered: [],
  activeIndex: -1,
  adminUnlocked: false
};

const els = {
  browseView: document.getElementById('browse-view'),
  adminView: document.getElementById('admin-view'),
  tabBrowse: document.getElementById('tab-browse'),
  tabAdmin: document.getElementById('tab-admin'),
  searchInput: document.getElementById('search-input'),
  clearSearch: document.getElementById('clear-search'),
  resultsList: document.getElementById('results-list'),
  resultsCount: document.getElementById('results-count'),
  docsCount: document.getElementById('docs-count'),
  viewerTitle: document.getElementById('viewer-title'),
  viewerUrl: document.getElementById('viewer-url'),
  viewerContent: document.getElementById('viewer-content'),
  loginCard: document.getElementById('login-card'),
  adminPanel: document.getElementById('admin-panel'),
  loginUsername: document.getElementById('login-username'),
  loginPassword: document.getElementById('login-password'),
  loginBtn: document.getElementById('login-btn'),
  loginStatus: document.getElementById('login-status'),
  importUrl: document.getElementById('import-url'),
  importBtn: document.getElementById('import-btn'),
  importStatus: document.getElementById('import-status'),
  adminDocs: document.getElementById('admin-docs')
};

function switchTab(tab) {
  const browse = tab === 'browse';
  els.browseView.classList.toggle('is-active', browse);
  els.adminView.classList.toggle('is-active', !browse);
  els.tabBrowse.classList.toggle('is-active', browse);
  els.tabAdmin.classList.toggle('is-active', !browse);
}

function setStatus(el, message, kind = '') {
  el.textContent = message;
  el.classList.remove('is-success', 'is-error');
  if (kind) {
    el.classList.add(kind === 'success' ? 'is-success' : 'is-error');
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function renderInline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
}

function renderMarkdown(md) {
  if (!md || !md.trim()) {
    return '<div class="empty-state">This document is empty.</div>';
  }

  const lines = md.replace(/\r/g, '').split('\n');
  let html = '';
  let inCode = false;
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html += `<p>${renderInline(paragraph.join(' '))}</p>`;
    paragraph = [];
  };

  const closeLists = () => {
    if (inUl) { html += '</ul>'; inUl = false; }
    if (inOl) { html += '</ol>'; inOl = false; }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      flushParagraph();
      closeLists();
      html += '</blockquote>';
      inBlockquote = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine;

    if (line.trim().startsWith('```')) {
      flushParagraph();
      closeLists();
      closeBlockquote();
      if (!inCode) {
        inCode = true;
        html += '<pre><code>';
      } else {
        inCode = false;
        html += '</code></pre>';
      }
      continue;
    }

    if (inCode) {
      html += `${escapeHtml(line)}\n`;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeLists();
      closeBlockquote();
      const level = heading[1].length;
      html += `<h${level}>${renderInline(heading[2])}</h${level}>`;
      continue;
    }

    const blockquote = line.match(/^>\s?(.*)$/);
    if (blockquote) {
      if (!inBlockquote) {
        flushParagraph();
        closeLists();
        html += '<blockquote>';
        inBlockquote = true;
      }
      if (!blockquote[1].trim()) {
        flushParagraph();
      } else {
        paragraph.push(blockquote[1].trim());
      }
      continue;
    } else {
      closeBlockquote();
    }

    const ul = line.match(/^[-*+]\s+(.*)$/);
    if (ul) {
      flushParagraph();
      if (!inUl) {
        closeLists();
        html += '<ul>';
        inUl = true;
      }
      html += `<li>${renderInline(ul[1])}</li>`;
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      flushParagraph();
      if (!inOl) {
        closeLists();
        html += '<ol>';
        inOl = true;
      }
      html += `<li>${renderInline(ol[1])}</li>`;
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeLists();
      closeBlockquote();
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeLists();
  closeBlockquote();
  if (inCode) html += '</code></pre>';

  return html || '<div class="empty-state">Nothing to render.</div>';
}

function getSnippet(text) {
  return text.replace(/\s+/g, ' ').trim().slice(0, 110) || 'No preview available.';
}

function filterDocs() {
  const q = els.searchInput.value.trim().toLowerCase();
  if (!q) {
    state.filtered = [...state.docs];
  } else {
    state.filtered = state.docs.filter(doc => {
      const haystack = `${doc.title} ${doc.sourceUrl} ${doc.markdown}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  if (!state.filtered.length) {
    state.activeIndex = -1;
  } else if (state.activeIndex < 0 || state.activeIndex >= state.filtered.length) {
    state.activeIndex = 0;
  }

  renderBrowse();
}

function renderResults() {
  els.resultsList.innerHTML = '';

  if (!state.filtered.length) {
    els.resultsList.innerHTML = '<div class="empty-state">No matching documents found.</div>';
    return;
  }

  state.filtered.forEach((doc, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `result-item${index === state.activeIndex ? ' is-active' : ''}`;
    item.innerHTML = `
      <h4>${escapeHtml(doc.title)}</h4>
      <p class="result-meta">${escapeHtml(getSnippet(doc.markdown))}</p>
    `;
    item.addEventListener('click', () => {
      state.activeIndex = index;
      renderBrowse();
    });
    els.resultsList.appendChild(item);
  });
}

function renderViewer() {
  if (state.activeIndex < 0 || !state.filtered[state.activeIndex]) {
    els.viewerTitle.textContent = 'No document selected';
    els.viewerUrl.textContent = '';
    els.viewerUrl.removeAttribute('href');
    els.viewerContent.className = 'markdown-body empty-state';
    els.viewerContent.innerHTML = 'Search or import a document to start browsing.';
    return;
  }

  const doc = state.filtered[state.activeIndex];
  els.viewerTitle.textContent = doc.title;
  els.viewerUrl.textContent = doc.sourceUrl;
  els.viewerUrl.href = doc.sourceUrl;
  els.viewerContent.className = 'markdown-body';
  els.viewerContent.innerHTML = renderMarkdown(doc.markdown);
}

function renderBrowse() {
  els.docsCount.textContent = String(state.docs.length);
  els.resultsCount.textContent = `${state.filtered.length} match${state.filtered.length === 1 ? '' : 'es'}`;
  renderResults();
  renderViewer();
}

function renderAdminDocs() {
  els.adminDocs.innerHTML = '';
  if (!state.docs.length) {
    els.adminDocs.innerHTML = '<div class="empty-state">No documents imported yet.</div>';
    return;
  }

  state.docs.forEach(doc => {
    const item = document.createElement('div');
    item.className = 'admin-doc-item';
    item.innerHTML = `
      <h4>${escapeHtml(doc.title)}</h4>
      <p>${escapeHtml(doc.sourceUrl)}</p>
    `;
    els.adminDocs.appendChild(item);
  });
}

function renderAdmin() {
  els.loginCard.classList.toggle('is-hidden', state.adminUnlocked);
  els.adminPanel.classList.toggle('is-hidden', !state.adminUnlocked);
  renderAdminDocs();
}

async function loadDocuments() {
  const res = await fetch('/api/documents');
  const data = await res.json();
  state.docs = Array.isArray(data.documents) ? data.documents : [];
  state.filtered = [...state.docs];
  state.activeIndex = state.filtered.length ? 0 : -1;
  renderBrowse();
  renderAdmin();
}

function attemptLogin() {
  const username = els.loginUsername.value.trim();
  const password = els.loginPassword.value;

  if (username === 'admin' && password === 'admin123') {
    state.adminUnlocked = true;
    setStatus(els.loginStatus, 'Admin access unlocked.', 'success');
    renderAdmin();
    return;
  }

  state.adminUnlocked = false;
  setStatus(els.loginStatus, 'Invalid username or password.', 'error');
  renderAdmin();
}

async function importDocument() {
  const url = els.importUrl.value.trim();
  if (!url) {
    setStatus(els.importStatus, 'Please paste a markdown URL first.', 'error');
    return;
  }

  setStatus(els.importStatus, 'Importing document...');
  try {
    const res = await fetch('/api/import', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: url
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(els.importStatus, data.error || 'Import failed.', 'error');
      return;
    }

    state.docs = Array.isArray(data.documents) ? data.documents : [];
    state.filtered = [...state.docs];
    state.activeIndex = state.filtered.length ? state.filtered.length - 1 : -1;
    els.importUrl.value = '';
    setStatus(els.importStatus, 'Document imported successfully.', 'success');
    renderBrowse();
    renderAdmin();
    switchTab('browse');
  } catch (error) {
    setStatus(els.importStatus, 'Import failed. Check the server terminal and the URL.', 'error');
  }
}

function bindEvents() {
  els.tabBrowse.addEventListener('click', () => switchTab('browse'));
  els.tabAdmin.addEventListener('click', () => switchTab('admin'));
  els.searchInput.addEventListener('input', filterDocs);
  els.clearSearch.addEventListener('click', () => {
    els.searchInput.value = '';
    filterDocs();
  });
  els.loginBtn.addEventListener('click', attemptLogin);
  els.importBtn.addEventListener('click', importDocument);
  els.loginPassword.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') attemptLogin();
  });
  els.importUrl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') importDocument();
  });
}

bindEvents();
loadDocuments().catch(() => {
  setStatus(els.importStatus, 'Failed to load initial documents from the server.', 'error');
});
