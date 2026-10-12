const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
let creators = [];
let saved = new Set();
let showSaved = false;
const grid = $('#creatorGrid');
const count = $('#resultCount');
const uniqueCreators = rows => {
  const seen = new Set();
  return rows.filter(c => {
    const key = `${(c.platform||'').toLowerCase()}|${(c.handle||'').toLowerCase()}`;
    if (!c.name || !c.handle || (!c.instagram && !c.youtube) || seen.has(key)) return false;
    seen.add(key); return true;
  });
};
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const avatarUrl = c => c.imageUrl || (c.platform === 'YouTube' ? `https://unavatar.io/youtube/${encodeURIComponent(c.handle)}` : `https://unavatar.io/instagram/${encodeURIComponent(c.handle)}`);
const socialUrl = c => c.instagram || c.youtube;
const platformLabel = c => c.instagram && c.youtube ? 'Instagram + YouTube' : c.youtube ? 'YouTube' : 'Instagram';
function render() {
  const q = $('#search').value.trim().toLowerCase();
  const niche = $('#nicheFilter').value;
  const platform = $('#platformFilter').value;
  const rows = creators.filter(c => {
    const text = `${c.name} ${c.handle} ${c.niche} ${c.bio} ${c.location}`.toLowerCase();
    return (!q || text.includes(q)) && (niche==='all' || c.niche===niche) && (platform==='all' || platformLabel(c)===platform) && (!showSaved || saved.has(c.id));
  });
  count.textContent = rows.length;
  $('#savedCount').textContent = saved.size;
  grid.innerHTML = rows.map(c => `<article class="creator-card" data-id="${esc(c.id)}">
    <div class="creator-photo-wrap"><img class="creator-photo" loading="lazy" src="${esc(avatarUrl(c))}" alt="${esc(c.name)} profile photo" referrerpolicy="no-referrer"><span class="creator-tag">${esc(c.niche)}</span><button class="save-btn ${saved.has(c.id)?'saved':''}" data-save="${esc(c.id)}" aria-label="${saved.has(c.id)?'Remove from':'Add to'} shortlist">${saved.has(c.id)?'♥':'♡'}</button></div>
    <div class="creator-info"><div class="creator-name-row"><div class="creator-name" title="${esc(c.name)}">${esc(c.name)}</div><span class="verified-dot" title="Public profile link listed">↗</span></div><div class="creator-handle">@${esc(c.handle)}</div><p class="creator-bio">${esc(c.bio)}</p><div class="tag-row"><span class="niche-tag">${esc(c.niche)}</span><span class="platform-tag">${esc(platformLabel(c))}</span></div><div class="creator-actions"><button class="details-btn" data-details="${esc(c.id)}">View details</button><a class="social-btn" href="${esc(socialUrl(c))}" target="_blank" rel="noopener noreferrer">Open profile ↗</a></div></div></article>`).join('');
  $('#emptyState').hidden = rows.length !== 0;
  // Never leave a broken or fake portrait visible. The card is removed if the public avatar service cannot resolve a real profile image.
  $$('.creator-photo', grid).forEach(img => {
    img.addEventListener('error', () => { const card = img.closest('.creator-card'); if (card) card.remove(); updateVisibleCount(); }, {once:true});
    img.addEventListener('load', () => { if (img.naturalWidth < 40 || img.naturalHeight < 40) { const card=img.closest('.creator-card'); if(card) card.remove(); updateVisibleCount(); } }, {once:true});
  });
}
function updateVisibleCount(){ count.textContent = $$('.creator-card',grid).length; $('#emptyState').hidden = $$('.creator-card',grid).length !== 0; }
function openProfile(id) {
  const c = creators.find(x => x.id === id); if (!c) return;
  $('#profileContent').innerHTML = `<div class="profile-head"><img src="${esc(avatarUrl(c))}" alt="${esc(c.name)}" onerror="this.style.display='none'"><div><h2 id="profileName">${esc(c.name)}</h2><p>@${esc(c.handle)} · ${esc(c.location || 'Location not independently confirmed')}</p><div class="tag-row"><span class="niche-tag">${esc(c.niche)}</span><span class="platform-tag">${esc(platformLabel(c))}</span></div></div></div><div class="profile-desc">${esc(c.bio)}<br><br><b>Before outreach:</b> check the linked account for current content, audience, location and business contact details. Public-directory listings can become outdated.</div><div class="profile-links">${c.instagram?`<a href="${esc(c.instagram)}" target="_blank" rel="noopener">Instagram ↗</a>`:''}${c.youtube?`<a href="${esc(c.youtube)}" target="_blank" rel="noopener">YouTube ↗</a>`:''}<button data-save="${esc(c.id)}">${saved.has(c.id)?'♥ Saved':'♡ Add to shortlist'}</button></div><p class="profile-source">Directory source: <a href="${esc(c.source||'#')}" target="_blank" rel="noopener">open source ↗</a>. This is a lead, not an endorsement or a guarantee of audience metrics.</p>`;
  $('#profileModal').hidden = false;
}
function openBrief(){ $('#briefModal').hidden = false; }
function closeModal(id){ $('#'+id).hidden = true; }
function toast(text){ const node=$('#copyStatus'); if(node) node.textContent=text; }
fetch('creators.json').then(r=>{if(!r.ok)throw new Error('Could not load creator directory');return r.json()}).then(data=>{creators=uniqueCreators(data);render()}).catch(err=>{grid.innerHTML=`<div class="empty-state"><h3>Creator directory could not load.</h3><p>Open this project through a local server or deploy it to a static host; do not open index.html as a file.</p><small>${esc(err.message)}</small></div>`});
$('#search').addEventListener('input',render); $('#nicheFilter').addEventListener('change',render); $('#platformFilter').addEventListener('change',render);
$('#savedFilter').addEventListener('click',()=>{showSaved=!showSaved;$('#savedFilter').classList.toggle('active',showSaved);render()});
$('#clearFilters').addEventListener('click',()=>{$('#search').value='';$('#nicheFilter').value='all';$('#platformFilter').value='all';showSaved=false;$('#savedFilter').classList.remove('active');render()});
$('#creatorGrid').addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save){const id=save.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);$('#savedCount').textContent=saved.size;render();if(!$('#profileModal').hidden)openProfile(id);return}const details=e.target.closest('[data-details]');if(details)openProfile(details.dataset.details)});
$('#profileContent').addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save){const id=save.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);$('#savedCount').textContent=saved.size;openProfile(id);render()}});
$('#openBrief').addEventListener('click',openBrief);$('#heroBrief').addEventListener('click',openBrief);
$$('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close)));
$('#briefForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const shortlist=creators.filter(c=>saved.has(c.id));const txt=`HYPEMATCH — CAMPAIGN BRIEF\n\nBrand: ${f.get('brand')}\nGoal: ${f.get('goal')}\nCreator niche: ${f.get('niche')}\nBudget: ${f.get('budget')||'To be discussed'}\nPlatform: ${f.get('platform')}\n\nCampaign details:\n${f.get('details')||'To be discussed'}\n\nShortlisted creators (${shortlist.length}):\n${shortlist.length?shortlist.map(c=>`• ${c.name} — ${socialUrl(c)}`).join('\n'):'No creators shortlisted yet.'}\n\nPrepared with HypeMatch — Right Creator. Right Brand. Right Hype.`;$('#briefText').textContent=txt;$('#briefOutput').hidden=false;toast('')});
$('#copyBrief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#briefText').textContent);toast('Brief copied. You can paste it into an email or document.')}catch(e){toast('Select the brief text and copy it manually; clipboard access is blocked in this browser.')}});
$('#mobileMenu').addEventListener('click',()=>{$('.topbar nav').classList.toggle('open')});$$('.topbar nav a').forEach(a=>a.addEventListener('click',()=>$('.topbar nav').classList.remove('open')));
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search').focus()}if(e.key==='Escape'){closeModal('briefModal');closeModal('profileModal')}});
