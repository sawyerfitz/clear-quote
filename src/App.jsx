import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white:    #ffffff;
    --bg:       #f8f9fb;
    --surface:  #ffffff;
    --border:   #e5e7eb;
    --border2:  #f0f1f3;
    --text:     #0f1117;
    --sub:      #6b7280;
    --muted:    #9ca3af;
    --accent:   #0066ff;
    --accent-l: #eff4ff;
    --accent-b: #c7d9ff;
    --green:    #16a34a;
    --green-l:  #f0fdf4;
    --red:      #dc2626;
    --red-l:    #fef2f2;
    --yellow:   #d97706;
    --yellow-l: #fffbeb;
    --radius:   10px;
    --shadow:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md:0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
    --font:     'Geist', -apple-system, sans-serif;
    --mono:     'Geist Mono', monospace;
  }

  html, body, #root { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font); -webkit-font-smoothing: antialiased; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* AUTH */
  .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--white); }
  .auth-inner { width: 100%; max-width: 380px; padding: 2rem; }
  .auth-brand { display: flex; align-items: center; gap: 8px; margin-bottom: 2rem; }
  .auth-brand-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.78rem; font-weight: 700; letter-spacing: -0.01em; }
  .auth-brand-name { font-size: 0.95rem; font-weight: 600; letter-spacing: -0.02em; }
  .auth-heading { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.04em; margin-bottom: 0.3rem; }
  .auth-sub { font-size: 0.82rem; color: var(--sub); margin-bottom: 1.75rem; }
  .auth-tabs { display: flex; background: var(--bg); border-radius: 8px; padding: 3px; margin-bottom: 1.5rem; }
  .auth-tab { flex: 1; padding: 6px 0; border: none; background: transparent; cursor: pointer; font-size: 0.8rem; font-weight: 500; color: var(--sub); border-radius: 6px; transition: all 0.15s; font-family: var(--font); }
  .auth-tab.active { background: var(--white); color: var(--text); box-shadow: var(--shadow); }

  .field { margin-bottom: 0.9rem; }
  .field label { display: block; font-size: 0.75rem; font-weight: 500; color: var(--sub); margin-bottom: 5px; }
  .field input { width: 100%; background: var(--white); border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; color: var(--text); font-family: var(--font); font-size: 0.85rem; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
  .field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,102,255,0.08); }
  .field input::placeholder { color: var(--muted); }
  .field input[readonly] { opacity: 0.65; cursor: default; background: var(--bg); }

  .btn { width: 100%; padding: 9px 16px; border: none; border-radius: 8px; cursor: pointer; font-family: var(--font); font-weight: 500; font-size: 0.85rem; background: var(--text); color: var(--white); transition: opacity 0.15s, transform 0.1s; letter-spacing: -0.01em; }
  .btn:hover { opacity: 0.82; }
  .btn:active { transform: scale(0.99); }
  .btn.primary { background: var(--accent); }
  .btn.secondary { background: var(--white); color: var(--text); border: 1px solid var(--border); width: auto; }
  .btn.ghost { background: transparent; color: var(--accent); border: 1px solid var(--accent-b); width: auto; }
  .btn.sm { padding: 6px 12px; font-size: 0.78rem; width: auto; border-radius: 7px; }
  .btn.danger-text { background: transparent; color: var(--red); border: 1px solid #fecaca; width: auto; font-size: 0.75rem; padding: 5px 10px; border-radius: 6px; }
  .icon-btn { width: 34px; height: 34px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; background: var(--accent); border: none; cursor: pointer; transition: opacity 0.15s; color: white; flex-shrink: 0; }
  .icon-btn:hover { opacity: 0.85; }
  .icon-btn svg { width: 14px; height: 14px; }

  .err-msg { font-size: 0.75rem; color: var(--red); margin-top: 0.75rem; }
  .demo-hint { font-size: 0.72rem; color: var(--muted); text-align: center; margin-top: 1rem; }

  /* NAV */
  .nav { height: 52px; background: var(--white); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; position: sticky; top: 0; z-index: 100; }
  .nav-left { display: flex; align-items: center; gap: 8px; }
  .nav-icon-box { width: 26px; height: 26px; border-radius: 6px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.62rem; font-weight: 700; color: white; letter-spacing: -0.01em; }
  .nav-name { font-size: 0.88rem; font-weight: 600; letter-spacing: -0.02em; }
  .nav-right { display: flex; align-items: center; gap: 10px; }
  .nav-company { font-size: 0.75rem; color: var(--sub); }
  .avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; color: white; }

  /* LAYOUT */
  .main { display: flex; flex: 1; min-height: calc(100vh - 52px); }
  .sidebar { width: 200px; background: var(--white); border-right: 1px solid var(--border); padding: 1rem 0.75rem; display: flex; flex-direction: column; gap: 2px; position: sticky; top: 52px; height: calc(100vh - 52px); flex-shrink: 0; overflow-y: auto; }
  .sidebar-section { font-size: 0.63rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; padding: 0 0.5rem; margin: 10px 0 4px; }
  .nav-item { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 7px; cursor: pointer; font-size: 0.82rem; font-weight: 500; color: var(--sub); transition: all 0.12s; }
  .nav-item:hover { background: var(--bg); color: var(--text); }
  .nav-item.active { background: var(--accent-l); color: var(--accent); }
  .nav-item svg { width: 15px; height: 15px; flex-shrink: 0; }

  .page { flex: 1; padding: 2rem 2.5rem; max-width: 1120px; }
  .page-header { margin-bottom: 1.75rem; }
  .page-title { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.03em; }
  .page-desc { font-size: 0.8rem; color: var(--sub); margin-top: 3px; }

  /* CARD */
  .card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; box-shadow: var(--shadow); }
  .card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem; }
  .card-title { font-size: 0.85rem; font-weight: 600; letter-spacing: -0.02em; }
  .card-sub { font-size: 0.74rem; color: var(--sub); margin-top: 2px; }

  /* ESTIMATOR */
  .est-layout { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 1.25rem; align-items: start; }
  @media(max-width:860px){ .est-layout { grid-template-columns: 1fr; } }

  .address-row { display: flex; gap: 8px; align-items: center; }
  .address-input { flex: 1; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 9px 13px; color: var(--text); font-family: var(--font); font-size: 0.85rem; outline: none; transition: border-color 0.15s, background 0.15s, box-shadow 0.15s; }
  .address-input:focus { border-color: var(--accent); background: var(--white); box-shadow: 0 0 0 3px rgba(0,102,255,0.08); }
  .address-input::placeholder { color: var(--muted); }

  .quick-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 0.75rem; }
  .qtag { padding: 4px 10px; border-radius: 20px; font-size: 0.71rem; font-weight: 500; background: var(--bg); border: 1px solid var(--border); color: var(--sub); cursor: pointer; transition: all 0.12s; white-space: nowrap; }
  .qtag:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-l); }

  .loading-row { display: flex; align-items: center; gap: 10px; padding: 1rem 0; }
  .spinner { width: 16px; height: 16px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.65s linear infinite; flex-shrink: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 0.78rem; color: var(--sub); }

  .result-wrap { margin-top: 0.75rem; animation: fadeUp 0.25s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

  .divider { height: 1px; background: var(--border2); margin: 0.9rem 0; }

  .result-address { font-size: 0.72rem; color: var(--muted); margin-bottom: 0.5rem; }
  .result-price-row { display: flex; align-items: center; gap: 10px; margin-bottom: 3px; }
  .result-price { font-size: 2.25rem; font-weight: 700; letter-spacing: -0.05em; }
  .result-range { font-size: 0.73rem; color: var(--muted); margin-bottom: 1rem; }

  .conf-pill { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 0.67rem; font-weight: 600; }
  .conf-high { background: var(--green-l); color: var(--green); }
  .conf-medium { background: var(--yellow-l); color: var(--yellow); }
  .conf-low { background: var(--red-l); color: var(--red); }

  .breakdown-list { display: flex; flex-direction: column; }
  .breakdown-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border2); font-size: 0.79rem; }
  .breakdown-row:last-child { border-bottom: none; }
  .bk-label { color: var(--sub); }
  .bk-val { font-weight: 500; }

  .reasoning-box { background: var(--bg); border-radius: 8px; padding: 0.9rem; font-size: 0.77rem; color: var(--sub); line-height: 1.65; margin-top: 1rem; }
  .reasoning-label { font-size: 0.66rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); margin-bottom: 5px; }

  .action-row { display: flex; gap: 8px; margin-top: 1rem; align-items: center; }

  .success-toast { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; background: var(--green-l); border: 1px solid #bbf7d0; border-radius: 7px; font-size: 0.77rem; color: var(--green); font-weight: 500; }

  /* RIGHT PANEL */
  .panel-stack { display: flex; flex-direction: column; gap: 1.25rem; }
  .recurring-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
  .rec-cell { background: var(--bg); border-radius: 8px; padding: 0.9rem; text-align: center; border: 1px solid var(--border2); }
  .rec-label { font-size: 0.63rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 5px; }
  .rec-price { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.03em; }
  .rec-price.blue { color: var(--accent); }
  .rec-sub { font-size: 0.62rem; color: var(--muted); margin-top: 2px; }

  .how-item { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border2); }
  .how-item:last-child { border-bottom: none; }
  .how-num { width: 20px; height: 20px; border-radius: 50%; background: var(--accent-l); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .how-title { font-size: 0.81rem; font-weight: 600; margin-bottom: 2px; letter-spacing: -0.01em; }
  .how-desc { font-size: 0.73rem; color: var(--sub); line-height: 1.5; }

  /* STATS */
  .stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; margin-bottom: 1.25rem; }
  @media(max-width:800px){ .stats-row { grid-template-columns: repeat(2,1fr); } }
  .stat-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.1rem; box-shadow: var(--shadow); }
  .stat-label { font-size: 0.67rem; font-weight: 600; color: var(--sub); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px; }
  .stat-val { font-size: 1.7rem; font-weight: 700; letter-spacing: -0.04em; }
  .stat-val.blue { color: var(--accent); }
  .stat-val.green { color: var(--green); }
  .stat-sub { font-size: 0.7rem; color: var(--muted); margin-top: 3px; }

  /* TABLE */
  .table-outer { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
  thead tr { border-bottom: 1px solid var(--border); }
  th { padding: 9px 12px; text-align: left; font-size: 0.66rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }
  td { padding: 11px 12px; border-bottom: 1px solid var(--border2); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg); }
  .td-addr { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; font-size: 0.82rem; }
  .td-price { font-weight: 700; font-size: 0.85rem; }
  .td-muted { color: var(--sub); font-size: 0.77rem; }

  .badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 0.67rem; font-weight: 600; }
  .badge-pending { background: var(--yellow-l); color: var(--yellow); }
  .badge-sent { background: var(--accent-l); color: var(--accent); }
  .badge-won { background: var(--green-l); color: var(--green); }
  .badge-lost { background: var(--red-l); color: var(--red); }
  .tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 5px; font-size: 0.72rem; background: var(--bg); border: 1px solid var(--border); color: var(--sub); }

  /* SETTINGS */
  .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  @media(max-width:700px){ .settings-grid { grid-template-columns: 1fr; } }
  .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border2); }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label { font-size: 0.82rem; font-weight: 500; }
  .toggle-desc { font-size: 0.72rem; color: var(--sub); margin-top: 2px; }
  .toggle { width: 36px; height: 20px; border-radius: 10px; background: var(--border); border: none; cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0; }
  .toggle.on { background: var(--accent); }
  .toggle::after { content: ''; position: absolute; width: 14px; height: 14px; border-radius: 50%; background: white; top: 3px; left: 3px; transition: left 0.18s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
  .toggle.on::after { left: 19px; }

  select { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 7px; padding: 5px 8px; font-size: 0.75rem; font-family: var(--font); outline: none; cursor: pointer; }
  select:focus { border-color: var(--accent); }

  .empty-state { text-align: center; padding: 3rem 1rem; }
  .empty-icon { font-size: 1.8rem; opacity: 0.18; margin-bottom: 0.75rem; }
  .empty-text { font-size: 0.81rem; color: var(--sub); }

  /* MODAL */
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 200; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); animation: fadeIn 0.15s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 1.75rem; width: 480px; max-width: 95vw; box-shadow: var(--shadow-md); animation: slideUp 0.18s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .modal-title { font-size: 0.95rem; font-weight: 700; letter-spacing: -0.02em; }
  .modal-close { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 1.1rem; padding: 2px; line-height: 1; }
  .modal-close:hover { color: var(--text); }
  .modal-footer { display: flex; gap: 8px; justify-content: flex-end; margin-top: 1.25rem; }

  /* CUSTOMER CARDS */
  .customer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
  .customer-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.1rem; box-shadow: var(--shadow); cursor: pointer; transition: border-color 0.12s, box-shadow 0.12s; }
  .customer-card:hover { border-color: var(--accent-b); box-shadow: 0 2px 8px rgba(0,102,255,0.08); }
  .cust-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-l); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; }
  .cust-name { font-size: 0.85rem; font-weight: 600; letter-spacing: -0.01em; }
  .cust-detail { font-size: 0.74rem; color: var(--sub); margin-top: 2px; }
  .cust-stats { display: flex; gap: 12px; margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px solid var(--border2); }
  .cust-stat-val { font-size: 0.88rem; font-weight: 700; letter-spacing: -0.02em; }
  .cust-stat-label { font-size: 0.65rem; color: var(--muted); margin-top: 1px; }

  /* JOB CARDS */
  .job-list { display: flex; flex-direction: column; gap: 8px; }
  .job-row { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.1rem; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow); }
  .job-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .job-dot.scheduled { background: var(--accent); }
  .job-dot.completed { background: var(--green); }
  .job-dot.in-progress { background: var(--yellow); }
  .job-dot.cancelled { background: var(--muted); }
  .job-addr { font-size: 0.82rem; font-weight: 600; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .job-meta { font-size: 0.72rem; color: var(--sub); }
  .job-price { font-size: 0.85rem; font-weight: 700; color: var(--text); flex-shrink: 0; }

  /* MINI BAR CHART */
  .chart-wrap { display: flex; align-items: flex-end; gap: 6px; height: 80px; padding: 0 2px; }
  .chart-bar-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
  .chart-bar { width: 100%; background: var(--accent-l); border-radius: 4px 4px 0 0; transition: height 0.4s ease; cursor: default; position: relative; }
  .chart-bar:hover { background: var(--accent-b); }
  .chart-label { font-size: 0.6rem; color: var(--muted); white-space: nowrap; }

  /* PAGE HEADER ACTIONS */
  .page-header-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.75rem; }

  /* ACTIVITY FEED */
  .activity-item { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border2); }
  .activity-item:last-child { border-bottom: none; }
  .activity-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
  .activity-text { font-size: 0.78rem; flex: 1; line-height: 1.45; }
  .activity-time { font-size: 0.7rem; color: var(--muted); flex-shrink: 0; }

  /* TRIAL BANNER */
  .trial-banner { background: #fffbeb; border-bottom: 1px solid #fde68a; padding: 9px 1.5rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; }
  .trial-banner-left { display: flex; align-items: center; gap: 8px; color: #92400e; font-weight: 500; }
  .trial-days { background: #fef3c7; border: 1px solid #fde68a; border-radius: 20px; padding: 1px 9px; font-size: 0.7rem; font-weight: 700; color: #d97706; }
  .trial-banner.urgent { background: #fef2f2; border-bottom-color: #fecaca; }
  .trial-banner.urgent .trial-banner-left { color: #991b1b; }
  .trial-banner.urgent .trial-days { background: #fee2e2; border-color: #fecaca; color: #dc2626; }

  /* PAYWALL */
  .paywall-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--white); }
  .paywall-card { width: 100%; max-width: 420px; padding: 2.5rem; background: var(--white); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-md); text-align: center; }
  .paywall-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; color: white; margin: 0 auto 1.5rem; letter-spacing: -0.01em; }
  .paywall-heading { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 0.4rem; }
  .paywall-sub { font-size: 0.82rem; color: var(--sub); margin-bottom: 2rem; line-height: 1.6; }
  .paywall-price { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.05em; margin-bottom: 0.25rem; }
  .paywall-price span { font-size: 1rem; font-weight: 500; color: var(--sub); letter-spacing: 0; }
  .paywall-price-sub { font-size: 0.75rem; color: var(--muted); margin-bottom: 1.75rem; }
  .paywall-features { text-align: left; background: var(--bg); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.75rem; display: flex; flex-direction: column; gap: 8px; }
  .paywall-feature { display: flex; align-items: center; gap: 9px; font-size: 0.8rem; }
  .paywall-check { width: 18px; height: 18px; border-radius: 50%; background: var(--green-l); color: var(--green); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; flex-shrink: 0; }
  .paywall-note { font-size: 0.71rem; color: var(--muted); margin-top: 0.9rem; }
`;

const Icons = {
  grid:     (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="9.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/></svg>),
  zap:      (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9,1.5 4,9 8,9 7,14.5 12,7 8,7"/></svg>),
  list:     (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5.5" y1="4" x2="14" y2="4"/><line x1="5.5" y1="8" x2="14" y2="8"/><line x1="5.5" y1="12" x2="14" y2="12"/><circle cx="2.5" cy="4" r="1" fill="currentColor" stroke="none"/><circle cx="2.5" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="2.5" cy="12" r="1" fill="currentColor" stroke="none"/></svg>),
  cog:      (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="2.5"/><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.05 1.05M11.55 11.55l1.05 1.05M3.4 12.6l1.05-1.05M11.55 4.45l1.05-1.05"/></svg>),
  arrow:    (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9,4 13,8 9,12"/></svg>),
  users:    (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="5" r="2.5"/><path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5"/><path d="M11 3.5c1.38 0 2.5 1.12 2.5 2.5S12.38 8.5 11 8.5M15 13c0-2.21-1.79-4-4-4"/></svg>),
  calendar: (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="2.5" width="13" height="12" rx="1.5"/><line x1="1.5" y1="6.5" x2="14.5" y2="6.5"/><line x1="5" y1="1" x2="5" y2="4"/><line x1="11" y1="1" x2="11" y2="4"/><circle cx="5" cy="10" r="0.75" fill="currentColor" stroke="none"/><circle cx="8" cy="10" r="0.75" fill="currentColor" stroke="none"/><circle cx="11" cy="10" r="0.75" fill="currentColor" stroke="none"/></svg>),
  plus:     (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>),
  phone:    (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2h3l1.5 3.5L6 7s1 2 3 3l1.5-1.5L14 10v3c0 .55-.45 1-1 1C5.72 14 2 8.28 2 3c0-.55.45-1 1-1z"/></svg>),
  mail:     (<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/><polyline points="1.5,3.5 8,9 14.5,3.5"/></svg>),
};

const MOCK_USERS = [
  { email: "demo@clearview.io", password: "demo123", name: "Sawyer", company: "ClearView Window Co." }
];

async function getAIEstimate(address, settings) {
  const sys = `You are a professional window cleaning estimator. Given an address, return ONLY valid JSON — no markdown, no extra text.

Pricing:
- Small home <1500sqft: $130–$190
- Medium 1500-2500sqft: $190–$290  
- Large 2500-4000sqft: $290–$440
- Luxury 4000sqft+: $440–$750
- Condo: $120–$220
- Commercial small: $350–$700
- Commercial large: $700–$2500
- Per floor above 1st: +15%
- Screens: +$3 each (avg 18 per standard home)
- Tracks: +$1.50 each
- Recurring monthly discount: 15%, quarterly: 8%

Return exactly:
{"finalPrice":number,"rangeMin":number,"rangeMax":number,"propertyType":string,"estimatedSqft":number,"estimatedWindows":number,"floors":number,"complexity":string,"addons":[{"name":string,"price":number}],"confidence":"high"|"medium"|"low","reasoning":string,"recurringMonthly":number,"recurringQuarterly":number}`;

  const res = await fetch("https://clear-quote-production.up.railway.app/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      system: sys,
      messages: [{ role: "user", content: `Address: ${address}\nHourly rate: $${settings.hourlyRate}, min job: $${settings.minJob}, screens: ${settings.includeScreens}, tracks: ${settings.includeTracks}, recurring discount: ${settings.recurringDiscount}%` }]
    })
  });
  const data = await res.json();
  return JSON.parse((data.content?.[0]?.text || "{}").replace(/```json|```/g, "").trim());
}

const TRIAL_DAYS = 3;

function getTrialStatus(user) {
  if (!user) return null;
  if (user.subscribed) return { status: "subscribed" };
  const elapsed = (Date.now() - user.trialStart) / (1000 * 60 * 60 * 24);
  const remaining = Math.max(0, Math.ceil(TRIAL_DAYS - elapsed));
  return elapsed >= TRIAL_DAYS ? { status: "expired", remaining: 0 } : { status: "trial", remaining };
}

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("estimator");
  const [quotes, setQuotes] = useState([]);
  const [customers, setCustomers] = useState([
    { id: 1, name: "Mark Henderson", email: "mark@email.com", phone: "414-555-0192", address: "4821 Oak Creek Dr, Milwaukee WI", notes: "Prefers morning appointments. Has dogs.", jobs: 3, totalSpent: 695 },
    { id: 2, name: "Sarah Kowalski", email: "sarah.k@gmail.com", phone: "262-555-0847", address: "1104 Lakeview Terrace, Waukesha WI", notes: "Monthly recurring. Always pays same day.", jobs: 8, totalSpent: 1840 },
  ]);
  const [jobs, setJobs] = useState([
    { id: 1, customerId: 2, customerName: "Sarah Kowalski", address: "1104 Lakeview Terrace, Waukesha WI", price: 230, date: "2026-04-18", status: "scheduled", type: "Monthly" },
    { id: 2, customerId: 1, customerName: "Mark Henderson", address: "4821 Oak Creek Dr, Milwaukee WI", price: 195, date: "2026-04-15", status: "in-progress", type: "One-time" },
    { id: 3, customerId: 2, customerName: "Sarah Kowalski", address: "1104 Lakeview Terrace, Waukesha WI", price: 230, date: "2026-03-18", status: "completed", type: "Monthly" },
  ]);
  const [settings, setSettings] = useState({ hourlyRate: 85, minJob: 120, includeScreens: true, includeTracks: true, recurringDiscount: 15 });

  const handleLogin = (u) => {
    if (!u.trialStart) u.trialStart = Date.now();
    setUser(u);
  };

  const handleSubscribe = () => { setUser(prev => ({ ...prev, subscribed: true })); setShowPaywall(false); };
  const [showPaywall, setShowPaywall] = useState(false);
  const trial = getTrialStatus(user);

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {!user ? (
          <AuthScreen onLogin={handleLogin} />
        ) : trial?.status === "expired" || showPaywall ? (
          <PaywallScreen user={user} onSubscribe={handleSubscribe} onLogout={() => setUser(null)} />
        ) : (
          <>
            <NavBar user={user} onLogout={() => setUser(null)} />
            {trial?.status === "trial" && (
              <div className={`trial-banner${trial.remaining <= 1 ? " urgent" : ""}`}>
                <div className="trial-banner-left">
                  <span className="trial-days">{trial.remaining} day{trial.remaining !== 1 ? "s" : ""} left in trial</span>
                  {trial.remaining <= 1 ? "Your free trial ends today." : "Subscribe anytime to keep access after your trial ends."}
                </div>
                <button className="btn primary sm" onClick={() => setShowPaywall(true)}>Subscribe — $20/mo</button>
              </div>
            )}
            <div className="main">
              <Sidebar page={page} setPage={setPage} />
              <div className="page">
                {page === "dashboard"  && <DashboardPage quotes={quotes} jobs={jobs} customers={customers} setPage={setPage} />}
                {page === "estimator"  && <EstimatorPage quotes={quotes} setQuotes={setQuotes} customers={customers} settings={settings} />}
                {page === "quotes"     && <QuotesPage quotes={quotes} setQuotes={setQuotes} customers={customers} jobs={jobs} setJobs={setJobs} setCustomers={setCustomers} />}
                {page === "customers"  && <CustomersPage customers={customers} setCustomers={setCustomers} jobs={jobs} />}
                {page === "jobs"       && <JobsPage jobs={jobs} setJobs={setJobs} customers={customers} />}
                {page === "settings"   && <SettingsPage settings={settings} setSettings={setSettings} user={user} onSubscribe={handleSubscribe} trial={trial} />}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function formatCardNumber(val) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val) {
  const d = val.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0,2) + " / " + d.slice(2) : d;
}
function getCardBrand(num) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  return null;
}

function PaywallScreen({ user, onSubscribe, onLogout }) {
  const [step, setStep] = useState("plan"); // plan | pay | success
  const [payMethod, setPayMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updCard = (k, raw) => {
    let v = raw;
    if (k === "number") v = formatCardNumber(raw);
    if (k === "expiry") v = formatExpiry(raw);
    if (k === "cvc") v = raw.replace(/\D/g, "").slice(0, 4);
    setCard(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (card.number.replace(/\s/g,"").length < 16) e.number = "Enter a valid card number";
    if (card.expiry.replace(/\s\/\s/g,"").length < 4) e.expiry = "Enter expiry date";
    if (card.cvc.length < 3) e.cvc = "Enter CVC";
    if (!card.name.trim()) e.name = "Enter name on card";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApplePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setStep("success");
    setTimeout(onSubscribe, 1600);
  };

  const handleCardPay = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setStep("success");
    setTimeout(onSubscribe, 1600);
  };

  const brand = getCardBrand(card.number);

  if (step === "success") return (
    <div className="paywall-wrap">
      <div className="paywall-card" style={{ textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green-l)", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: "1.4rem" }}>✓</div>
        <div className="paywall-heading" style={{ color: "var(--green)" }}>You're all set!</div>
        <div className="paywall-sub">Your subscription is active. Taking you back to ClearQuote…</div>
        <div className="spinner" style={{ margin: "0 auto" }} />
      </div>
    </div>
  );

  if (step === "pay") return (
    <div className="paywall-wrap">
      <div className="paywall-card" style={{ maxWidth: 460 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <button onClick={() => setStep("plan")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sub)", fontSize: "1.1rem", lineHeight: 1, padding: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Subscribe to ClearQuote</div>
            <div style={{ fontSize: "0.74rem", color: "var(--sub)" }}>$20.00 / month · Cancel anytime</div>
          </div>
          <div className="paywall-icon" style={{ width: 32, height: 32, borderRadius: 8, margin: 0, fontSize: "0.65rem" }}>CQ</div>
        </div>

        {/* Apple Pay */}
        <button
          onClick={handleApplePay}
          disabled={loading}
          style={{
            width: "100%", background: "#000", color: "#fff", border: "none",
            borderRadius: 8, padding: "12px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontSize: "0.88rem", fontWeight: 600, letterSpacing: "-0.01em",
            opacity: loading ? 0.6 : 1, marginBottom: "1rem", fontFamily: "var(--font)"
          }}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M3.86 2.28c.38-.46.63-1.1.57-1.74-.56.02-1.23.37-1.63.83-.35.4-.66 1.06-.58 1.69.63.05 1.27-.3 1.64-.78zm.56.92c-.9-.05-1.67.51-2.1.51-.44 0-1.1-.48-1.82-.47C-.41 3.26-.95 4.1-1.23 5c-.56 1.7-.14 4.22 1.02 5.6.55.67 1.2 1.4 2.05 1.37.82-.03 1.13-.52 2.12-.52s1.27.52 2.13.5c.88-.01 1.43-.67 1.97-1.34.62-.78.87-1.54.89-1.58-.02-.01-1.71-.66-1.73-2.6-.02-1.63 1.33-2.41 1.4-2.45-.76-1.12-1.95-1.25-2.26-1.28z" fill="white" transform="translate(5,1)"/><text x="11" y="10" fill="white" fontSize="8" fontWeight="600" fontFamily="-apple-system">Pay</text></svg>
          {loading ? "Processing…" : "Apple Pay"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: "0.72rem", color: "var(--muted)", whiteSpace: "nowrap" }}>or pay with card</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Card form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Card number</label>
            <div style={{ position: "relative" }}>
              <input
                value={card.number}
                onChange={e => updCard("number", e.target.value)}
                placeholder="1234 5678 9012 3456"
                style={{ width: "100%", background: "var(--white)", border: `1px solid ${errors.number ? "var(--red)" : "var(--border)"}`, borderRadius: 8, padding: "9px 12px", paddingRight: 44, color: "var(--text)", fontFamily: "var(--mono)", fontSize: "0.85rem", outline: "none", letterSpacing: "0.05em" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = errors.number ? "var(--red)" : "var(--border)"}
              />
              {brand && <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: "0.65rem", fontWeight: 700, color: "var(--sub)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 6px" }}>{brand}</div>}
            </div>
            {errors.number && <div style={{ fontSize: "0.7rem", color: "var(--red)", marginTop: 4 }}>{errors.number}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Expiry</label>
              <input value={card.expiry} onChange={e => updCard("expiry", e.target.value)} placeholder="MM / YY"
                style={{ width: "100%", background: "var(--white)", border: `1px solid ${errors.expiry ? "var(--red)" : "var(--border)"}`, borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "var(--mono)", fontSize: "0.85rem", outline: "none" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = errors.expiry ? "var(--red)" : "var(--border)"} />
              {errors.expiry && <div style={{ fontSize: "0.7rem", color: "var(--red)", marginTop: 4 }}>{errors.expiry}</div>}
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>CVC</label>
              <input value={card.cvc} onChange={e => updCard("cvc", e.target.value)} placeholder="123"
                style={{ width: "100%", background: "var(--white)", border: `1px solid ${errors.cvc ? "var(--red)" : "var(--border)"}`, borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "var(--mono)", fontSize: "0.85rem", outline: "none" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = errors.cvc ? "var(--red)" : "var(--border)"} />
              {errors.cvc && <div style={{ fontSize: "0.7rem", color: "var(--red)", marginTop: 4 }}>{errors.cvc}</div>}
            </div>
          </div>

          <div className="field" style={{ marginBottom: 0 }}>
            <label>Name on card</label>
            <input value={card.name} onChange={e => updCard("name", e.target.value)} placeholder="Sawyer Johnson"
              style={{ width: "100%", background: "var(--white)", border: `1px solid ${errors.name ? "var(--red)" : "var(--border)"}`, borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "var(--font)", fontSize: "0.85rem", outline: "none" }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = errors.name ? "var(--red)" : "var(--border)"} />
            {errors.name && <div style={{ fontSize: "0.7rem", color: "var(--red)", marginTop: 4 }}>{errors.name}</div>}
          </div>
        </div>

        <button className="btn primary" onClick={handleCardPay} disabled={loading} style={{ marginTop: "1.25rem", opacity: loading ? 0.7 : 1 }}>
          {loading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2, borderTopColor: "white", borderColor: "rgba(255,255,255,0.3)" }} />Processing…</span> : "Subscribe — $20/mo"}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: "0.9rem" }}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><rect x="1" y="6" width="10" height="7" rx="1.5" stroke="var(--muted)" strokeWidth="1.2"/><path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>Secured by Stripe · 256-bit encryption</span>
        </div>

        <div className="paywall-note" style={{ marginTop: "0.75rem" }}>
          Signed in as {user.email} · <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={onLogout}>Sign out</span>
        </div>
      </div>
    </div>
  );

  // Plan overview screen
  return (
    <div className="paywall-wrap">
      <div className="paywall-card">
        <div className="paywall-icon">CQ</div>
        <div className="paywall-heading">Your free trial has ended</div>
        <div className="paywall-sub">Subscribe to ClearQuote to keep generating AI-powered estimates and growing your business.</div>
        <div className="paywall-price">$20<span>/month</span></div>
        <div className="paywall-price-sub">Cancel anytime. No contracts.</div>
        <div className="paywall-features">
          {["Unlimited AI-powered estimates","Address-based instant quoting","Recurring pricing calculator","Quote tracking & management","Pricing customization"].map(f => (
            <div className="paywall-feature" key={f}>
              <div className="paywall-check">✓</div>
              <span>{f}</span>
            </div>
          ))}
        </div>
        <button className="btn primary" onClick={() => setStep("pay")}>Continue to payment</button>
        <div className="paywall-note">Signed in as {user.email} · <span style={{ cursor:"pointer", textDecoration:"underline" }} onClick={onLogout}>Sign out</span></div>
      </div>
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [f, setF] = useState({ email: "demo@clearview.io", password: "demo123", name: "", company: "" });
  const [err, setErr] = useState("");
  const upd = k => e => setF(p => ({ ...p, [k]: e.target.value }));

  const submit = () => {
    setErr("");
    if (tab === "login") {
      const u = MOCK_USERS.find(u => u.email === f.email && u.password === f.password);
      u ? onLogin(u) : setErr("Invalid credentials — try demo@clearview.io / demo123");
    } else {
      if (!f.name || !f.email || !f.password) return setErr("All fields are required");
      const newUser = { ...f, trialStart: Date.now() };
      MOCK_USERS.push(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-inner">
        <div className="auth-brand">
          <div className="auth-brand-icon">CQ</div>
          <div className="auth-brand-name">ClearQuote</div>
        </div>
        <div className="auth-heading">{tab === "login" ? "Welcome back" : "Create account"}</div>
        <div className="auth-sub">{tab === "login" ? "Sign in to your workspace" : "Start your free trial today"}</div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Sign in</button>
          <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Sign up</button>
        </div>
        {tab === "signup" && <>
          <div className="field"><label>Full name</label><input value={f.name} onChange={upd("name")} placeholder="Sawyer Johnson" /></div>
          <div className="field"><label>Company</label><input value={f.company} onChange={upd("company")} placeholder="Crystal Clear Windows LLC" /></div>
        </>}
        <div className="field"><label>Email</label><input type="email" value={f.email} onChange={upd("email")} placeholder="you@company.com" /></div>
        <div className="field"><label>Password</label><input type="password" value={f.password} onChange={upd("password")} placeholder="••••••••" /></div>
        {err && <div className="err-msg">{err}</div>}
        <div style={{ marginTop: "1.25rem" }}><button className="btn primary" onClick={submit}>{tab === "login" ? "Continue" : "Create account"}</button></div>
        {tab === "login" && <div className="demo-hint">demo@clearview.io · demo123</div>}
      </div>
    </div>
  );
}

function NavBar({ user, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="nav-icon-box">CQ</div>
        <div className="nav-name">ClearQuote</div>
      </div>
      <div className="nav-right">
        <div className="avatar">{user.name[0].toUpperCase()}</div>
        <button className="btn secondary sm" onClick={onLogout}>Sign out</button>
      </div>
    </nav>
  );
}

function Sidebar({ page, setPage }) {
  const items = [
    { id: "dashboard", icon: Icons.grid,     label: "Dashboard" },
    { id: "estimator", icon: Icons.zap,      label: "Estimator" },
    { id: "quotes",    icon: Icons.list,     label: "Quotes" },
    { id: "customers", icon: Icons.users,    label: "Customers" },
    { id: "jobs",      icon: Icons.calendar, label: "Jobs" },
    { id: "settings",  icon: Icons.cog,      label: "Settings" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-section">Menu</div>
      {items.map(i => (
        <div key={i.id} className={`nav-item ${page === i.id ? "active" : ""}`} onClick={() => setPage(i.id)}>
          {i.icon}{i.label}
        </div>
      ))}
    </aside>
  );
}

function EstimatorPage({ quotes, setQuotes, settings }) {
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const [est, setEst] = useState(null);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  const run = async () => {
    if (!addr.trim()) return;
    setLoading(true); setErr(""); setEst(null); setSaved(false);
    try { setEst(await getAIEstimate(addr, settings)); }
    catch { setErr("Could not generate estimate. Please try again."); }
    setLoading(false);
  };

  const save = () => {
    if (!est) return;
    setQuotes(p => [{ id: Date.now(), address: addr, ...est, date: new Date().toLocaleDateString(), status: "pending" }, ...p]);
    setSaved(true);
  };

  const confClass = { high: "conf-high", medium: "conf-medium", low: "conf-low" };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Instant Estimator</div>
        <div className="page-desc">Enter any property address for an AI-powered quote in seconds</div>
      </div>
      <div className="est-layout">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Property address</div>
                <div className="card-sub">Any US residential or commercial address</div>
              </div>
            </div>
            <div className="address-row">
              <input className="address-input" value={addr} onChange={e => setAddr(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} placeholder="123 Main Street, Milwaukee, WI 53202" />
              <button className="icon-btn" onClick={run}>{Icons.arrow}</button>
            </div>
            <div className="quick-tags">
              {["123 Oak Ave, Chicago IL", "88 Lakeview Dr, Miami FL", "400 Commerce St, Dallas TX"].map(a => (
                <span key={a} className="qtag" onClick={() => setAddr(a)}>{a.split(",")[0]}</span>
              ))}
            </div>

            {err && <div className="err-msg" style={{ marginTop: "0.75rem" }}>{err}</div>}
            {loading && <div className="loading-row"><div className="spinner" /><span className="loading-text">Analyzing property…</span></div>}

            {est && !loading && (
              <div className="result-wrap">
                <div className="divider" />
                <div className="result-address">{addr}</div>
                <div className="result-price-row">
                  <div className="result-price">${est.finalPrice?.toLocaleString()}</div>
                  <span className={`conf-pill ${confClass[est.confidence] || "conf-medium"}`}>{est.confidence} confidence</span>
                </div>
                <div className="result-range">Range: ${est.rangeMin?.toLocaleString()} – ${est.rangeMax?.toLocaleString()}</div>
                <div className="breakdown-list">
                  {[
                    ["Property type", est.propertyType],
                    ["Square footage", `${est.estimatedSqft?.toLocaleString()} sqft`],
                    ["Windows", `${est.estimatedWindows} windows`],
                    ["Floors", est.floors],
                    ["Complexity", est.complexity],
                    ...(est.addons || []).map(a => [a.name, `+$${a.price}`]),
                  ].map(([l, v], i) => (
                    <div className="breakdown-row" key={i}><span className="bk-label">{l}</span><span className="bk-val">{v}</span></div>
                  ))}
                </div>
                <div className="reasoning-box">
                  <div className="reasoning-label">AI reasoning</div>
                  {est.reasoning}
                </div>
                <div className="action-row">
                  {saved
                    ? <div className="success-toast">✓ Saved to quotes</div>
                    : <button className="btn primary sm" onClick={save}>Save quote</button>
                  }
                  <button className="btn secondary sm" onClick={() => { setEst(null); setAddr(""); setSaved(false); }}>Clear</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="panel-stack">
          {est && !loading && (
            <div className="card">
              <div className="card-header"><div className="card-title">Recurring pricing</div></div>
              <div className="recurring-grid">
                <div className="rec-cell"><div className="rec-label">One-time</div><div className="rec-price">${est.finalPrice}</div><div className="rec-sub">single visit</div></div>
                <div className="rec-cell"><div className="rec-label">Quarterly</div><div className="rec-price blue">${est.recurringQuarterly}</div><div className="rec-sub">per visit</div></div>
                <div className="rec-cell"><div className="rec-label">Monthly</div><div className="rec-price blue">${est.recurringMonthly}</div><div className="rec-sub">per month</div></div>
              </div>
            </div>
          )}
          <div className="card">
            <div className="card-header"><div className="card-title">How it works</div></div>
            {[
              ["Enter address", "Type any residential or commercial US address into the field above."],
              ["AI analyzes property", "Claude estimates size, window count, floors, and complexity from the address."],
              ["Get instant quote", "Receive a precise price with full breakdown and recurring service options."],
            ].map(([t, d], i) => (
              <div className="how-item" key={i}>
                <div className="how-num">{i + 1}</div>
                <div><div className="how-title">{t}</div><div className="how-desc">{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniChart({ jobs }) {
  const months = ["Nov","Dec","Jan","Feb","Mar","Apr"];
  const now = new Date();
  const data = months.map((m, i) => {
    const mo = (now.getMonth() - 5 + i + 12) % 12;
    const val = jobs.filter(j => j.status === "completed" && new Date(j.date).getMonth() === mo)
                    .reduce((s, j) => s + j.price, 0);
    return { label: m, val };
  });
  // add some demo data so chart isn't empty
  const demo = [320, 510, 290, 640, 420, 580];
  const merged = data.map((d, i) => ({ ...d, val: d.val || demo[i] }));
  const max = Math.max(...merged.map(d => d.val), 1);
  return (
    <div>
      <div className="chart-wrap">
        {merged.map((d, i) => (
          <div className="chart-bar-col" key={i}>
            <div className="chart-bar" style={{ height: `${Math.round((d.val / max) * 68) + 4}px` }} title={`$${d.val}`} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        {merged.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div className="chart-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({ quotes, jobs, customers, setPage }) {
  const total = quotes.reduce((s, q) => s + (q.finalPrice || 0), 0);
  const avg = quotes.length ? Math.round(total / quotes.length) : 0;
  const won = quotes.filter(q => q.status === "won").length;
  const completedJobs = jobs.filter(j => j.status === "completed").length;
  const scheduledJobs = jobs.filter(j => j.status === "scheduled").length;

  const activity = [
    ...quotes.slice(0, 3).map(q => ({ text: `New estimate for ${q.address.split(",")[0]}`, time: q.date, color: "var(--accent)" })),
    ...jobs.filter(j => j.status === "completed").slice(0, 2).map(j => ({ text: `Job completed — ${j.customerName}`, time: j.date, color: "var(--green)" })),
    ...jobs.filter(j => j.status === "scheduled").slice(0, 2).map(j => ({ text: `Job scheduled — ${j.address.split(",")[0]}`, time: j.date, color: "var(--yellow)" })),
  ].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-desc">Your business at a glance</div>
      </div>
      <div className="stats-row">
        {[
          ["Quotes sent", `$${total.toLocaleString()}`, "blue", `${quotes.length} estimates`],
          ["Avg estimate", `$${avg}`, "green", "per job"],
          ["Customers", customers.length, null, "total"],
          ["Jobs booked", scheduledJobs, null, `${completedJobs} completed`],
        ].map(([l, v, c, s]) => (
          <div className="stat-card" key={l}>
            <div className="stat-label">{l}</div>
            <div className={`stat-val ${c || ""}`}>{v}</div>
            <div className="stat-sub">{s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Revenue (6 months)</div><div className="card-sub">Completed jobs</div></div>
          </div>
          <MiniChart jobs={jobs} />
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Recent activity</div></div>
          {activity.length === 0
            ? <div className="empty-state" style={{ padding: "1rem 0" }}><div className="empty-text">No activity yet</div></div>
            : activity.map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot" style={{ background: a.color }} />
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              ))
          }
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Upcoming jobs</div>
            <button className="btn secondary sm" onClick={() => setPage("jobs")}>View all</button>
          </div>
          {jobs.filter(j => j.status === "scheduled").length === 0
            ? <div className="empty-state" style={{ padding: "1rem 0" }}><div className="empty-text">No jobs scheduled</div></div>
            : <div className="job-list">{jobs.filter(j => j.status === "scheduled").slice(0, 3).map(j => (
                <div className="job-row" key={j.id}>
                  <div className={`job-dot ${j.status}`} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="job-addr">{j.address.split(",")[0]}</div>
                    <div className="job-meta">{j.customerName} · {j.date}</div>
                  </div>
                  <div className="job-price">${j.price}</div>
                </div>
              ))}</div>
          }
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top customers</div>
            <button className="btn secondary sm" onClick={() => setPage("customers")}>View all</button>
          </div>
          {customers.length === 0
            ? <div className="empty-state" style={{ padding: "1rem 0" }}><div className="empty-text">No customers yet</div></div>
            : <div className="breakdown-list">{customers.sort((a,b) => b.totalSpent - a.totalSpent).slice(0, 4).map(c => (
                <div className="breakdown-row" key={c.id}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="cust-avatar" style={{ width: 26, height: 26, fontSize: "0.65rem" }}>{c.name[0]}</div>
                    <span className="bk-label">{c.name}</span>
                  </div>
                  <span className="bk-val">${c.totalSpent.toLocaleString()}</span>
                </div>
              ))}</div>
          }
        </div>
      </div>
    </div>
  );
}

function QuotesPage({ quotes, setQuotes, customers, jobs, setJobs, setCustomers }) {
  const upd = (id, status) => setQuotes(p => p.map(q => q.id === id ? { ...q, status } : q));
  const del = id => setQuotes(p => p.filter(q => q.id !== id));
  const [bookModal, setBookModal] = useState(null);
  const [jobForm, setJobForm] = useState({ customerName: "", date: "", type: "One-time" });

  const openBook = (q) => { setBookModal(q); setJobForm({ customerName: "", date: new Date().toISOString().split("T")[0], type: "One-time" }); };

  const confirmBook = () => {
    if (!jobForm.customerName || !jobForm.date) return;
    const newJob = { id: Date.now(), customerId: null, customerName: jobForm.customerName, address: bookModal.address, price: bookModal.finalPrice, date: jobForm.date, status: "scheduled", type: jobForm.type };
    setJobs(p => [newJob, ...p]);
    upd(bookModal.id, "won");
    // create customer if new
    const exists = customers.find(c => c.name.toLowerCase() === jobForm.customerName.toLowerCase());
    if (!exists) {
      setCustomers(p => [...p, { id: Date.now()+1, name: jobForm.customerName, email: "", phone: "", address: bookModal.address, notes: "", jobs: 1, totalSpent: bookModal.finalPrice }]);
    } else {
      setCustomers(p => p.map(c => c.id === exists.id ? { ...c, jobs: c.jobs+1, totalSpent: c.totalSpent + bookModal.finalPrice } : c));
    }
    setBookModal(null);
  };

  return (
    <div>
      {bookModal && (
        <div className="modal-backdrop" onClick={() => setBookModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Book as Job</div>
              <button className="modal-close" onClick={() => setBookModal(null)}>×</button>
            </div>
            <div style={{ background: "var(--bg)", borderRadius: 8, padding: "0.85rem", marginBottom: "1rem", fontSize: "0.8rem" }}>
              <div style={{ fontWeight: 600 }}>{bookModal.address.split(",")[0]}</div>
              <div style={{ color: "var(--sub)", marginTop: 2 }}>${bookModal.finalPrice} · {bookModal.propertyType}</div>
            </div>
            <div className="field"><label>Customer name</label>
              <input value={jobForm.customerName} onChange={e => setJobForm(p => ({ ...p, customerName: e.target.value }))} placeholder="Full name"
                list="cust-suggestions" />
              <datalist id="cust-suggestions">{customers.map(c => <option key={c.id} value={c.name} />)}</datalist>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="field"><label>Job date</label><input type="date" value={jobForm.date} onChange={e => setJobForm(p => ({ ...p, date: e.target.value }))} /></div>
              <div className="field"><label>Service type</label>
                <select value={jobForm.type} onChange={e => setJobForm(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <option>One-time</option><option>Monthly</option><option>Quarterly</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn secondary sm" onClick={() => setBookModal(null)}>Cancel</button>
              <button className="btn primary sm" onClick={confirmBook}>Book Job</button>
            </div>
          </div>
        </div>
      )}
      <div className="page-header"><div className="page-title">Saved quotes</div><div className="page-desc">Track estimates and book them as jobs</div></div>
      <div className="card">
        {quotes.length === 0
          ? <div className="empty-state"><div className="empty-icon">📋</div><div className="empty-text">No quotes saved yet. Generate one from the Estimator.</div></div>
          : <div className="table-outer"><table>
              <thead><tr><th>Address</th><th>Type</th><th>Windows</th><th>Price</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>{quotes.map(q => (
                <tr key={q.id}>
                  <td className="td-addr">{q.address}</td>
                  <td><span className="tag">{q.propertyType || "—"}</span></td>
                  <td className="td-muted">{q.estimatedWindows || "—"}</td>
                  <td className="td-price">${q.finalPrice?.toLocaleString()}</td>
                  <td className="td-muted">{q.date}</td>
                  <td>
                    <select value={q.status} onChange={e => upd(q.id, e.target.value)}>
                      {["pending","sent","won","lost"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn primary sm" onClick={() => openBook(q)}>Book</button>
                      <button className="btn danger-text" onClick={() => del(q.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table></div>
        }
      </div>
    </div>
  );
}

function CustomersPage({ customers, setCustomers, jobs }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const upd = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const [selected, setSelected] = useState(null);

  const save = () => {
    if (!form.name) return;
    setCustomers(p => [...p, { id: Date.now(), ...form, jobs: 0, totalSpent: 0 }]);
    setModal(false); setForm({ name: "", email: "", phone: "", address: "", notes: "" });
  };
  const del = id => { setCustomers(p => p.filter(c => c.id !== id)); setSelected(null); };

  const custJobs = id => jobs.filter(j => j.customerId === id || customers.find(c => c.id === id)?.name === j.customerName);

  if (selected) {
    const c = customers.find(c => c.id === selected);
    const cj = custJobs(selected);
    return (
      <div>
        <div className="page-header-row">
          <div>
            <button className="btn secondary sm" onClick={() => setSelected(null)} style={{ marginBottom: "0.75rem" }}>← Back</button>
            <div className="page-title">{c.name}</div>
            <div className="page-desc">{c.address || "No address on file"}</div>
          </div>
          <button className="btn danger-text" onClick={() => del(c.id)}>Remove customer</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div className="card">
            <div className="card-header"><div className="card-title">Contact info</div></div>
            {[
              [Icons.mail, c.email || "No email"],
              [Icons.phone, c.phone || "No phone"],
            ].map(([icon, val], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 0", borderBottom: "1px solid var(--border2)", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--muted)" }}>{icon}</span>{val}
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
              <div><div className="stat-label">Total jobs</div><div style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{c.jobs}</div></div>
              <div><div className="stat-label">Total spent</div><div style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--accent)" }}>${c.totalSpent.toLocaleString()}</div></div>
            </div>
            {c.notes && <div className="reasoning-box" style={{ marginTop: "1rem" }}><div className="reasoning-label">Notes</div>{c.notes}</div>}
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Job history</div></div>
            {cj.length === 0
              ? <div className="empty-state" style={{ padding: "1rem 0" }}><div className="empty-text">No jobs yet</div></div>
              : <div className="job-list">{cj.map(j => (
                  <div className="job-row" key={j.id}>
                    <div className={`job-dot ${j.status}`} />
                    <div style={{ flex: 1 }}><div className="job-addr">{j.type}</div><div className="job-meta">{j.date}</div></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="job-price">${j.price}</div>
                      <span className={`badge badge-${j.status}`}>{j.status}</span>
                    </div>
                  </div>
                ))}</div>
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Add Customer</div><button className="modal-close" onClick={() => setModal(false)}>×</button></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="field" style={{ gridColumn: "1/-1" }}><label>Full name</label><input value={form.name} onChange={upd("name")} placeholder="Jane Smith" /></div>
              <div className="field"><label>Email</label><input value={form.email} onChange={upd("email")} placeholder="jane@email.com" /></div>
              <div className="field"><label>Phone</label><input value={form.phone} onChange={upd("phone")} placeholder="414-555-0100" /></div>
              <div className="field" style={{ gridColumn: "1/-1" }}><label>Address</label><input value={form.address} onChange={upd("address")} placeholder="123 Main St, City, ST" /></div>
              <div className="field" style={{ gridColumn: "1/-1" }}><label>Notes</label><input value={form.notes} onChange={upd("notes")} placeholder="Preferences, gate codes, pets…" /></div>
            </div>
            <div className="modal-footer"><button className="btn secondary sm" onClick={() => setModal(false)}>Cancel</button><button className="btn primary sm" onClick={save}>Add Customer</button></div>
          </div>
        </div>
      )}
      <div className="page-header-row">
        <div><div className="page-title">Customers</div><div className="page-desc">{customers.length} total customers</div></div>
        <button className="btn primary sm" onClick={() => setModal(true)} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icons.plus} Add Customer</button>
      </div>
      {customers.length === 0
        ? <div className="card"><div className="empty-state"><div className="empty-icon">👤</div><div className="empty-text">No customers yet. Add one or book a job from a quote.</div></div></div>
        : <div className="customer-grid">{customers.map(c => (
            <div className="customer-card" key={c.id} onClick={() => setSelected(c.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
                <div className="cust-avatar">{c.name[0]}</div>
                <div><div className="cust-name">{c.name}</div><div className="cust-detail">{c.address?.split(",")[0] || "No address"}</div></div>
              </div>
              {(c.email || c.phone) && <div style={{ fontSize: "0.73rem", color: "var(--sub)", marginBottom: "0.5rem" }}>{c.email || c.phone}</div>}
              <div className="cust-stats">
                <div><div className="cust-stat-val">{c.jobs}</div><div className="cust-stat-label">Jobs</div></div>
                <div><div className="cust-stat-val" style={{ color: "var(--accent)" }}>${c.totalSpent.toLocaleString()}</div><div className="cust-stat-label">Spent</div></div>
              </div>
            </div>
          ))}</div>
      }
    </div>
  );
}

function JobsPage({ jobs, setJobs, customers }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ customerName: "", address: "", price: "", date: new Date().toISOString().split("T")[0], type: "One-time", status: "scheduled" });
  const upd = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const updJob = (id, status) => setJobs(p => p.map(j => j.id === id ? { ...j, status } : j));
  const del = id => setJobs(p => p.filter(j => j.id !== id));

  const save = () => {
    if (!form.customerName || !form.address || !form.price) return;
    setJobs(p => [{ id: Date.now(), ...form, price: +form.price }, ...p]);
    setModal(false); setForm({ customerName: "", address: "", price: "", date: new Date().toISOString().split("T")[0], type: "One-time", status: "scheduled" });
  };

  const statusColor = { scheduled: "var(--accent)", "in-progress": "var(--yellow)", completed: "var(--green)", cancelled: "var(--muted)" };
  const tabs = ["All", "Scheduled", "In Progress", "Completed"];
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? jobs : jobs.filter(j => j.status === tab.toLowerCase().replace(" ", "-"));

  return (
    <div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Schedule Job</div><button className="modal-close" onClick={() => setModal(false)}>×</button></div>
            <div className="field"><label>Customer name</label>
              <input value={form.customerName} onChange={upd("customerName")} placeholder="Full name" list="j-cust-list" />
              <datalist id="j-cust-list">{customers.map(c => <option key={c.id} value={c.name} />)}</datalist>
            </div>
            <div className="field"><label>Property address</label><input value={form.address} onChange={upd("address")} placeholder="123 Main St, City, ST" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              <div className="field"><label>Price ($)</label><input type="number" value={form.price} onChange={upd("price")} placeholder="250" /></div>
              <div className="field"><label>Date</label><input type="date" value={form.date} onChange={upd("date")} /></div>
              <div className="field"><label>Type</label>
                <select value={form.type} onChange={upd("type")} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <option>One-time</option><option>Monthly</option><option>Quarterly</option>
                </select>
              </div>
            </div>
            <div className="modal-footer"><button className="btn secondary sm" onClick={() => setModal(false)}>Cancel</button><button className="btn primary sm" onClick={save}>Schedule</button></div>
          </div>
        </div>
      )}

      <div className="page-header-row">
        <div><div className="page-title">Jobs</div><div className="page-desc">{jobs.length} total jobs</div></div>
        <button className="btn primary sm" onClick={() => setModal(true)} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icons.plus} Schedule Job</button>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 9, padding: 3, width: "fit-content", boxShadow: "var(--shadow)" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "5px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "var(--font)", fontSize: "0.78rem", fontWeight: 500, background: tab === t ? "var(--accent)" : "transparent", color: tab === t ? "white" : "var(--sub)", transition: "all 0.12s" }}>{t}</button>
        ))}
      </div>

      {filtered.length === 0
        ? <div className="card"><div className="empty-state"><div className="empty-icon">📅</div><div className="empty-text">No jobs here. Schedule one or book from a quote.</div></div></div>
        : <div className="job-list">{filtered.map(j => (
            <div className="job-row" key={j.id}>
              <div className="job-dot" style={{ background: statusColor[j.status] || "var(--muted)" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="job-addr">{j.address.split(",")[0]}</div>
                <div className="job-meta">{j.customerName} · {j.date} · {j.type}</div>
              </div>
              <div className="job-price">${j.price}</div>
              <select value={j.status} onChange={e => updJob(j.id, e.target.value)} style={{ marginLeft: 8 }}>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="btn danger-text" style={{ marginLeft: 4 }} onClick={() => del(j.id)}>✕</button>
            </div>
          ))}</div>
      }
    </div>
  );
}

function SettingsPage({ settings, setSettings, user, onSubscribe, trial }) {
  const upd = (k, v) => setSettings(p => ({ ...p, [k]: v }));
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <div className="page-header"><div className="page-title">Settings</div><div className="page-desc">Configure your pricing defaults and estimate behavior</div></div>
      <div className="settings-grid">
        <div className="card">
          <div className="card-header"><div className="card-title">Pricing</div></div>
          <div className="field"><label>Target hourly rate ($)</label><input type="number" value={settings.hourlyRate} onChange={e => upd("hourlyRate", +e.target.value)} /></div>
          <div className="field"><label>Minimum job price ($)</label><input type="number" value={settings.minJob} onChange={e => upd("minJob", +e.target.value)} /></div>
          <div className="field"><label>Recurring discount (%)</label><input type="number" value={settings.recurringDiscount} onChange={e => upd("recurringDiscount", +e.target.value)} /></div>
          <div style={{ marginTop: "1.1rem", marginBottom: "0.65rem", fontSize: "0.82rem", fontWeight: 600 }}>Add-on services</div>
          <div className="toggle-row">
            <div><div className="toggle-label">Screen cleaning</div><div className="toggle-desc">Include in estimates</div></div>
            <button className={`toggle ${settings.includeScreens ? "on" : ""}`} onClick={() => upd("includeScreens", !settings.includeScreens)} />
          </div>
          <div className="toggle-row">
            <div><div className="toggle-label">Track cleaning</div><div className="toggle-desc">Include in estimates</div></div>
            <button className={`toggle ${settings.includeTracks ? "on" : ""}`} onClick={() => upd("includeTracks", !settings.includeTracks)} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card">
            <div className="card-header"><div className="card-title">Account</div></div>
            <div className="field"><label>Name</label><input defaultValue={user.name} readOnly /></div>
            <div className="field"><label>Email</label><input defaultValue={user.email} readOnly /></div>
            <div style={{ marginTop: "1.25rem" }}>
              {saved && <div className="success-toast" style={{ marginBottom: "0.75rem", display: "flex" }}>✓ Settings saved</div>}
              <button className="btn primary" onClick={save}>Save settings</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Subscription</div></div>
            {trial?.status === "subscribed" ? (
              <div>
                <div className="success-toast" style={{ display: "flex", marginBottom: "0.75rem" }}>✓ Active subscription</div>
                <div style={{ fontSize: "0.78rem", color: "var(--sub)" }}>You have full access to ClearQuote. $20/month, billed monthly.</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "0.78rem", color: "var(--sub)", marginBottom: "1rem", lineHeight: 1.6 }}>
                  {trial?.remaining > 0
                    ? `You have ${trial.remaining} day${trial.remaining !== 1 ? "s" : ""} remaining in your free trial.`
                    : "Your trial has ended."}
                  {" "}Subscribe to keep full access.
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "0.2rem" }}>$20<span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--sub)" }}>/month</span></div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "1rem" }}>Cancel anytime. No contracts.</div>
                <button className="btn primary" onClick={onSubscribe}>Subscribe now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
