
// dashboard.jsx — aligned with actual codebase

function TopBar({ title, subtitle, onNavigate }) {
  const { isMobile } = useBreakpoint();
  const { toggle: toggleSidebar } = useSidebar();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const notifRef = React.useRef(null);

  const [notifications, setNotifications] = React.useState([
    { id: 1, icon: 'flame', iconColor: C.warning, iconBg: '#FEF3C7', title: 'New streak record!', body: "You've checked in 12 days in a row. Keep the momentum going.", time: '15m ago', unread: true, page: 'progress' },
    { id: 2, icon: 'sparkles', iconColor: C.accent, iconBg: '#F3E8FF', title: 'AI insight ready', body: 'A new pattern was found between your stretching and mood.', time: '1h ago', unread: true, page: 'insights' },
    { id: 3, icon: 'heart', iconColor: C.destructive, iconBg: '#FEE2E2', title: 'Sarah reacted to your post', body: '"So inspiring — thank you for sharing this 💙"', time: '3h ago', unread: true, page: 'community' },
    { id: 4, icon: 'clipboardCheck', iconColor: C.primary, iconBg: C.primaryLight, title: 'Daily check-in reminder', body: 'Take 2 minutes to log how you\'re feeling today.', time: 'Yesterday', unread: false, page: 'checkin' },
    { id: 5, icon: 'trendingUp', iconColor: C.secondary, iconBg: C.secondaryLight, title: 'Weekly summary available', body: 'Your mood improved 15% compared to last week.', time: '2 days ago', unread: false, page: 'progress' },
  ]);
  const unreadCount = notifications.filter(n => n.unread).length;

  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  React.useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [notifOpen]);

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, unread: false })));
  const openNotif = (n) => {
    setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x));
    setNotifOpen(false);
    if (n.page && onNavigate) onNavigate(n.page);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 16px' : '0 24px', height: 64,
      backgroundColor: C.card, borderBottom: `1px solid ${C.border}`, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {isMobile && (
          <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, marginLeft: -6, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="menu" size={22} color={C.mutedFg} />
          </button>
        )}
        <div>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: isMobile ? 16 : 18, color: C.foreground, margin: 0 }}>{title}</h1>
          {subtitle && !isMobile && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>{subtitle}</p>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12 }}>
        {!isMobile && <LanguageSwitcher variant="header" />}
        {!isMobile && <div style={{ width: 1, height: 24, backgroundColor: C.border }} />}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button onClick={() => setNotifOpen(v => !v)} data-comment-anchor="topbar-notifications" style={{ position: 'relative', background: notifOpen ? C.muted : 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = C.muted; }}
            onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <Icon name="bell" size={20} color={C.mutedFg} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 99, backgroundColor: C.destructive, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Inter', fontSize: 9, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{unreadCount}</span>
              </span>
            )}
          </button>
          {notifOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 100,
              backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
              border: `1px solid ${C.border}`, overflow: 'hidden', width: isMobile ? 'min(360px, calc(100vw - 32px))' : 360,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground }}>Notifications</span>
                  {unreadCount > 0 && (
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 10, color: '#fff', backgroundColor: C.destructive, padding: '2px 6px', borderRadius: 99 }}>{unreadCount} new</span>
                  )}
                </div>
                <button onClick={markAllRead} disabled={unreadCount === 0} style={{ background: 'none', border: 'none', cursor: unreadCount === 0 ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: unreadCount === 0 ? C.mutedFg : C.primary, padding: 0 }}>
                  Mark all read
                </button>
              </div>
              {/* List */}
              <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>
                    You're all caught up.
                  </div>
                ) : notifications.map((n, i) => (
                  <button key={n.id} onClick={() => openNotif(n)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', padding: '12px 16px', background: n.unread ? 'rgba(0,93,167,0.04)' : 'transparent', border: 'none', borderTop: i === 0 ? 'none' : `1px solid ${C.border}`, cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s', position: 'relative' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.muted}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = n.unread ? 'rgba(0,93,167,0.04)' : 'transparent'}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: n.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={n.icon} size={18} color={n.iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground, lineHeight: 1.3 }}>{n.title}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, flexShrink: 0 }}>{n.time}</span>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '3px 0 0', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{n.body}</p>
                    </div>
                    {n.unread && (
                      <div style={{ position: 'absolute', right: 12, top: 18, width: 8, height: 8, borderRadius: '50%', backgroundColor: C.primary }} />
                    )}
                  </button>
                ))}
              </div>
              {/* Footer */}
              <div style={{ borderTop: `1px solid ${C.border}`, padding: '10px 16px', backgroundColor: '#fafbfc' }}>
                <button onClick={() => { setNotifOpen(false); onNavigate && onNavigate('notifications'); }}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.primary, padding: 4 }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar + dropdown */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <div onClick={() => setMenuOpen(v => !v)} style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `2px solid ${menuOpen ? C.primary : C.border}`, transition: 'border-color 0.15s' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: C.primary }}>AR</span>
          </div>
          {menuOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 100,
              backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: `1px solid ${C.border}`, overflow: 'hidden', minWidth: 200,
            }}>
              {/* User header */}
              <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.border}`, flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: C.primary }}>AR</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground }}>Alex Rivera</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>Day 142 in Recovery</div>
                  </div>
                </div>
              </div>
              {/* Menu items */}
              {[
                { label: 'Profile', icon: 'user', page: 'profile' },
                { label: 'Settings', icon: 'settings', page: 'settings' },
                { label: 'Help & Support', icon: 'helpCircle', page: 'support' },
              ].map(item => (
                <button key={item.label} onClick={() => { setMenuOpen(false); onNavigate && onNavigate(item.page); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, textAlign: 'left', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = C.muted}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Icon name={item.icon} size={15} color={C.mutedFg} />
                  {item.label}
                </button>
              ))}
              <div style={{ height: 1, backgroundColor: C.border }} />
              <button onClick={() => { setMenuOpen(false); onNavigate && onNavigate('landing'); }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.destructive, textAlign: 'left', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff5f5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <Icon name="logout" size={15} color={C.destructive} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ---- Period filter (shared by Dashboard + Progress) ----
function PeriodPicker({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const today = '2026-05-14';
  const ago = (d) => { const x = new Date(today + 'T00:00:00'); x.setDate(x.getDate() - d); return x.toISOString().slice(0,10); };
  const [from, setFrom] = React.useState(value.from || ago(13));
  const [to, setTo] = React.useState(value.to || today);

  const isCustom = value.kind === 'custom';
  const fmt = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const customLabel = isCustom ? `${fmt(value.from)} – ${fmt(value.to)}` : 'Custom';

  return (
    <div ref={wrapRef} style={{ display: 'inline-flex', gap: 2, backgroundColor: C.muted, borderRadius: 8, padding: 3, position: 'relative' }}>
      {[{ v: 'week', label: 'Week' }, { v: 'month', label: 'Month' }].map(opt => {
        const active = value.kind === opt.v;
        return (
          <button key={opt.v} onClick={() => onChange({ kind: opt.v })}
            style={{ padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, backgroundColor: active ? C.card : 'transparent', color: active ? C.foreground : C.mutedFg, boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
            {opt.label}
          </button>
        );
      })}
      <button onClick={() => setOpen(v => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, backgroundColor: isCustom || open ? C.card : 'transparent', color: isCustom ? C.foreground : C.mutedFg, boxShadow: isCustom ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
        <Icon name="calendarCheck" size={12} color={isCustom ? C.foreground : C.mutedFg} />
        {customLabel}
        <Icon name="chevronDown" size={10} color={isCustom ? C.foreground : C.mutedFg} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 50, backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 12px 32px rgba(0,0,0,0.14)', border: `1px solid ${C.border}`, padding: 16, width: 300 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>Quick ranges</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
            {[{ label: 'Last 7 days', days: 7 }, { label: 'Last 14 days', days: 14 }, { label: 'Last 30 days', days: 30 }, { label: 'Last 90 days', days: 90 }].map(r => (
              <button key={r.label} onClick={() => { const f = ago(r.days - 1); setFrom(f); setTo(today); onChange({ kind: 'custom', from: f, to: today }); setOpen(false); }}
                style={{ padding: '8px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.foreground, textAlign: 'left', transition: 'all 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.muted; e.currentTarget.style.borderColor = C.primary; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = C.border; }}>
                {r.label}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>Custom range</p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
            <input type="date" value={from} max={to} onChange={e => setFrom(e.target.value)}
              style={{ flex: 1, minWidth: 0, padding: '6px 8px', borderRadius: 6, border: `1px solid ${C.border}`, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.foreground, outline: 'none' }} />
            <span style={{ color: C.mutedFg, fontSize: 12 }}>—</span>
            <input type="date" value={to} min={from} max={today} onChange={e => setTo(e.target.value)}
              style={{ flex: 1, minWidth: 0, padding: '6px 8px', borderRadius: 6, border: `1px solid ${C.border}`, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.foreground, outline: 'none' }} />
          </div>
          <button onClick={() => { onChange({ kind: 'custom', from, to }); setOpen(false); }}
            style={{ width: '100%', padding: '9px', borderRadius: 6, border: 'none', backgroundColor: C.primary, color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12 }}>
            Apply range
          </button>
        </div>
      )}
    </div>
  );
}

// Returns { mood, pain, energy } where each metric is [{label, tipLabel, val, active?}]
// Granularity: ≤14 days → daily; 15–60 → weekly; >60 → monthly.
function dataForPeriod(period) {
  const today = new Date('2026-05-14T00:00:00');
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

  if (period.kind === 'week') return _generateBuckets(addDays(today, -6), today, 'daily');
  if (period.kind === 'month') return _generateBuckets(addDays(today, -27), today, 'weekly');
  // custom
  const from = new Date(period.from + 'T00:00:00');
  const to = new Date(period.to + 'T00:00:00');
  const days = Math.round((to - from) / 86400000) + 1;
  const gran = days <= 14 ? 'daily' : (days <= 60 ? 'weekly' : 'monthly');
  return _generateBuckets(from, to, gran);
}

function _generateBuckets(from, to, granularity) {
  const buckets = []; // { label, tipLabel, key }
  const fmtMD = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const fmtFull = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  if (granularity === 'daily') {
    for (let d = new Date(from); d <= to; d = new Date(d.getTime() + 86400000)) {
      buckets.push({ label: fmtMD(d).toUpperCase(), tipLabel: fmtFull(d), key: d.toISOString().slice(0,10) });
    }
  } else if (granularity === 'weekly') {
    // Anchor 7-day windows to end at `to` so the last bucket is always a full week.
    // Any partial bucket lands at the start of the range.
    const windows = [];
    let end = new Date(to);
    while (end >= from) {
      let start = new Date(end.getTime() - 6 * 86400000);
      if (start < from) start = new Date(from);
      windows.unshift({ start, end });
      end = new Date(start.getTime() - 86400000);
    }
    for (const { start, end } of windows) {
      const sameMonth = start.getMonth() === end.getMonth();
      const sameDay = start.getTime() === end.getTime();
      // Use en-dash with spaces so range never reads like subtraction.
      const label = sameDay
        ? fmtMD(start)
        : (sameMonth
            ? `${fmtMD(start)} – ${end.getDate()}`
            : `${fmtMD(start)} – ${fmtMD(end)}`);
      buckets.push({
        label: label.toUpperCase(),
        tipLabel: sameDay ? fmtMD(start) : `${fmtMD(start)} – ${fmtMD(end)}`,
        key: start.toISOString().slice(0,10),
      });
    }
  } else {
    // monthly
    let cur = new Date(from.getFullYear(), from.getMonth(), 1);
    const lastMonth = new Date(to.getFullYear(), to.getMonth(), 1);
    while (cur <= lastMonth) {
      const monthShort = cur.toLocaleDateString('en-US', { month: 'short' });
      const monthLong = cur.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      buckets.push({ label: monthShort.toUpperCase(), tipLabel: monthLong, key: cur.toISOString().slice(0,7) });
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
    }
  }

  const n = buckets.length;
  // Deterministic seed from bucket key so the same range always renders the same numbers.
  const hash = (s, salt) => { let h = salt; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return ((h >>> 0) % 1000) / 1000; };
  const buildSeries = (salt, base, span, trendDir) =>
    buckets.map((b, i) => {
      const trend = trendDir * (i / Math.max(1, n - 1));
      const r = hash(b.key, salt);
      return {
        label: b.label,
        tipLabel: b.tipLabel,
        val: Math.max(1, Math.min(10, Math.round(base + trend * span + r * 2))),
        active: i === n - 1,
      };
    });

  return {
    mood:   buildSeries(7919, 5, 3, 1),
    pain:   buildSeries(3331, 7, 3, -1),
    energy: buildSeries(5081, 4, 3, 1),
  };
}

function MultiLineChart({ series, height = 200 }) {
  // series: [{ data: [{label, val, active?}], color }]
  const VW = 500, VH = height;
  const PAD = { top: 16, bottom: 30, left: 8, right: 8 };
  const allVals = series.flatMap(s => s.data.map(d => d.val));
  const max = Math.max(...allVals);
  const min = Math.min(...allVals);
  const range = max - min || 1;
  const n = series[0].data.length;

  const xOf = i => PAD.left + (i / (n - 1)) * (VW - PAD.left - PAD.right);
  const yOf = v => PAD.top + (1 - (v - min) / range) * (VH - PAD.top - PAD.bottom);

  const makePath = (data) => {
    const pts = data.map((d, i) => [xOf(i), yOf(d.val)]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1][0] + pts[i][0]) / 2;
      d += ` C ${cpx} ${pts[i-1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
    }
    return { d, pts };
  };

  const defaultActive = series[0].data.findIndex(d => d.active);
  const labels = series[0].data.map(d => d.label);

  const svgRef = React.useRef(null);
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const activeIdx = hoverIdx != null ? hoverIdx : defaultActive;

  const handleMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * VW;
    const innerW = VW - PAD.left - PAD.right;
    const frac = Math.max(0, Math.min(1, (px - PAD.left) / innerW));
    const idx = Math.round(frac * (n - 1));
    setHoverIdx(idx);
  };

  return (
    <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`}
      style={{ width: '100%', height: VH, display: 'block', cursor: 'crosshair' }}
      onMouseMove={handleMove}
      onMouseLeave={() => setHoverIdx(null)}>
      <defs>
        {series.map((s, si) => (
          <linearGradient key={si} id={`mlg${si}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {/* Horizontal grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = PAD.top + t * (VH - PAD.top - PAD.bottom);
        return <line key={i} x1={PAD.left} x2={VW - PAD.right} y1={y} y2={y} stroke="#e5e9eb" strokeWidth="0.8" />;
      })}

      {/* Active vertical guideline */}
      {activeIdx >= 0 && (
        <line x1={xOf(activeIdx)} x2={xOf(activeIdx)}
          y1={PAD.top} y2={VH - PAD.bottom}
          stroke="#c1c7d3" strokeWidth="1" strokeDasharray="4 3" />
      )}

      {/* Series areas + lines */}
      {series.map((s, si) => {
        const { d: linePath, pts } = makePath(s.data);
        const areaPath = linePath + ` L ${pts[pts.length-1][0]} ${VH - PAD.bottom} L ${pts[0][0]} ${VH - PAD.bottom} Z`;
        return (
          <g key={si}>
            <path d={areaPath} fill={`url(#mlg${si})`} />
            <path d={linePath} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map(([x, y], i) => (
              <g key={i}>
                {activeIdx === i && <circle cx={x} cy={y} r="7" fill={s.color} fillOpacity="0.12" />}
                <circle cx={x} cy={y} r={activeIdx === i ? 4 : 3}
                  fill={activeIdx === i ? s.color : '#fff'}
                  stroke={s.color} strokeWidth="1.5" />
              </g>
            ))}
          </g>
        );
      })}

      {/* Tooltip on active — period header + stacked series */}
      {activeIdx >= 0 && (() => {
        const tipW = 70, tipH = 22, gap = 4;
        const headerH = 20;
        const tipLabel = series[0].data[activeIdx].tipLabel || series[0].data[activeIdx].label;
        const headerW = Math.max(78, tipLabel.length * 5.6 + 14);
        const tx = xOf(activeIdx);
        const sorted = series.map((s, si) => ({ s, si, y: yOf(s.data[activeIdx].val) })).sort((a, b) => a.y - b.y);
        const stackTop = Math.max(PAD.top + headerH + 4, sorted[0].y - tipH - 10);
        const headerY = stackTop - headerH - 4;
        const headerX = Math.min(Math.max(tx - headerW/2, 2), VW - headerW - 2);
        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={headerX} y={headerY} width={headerW} height={headerH} rx="5" fill="#181c1e" />
            <text x={headerX + headerW/2} y={headerY + 13.5} textAnchor="middle"
              fill="#fff" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600">{tipLabel}</text>
            {sorted.map((entry, idx) => {
              const tipX = Math.min(Math.max(tx - tipW/2, 2), VW - tipW - 2);
              const tipY = stackTop + idx * (tipH + gap);
              return (
                <g key={entry.si}>
                  <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="5" fill={entry.s.color} />
                  <text x={tipX + tipW/2} y={tipY + 14} textAnchor="middle"
                    fill="#fff" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700">
                    {entry.s.label}: {entry.s.data[activeIdx].val}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* X-axis labels — skip when too dense */}
      {labels.map((lbl, i) => {
        const step = Math.max(1, Math.ceil(n / 8));
        const showLabel = i % step === 0 || i === n - 1 || activeIdx === i;
        if (!showLabel) return null;
        return (
          <text key={i} x={xOf(i)} y={VH - 6}
            textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif"
            fill={activeIdx === i ? '#181c1e' : '#94a3b8'}
            fontWeight={activeIdx === i ? '700' : '400'}>
            {lbl}
          </text>
        );
      })}
    </svg>
  );
}

function DashLineChart({ data, color = C.primaryGradStart, height = 200 }) {
  return <MultiLineChart series={[{ data, color, label: 'Value' }]} height={height} />;
}

function BarChart({ data }) {
  return <DashLineChart data={data} />;
}

function StatCard({ label, value, subValue, description, descriptionColor, iconName, iconColor, iconBg }) {
  return (
    <div style={{ backgroundColor: C.card, borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 12, backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={iconName} size={24} color={iconColor} />
        </div>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: 0, textTransform: 'uppercase' }}>{label}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: C.foreground, margin: '2px 0 0', lineHeight: 1.2 }}>
            {value}<span style={{ fontSize: 18, fontWeight: 400, color: C.mutedFg }}>{subValue}</span>
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: descriptionColor || C.mutedFg, margin: '2px 0 0' }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function DashboardScreen({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [period, setPeriod] = React.useState({ kind: 'week' });
  const { mood: moodSeries, pain: painSeries, energy: energySeries } = dataForPeriod(period);

  // A gentle, supportive moment drawn from the user's OWN recent behavior — not a
  // recommendation engine, just the app quietly noticing something kind. Deterministic
  // rotation over known activities so it feels familiar, safe and non-invasive.
  const supportiveMoments = [
    { observation: 'Short walks have been showing up often in your recent check-ins.', support: 'Whenever it feels right, a few quiet minutes outside could be a gentle way to continue.' },
    { observation: "You've been consistently making time for stretching lately.", support: 'No need to keep a streak — it just felt worth noticing.' },
    { observation: 'Mindfulness has come up a few times in how you’ve described your days.', support: 'Even five unhurried minutes can be enough when things feel full.' },
    { observation: 'Your evenings seem to have felt a little calmer this week.', support: 'Whatever you’ve been doing, it looks like it’s been helping.' },
  ];
  const moment = supportiveMoments[new Date().getDay() % supportiveMoments.length];

  const stats = [
    { label: 'MOOD', value: '8', subValue: '/10', description: 'Stable', iconName: 'smile', iconColor: C.mood, iconBg: C.moodLight },
    { label: 'PAIN', value: '3', subValue: '/10', description: 'Decreasing', descriptionColor: C.secondary, iconName: 'activity', iconColor: C.pain, iconBg: C.painLight },
    { label: 'STREAK', value: '12', subValue: ' days', description: 'New record!', iconName: 'flame', iconColor: C.warning, iconBg: '#FEF3C7' },
    { label: 'PROGRESS', value: '+15', subValue: '%', description: 'vs. last week', iconName: 'trendingUp', iconColor: C.secondary, iconBg: C.secondaryLight },
  ];

  const communityFeed = [
    { name: 'Sarah', action: 'shared a milestone', detail: '', time: '30 min ago', bg: '#ec4899', initials: 'S' },
    { name: 'James', action: 'joined the Yoga group', detail: '', time: '1 hour ago', bg: C.primary, initials: 'J' },
    { name: 'Marcus', action: 'posted a question', detail: '', time: '2 hours ago', bg: C.secondary, initials: 'M' },
  ];

  // Derived highlights for the trend summary row beneath the chart
  const moodVals = moodSeries.map(d => d.val).filter(v => typeof v === 'number');
  const avgMood = moodVals.length ? (moodVals.reduce((a, b) => a + b, 0) / moodVals.length).toFixed(1) : '—';
  const bestIdx = moodVals.length ? moodVals.indexOf(Math.max(...moodVals)) : -1;
  const bestDay = bestIdx >= 0 ? (moodSeries[bestIdx].tipLabel || moodSeries[bestIdx].label) : '—';
  const loggedDays = moodSeries.filter(d => d.active !== false).length;
  const trendSummary = [
    { iconName: 'smile', iconColor: C.mood, label: 'Avg mood', value: avgMood, suffix: '/10' },
    { iconName: 'trendingUp', iconColor: C.secondary, label: 'Best day', value: bestDay, suffix: '' },
    { iconName: 'clipboardCheck', iconColor: C.primary, label: 'Logged', value: `${loggedDays}/${moodSeries.length}`, suffix: ' days' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Dashboard" subtitle="Welcome back, Alex" onNavigate={onNavigate} />

      <div style={{ padding: isMobile ? '16px' : '24px', display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
        {/* Top row: Check-in CTA + Today's Focus */}
        <div style={{ display: 'grid', gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '2fr 1fr', gap: isMobile ? 16 : 24 }}>
          {/* Check-in CTA — matches CheckInCTA.tsx exactly */}
          <div style={{ borderRadius: 16, background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, padding: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.2 }}>
              <Icon name="clipboardCheck" size={128} color="#fff" />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.warning, animation: 'pulse 2s infinite' }}/>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: '#fff' }}>Action Required</span>
              </div>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 22, color: '#fff', margin: '0 0 8px', maxWidth: 400 }}>Ready for your Daily Check-In?</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: '0 0 24px', lineHeight: 1.6, maxWidth: 380 }}>Maintaining consistent tracking is the key to identifying patterns in your recovery journey.</p>
              <button onClick={() => onNavigate('checkin')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#fff', color: C.primaryGradStart, border: 'none', borderRadius: 8, padding: '10px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Start Check-In <Icon name="arrowRight" size={16} color={C.primaryGradStart} />
              </button>
            </div>
          </div>

          {/* A Small Moment for Yourself — a gentle observation, not a directive */}
          <div style={{ borderRadius: 16, backgroundColor: C.card, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: 0 }}>A Small Moment for Yourself</h4>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.08em', color: C.mutedFg, margin: '3px 0 0', textTransform: 'uppercase' }}>Something we noticed</p>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="heart" size={16} color={C.primary} />
              </div>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, lineHeight: 1.45, margin: '12px 0 10px' }}>{moment.observation}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.6, margin: 0 }}>{moment.support}</p>
          </div>
        </div>

        {/* Stats grid (4 cols → 2 cols on mobile/tablet) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 16 }}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Bottom: chart + AI insight + community */}
        <div style={{ display: 'grid', gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '2fr 1fr', gap: isMobile ? 16 : 24 }}>
          {/* Weekly chart */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: 0 }}>Weekly Recovery Trend</h4>
              <PeriodPicker value={period} onChange={setPeriod} />
            </div>
            <div style={{ position: 'relative' }}>
              <MultiLineChart height={200} series={[
                { data: moodSeries, color: C.mood, label: 'Mood' },
                { data: painSeries, color: C.pain, label: 'Pain' },
                { data: energySeries, color: C.energy, label: 'Energy' },
              ]} />
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 4, paddingLeft: 4 }}>
              {[{ label: 'Mood', color: C.mood }, { label: 'Pain', color: C.pain }, { label: 'Energy', color: C.energy }].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 20, height: 3, borderRadius: 99, backgroundColor: s.color }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Trend summary — fills space beneath the chart with at-a-glance highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.muted}` }}>
              {trendSummary.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={t.iconName} size={17} color={t.iconColor} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.06em', color: C.mutedFg, margin: 0, textTransform: 'uppercase' }}>{t.label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: C.foreground, margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.value}<span style={{ fontWeight: 500, fontSize: 12, color: C.mutedFg }}>{t.suffix}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI insight + community */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* AI Insight card — matches AIInsightCard.tsx */}
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Icon name="sparkles" size={16} color={C.accent} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.08em', color: C.mutedFg, textTransform: 'uppercase' }}>AI Insight</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, lineHeight: 1.65, margin: 0 }}>
                "Your mood is <strong style={{ color: C.secondary }}>20% higher</strong> on days you stretch. Consider adding a short session tonight."
              </p>
              <button onClick={() => onNavigate('insights')} style={{ marginTop: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>View All Insights</button>
            </div>

            {/* Community activity */}
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: 0 }}>Community</h4>
                <button onClick={() => onNavigate('community')} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: C.primary, background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
              </div>
              {communityFeed.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.muted}` }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: '#fff' }}>{item.initials}</span>
                    </div>
                    {item.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 8, height: 8, borderRadius: '50%', backgroundColor: C.success, border: '2px solid #fff' }}/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.foreground, margin: 0, lineHeight: 1.5 }}>
                      <strong>{item.name}</strong> {item.action}{item.detail && <span style={{ color: C.mutedFg }}> {item.detail}</span>}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: '2px 0 0' }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { DashboardScreen, TopBar, BarChart, DashLineChart, MultiLineChart, StatCard, PeriodPicker, dataForPeriod });
