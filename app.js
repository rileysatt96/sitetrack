// SiteTrack — Main App Logic

let currentUser = null;
let allEquipment = [];
let allSites = [];
let allLog = [];
let scanner = null;
let scannedEquipmentId = null;
// ─── AUTH ───────────────────────────────────────────────────────────────────

function onPinInput(val) {
  const clean = val.replace(/[^0-9]/g, '').slice(0, 4);
  document.getElementById('pinInput').value = clean;
  document.getElementById('pinError').classList.add('hidden');
  if (clean.length === 4) {
    setTimeout(() => attemptPinLogin(clean), 200);
  }
}

async function attemptPinLogin(pin) {
  const input = document.getElementById('pinInput');
  const err = document.getElementById('pinError');
  input.disabled = true;

  try {
    const { data, error } = await db
      .from('users')
      .select('*')
      .eq('pin', pin)
      .single();

    if (error || !data) {
      input.value = '';
      input.disabled = false;
      err.classList.remove('hidden');
      input.classList.add('shake');
      setTimeout(() => { input.classList.remove('shake'); input.focus(); }, 500);
      return;
    }

    currentUser = data;
    document.getElementById('userChip').textContent = data.name;
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('active');
    input.value = '';
    input.disabled = false;

    if (data.role === 'admin') {
      document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    }
    const pmTitles = ['Project Manager', 'Assistant Project Manager'];
    if (data.role === 'admin' && data.job_title && pmTitles.some(t => data.job_title.includes(t))) {
      document.querySelectorAll('.pm-only').forEach(el => el.classList.remove('hidden'));
    }

    await Promise.all([loadSites(), loadEquipment(), loadLog()]);
    renderInventory();
    renderSites();
    renderLog();
    populateSiteDropdowns();
    updateStats();

  } catch (e) {
    input.value = '';
    input.disabled = false;
    err.textContent = 'Connection error. Try again.';
    err.classList.remove('hidden');
  }
}

function doLogout() {
  currentUser = null;
  allEquipment = [];
  allSites = [];
  allLog = [];
  scannedEquipmentId = null;
  const pinInput = document.getElementById('pinInput');
  if (pinInput) { pinInput.value = ''; pinInput.disabled = false; }
  document.getElementById('pinError').classList.add('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('active');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginScreen').classList.add('active');
  switchTab('inventory', document.querySelector('.tab[data-tab="inventory"]'));
}

// ─── DATA LOADING ────────────────────────────────────────────────────────────

async function loadEquipment() {
  const { data } = await db
    .from('equipment')
    .select(`*, current_site:jobsites(id,name), last_scanned_user:users(name)`)
    .order('item_code');
  allEquipment = data || [];
}

async function loadSites() {
  const { data } = await db
    .from('jobsites')
    .select('*')
    .order('name');
  allSites = data || [];
}

async function loadLog() {
  const { data } = await db
    .from('scan_log')
    .select(`*, equipment:equipment(item_code,name), user:users(name), site:jobsites(name)`)
    .order('scanned_at', { ascending: false })
    .limit(200);
  allLog = data || [];
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function switchTab(name, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.add('hidden');
    c.classList.remove('active');
  });
  document.getElementById('tab-' + name).classList.remove('hidden');
  document.getElementById('tab-' + name).classList.add('active');
  if (name !== 'scan') stopScan();
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function updateStats() {
  const total = allEquipment.length;
  const avail = allEquipment.filter(i => i.status === 'Available').length;
  const out = allEquipment.filter(i => i.status === 'Out').length;
  const missing = allEquipment.filter(i => i.status === 'Missing').length;
  const overdue = allEquipment.filter(i => isOverdue(i)).length;

  document.getElementById('statsRow').innerHTML = `
    <div class="stat"><div class="stat-val">${total}</div><div class="stat-lbl">Total</div></div>
    <div class="stat"><div class="stat-val green">${avail}</div><div class="stat-lbl">Available</div></div>
    <div class="stat"><div class="stat-val amber">${out}</div><div class="stat-lbl">Out</div></div>
    <div class="stat ${missing > 0 ? 'alert' : ''}"><div class="stat-val red">${missing}</div><div class="stat-lbl">Missing</div></div>
    <div class="stat ${overdue > 0 ? 'alert' : ''}"><div class="stat-val amber">${overdue}</div><div class="stat-lbl">Overdue</div></div>
  `;
}

function isOverdue(item) {
  if (item.status !== 'Out' || !item.last_scanned_at) return false;
  const days = (Date.now() - new Date(item.last_scanned_at)) / 86400000;
  return days > CONFIG.overdueThresholdDays;
}

// ─── INVENTORY ───────────────────────────────────────────────────────────────

function renderInventory() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const fType = document.getElementById('filterType').value;
  const fSite = document.getElementById('filterSite').value;
  const fStatus = document.getElementById('filterStatus').value;

  const filtered = allEquipment.filter(i =>
    (!search || i.name.toLowerCase().includes(search) || i.item_code.toLowerCase().includes(search)) &&
    (!fType || i.type === fType) &&
    (!fSite || i.current_site_id === fSite) &&
    (!fStatus || i.status === fStatus)
  );

  const tbody = document.getElementById('inventoryBody');
  const empty = document.getElementById('inventoryEmpty');

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    tbody.innerHTML = filtered.map(item => `
      <tr onclick="showItemDetail('${item.id}')" style="cursor:pointer">
        <td class="code-cell">${item.item_code}</td>
        <td class="name-cell">${item.name}</td>
        <td class="type-cell">${item.type}</td>
        <td class="site-cell">${item.current_site ? item.current_site.name : '—'}</td>
        <td><span class="badge badge-${item.status.toLowerCase()}">${item.status}</span>${isOverdue(item) ? '<span class="overdue-dot" title="Overdue">!</span>' : ''}</td>
        <td class="action-cell" onclick="event.stopPropagation()">
          ${item.status === 'Missing'
            ? `<button class="row-btn found" onclick="quickAction('${item.id}','found')">Mark found</button>`
            : `<span style="font-size:11px;color:var(--hint)">Use Scan tab</span>`
          }
        </td>
      </tr>
    `).join('');
  }

  renderOverdueSection();
}

function renderOverdueSection() {
  const overdue = allEquipment.filter(isOverdue);
  const sec = document.getElementById('overdueSection');
  if (overdue.length === 0) { sec.innerHTML = ''; return; }
  sec.innerHTML = `
    <div class="overdue-banner">
      <div class="overdue-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        ${overdue.length} item${overdue.length > 1 ? 's' : ''} overdue (${CONFIG.overdueThresholdDays}+ days out)
      </div>
      ${overdue.map(i => `
        <div class="overdue-item">
          <span>${i.name}</span>
          <span class="overdue-meta">${i.current_site ? i.current_site.name : ''} · ${daysSince(i.last_scanned_at)}d ago</span>
        </div>
      `).join('')}
    </div>
  `;
}

function daysSince(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
}

async function quickAction(equipId, action) {
  const item = allEquipment.find(i => i.id === equipId);
  if (!item) return;
  if (action === 'checkout') {
    const siteId = allSites.find(s => s.status === 'active')?.id;
    await performCheckout(equipId, siteId, '');
  } else if (action === 'checkin') {
    await performCheckin(equipId, '');
  } else if (action === 'found') {
    await performCheckin(equipId, 'Marked as found');
    await db.from('scan_log').insert({ equipment_id: equipId, user_id: currentUser.id, action: 'mark_found' });
  }
}

function showItemDetail(equipId) {
  const item = allEquipment.find(i => i.id === equipId);
  if (!item) return;
  const history = allLog.filter(l => l.equipment_id === equipId).slice(0, 10);
  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalBody').innerHTML = `
    <div class="detail-grid">
      <div class="detail-row"><span>ID</span><span class="mono">${item.item_code}</span></div>
      <div class="detail-row"><span>Type</span><span>${item.type}</span></div>
      <div class="detail-row"><span>Status</span><span><span class="badge badge-${item.status.toLowerCase()}">${item.status}</span></span></div>
      <div class="detail-row"><span>Site</span><span>${item.current_site ? item.current_site.name : '—'}</span></div>
      <div class="detail-row"><span>Condition</span><span>${item.condition}</span></div>
      ${item.serial_number ? `<div class="detail-row"><span>Serial</span><span class="mono">${item.serial_number}</span></div>` : ''}
      ${item.notes ? `<div class="detail-row"><span>Notes</span><span>${item.notes}</span></div>` : ''}
    </div>
    <div class="detail-condition">
      <label style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--muted)">Update condition</label>
      <div class="condition-row">
        <select id="detailCondition" onchange="updateCondition('${item.id}', this.value)">
          <option value="Good" ${item.condition === 'Good' ? 'selected' : ''}>Good</option>
          <option value="Fair" ${item.condition === 'Fair' ? 'selected' : ''}>Fair</option>
          <option value="Poor" ${item.condition === 'Poor' ? 'selected' : ''}>Poor</option>
          <option value="Out of Service" ${item.condition === 'Out of Service' ? 'selected' : ''}>Out of Service</option>
        </select>
      </div>
    </div>
    <div class="detail-actions">
      ${item.status === 'Out' ? `<button class="btn-primary" onclick="closeModal();scannedEquipmentId='${item.id}';switchTab('scan',document.querySelector('.tab[data-tab=scan]'))">Scan to return</button>` : ''}
      ${item.status !== 'Missing' ? `<button class="btn-ghost red" onclick="markMissing('${item.id}')">Mark as missing</button>` : ''}
    </div>
    <h4 style="margin:1.5rem 0 0.75rem;font-size:13px;color:var(--muted)">Recent activity</h4>
    ${history.length === 0 ? '<p style="font-size:13px;color:var(--muted)">No activity yet</p>' : history.map(l => `
      <div class="log-entry">
        <div class="log-action-badge ${l.action}">${actionLabel(l.action)}</div>
        <div class="log-body">
          <div class="log-meta">${l.user ? l.user.name : '—'} · ${l.site ? l.site.name : 'Yard'} · ${timeAgo(l.scanned_at)}</div>
          ${l.photo_path ? `<div class="log-photo" data-path="${l.photo_path}">
            <img src="" alt="Drop-off photo" style="display:none;max-width:160px;max-height:110px;border-radius:6px;margin-top:6px;cursor:pointer;border:1px solid var(--border);" onclick="viewPhoto(this)" />
            <span class="photo-loading" style="font-size:11px;color:var(--muted)">📷 Loading photo...</span>
          </div>` : ''}
        </div>
      </div>
    `).join('')}
  `;
  document.getElementById('modalOverlay').classList.remove('hidden');

  // Load signed URLs for any photos in this modal
  document.querySelectorAll('#modalBody .log-photo').forEach(async (div) => {
    const path = div.dataset.path;
    const { data } = await db.storage.from('checkout-photos').createSignedUrl(path, 3600);
    if (data && data.signedUrl) {
      const img = div.querySelector('img');
      const loading = div.querySelector('.photo-loading');
      img.src = data.signedUrl;
      img.style.display = 'block';
      if (loading) loading.remove();
    }
  });
}

async function updateCondition(equipId, condition) {
  const { error } = await db.from('equipment')
    .update({ condition })
    .eq('id', equipId);
  if (error) { showToast('Error updating condition'); return; }
  const item = allEquipment.find(i => i.id === equipId);
  if (item) item.condition = condition;
  showToast(`Condition updated to "${condition}" ✓`);
  renderInventory();
}

async function markMissing(equipId) {
  closeModal();
  await db.from('equipment').update({ status: 'Missing', current_site_id: null }).eq('id', equipId);
  await db.from('scan_log').insert({ equipment_id: equipId, user_id: currentUser.id, action: 'mark_missing' });
  await loadEquipment();
  await loadLog();
  renderInventory();
  updateStats();
  showToast('Item marked as missing');
}

// ─── SCAN ─────────────────────────────────────────────────────────────────────

function startScan() {
  if (scanner) { stopScan(); return; }
  const vf = document.getElementById('scanViewfinder');
  vf.innerHTML = `<div id="qr-reader" style="width:100%;height:100%"></div>`;

  scanner = new Html5Qrcode('qr-reader');
  scanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 200, height: 200 } },
    (decodedText) => {
      stopScan();
      lookupEquipment(decodedText.trim());
    },
    () => {}
  ).catch(() => {
    showToast('Camera access denied — use manual entry');
    resetScanViewfinder();
  });

  document.getElementById('scanBtn').textContent = 'Stop scanner';
}

function stopScan() {
  if (scanner) {
    scanner.stop().catch(() => {});
    scanner = null;
  }
  resetScanViewfinder();
}

function resetScanViewfinder() {
  const vf = document.getElementById('scanViewfinder');
  vf.innerHTML = `
    <div class="scan-idle" id="scanIdle">
      <div class="scan-corners">
        <span class="sc tl"></span><span class="sc tr"></span>
        <span class="sc bl"></span><span class="sc br"></span>
      </div>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h.01M14 17h.01M17 14h.01M17 17h.01M20 14h.01M20 17h.01M20 20h.01M17 20h.01M14 20h.01"/></svg>
      <p>Tap to open camera scanner</p>
      <span class="scan-hint">or enter ID manually below</span>
    </div>
  `;
  document.getElementById('scanBtn').innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
    Open Camera
  `;
}

function manualLookup() {
  const code = document.getElementById('manualId').value.trim().toUpperCase();
  if (!code) return;
  lookupEquipment(code);
}

function lookupEquipment(code) {
  const item = allEquipment.find(i => i.item_code.toUpperCase() === code.toUpperCase() || i.id === code);
  if (!item) { showToast(`Item "${code}" not found`); return; }
  scannedEquipmentId = item.id;
  showScanResult(item);
}

function showScanResult(item) {
  document.getElementById('resultName').textContent = item.name;
  document.getElementById('resultMeta').textContent = `${item.item_code} · ${item.type}${item.current_site ? ' · ' + item.current_site.name : ''}`;
  const badge = document.getElementById('resultBadge');
  badge.textContent = item.status;
  badge.className = `result-badge badge-${item.status.toLowerCase()}`;
  document.getElementById('scanResult').classList.remove('hidden');
  document.getElementById('scanResult').scrollIntoView({ behavior: 'smooth' });

  const siteSelect = document.getElementById('scanSite');
  siteSelect.innerHTML = allSites.filter(s => s.status === 'active').map(s =>
    `<option value="${s.id}" ${item.current_site_id === s.id ? 'selected' : ''}>${s.name}</option>`
  ).join('');

  document.getElementById('btnCheckIn').disabled = item.status === 'Available';

  // Photo field — show only when checking out
  const photoField = document.getElementById('photoField');
  if (item.status === 'Available' || item.status === 'Missing') {
    photoField.style.display = 'flex';
  } else {
    photoField.style.display = 'none';
    document.getElementById('scanPhoto').value = '';
  }

  // Condition field — show only when checking in (returning)
  const conditionField = document.getElementById('conditionField');
  if (item.status === 'Out') {
    conditionField.style.display = 'flex';
    // Default to current condition
    document.getElementById('scanCondition').value = item.condition || 'Good';
  } else {
    conditionField.style.display = 'none';
  }
}

async function doCheckIn() {
  if (!scannedEquipmentId) return;
  const notes = document.getElementById('scanNotes').value;
  const condition = document.getElementById('scanCondition').value;
  await performCheckin(scannedEquipmentId, notes, condition);
  resetScan();
}

async function doCheckOut() {
  if (!scannedEquipmentId) return;
  const photoInput = document.getElementById('scanPhoto');
  if (!photoInput.files || photoInput.files.length === 0) {
    showToast('Please take a photo of the drop-off location');
    photoInput.focus();
    return;
  }

  const btn = document.getElementById('btnCheckOut');
  btn.textContent = 'Uploading photo...';
  btn.disabled = true;

  try {
    // Upload photo to Supabase Storage
    const file = photoInput.files[0];
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const item = allEquipment.find(i => i.id === scannedEquipmentId);
    const fileName = `${item.item_code}_${timestamp}.${ext}`;
    const filePath = `${new Date().toISOString().slice(0,10)}/${fileName}`;

    const { error: uploadError } = await db.storage
      .from('checkout-photos')
      .upload(filePath, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      showToast('Photo upload failed: ' + uploadError.message);
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> Send to site';
      btn.disabled = false;
      return;
    }

    const siteId = document.getElementById('scanSite').value;
    const notes = document.getElementById('scanNotes').value;
    await performCheckout(scannedEquipmentId, siteId, notes, filePath);
    resetScan();

  } catch(e) {
    showToast('Error: ' + e.message);
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> Send to site';
    btn.disabled = false;
  }
}

async function performCheckin(equipId, notes, condition = null) {
  const update = {
    status: 'Available',
    current_site_id: null,
    last_scanned_by: currentUser.id,
    last_scanned_at: new Date().toISOString()
  };
  if (condition) update.condition = condition;
  await db.from('equipment').update(update).eq('id', equipId);
  await db.from('scan_log').insert({
    equipment_id: equipId,
    user_id: currentUser.id,
    site_id: null,
    action: 'check_in',
    notes
  });
  await loadEquipment();
  await loadLog();
  renderInventory();
  updateStats();
  showToast('Checked in ✓');
}

async function performCheckout(equipId, siteId, notes, photoPath = null) {
  await db.from('equipment').update({
    status: 'Out',
    current_site_id: siteId || null,
    last_scanned_by: currentUser.id,
    last_scanned_at: new Date().toISOString()
  }).eq('id', equipId);
  await db.from('scan_log').insert({
    equipment_id: equipId,
    user_id: currentUser.id,
    site_id: siteId || null,
    action: 'check_out',
    notes,
    photo_path: photoPath
  });
  await loadEquipment();
  await loadLog();
  const site = allSites.find(s => s.id === siteId);
  renderInventory();
  updateStats();
  showToast(`Sent to ${site ? site.name : 'site'} ✓`);
}

function resetScan() {
  scannedEquipmentId = null;
  document.getElementById('scanResult').classList.add('hidden');
  document.getElementById('manualId').value = '';
  document.getElementById('scanNotes').value = '';
  document.getElementById('scanPhoto').value = '';
  document.getElementById('photoField').style.display = 'none';
  document.getElementById('conditionField').style.display = 'none';
  resetScanViewfinder();
}

// ─── SITES ───────────────────────────────────────────────────────────────────

const SITE_COLORS = ['#1D9E75','#D85A30','#378ADD','#D4537E','#639922','#BA7517','#7F77DD','#E24B4A'];

function renderSites() {
  const grid = document.getElementById('sitesGrid');
  const active = allSites.filter(s => s.status === 'active');
  grid.innerHTML = active.map((site, i) => {
    const siteItems = allEquipment.filter(it => it.current_site_id === site.id);
    const color = SITE_COLORS[i % SITE_COLORS.length];
    return `
      <div class="site-card" onclick="filterBySite('${site.id}')">
        <div class="site-header">
          <span class="site-dot" style="background:${color}"></span>
          <span class="site-name">${site.name}</span>
        </div>
        <div class="site-count">${siteItems.length} item${siteItems.length !== 1 ? 's' : ''} on site</div>
        <div class="site-items">
          ${siteItems.slice(0,4).map(it => `<div class="site-item-row"><span class="site-item-code">${it.item_code}</span>${it.name}</div>`).join('')}
          ${siteItems.length > 4 ? `<div class="site-item-more">+${siteItems.length-4} more</div>` : ''}
          ${siteItems.length === 0 ? '<div class="site-item-empty">No items assigned</div>' : ''}
        </div>
        ${site.address ? `<div class="site-address">${site.address}</div>` : ''}
      </div>
    `;
  }).join('');
}

function filterBySite(siteId) {
  switchTab('inventory', document.querySelector('.tab[data-tab="inventory"]'));
  document.getElementById('filterSite').value = siteId;
  renderInventory();
}

// ─── LOG ─────────────────────────────────────────────────────────────────────

function renderLog() {
  const fSite = document.getElementById('logFilterSite').value;
  const fAction = document.getElementById('logFilterAction').value;

  const filtered = allLog.filter(l =>
    (!fSite || l.site_id === fSite) &&
    (!fAction || l.action === fAction)
  );

  const list = document.getElementById('logList');
  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty-log">No activity yet</p>';
    return;
  }

  list.innerHTML = filtered.map(l => {
    let photoHtml = '';
    if (l.photo_path) {
      const { data } = db.storage.from('checkout-photos').getPublicUrl(l.photo_path);
      // Use signed URL approach via a data attribute, loaded async
      photoHtml = `<div class="log-photo" data-path="${l.photo_path}">
        <img src="" alt="Drop-off photo" style="display:none;max-width:120px;max-height:80px;border-radius:4px;margin-top:6px;cursor:pointer;" onclick="viewPhoto(this)" />
        <span class="photo-loading" style="font-size:11px;color:var(--muted)">📷 Loading photo...</span>
      </div>`;
    }
    return `
    <div class="log-entry">
      <div class="log-action-badge ${l.action}">${actionLabel(l.action)}</div>
      <div class="log-body">
        <div class="log-item">${l.equipment ? l.equipment.name : 'Unknown item'}</div>
        <div class="log-meta">${l.user ? l.user.name : '—'} · ${l.site ? l.site.name : 'Yard'} · ${timeAgo(l.scanned_at)}</div>
        ${l.notes ? `<div class="log-notes">${l.notes}</div>` : ''}
        ${photoHtml}
      </div>
    </div>`;
  }).join('');

  // Load signed URLs for photos
  document.querySelectorAll('.log-photo').forEach(async (div) => {
    const path = div.dataset.path;
    const { data, error } = await db.storage.from('checkout-photos').createSignedUrl(path, 3600);
    if (data && data.signedUrl) {
      const img = div.querySelector('img');
      const loading = div.querySelector('.photo-loading');
      img.src = data.signedUrl;
      img.style.display = 'block';
      if (loading) loading.remove();
    }
  });
}

function actionLabel(action) {
  return { check_out: 'Checked out', check_in: 'Returned', audit: 'Audited', mark_missing: 'Missing', mark_found: 'Found' }[action] || action;
}

function timeAgo(dateStr) {
  const mins = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────

async function addEquipment() {
  const code = document.getElementById('newCode').value.trim().toUpperCase();
  const name = document.getElementById('newName').value.trim();
  const type = document.getElementById('newType').value;
  const serial = document.getElementById('newSerial').value.trim();
  const condition = document.getElementById('newCondition').value;
  const notes = document.getElementById('newNotes').value.trim();

  if (!code || !name) { showToast('Item code and name are required'); return; }

  const { error } = await db.from('equipment').insert({ item_code: code, name, type, serial_number: serial || null, condition, notes: notes || null });
  if (error) { showToast('Error: ' + (error.message.includes('unique') ? 'Item code already exists' : error.message)); return; }

  document.getElementById('newCode').value = '';
  document.getElementById('newName').value = '';
  document.getElementById('newSerial').value = '';
  document.getElementById('newNotes').value = '';
  await loadEquipment();
  renderInventory();
  updateStats();
  showToast(`${name} added to inventory ✓`);
}

async function addUser() {
  const name = document.getElementById('newUserName').value.trim();
  const email = document.getElementById('newUserEmail').value.trim().toLowerCase();
  const phone = document.getElementById('newUserPhone').value.trim();
  const pin = document.getElementById('newUserPin').value.trim();
  const role = document.getElementById('newUserRole').value;
  const title = document.getElementById('newUserTitle').value.trim();

  if (!name || !pin) { showToast('Name and PIN are required'); return; }
  if (pin.length < 4) { showToast('PIN must be at least 4 digits'); return; }

  const { error } = await db.from('users').insert({
    name, pin, role,
    email: email || null,
    phone: phone || null,
    job_title: title || null
  });
  if (error) { showToast('Error: ' + (error.message.includes('unique') ? 'PIN or email already exists' : error.message)); return; }

  document.getElementById('newUserName').value = '';
  document.getElementById('newUserEmail').value = '';
  document.getElementById('newUserPhone').value = '';
  document.getElementById('newUserPin').value = '';
  document.getElementById('newUserTitle').value = '';
  showToast(`${name} added ✓`);
}

async function addSite() {
  const name = document.getElementById('newSiteName').value.trim();
  const address = document.getElementById('newSiteAddr').value.trim();
  if (!name) { showToast('Site name is required'); return; }
  const { error } = await db.from('jobsites').insert({ name, address: address || null });
  if (error) { showToast('Error adding site: ' + error.message); return; }
  document.getElementById('newSiteName').value = '';
  document.getElementById('newSiteAddr').value = '';
  await loadSites();
  populateSiteDropdowns();
  renderSites();
  showToast(`${name} added ✓`);
}

async function printQRLabels() {
  const items = allEquipment.map(i => ({ code: i.item_code, name: i.name }));
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>QR Labels — SiteTrack</title>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 20px; background: white; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .label { border: 1px dashed #ccc; padding: 12px 8px; text-align: center; break-inside: avoid; border-radius: 6px; }
    .label img { display: block; margin: 0 auto 6px; width: 100px; height: 100px; }
    .label .code { font-size: 12px; font-weight: bold; letter-spacing: 1px; font-family: monospace; }
    .label .name { font-size: 9px; color: #555; margin-top: 3px; word-break: break-word; line-height: 1.3; }
    h2 { font-size: 14px; margin-bottom: 16px; color: #333; }
    @media print { body { padding: 8px; } h2 { display: none; } }
  </style>
  </head><body>
  <h2>RSL Contractors — Equipment QR Labels (${items.length} items)</h2>
  <div class="grid" id="labels"></div>
  <script>
  const items = ${JSON.stringify(items)};
  let loaded = 0;
  function tryPrint() { loaded++; if (loaded === items.length) setTimeout(() => window.print(), 500); }
  const grid = document.getElementById('labels');
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'label';
    const img = document.createElement('img');
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + encodeURIComponent(item.code);
    img.src = qrUrl;
    img.onload = tryPrint;
    img.onerror = tryPrint;
    div.appendChild(img);
    div.innerHTML += '<div class="code">' + item.code + '</div><div class="name">' + item.name + '</div>';
    grid.appendChild(div);
  });
  <\/script>
  </body></html>`);
  win.document.close();
}

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function populateSiteDropdowns() {
  const activeSites = allSites.filter(s => s.status === 'active');
  const opts = activeSites.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  const blankOpts = `<option value="">All sites</option>` + opts;
  document.getElementById('filterSite').innerHTML = blankOpts;
  document.getElementById('logFilterSite').innerHTML = blankOpts;
  if (document.getElementById('scanSite')) {
    document.getElementById('scanSite').innerHTML = opts;
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

function viewPhoto(img) {
  document.getElementById('modalTitle').textContent = 'Drop-off Photo';
  document.getElementById('modalBody').innerHTML = `
    <img src="${img.src}" style="width:100%;border-radius:var(--radius);display:block;" />
  `;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
