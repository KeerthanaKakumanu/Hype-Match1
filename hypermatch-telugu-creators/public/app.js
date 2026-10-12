const PAGE_SIZE = 12;
let allCreators = [];
let filtered = [];
let currentPage = 1;
let shortlist = JSON.parse(localStorage.getItem('hm_shortlist') || '[]');
let viewMode = 'grid';

async function loadData() {
  try {
    const res = await fetch('../data/creators.json');
    allCreators = await res.json();
  } catch (e) {
    // fallback for file:// or different path
    try {
      const res2 = await fetch('/data/creators.json');
      allCreators = await res2.json();
    } catch (e2) {
      console.error('Could not load creators.json', e2);
      document.getElementById('creatorGrid').innerHTML =
        '<div class="empty">Unable to load dataset. Place creators.json in /data and serve the site.</div>';
      return;
    }
  }
  document.getElementById('totalCount').textContent = allCreators.length;
  document.getElementById('verifiedCount').textContent = allCreators.filter(c => c.verification_status?.includes('Verified')).length;
  applyFilters();
  updateShortlistUI();
}

function applyFilters() {
  const q = (document.getElementById('searchInput').value || '').toLowerCase().trim();
  const platform = document.getElementById('platformFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const location = document.getElementById('locationFilter').value;
  const size = document.getElementById('sizeFilter').value;
  const hideCelebs = document.getElementById('celebrityFilter').checked;

  filtered = allCreators.filter(c => {
    if (hideCelebs && c.is_celebrity) return false;
    if (platform && c.platform !== platform) return false;
    if (category && !(c.category_tags || []).includes(category) && !(c.niche || []).some(n => n.toLowerCase().includes(category))) return false;
    if (location) {
      const loc = `${c.city || ''} ${c.state || ''}`.toLowerCase();
      if (!loc.includes(location.toLowerCase())) return false;
    }
    if (size) {
      const f = (c.followers_or_subscribers || '').toLowerCase();
      const isMacro = f.includes('m') || parseFloat(f) >= 1000000;
      const isMicro = f.includes('k') && parseFloat(f) < 100;
      if (size === 'macro' && !isMacro) return false;
      if (size === 'micro' && !isMicro && isMacro) return false;
      if (size === 'mid' && (isMacro || isMicro)) return false;
    }
    if (q) {
      const hay = `${c.name} ${c.bio} ${(c.niche||[]).join(' ')} ${c.city} ${c.state}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  currentPage = 1;
  render();
}

function render() {
  const grid = document.getElementById('creatorGrid');
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  document.getElementById('resultsInfo').textContent =
    `Showing ${filtered.length === 0 ? 0 : start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} creators`;
  document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage <= 1;
  document.getElementById('nextPage').disabled = currentPage >= totalPages;

  if (pageItems.length === 0) {
    grid.innerHTML = '<div class="empty">No creators match your filters. Try adjusting search or filters.</div>';
    return;
  }

  grid.className = 'creator-grid' + (viewMode === 'list' ? ' list-view' : '');
  grid.innerHTML = pageItems.map(c => cardHTML(c)).join('');

  // bind buttons
  grid.querySelectorAll('[data-save]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleShortlist(btn.dataset.save);
    });
  });
  grid.querySelectorAll('[data-detail]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDetail(btn.dataset.detail);
    });
  });
  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openDetail(card.dataset.id));
  });
}

function cardHTML(c) {
  const initial = (c.name || '?').charAt(0).toUpperCase();
  const saved = shortlist.includes(c.id);
  const niche = (c.niche || []).slice(0, 2).join(' · ') || 'Creator';
  return `
    <article class="card" data-id="${c.id}">
      <div class="card-img">
        ${initial}
        <span class="platform-tag">${c.platform || ''}</span>
      </div>
      <div class="card-body">
        <div>
          <div class="card-name">${escapeHtml(c.name)}</div>
          <div class="card-niche">${escapeHtml(niche)}</div>
          <div class="card-bio">${escapeHtml(c.bio || '')}</div>
          <div class="card-meta">
            <span class="tag">${escapeHtml(c.followers_or_subscribers || 'N/A')}</span>
            ${c.city ? `<span class="tag">${escapeHtml(c.city)}</span>` : ''}
            ${c.is_celebrity ? `<span class="tag">Public figure</span>` : ''}
          </div>
        </div>
        <div class="card-actions">
          <button class="btn btn-outline" data-detail="${c.id}">Details</button>
          <button class="btn ${saved ? 'saved' : 'btn-outline'}" data-save="${c.id}">${saved ? 'Saved' : 'Shortlist'}</button>
        </div>
      </div>
    </article>
  `;
}

function toggleShortlist(id) {
  const idx = shortlist.indexOf(id);
  if (idx >= 0) shortlist.splice(idx, 1);
  else shortlist.push(id);
  localStorage.setItem('hm_shortlist', JSON.stringify(shortlist));
  updateShortlistUI();
  render();
}

function updateShortlistUI() {
  document.getElementById('shortlistCount').textContent = shortlist.length;
  const content = document.getElementById('shortlistContent');
  if (shortlist.length === 0) {
    content.innerHTML = '<p class="empty" style="padding:1rem 0">No creators shortlisted yet.</p>';
    return;
  }
  content.innerHTML = shortlist.map(id => {
    const c = allCreators.find(x => x.id === id);
    if (!c) return '';
    return `<div class="shortlist-item">
      <span>${escapeHtml(c.name)}</span>
      <button class="btn-icon" data-remove="${id}" style="font-size:1.1rem">×</button>
    </div>`;
  }).join('');
  content.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => toggleShortlist(btn.dataset.remove));
  });
}

function openDetail(id) {
  const c = allCreators.find(x => x.id === id);
  if (!c) return;
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <h2>${escapeHtml(c.name)}</h2>
    <p style="color:var(--accent);font-size:0.9rem;margin-bottom:0.75rem">${(c.niche||[]).join(' · ')}</p>
    <p>${escapeHtml(c.bio || '')}</p>
    <div class="modal-meta">
      <p><strong>Platform:</strong> ${escapeHtml(c.platform || 'N/A')}</p>
      <p><strong>Followers / Subs:</strong> ${escapeHtml(c.followers_or_subscribers || 'Not available')}</p>
      <p><strong>Location:</strong> ${escapeHtml([c.city, c.state].filter(Boolean).join(', ') || 'Not available')}</p>
      <p><strong>Language:</strong> ${escapeHtml(c.primary_language || 'Telugu')}</p>
      <p><strong>Content style:</strong> ${escapeHtml(c.content_style || 'N/A')}</p>
      <p><strong>Audience:</strong> ${escapeHtml(c.audience_type || 'N/A')}</p>
      <p><strong>Collaboration fit:</strong> ${escapeHtml(c.collaboration_suitability || 'N/A')}</p>
      <p><strong>Verification:</strong> ${escapeHtml(c.verification_status || 'N/A')} · Last checked ${escapeHtml(c.last_checked || '')}</p>
      ${c.profile_url && c.profile_url !== 'Not available' ? `<p><a href="${c.profile_url}" target="_blank" rel="noopener">Open YouTube / primary profile →</a></p>` : ''}
      ${c.instagram_url && c.instagram_url !== 'Not available' ? `<p><a href="${c.instagram_url}" target="_blank" rel="noopener">Open Instagram →</a></p>` : ''}
    </div>
    <button class="btn ${shortlist.includes(c.id) ? 'saved' : 'btn-primary'}" id="modalSave">${shortlist.includes(c.id) ? 'Remove from shortlist' : 'Add to shortlist'}</button>
  `;
  document.getElementById('modalSave').onclick = () => {
    toggleShortlist(c.id);
    openDetail(c.id);
  };
  document.getElementById('detailModal').classList.add('show');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', debounce(applyFilters, 250));
['platformFilter','categoryFilter','locationFilter','sizeFilter','celebrityFilter'].forEach(id => {
  document.getElementById(id).addEventListener('change', applyFilters);
});
document.getElementById('prevPage').addEventListener('click', () => { if (currentPage > 1) { currentPage--; render(); } });
document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  if (currentPage < totalPages) { currentPage++; render(); }
});
document.getElementById('gridView').addEventListener('click', () => {
  viewMode = 'grid';
  document.getElementById('gridView').classList.add('active');
  document.getElementById('listView').classList.remove('active');
  render();
});
document.getElementById('listView').addEventListener('click', () => {
  viewMode = 'list';
  document.getElementById('listView').classList.add('active');
  document.getElementById('gridView').classList.remove('active');
  render();
});
document.getElementById('shortlistBtn').addEventListener('click', () => {
  document.getElementById('shortlistDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('show');
});
document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
document.getElementById('clearShortlist').addEventListener('click', () => {
  shortlist = [];
  localStorage.setItem('hm_shortlist', '[]');
  updateShortlistUI();
  render();
});
document.getElementById('exportShortlist').addEventListener('click', () => {
  const data = shortlist.map(id => allCreators.find(c => c.id === id)).filter(Boolean);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'hypermatch-shortlist.json';
  a.click();
});
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('detailModal').classList.remove('show');
});
document.getElementById('detailModal').addEventListener('click', (e) => {
  if (e.target.id === 'detailModal') document.getElementById('detailModal').classList.remove('show');
});

function closeDrawer() {
  document.getElementById('shortlistDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

loadData();
