/* SiteTrack — Industrial Utilitarian Design */
/* Font: Barlow Condensed for headings, Barlow for UI, DM Mono for codes */

:root {
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface2: #F4F3F0;
  --border: #E2E0DA;
  --border2: #CCCAC3;
  --text: #1A1917;
  --muted: #6B6963;
  --hint: #9E9C96;
  --accent: #D4570A;
  --accent-bg: #FEF0E7;
  --green: #2D7A3A;
  --green-bg: #EBF6ED;
  --amber: #A05C00;
  --amber-bg: #FEF3E2;
  --red: #C0392B;
  --red-bg: #FDECEA;
  --radius: 6px;
  --radius-lg: 10px;
  --font: 'Barlow', system-ui, sans-serif;
  --font-mono: 'DM Mono', monospace;
  --font-display: 'Barlow Condensed', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font); font-size: 15px; -webkit-font-smoothing: antialiased; }

#app { display: flex; flex-direction: column; min-height: 100vh; }
.screen { flex: 1; }
.screen.hidden { display: none; }

/* ─── INPUTS ─────────────────────────────────────────────────────────────── */

input[type=text], input[type=email], input[type=password], select, textarea {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}
input:focus, select:focus { border-color: var(--text); }
input::placeholder { color: var(--hint); }
label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.field { display: flex; flex-direction: column; }

/* ─── BUTTONS ────────────────────────────────────────────────────────────── */

.btn-primary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 11px 20px;
  background: var(--text); color: var(--bg);
  border: none; border-radius: var(--radius);
  font-family: var(--font); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.85; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  background: var(--surface); color: var(--text);
  border: 1px solid var(--border2); border-radius: var(--radius);
  font-family: var(--font); font-size: 14px; font-weight: 500;
  cursor: pointer;
}
.btn-secondary:hover { background: var(--surface2); }

.btn-ghost {
  display: block; width: 100%; padding: 10px;
  background: none; color: var(--muted);
  border: 1px solid var(--border); border-radius: var(--radius);
  font-family: var(--font); font-size: 13px;
  cursor: pointer; text-align: center;
}
.btn-ghost:hover { color: var(--text); border-color: var(--border2); }
.btn-ghost.red { color: var(--red); border-color: #F5C2BE; }
.btn-ghost.red:hover { background: var(--red-bg); }

.icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px;
  background: none; border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--muted); cursor: pointer;
}
.icon-btn:hover { color: var(--text); border-color: var(--border2); background: var(--surface2); }

/* ─── LOGIN ──────────────────────────────────────────────────────────────── */

.login-wrap {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 100vh;
  padding: 2rem 1rem; gap: 1.5rem;
}
.login-brand { text-align: center; }
.brand-mark {
  width: 60px; height: 60px; background: var(--text);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.brand-mark span {
  font-family: var(--font-display); font-size: 22px; font-weight: 700;
  color: var(--bg); letter-spacing: 0.05em;
}
.brand-mark.sm { width: 32px; height: 32px; border-radius: 7px; }
.brand-mark.sm span { font-size: 13px; }
.login-brand h1 { font-family: var(--font-display); font-size: 28px; font-weight: 700; letter-spacing: 0.03em; }
.login-brand p { color: var(--muted); font-size: 14px; margin-top: 4px; }
.login-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.5rem;
  width: 100%; max-width: 360px;
  display: flex; flex-direction: column; gap: 14px;
}
.login-hint { font-size: 12px; color: var(--hint); text-align: center; }
.error-msg { color: var(--red); font-size: 13px; padding: 8px 12px; background: var(--red-bg); border-radius: var(--radius); }

/* ─── HEADER ─────────────────────────────────────────────────────────────── */

.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px;
  background: var(--surface); border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 20;
}
.header-brand { display: flex; align-items: center; gap: 10px; }
.header-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: 0.03em; }
.header-right { display: flex; align-items: center; gap: 8px; }
.user-chip {
  font-size: 12px; font-weight: 500; color: var(--muted);
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 99px; padding: 4px 12px;
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */

.tab-nav {
  display: flex; background: var(--surface);
  border-bottom: 1px solid var(--border);
  overflow-x: auto; -webkit-overflow-scrolling: touch;
  scrollbar-width: none; padding: 0 8px;
}
.tab-nav::-webkit-scrollbar { display: none; }
.tab {
  display: flex; align-items: center; gap: 6px;
  padding: 12px 14px; font-size: 13px; font-weight: 500;
  color: var(--muted); background: none; border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer; white-space: nowrap; transition: color 0.15s;
}
.tab:hover { color: var(--text); }
.tab.active { color: var(--text); border-bottom-color: var(--accent); }

/* ─── MAIN ───────────────────────────────────────────────────────────────── */

.main { flex: 1; overflow-y: auto; }
.tab-content { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.tab-content.hidden { display: none; }

/* ─── STATS ──────────────────────────────────────────────────────────────── */

.stats-row {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;
}
.stat {
  background: var(--surface2); border-radius: var(--radius);
  padding: 10px 12px; text-align: center;
}
.stat.alert { background: var(--amber-bg); }
.stat-val { font-family: var(--font-display); font-size: 24px; font-weight: 700; line-height: 1; }
.stat-val.green { color: var(--green); }
.stat-val.amber { color: var(--amber); }
.stat-val.red { color: var(--red); }
.stat-lbl { font-size: 11px; color: var(--muted); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.05em; }

/* ─── FILTERS ────────────────────────────────────────────────────────────── */

.filters { display: flex; gap: 8px; flex-wrap: wrap; }
.search-wrap { position: relative; flex: 1; min-width: 180px; }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--hint); pointer-events: none; }
.search-wrap input { padding-left: 32px; }
.filters select { flex: 0 0 auto; min-width: 120px; }

/* ─── TABLE ──────────────────────────────────────────────────────────────── */

.table-wrap {
  border: 1px solid var(--border); border-radius: var(--radius-lg);
  overflow: hidden; background: var(--surface);
}
table { width: 100%; border-collapse: collapse; font-size: 13px; table-layout: fixed; }
thead { background: var(--surface2); }
th {
  text-align: left; padding: 10px 14px;
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--muted); border-bottom: 1px solid var(--border);
}
th:nth-child(1) { width: 80px; }
th:nth-child(3) { width: 100px; }
th:nth-child(4) { width: 140px; }
th:nth-child(5) { width: 90px; }
th:nth-child(6) { width: 100px; }
td { padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--surface2); }
.code-cell { font-family: var(--font-mono); font-size: 11px; color: var(--muted); }
.name-cell { font-weight: 500; }
.type-cell, .site-cell { color: var(--muted); font-size: 12px; }
.action-cell { text-align: right; }
.empty-state { padding: 2rem; text-align: center; color: var(--muted); font-size: 14px; }

/* ─── ROW BUTTONS ────────────────────────────────────────────────────────── */

.row-btn {
  font-size: 12px; font-weight: 500; padding: 5px 10px;
  border-radius: var(--radius); border: 1px solid; cursor: pointer;
  background: transparent; font-family: var(--font);
}
.row-btn.checkout { color: var(--amber); border-color: #E8C07A; }
.row-btn.checkout:hover { background: var(--amber-bg); }
.row-btn.checkin { color: var(--green); border-color: #90C99A; }
.row-btn.checkin:hover { background: var(--green-bg); }
.row-btn.found { color: var(--muted); border-color: var(--border2); }
.row-btn.found:hover { background: var(--surface2); }

/* ─── BADGES ─────────────────────────────────────────────────────────────── */

.badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
  border-radius: 99px; padding: 3px 9px;
}
.badge-available { background: var(--green-bg); color: var(--green); }
.badge-out { background: var(--amber-bg); color: var(--amber); }
.badge-missing { background: var(--red-bg); color: var(--red); }
.overdue-dot {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--accent); color: white;
  font-size: 10px; font-weight: 700; margin-left: 4px;
  vertical-align: middle;
}

/* ─── OVERDUE ────────────────────────────────────────────────────────────── */

.overdue-banner {
  background: var(--amber-bg); border: 1px solid #E8C07A;
  border-radius: var(--radius-lg); padding: 14px 16px;
}
.overdue-title {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700; color: var(--amber); margin-bottom: 10px;
}
.overdue-item {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; padding: 4px 0;
  border-top: 1px solid rgba(160,92,0,0.15);
}
.overdue-meta { font-size: 11px; color: var(--amber); opacity: 0.8; }

/* ─── SCAN ───────────────────────────────────────────────────────────────── */

.scan-wrap { display: flex; flex-direction: column; gap: 16px; max-width: 480px; margin: 0 auto; }
.scan-card { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.scan-viewfinder {
  width: 240px; height: 240px;
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.scan-idle { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: var(--muted); text-align: center; padding: 1rem; }
.scan-idle p { font-size: 13px; font-weight: 500; }
.scan-hint { font-size: 11px; color: var(--hint); }
.scan-corners { position: absolute; inset: 0; }
.sc { position: absolute; width: 20px; height: 20px; border-color: var(--accent); border-style: solid; }
.sc.tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
.sc.tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
.sc.bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
.sc.br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }
.btn-scan {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 28px; background: var(--text); color: var(--bg);
  border: none; border-radius: var(--radius);
  font-family: var(--font); font-size: 14px; font-weight: 600;
  cursor: pointer;
}
.btn-scan:hover { opacity: 0.85; }
.manual-entry { display: flex; gap: 8px; width: 100%; }
.manual-entry input { flex: 1; font-family: var(--font-mono); font-size: 13px; }
.manual-entry button {
  padding: 9px 16px; background: var(--surface2);
  border: 1px solid var(--border2); border-radius: var(--radius);
  font-family: var(--font); font-size: 13px; font-weight: 500;
  cursor: pointer; white-space: nowrap;
}
.manual-entry button:hover { background: var(--border); }

.scan-result {
  width: 100%; background: var(--surface);
  border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 16px; display: flex; flex-direction: column; gap: 14px;
}
.result-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.result-name { font-size: 16px; font-weight: 600; }
.result-meta { font-size: 12px; color: var(--muted); margin-top: 2px; font-family: var(--font-mono); }
.result-badge { flex-shrink: 0; }
.result-fields { display: flex; flex-direction: column; gap: 10px; }
.result-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.btn-checkin {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px; background: var(--green-bg); color: var(--green);
  border: 1px solid #90C99A; border-radius: var(--radius);
  font-family: var(--font); font-size: 14px; font-weight: 600; cursor: pointer;
}
.btn-checkin:hover { filter: brightness(0.95); }
.btn-checkin:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-checkout {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px; background: var(--amber-bg); color: var(--amber);
  border: 1px solid #E8C07A; border-radius: var(--radius);
  font-family: var(--font); font-size: 14px; font-weight: 600; cursor: pointer;
}
.btn-checkout:hover { filter: brightness(0.95); }

/* ─── SITES ──────────────────────────────────────────────────────────────── */

.sites-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.site-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 14px 16px;
  cursor: pointer; transition: border-color 0.15s;
}
.site-card:hover { border-color: var(--border2); }
.site-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.site-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.site-name { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.site-count { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--accent); margin-bottom: 10px; }
.site-items { display: flex; flex-direction: column; gap: 4px; }
.site-item-row { font-size: 12px; color: var(--muted); display: flex; gap: 6px; align-items: baseline; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.site-item-code { font-family: var(--font-mono); font-size: 10px; color: var(--hint); flex-shrink: 0; }
.site-item-more, .site-item-empty { font-size: 11px; color: var(--hint); }
.site-address { font-size: 11px; color: var(--hint); margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border); }

/* ─── LOG ────────────────────────────────────────────────────────────────── */

.log-filters { display: flex; gap: 8px; }
.log-filters select { min-width: 140px; }
.log-list { display: flex; flex-direction: column; gap: 6px; }
.log-entry { display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); }
.log-action-badge {
  font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  padding: 3px 8px; border-radius: 99px; flex-shrink: 0; white-space: nowrap;
}
.log-action-badge.check_out { background: var(--amber-bg); color: var(--amber); }
.log-action-badge.check_in { background: var(--green-bg); color: var(--green); }
.log-action-badge.mark_missing { background: var(--red-bg); color: var(--red); }
.log-action-badge.mark_found { background: var(--green-bg); color: var(--green); }
.log-action-badge.audit { background: var(--surface2); color: var(--muted); }
.log-body { flex: 1; min-width: 0; }
.log-item { font-size: 13px; font-weight: 500; }
.log-meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
.log-notes { font-size: 11px; color: var(--muted); font-style: italic; margin-top: 3px; }
.empty-log { color: var(--muted); font-size: 13px; text-align: center; padding: 2rem; }

/* ─── ADMIN ──────────────────────────────────────────────────────────────── */

.admin-sections { display: flex; flex-direction: column; gap: 16px; }
.admin-section { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
.section-header { padding: 14px 16px 0; }
.section-header h2 { font-family: var(--font-display); font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.section-desc { font-size: 13px; color: var(--muted); padding: 8px 16px 0; }
.admin-form { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* ─── MODAL ──────────────────────────────────────────────────────────────── */

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; padding: 1rem;
}
.modal {
  background: var(--surface); border-radius: var(--radius-lg);
  width: 100%; max-width: 440px; max-height: 80vh; overflow-y: auto;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 16px 12px; border-bottom: 1px solid var(--border); }
.modal-header h3 { font-size: 16px; font-weight: 600; }
#modalBody { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.detail-grid { display: flex; flex-direction: column; }
.detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.detail-row:last-child { border-bottom: none; }
.detail-row span:first-child { color: var(--muted); }
.detail-actions { display: flex; flex-direction: column; gap: 8px; }
.mono { font-family: var(--font-mono); font-size: 12px; }

/* ─── TOAST ──────────────────────────────────────────────────────────────── */

.toast {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  background: var(--text); color: var(--bg);
  font-size: 13px; font-weight: 500;
  border-radius: var(--radius); padding: 10px 20px;
  opacity: 0; transition: opacity 0.25s; pointer-events: none; z-index: 200;
  white-space: nowrap;
}
.toast.show { opacity: 1; }

/* ─── UTILITIES ──────────────────────────────────────────────────────────── */

.hidden { display: none !important; }

/* ─── RESPONSIVE ─────────────────────────────────────────────────────────── */

@media (max-width: 640px) {
  .stats-row { grid-template-columns: repeat(3, 1fr); }
  .stats-row .stat:nth-child(4), .stats-row .stat:nth-child(5) { grid-column: auto; }
  th:nth-child(3), td:nth-child(3),
  th:nth-child(4), td:nth-child(4) { display: none; }
  .form-row { grid-template-columns: 1fr; }
  .sites-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 400px) {
  .sites-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}

/* ─── PIN NUMPAD ─────────────────────────────────────────────────────────── */

.pin-label { font-size: 13px; color: var(--muted); text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }

.pin-display {
  display: flex; justify-content: center; gap: 12px;
  padding: 8px 0;
}
.pin-dot {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid var(--border2);
  transition: background 0.15s, border-color 0.15s;
}
.pin-dot.filled { background: var(--text); border-color: var(--text); }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}
.shake { animation: shake 0.4s ease; }

.numpad {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  max-width: 260px; margin: 0 auto;
}
.num-key {
  aspect-ratio: 1.2;
  display: flex; align-items: center; justify-content: center;
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  font-family: var(--font-display); font-size: 22px; font-weight: 600;
  color: var(--text); cursor: pointer;
  transition: background 0.1s, transform 0.1s;
  user-select: none;
}
.num-key:active { background: var(--border2); transform: scale(0.95); }
.num-key.ghost { font-family: var(--font); font-size: 13px; font-weight: 500; color: var(--muted); background: transparent; border-color: transparent; }
.num-key.ghost:active { background: var(--surface2); }
