// goals.jsx — redesigned to match reference UI
// Overview: bento card grid + AI Insights sidebar
// Detail: linear phase progression
// Create: modal

const G = {
  physical:  { label: 'Physical',  pill: '#7cf8dd', pillText: '#005144', bar: '#005da7', icon: 'activity' },
  mental:    { label: 'Mental',    pill: '#f8d8ff', pillText: '#662e7e', bar: '#7d4495', icon: 'sparkles' },
  lifestyle: { label: 'Lifestyle', pill: '#e5e9eb', pillText: '#414751', bar: '#10b981', icon: 'flame'     },
  social:    { label: 'Social',    pill: '#e5e9eb', pillText: '#414751', bar: '#10b981', icon: 'users'     },
};

// ── Circular progress ──────────────────────────────────────────────────────
function CircleProgress({ pct, size = 96, stroke = 8, color = '#005da7' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e9eb" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
    </svg>
  );
}

// ── Action icons (inline SVGs so meanings are unmistakable) ───────────────
const ActIcon = ({ name, size = 14, color = 'currentColor' }) => {
  const s = { width: size, height: size, style: { flexShrink: 0, display: 'block' } };
  const stroke = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    pause:   <svg {...s} viewBox="0 0 24 24" fill={color}><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>,
    play:    <svg {...s} viewBox="0 0 24 24" fill={color}><polygon points="6,4 20,12 6,20" /></svg>,
    check:   <svg {...s} viewBox="0 0 24 24" {...stroke}><polyline points="20 6 9 17 4 12" /></svg>,
    xCircle: <svg {...s} viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>,
    edit:    <svg {...s} viewBox="0 0 24 24" {...stroke}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    trash:   <svg {...s} viewBox="0 0 24 24" {...stroke}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>,
    copy:    <svg {...s} viewBox="0 0 24 24" {...stroke}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    uTurn:   <svg {...s} viewBox="0 0 24 24" {...stroke}><polyline points="3 11 8 6 13 11"/><path d="M8 6v8a6 6 0 0 0 12 0v-2"/></svg>,
    activity:<svg {...s} viewBox="0 0 24 24" {...stroke}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  };
  return icons[name] || null;
};

// ── Status palette ─────────────────────────────────────────────────────────
// Active = blue. Paused = warm amber. Completed = green. Abandoned = muted grey.
const STATE_TOKENS = {
  active: {
    bg: '#eaf3ff',
    hoverBg: '#dde9fb',
    border: '1px solid #a8c7ec',
    stripe: 'linear-gradient(180deg, #2976c7 0%, #005da7 100%)',
    accent: '#005da7',
    accentSoft: '#c6dcf3',
    shadow: '0 1px 6px rgba(0,93,167,0.12)',
    hoverShadow: '0 8px 22px rgba(0,93,167,0.22)',
    barBg: '#c6dcf3',
    ribbon: { label: 'Active', icon: 'activity', bg: '#005da7', fg: '#fff' },
    titleColor: '#0a2f50',
    bodyColor: '#345477',
  },
  paused: {
    bg: '#fff5e6',
    hoverBg: '#ffeed1',
    border: '1.5px solid #e9b87a',
    stripe: 'repeating-linear-gradient(180deg, #c97f1a 0 6px, transparent 6px 12px)',
    accent: '#a35e0a',
    accentSoft: '#fbe1bb',
    shadow: 'none',
    hoverShadow: '0 6px 18px rgba(163,94,10,0.14)',
    barBg: '#fbe1bb',
    ribbon: { label: 'Paused', icon: 'pause', bg: '#a35e0a', fg: '#fff' },
    titleColor: '#5c3508',
    bodyColor: '#7a5021',
  },
  completed: {
    bg: '#e8faf2',
    hoverBg: '#d8f4e8',
    border: '1px solid #9ddcc1',
    stripe: 'linear-gradient(180deg, #00a888 0%, #006b5b 100%)',
    accent: '#006b5b',
    accentSoft: '#bce8d6',
    shadow: '0 1px 6px rgba(0,107,91,0.12)',
    hoverShadow: '0 8px 22px rgba(0,107,91,0.22)',
    barBg: '#bce8d6',
    ribbon: { label: 'Completed', icon: 'check', bg: '#006b5b', fg: '#fff' },
    titleColor: '#0a3d35',
    bodyColor: '#2e5a4e',
  },
  abandoned: {
    bg: '#f3f4f6',
    hoverBg: '#eceef2',
    border: '1px solid #d4d8de',
    stripe: 'linear-gradient(180deg, #b4b9c1 0%, #717783 100%)',
    accent: '#5b616b',
    accentSoft: '#dee1e6',
    shadow: 'none',
    hoverShadow: '0 4px 14px rgba(0,0,0,0.07)',
    barBg: '#dee1e6',
    ribbon: { label: 'Abandoned', icon: 'xCircle', bg: '#5b616b', fg: '#fff' },
    titleColor: '#414751',
    bodyColor: '#717783',
  },
};

// Actions available per status (in display order). Icons reflect the verb literally.
const STATE_ACTIONS = {
  active:    [{ id: 'edit', label: 'Edit', icon: 'edit' }, { id: 'pause', label: 'Pause', icon: 'pause' }, { id: 'abandon', label: 'Abandon', icon: 'xCircle', tone: 'warn' }, { id: 'delete', label: 'Delete', icon: 'trash', tone: 'danger' }],
  paused:    [{ id: 'edit', label: 'Edit', icon: 'edit' }, { id: 'resume', label: 'Resume', icon: 'play', tone: 'primary' }, { id: 'abandon', label: 'Abandon', icon: 'xCircle', tone: 'warn' }, { id: 'delete', label: 'Delete', icon: 'trash', tone: 'danger' }],
  completed: [{ id: 'edit', label: 'Edit', icon: 'edit' }, { id: 'duplicate', label: 'Duplicate Goal', icon: 'copy' }, { id: 'delete', label: 'Delete', icon: 'trash', tone: 'danger' }],
  abandoned: [{ id: 'edit', label: 'View / Edit', icon: 'edit' }, { id: 'restore', label: 'Restore', icon: 'uTurn' }, { id: 'delete', label: 'Delete', icon: 'trash', tone: 'danger' }],
};

// ── Goal Card ──────────────────────────────────────────────────────────────
// Driven by `goal.state` ∈ active | paused | completed | abandoned.
function GoalCard({ goal, onClick, onAction }) {
  const cat = G[goal.category] || G.physical;
  const completed = goal.phases.filter(p => p.status === 'completed').length;
  const total = goal.phases.length;
  const pct = total ? Math.round(completed / total * 100) : 0;
  const activePhase = goal.phases.find(p => p.status === 'active');

  const status = goal.state || 'active';
  const S = STATE_TOKENS[status];
  const actions = STATE_ACTIONS[status] || [];

  const [hov, setHov] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      data-comment-anchor={`goal-card-${goal.id}`}
      style={{
        backgroundColor: hov ? S.hoverBg : S.bg,
        border: S.border,
        borderRadius: 14, padding: 24,
        boxShadow: hov ? S.hoverShadow : S.shadow,
        cursor: 'pointer', transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
        transform: hov ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column', minHeight: 200, position: 'relative',
        overflow: 'hidden',
        opacity: status === 'abandoned' ? 0.78 : 1,
      }}>
      {/* Colored status stripe down the left edge */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 5,
        background: S.stripe,
      }} />
      {/* Completed gets a subtle decorative corner glow */}
      {status === 'completed' && (
        <div style={{
          position: 'absolute', right: -30, top: -30, width: 110, height: 110,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,107,91,0.10), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Header row: category pill + status ribbon + menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 8, position: 'relative' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{
            padding: '3px 10px', borderRadius: 999,
            backgroundColor: cat.pill, color: cat.pillText,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>{cat.label}</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 10px 3px 8px', borderRadius: 999,
            backgroundColor: S.ribbon.bg, color: S.ribbon.fg,
            border: S.ribbon.borderColor ? `1px solid ${S.ribbon.borderColor}` : 'none',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>
            <ActIcon name={S.ribbon.icon} size={11} color={S.ribbon.fg} />
            {S.ribbon.label}
          </span>
        </div>
        <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', color: '#94a3b8', lineHeight: 1, borderRadius: 6, transition: 'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </button>
          {menuOpen && (
            <div onClick={e => e.stopPropagation()} style={{
              position: 'absolute', right: 0, top: '110%', zIndex: 100,
              backgroundColor: '#fff', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid #e5e9eb', overflow: 'hidden', minWidth: 160,
            }}>
              {actions.map((a, idx) => {
                const isDanger = a.tone === 'danger';
                const isWarn   = a.tone === 'warn';
                const color    = isDanger ? '#ba1a1a' : isWarn ? '#a35e0a' : '#181c1e';
                const iconColor = isDanger ? '#ba1a1a' : isWarn ? '#a35e0a' : '#717783';
                const hoverBg  = isDanger ? '#fff5f5' : isWarn ? '#fff8ec' : '#f7fafc';
                // Divider before the first danger/warn item
                const showDivider = idx > 0 && (isDanger || isWarn) && actions[idx - 1].tone !== a.tone;
                return (
                  <React.Fragment key={a.id}>
                    {showDivider && <div style={{ height: 1, backgroundColor: '#f1f4f6' }} />}
                    <button onClick={e => { e.stopPropagation(); setMenuOpen(false); onAction && onAction(a.id, goal); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color, textAlign: 'left', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = hoverBg}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <ActIcon name={a.icon} size={14} color={iconColor} /> {a.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, color: S.titleColor, margin: '0 0 6px', position: 'relative' }}>{goal.title}</h4>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: S.bodyColor, lineHeight: 1.55, margin: '0 0 auto', flexGrow: 1, position: 'relative' }}>{goal.description}</p>

      {/* Status-specific footer */}
      <div style={{ marginTop: 18, position: 'relative' }}>
        {status === 'completed' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: S.accentSoft, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: S.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActIcon name="check" size={14} color="#fff" />
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: S.accent, margin: 0, lineHeight: 1.2 }}>All {total} phases done</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: S.bodyColor, margin: '2px 0 0', lineHeight: 1.2 }}>{goal.completedOn ? `Completed ${goal.completedOn}` : 'Tap to celebrate'}</p>
              </div>
            </div>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 18, color: S.accent }}>100%</span>
          </div>
        )}

        {status === 'active' && (
          <>
            {activePhase && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '6px 0' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: S.accent, boxShadow: `0 0 0 4px ${S.accentSoft}`, flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: S.bodyColor, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span style={{ fontWeight: 600, color: S.accent }}>Now:</span> {activePhase.title}
                </span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#717783', textTransform: 'uppercase' }}>
                Phase {Math.min(completed + 1, total)} of {total}
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: S.accent }}>{pct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, backgroundColor: S.barBg, overflow: 'hidden', display: 'flex', gap: 2 }}>
              {goal.phases.map((p) => (
                <div key={p.id} style={{
                  flex: 1, height: '100%', borderRadius: 999,
                  backgroundColor: p.status === 'completed' ? S.accent : p.status === 'active' ? S.accent : 'transparent',
                  opacity: p.status === 'active' ? 0.55 : 1,
                  transition: 'background 0.4s ease',
                }} />
              ))}
            </div>
          </>
        )}

        {status === 'paused' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: S.accentSoft, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: S.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActIcon name="pause" size={12} color="#fff" />
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: S.accent, margin: 0, lineHeight: 1.2 }}>
                  {goal.pausedSince ? `Paused since ${goal.pausedSince}` : 'Paused'}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: S.bodyColor, margin: '2px 0 0', lineHeight: 1.2 }}>{completed} of {total} phases done · resume any time</p>
              </div>
            </div>
            <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 16, color: S.accent }}>{pct}%</span>
          </div>
        )}

        {status === 'abandoned' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: S.accentSoft, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #c1c7d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActIcon name="xCircle" size={14} color={S.accent} />
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: S.accent, margin: 0, lineHeight: 1.2 }}>
                  {goal.abandonedOn ? `Stopped on ${goal.abandonedOn}` : 'Stopped'}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: S.bodyColor, margin: '2px 0 0', lineHeight: 1.2 }}>Reached phase {Math.min(completed + 1, total)} of {total} before stopping</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Add Goal placeholder card ──────────────────────────────────────────────
function AddGoalCard({ onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        border: '2px dashed #c1c7d3', borderRadius: 14, padding: 24,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', backgroundColor: hov ? 'rgba(255,255,255,0.6)' : 'transparent',
        transition: 'background 0.15s', minHeight: 180, textAlign: 'center',
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%', backgroundColor: '#f1f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
        transform: hov ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.15s',
      }}>
        <Icon name="plus" size={22} color="#717783" />
      </div>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#414751', margin: '0 0 4px' }}>Add New Milestone</p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#717783', margin: 0 }}>Build your path to recovery</p>
    </div>
  );
}

// ── Create Goal Modal ──────────────────────────────────────────────────────
function CreateGoalModal({ onClose, onCreate, onUpdate, initialGoal }) {
  const [title, setTitle] = React.useState(initialGoal?.title || '');
  const [desc, setDesc]   = React.useState(initialGoal?.description || '');
  const [cat, setCat]     = React.useState(initialGoal?.category || 'physical');
  const [date, setDate]   = React.useState('');
  const isEdit = !!initialGoal;

  const submit = () => {
    if (!title.trim()) return;
    if (isEdit) {
      onUpdate && onUpdate({ ...initialGoal, title: title.trim(), description: desc.trim(), category: cat });
    } else {
      onCreate({ title: title.trim(), description: desc.trim(), category: cat, targetDate: date });
    }
    onClose();
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0',
    fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#181c1e',
    backgroundColor: '#f7fafc', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        backgroundColor: '#fff', borderRadius: 16, width: 440, maxWidth: '90vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
      }}>
        {/* Header banner */}
        <div style={{ background: 'linear-gradient(135deg, #005da7, #2976c7)', padding: '28px 28px 24px', color: '#fff' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Icon name="target" size={22} color="#fff" />
          </div>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 22, margin: '0 0 4px' }}>{isEdit ? 'Edit Goal' : 'Create New Goal'}</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{isEdit ? 'Update your goal details below.' : "What's the next step in your recovery sanctuary?"}</p>
        </div>

        {/* Body */}
        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#717783', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Daily Meditation" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#005da7'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#717783', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Explain your intention…"
              rows={3} style={{ ...inputStyle, resize: 'none', lineHeight: 1.55 }}
              onFocus={e => e.target.style.borderColor = '#005da7'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#717783', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Category</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { value: 'physical',  label: 'Physical',  pill: '#7cf8dd', pillText: '#005144' },
                { value: 'mental',    label: 'Mental',    pill: '#f8d8ff', pillText: '#662e7e' },
                { value: 'lifestyle', label: 'Lifestyle', pill: '#e5e9eb', pillText: '#414751' },

              ].map(opt => {
                const active = cat === opt.value;
                return (
                  <button key={opt.value} type="button" onClick={() => setCat(opt.value)} style={{
                    padding: '7px 16px', borderRadius: 999, border: active ? '2px solid transparent' : '2px solid #e2e8f0',
                    backgroundColor: active ? opt.pill : '#f7fafc',
                    color: active ? opt.pillText : '#717783',
                    fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  }}>{opt.label}</button>
                );
              })}
            </div>
          </div>
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#717783', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Target Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={{ ...inputStyle, colorScheme: 'light' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1.5px solid #e2e8f0', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#414751', cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={submit} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(to right, #005da7, #2976c7)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,93,167,0.25)' }}>
              {isEdit ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── New Milestone Modal ───────────────────────────────────────────────────
function NewMilestoneModal({ onClose, onCreate, goalTitle }) {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc]   = React.useState('');

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0',
    fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#181c1e',
    backgroundColor: '#f7fafc', outline: 'none', boxSizing: 'border-box',
  };

  const submit = () => {
    if (!title.trim()) return;
    onCreate({ title: title.trim(), description: desc.trim() });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        backgroundColor: '#fff', borderRadius: 16, width: 440, maxWidth: '90vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
      }}>
        <div style={{ background: 'linear-gradient(135deg, #005da7, #2976c7)', padding: '28px 28px 24px', color: '#fff' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Icon name="plus" size={22} color="#fff" />
          </div>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 22, margin: '0 0 4px' }}>New Milestone</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>Add the next step for "{goalTitle}".</p>
        </div>

        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#717783', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Milestone Title</label>
            <input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Reach a 30-day streak" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#005da7'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#717783', letterSpacing: '0.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Explain what this milestone involves…"
              rows={3} style={{ ...inputStyle, resize: 'none', lineHeight: 1.55 }}
              onFocus={e => e.target.style.borderColor = '#005da7'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <div style={{ padding: '10px 14px', backgroundColor: '#eff6ff', borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Icon name="lock" size={14} color="#3b82f6" />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1e40af', margin: 0, lineHeight: 1.5 }}>This milestone will be added as locked and unlock automatically when the previous phase is completed.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1.5px solid #e2e8f0', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#414751', cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={submit} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(to right, #005da7, #2976c7)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,93,167,0.25)' }}>
              Add Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Goal Detail: Linear Phase Progression ─────────────────────────────────
function GoalDetail({ goal, onBack, onCompletePhase, onAddMilestone }) {
  const { isMobile } = useBreakpoint();
  const [showMilestoneModal, setShowMilestoneModal] = React.useState(false);
  const pct = goal.phases.length
    ? Math.round(goal.phases.filter(p => p.status === 'completed').length / goal.phases.length * 100)
    : 0;

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f7fafc' }}>
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 16px' : '0 32px', height: 64,
        backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#717783' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#717783', fontFamily: 'Inter, sans-serif', fontSize: 13, padding: 0 }}>Goals</button>
          <span>/</span>
          <span style={{ color: '#181c1e', fontWeight: 500 }}>{goal.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setShowMilestoneModal(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8, border: 'none',
            background: 'linear-gradient(to right, #005da7, #2976c7)',
            color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,93,167,0.25)',
          }}>
            <Icon name="plus" size={14} color="#fff" />
            New Milestone
          </button>
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex' }}>
            <Icon name="bell" size={20} color="#94a3b8" />
          </button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#e8f4fd', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e2e8f0' }}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, color: '#005da7' }}>AJ</span>
          </div>
        </div>
      </header>

      <div style={{ padding: isMobile ? '20px 16px 40px' : '40px 40px 60px', maxWidth: 900, margin: '0 auto' }}>
        {/* Goal header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 20 : 32, marginBottom: isMobile ? 28 : 48 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 40, color: '#181c1e', margin: '0 0 12px', lineHeight: 1.1 }}>{goal.title}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#414751', lineHeight: 1.65, maxWidth: 560, margin: 0 }}>{goal.description}</p>
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', flexShrink: 0, minWidth: 160 }}>
            <div style={{ position: 'relative', width: 96, height: 96, marginBottom: 10 }}>
              <CircleProgress pct={pct} size={96} stroke={8} color="#005da7" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 20, color: '#181c1e' }}>{pct}%</span>
              </div>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#717783', textTransform: 'uppercase' }}>Overall Progress</span>
          </div>
        </div>

        {/* Phase timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical connector line */}
          <div style={{ position: 'absolute', left: 39, top: 40, bottom: 40, width: 2, backgroundColor: '#e5e9eb', zIndex: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {goal.phases.map((phase, i) => {
              const isCompleted = phase.status === 'completed';
              const isActive    = phase.status === 'active';
              const isLocked    = phase.status === 'locked';

              return (
                <div key={phase.id} style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: 24, opacity: isLocked ? 0.5 : 1, filter: isLocked ? 'grayscale(0.5)' : 'none' }}>
                  {/* Node */}
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
                    backgroundColor: isCompleted ? '#006b5b' : isActive ? '#005da7' : '#e5e9eb',
                    border: '4px solid #f7fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isActive ? '0 4px 16px rgba(0,93,167,0.25)' : '0 1px 4px rgba(0,0,0,0.08)',
                  }}>
                    {isCompleted && <Icon name="check" size={28} color="#fff" />}
                    {isActive    && <Icon name="activity" size={26} color="#fff" />}
                    {isLocked    && <Icon name="lock" size={24} color="#717783" />}
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1, marginTop: 8,
                    backgroundColor: isActive ? '#fff' : '#f1f4f6',
                    borderRadius: 14,
                    borderLeft: isActive ? '4px solid #005da7' : '4px solid transparent',
                    padding: isActive ? '28px 28px 24px' : '20px 24px',
                    boxShadow: isActive ? '0 2px 12px rgba(0,93,167,0.10)' : 'none',
                  }}>
                    {isCompleted && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#006b5b', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Phase {i + 1} · Completed</span>
                          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, color: '#181c1e', margin: '0 0 6px' }}>{phase.title}</h3>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#414751', margin: 0 }}>{phase.description}</p>
                        </div>
                        {phase.dates && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94a3b8', flexShrink: 0, marginLeft: 16 }}>{phase.dates}</span>}
                      </div>
                    )}

                    {isActive && (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                          <div style={{ flex: 1 }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 999, backgroundColor: '#d4e3ff', color: '#004883', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Active Phase</span>
                            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 22, color: '#181c1e', margin: '0 0 8px' }}>{phase.title}</h3>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#414751', lineHeight: 1.6, margin: '0 0 20px' }}>{phase.description}</p>
                            {phase.stats && (
                              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10, marginBottom: 8 }}>
                                {phase.stats.map((s, si) => (
                                  <div key={si} style={{ backgroundColor: '#f7fafc', borderRadius: 10, padding: '10px 12px' }}>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: '#717783', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>{s.label}</p>
                                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 17, color: '#181c1e', margin: 0 }}>{s.value}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                            <button onClick={() => onCompletePhase(goal.id, phase.id)} style={{
                              padding: '12px 24px', borderRadius: 10, border: 'none',
                              background: 'linear-gradient(135deg, #005da7, #2976c7)',
                              color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14,
                              cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,93,167,0.3)',
                              whiteSpace: 'nowrap',
                            }}>Complete Phase</button>
                            {goal.phases[i + 1] && (
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#94a3b8', margin: '8px 0 0', textAlign: 'center' }}>Next: {goal.phases[i + 1].title}</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {isLocked && (
                      <>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>Phase {i + 1} · Locked</span>
                        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, color: '#414751', margin: '0 0 6px' }}>{phase.title}</h3>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#717783', margin: 0 }}>{phase.description}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showMilestoneModal && (
        <NewMilestoneModal
          goalTitle={goal.title}
          onClose={() => setShowMilestoneModal(false)}
          onCreate={(m) => onAddMilestone && onAddMilestone(goal.id, m)}
        />
      )}
      <AppFooter onNavigate={onBack} />
    </div>
  );
}

// ── Section Accordion ─────────────────────────────────────────────────────
function GoalSection({ stateKey, title, count, defaultOpen, children }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const { isMobile } = useBreakpoint();
  const tok = STATE_TOKENS[stateKey];
  if (count === 0 && !defaultOpen) return null; // hide empty non-default sections

  return (
    <section style={{ marginBottom: 20 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderRadius: 12,
        backgroundColor: open ? '#fff' : 'transparent',
        border: open ? '1px solid #e2e8f0' : '1px solid transparent',
        cursor: count === 0 ? 'default' : 'pointer',
        fontFamily: 'Inter, sans-serif', textAlign: 'left',
        marginBottom: open ? 16 : 0,
        transition: 'all 0.15s',
      }} disabled={count === 0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: tok.accent, flexShrink: 0 }} />
          <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#181c1e' }}>{title}</span>
          <span style={{
            padding: '2px 10px', borderRadius: 999,
            backgroundColor: tok.accentSoft, color: tok.accent,
            fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif',
          }}>{count}</span>
        </div>
        {count > 0 && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717783" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
      {open && count > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
          {children}
        </div>
      )}
    </section>
  );
}

// ── Overview screen ────────────────────────────────────────────────────────
function GoalsScreen({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [goals, setGoals] = React.useState([
    {
      id: 1, title: 'Morning Mobility', category: 'physical', state: 'active',
      description: 'Complete a 15-minute gentle stretch routine focused on joints and breathwork.',
      phases: [
        { id: 1, title: 'Assess baseline flexibility', description: 'Measure range of motion across key joints.', status: 'completed', dates: 'Mar 10 – Mar 14' },
        { id: 2, title: 'Daily warm-up routine', description: 'Build a consistent morning warm-up with dynamic stretches.', status: 'active', stats: [{ label: 'Sessions', value: '12' }, { label: 'Streak', value: '8d' }, { label: 'Avg time', value: '18 min' }, { label: 'Pain', value: '2/10' }] },
        { id: 3, title: 'Advanced mobility flow', description: 'Progress to deeper stretches and compound movements.', status: 'locked' },
        { id: 4, title: 'Maintain & measure', description: 'Sustain the habit and track long-term flexibility gains.', status: 'locked' },
      ],
    },
    {
      id: 2, title: 'Mindful Reflection', category: 'mental', state: 'active',
      description: 'Daily 10-minute journaling session to track emotional states and triggers.',
      phases: [
        { id: 1, title: 'Start journaling habit', description: 'Write first entry and build a 3-day streak.', status: 'completed', dates: 'Mar 15 – Mar 18' },
        { id: 2, title: 'Guided 7-day program', description: 'Complete a structured guided journaling program.', status: 'completed', dates: 'Mar 19 – Mar 26' },
        { id: 3, title: 'Reach a 14-day streak', description: 'Maintain daily journaling without breaks.', status: 'active', stats: [{ label: 'Entries', value: '9' }, { label: 'Streak', value: '5d' }, { label: 'Avg length', value: '220w' }, { label: 'Mood avg', value: '7.2' }] },
        { id: 4, title: 'Morning routine', description: 'Establish journaling as a consistent morning ritual.', status: 'locked' },
      ],
    },
    {
      id: 4, title: 'Evening Wind-Down', category: 'lifestyle', state: 'paused', pausedSince: 'May 12',
      description: 'A nightly screen-free wind-down routine to improve sleep onset and quality.',
      phases: [
        { id: 1, title: 'Set a digital curfew', description: 'No screens after 9pm, three nights a week.', status: 'completed', dates: 'Apr 28 – May 4' },
        { id: 2, title: 'Build a wind-down ritual', description: 'Layer in reading or stretching before sleep.', status: 'active' },
        { id: 3, title: 'Track sleep quality', description: 'Log sleep score for two weeks.', status: 'locked' },
      ],
    },
    {
      id: 3, title: 'Community Engagement', category: 'social', state: 'completed', completedOn: 'Apr 29',
      description: 'Participate in at least one peer support group session per week.',
      phases: [
        { id: 1, title: 'Join a group', description: 'Find and attend your first peer support session.', status: 'completed', dates: 'Apr 1 – Apr 7' },
        { id: 2, title: 'Regular attendance', description: 'Attend sessions consistently for 3 weeks.', status: 'completed', dates: 'Apr 8 – Apr 28' },
        { id: 3, title: 'Share & contribute', description: 'Actively participate by sharing experiences.', status: 'completed', dates: 'Apr 29' },
      ],
    },
    {
      id: 5, title: 'Marathon Training Plan', category: 'physical', state: 'abandoned', abandonedOn: 'Apr 20',
      description: 'A 16-week training plan toward a full marathon — paused indefinitely while focusing on mobility first.',
      phases: [
        { id: 1, title: 'Base building', description: 'Run 3x per week for 4 weeks.', status: 'completed', dates: 'Mar 1 – Mar 28' },
        { id: 2, title: 'Long run progression', description: 'Build long runs from 5 to 12 miles.', status: 'active' },
        { id: 3, title: 'Speed work', description: 'Add interval and tempo sessions.', status: 'locked' },
        { id: 4, title: 'Peak & taper', description: 'Final long runs then taper to race day.', status: 'locked' },
      ],
    },
  ]);

  const [detailGoalId, setDetailGoalId] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [editGoal, setEditGoal] = React.useState(null);

  const [filter, setFilter] = React.useState({ category: 'all', status: 'all' });
  const [filterOpen, setFilterOpen] = React.useState(false);
  const filterRef = React.useRef(null);

  React.useEffect(() => {
    if (!filterOpen) return;
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const filteredGoals = goals.filter(g => {
    if (filter.category !== 'all' && g.category !== filter.category) return false;
    const pct = g.phases.length ? Math.round(g.phases.filter(p => p.status === 'completed').length / g.phases.length * 100) : 0;
    if (filter.status === 'completed' && pct !== 100) return false;
    if (filter.status === 'in-progress' && (pct === 0 || pct === 100)) return false;
    if (filter.status === 'not-started' && pct !== 0) return false;
    return true;
  });

  const activeFilterCount = (filter.category !== 'all' ? 1 : 0) + (filter.status !== 'all' ? 1 : 0);
  const detailGoal = goals.find(g => g.id === detailGoalId);

  const [celebration, setCelebration] = React.useState(null); // { goal, phase, isGoalComplete }
  const [shareInfo, setShareInfo] = React.useState(null);

  const handleCompletePhase = (goalId, phaseId) => {
    setGoals(gs => gs.map(g => {
      if (g.id !== goalId) return g;
      let unlockNext = false;
      const phases = g.phases.map(p => {
        if (p.id === phaseId) { unlockNext = true; return { ...p, status: 'completed' }; }
        if (unlockNext && p.status === 'locked') { unlockNext = false; return { ...p, status: 'active' }; }
        return p;
      });
      const isGoalComplete = phases.every(p => p.status === 'completed');
      const updated = {
        ...g, phases,
        state: isGoalComplete ? 'completed' : g.state,
        completedOn: isGoalComplete ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : g.completedOn,
      };
      const completedPhase = phases.find(p => p.id === phaseId);
      setCelebration({ goal: updated, phase: completedPhase, isGoalComplete });
      return updated;
    }));
  };

  const handleCreate = ({ title, description, category }) => {
    setGoals(gs => [...gs, {
      id: Date.now(), title, description, category, state: 'active',
      phases: [
        { id: 1, title: 'Get started', description: 'Take the first step toward your goal.', status: 'active' },
        { id: 2, title: 'Build momentum', description: 'Establish a consistent routine.', status: 'locked' },
        { id: 3, title: 'Reach your target', description: 'Complete and reflect on your progress.', status: 'locked' },
      ],
    }]);
  };

  const handleUpdate = (updated) => setGoals(gs => gs.map(g => g.id === updated.id ? updated : g));

  // Format today as "Mon D" for transition timestamps
  const today = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Lifecycle: pause / resume / abandon / restore / reopen / delete
  const handleAction = (action, goal) => {
    if (action === 'edit') {
      setEditGoal(goal); setShowModal(true); return;
    }
    if (action === 'delete') {
      if (confirm(`Delete "${goal.title}"? This can't be undone.`)) {
        setGoals(gs => gs.filter(g => g.id !== goal.id));
      }
      return;
    }
    setGoals(gs => gs.map(g => {
      if (g.id !== goal.id) return g;
      if (action === 'pause')   return { ...g, state: 'paused',    pausedSince: today() };
      if (action === 'resume')  return { ...g, state: 'active',    pausedSince: undefined };
      if (action === 'abandon') return { ...g, state: 'abandoned', abandonedOn: today() };
      if (action === 'restore') return { ...g, state: 'active',    abandonedOn: undefined };
      return g;
    }));
    // Duplicate is an insert, not a mutation — handle outside the map
    if (action === 'duplicate') {
      setGoals(gs => {
        const src = gs.find(g => g.id === goal.id);
        if (!src) return gs;
        const freshPhases = src.phases.map((p, i) => ({
          ...p,
          id: i + 1,
          status: i === 0 ? 'active' : 'locked',
          dates: undefined,
          stats: undefined,
        }));
        const copy = {
          ...src,
          id: Date.now(),
          title: `${src.title} (copy)`,
          state: 'active',
          completedOn: undefined,
          pausedSince: undefined,
          abandonedOn: undefined,
          phases: freshPhases,
        };
        // Insert right after the source
        const idx = gs.findIndex(g => g.id === src.id);
        return [...gs.slice(0, idx + 1), copy, ...gs.slice(idx + 1)];
      });
    }
  };

  const handleAddMilestone = (goalId, { title, description }) => {
    setGoals(gs => gs.map(g => {
      if (g.id !== goalId) return g;
      const hasActive = g.phases.some(p => p.status === 'active');
      const hasIncomplete = g.phases.some(p => p.status !== 'completed');
      const newPhase = {
        id: Date.now(),
        title, description,
        status: hasIncomplete ? 'locked' : 'active',
      };
      return { ...g, phases: [...g.phases, newPhase] };
    }));
  };
  const activeCount = goals.reduce((n, g) => n + g.phases.filter(p => p.status === 'active').length, 0);

  const celebrationOverlay = celebration && (
    <PhaseCompleteCelebration
      celebration={celebration}
      onClose={() => setCelebration(null)}
      onShare={() => {
        const { goal, phase, isGoalComplete } = celebration;
        const completedCount = goal.phases.filter(p => p.status === 'completed').length;
        setShareInfo({
          kind: isGoalComplete ? 'Goal Achieved' : 'Milestone Complete',
          accent: isGoalComplete ? '#005144' : '#005da7',
          headline: isGoalComplete ? `Completed: ${goal.title}` : `${phase.title}`,
          subhead: isGoalComplete ? `Every phase of ${goal.title} is done.` : `A new milestone in ${goal.title}.`,
          stats: [
            { label: 'Phases', value: `${completedCount}/${goal.phases.length}` },
            { label: 'Progress', value: `${Math.round(completedCount / goal.phases.length * 100)}%` },
            { label: 'Category', value: (G[goal.category] || G.physical).label },
          ],
          note: isGoalComplete ? 'Showing up consistently changed everything.' : 'One step closer to where I want to be.',
        });
        setCelebration(null);
      }}
    />
  );

  const shareOverlay = shareInfo && (
    <ShareProgressModal payload={shareInfo} onClose={() => setShareInfo(null)} />
  );

  if (detailGoal) {
    return (
      <>
        <GoalDetail goal={detailGoal} onBack={() => setDetailGoalId(null)} onCompletePhase={handleCompletePhase} onAddMilestone={handleAddMilestone} />
        {showModal && <CreateGoalModal onClose={() => { setShowModal(false); setEditGoal(null); }} onCreate={handleCreate} onUpdate={handleUpdate} initialGoal={editGoal} />}
        {celebrationOverlay}
        {shareOverlay}
      </>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f7fafc' }}>
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 64,
        backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0', flexShrink: 0,
      }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 17, color: '#181c1e', margin: 0 }}>Recovery Goals</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', position: 'relative' }}>
            <Icon name="bell" size={20} color="#94a3b8" />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ba1a1a', border: '1.5px solid #fff' }} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex' }}>
            <Icon name="eye" size={20} color="#94a3b8" />
          </button>
          <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#e8f4fd', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e2e8f0', cursor: 'pointer' }}
            onClick={() => onNavigate && onNavigate('profile')}>
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 12, color: '#005da7' }}>AJ</span>
          </div>
        </div>
      </header>

      {/* Main canvas */}
      <div style={{ padding: isMobile ? '20px 16px' : '32px', display: 'grid', gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '1fr 320px', gap: isMobile ? 20 : 32, alignItems: 'start' }}>

        {/* Left: goals grid */}
        <div>
          {/* Heading + CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 32, color: '#181c1e', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Keep moving forward.</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#414751', margin: 0 }}>You have {activeCount} active milestone{activeCount !== 1 ? 's' : ''} this week.</p>
            </div>
            <button onClick={() => setShowModal(true)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(to right, #005da7, #2976c7)',
              color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,93,167,0.25)',
              transition: 'opacity 0.15s',
            }}>
              <Icon name="plus" size={16} color="#fff" />
              New Goal
            </button>
          </div>

          {/* Grouped sections: Active expanded, others collapsed by default */}
          {(() => {
            const byState = {
              active:    goals.filter(g => (g.state || 'active') === 'active'),
              paused:    goals.filter(g => g.state === 'paused'),
              completed: goals.filter(g => g.state === 'completed'),
              abandoned: goals.filter(g => g.state === 'abandoned'),
            };
            const sections = [
              { key: 'active',    title: 'Active',    defaultOpen: true },
              { key: 'paused',    title: 'Paused',    defaultOpen: false },
              { key: 'completed', title: 'Completed', defaultOpen: false },
              { key: 'abandoned', title: 'Abandoned', defaultOpen: false },
            ];
            return sections.map(sec => (
              <GoalSection key={sec.key} stateKey={sec.key} title={sec.title} count={byState[sec.key].length} defaultOpen={sec.defaultOpen}>
                {byState[sec.key].map(g => (
                  <GoalCard key={g.id} goal={g}
                    onClick={() => setDetailGoalId(g.id)}
                    onAction={handleAction} />
                ))}
                {sec.key === 'active' && (
                  <AddGoalCard onClick={() => setShowModal(true)} />
                )}
              </GoalSection>
            ));
          })()}
        </div>

        {/* Right: sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* AI Insights */}
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f0f4f8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="sparkles" size={18} color="#005da7" />
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#181c1e', margin: 0 }}>AI Insights</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ padding: '12px 14px', backgroundColor: '#eff6ff', borderRadius: 10 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#1e40af', margin: '0 0 4px' }}>Consistency Alert</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3b82f6', margin: 0, lineHeight: 1.5 }}>You've completed Morning Mobility 8 days in a row! Keep up the great work.</p>
              </div>
              <div style={{ padding: '12px 14px', backgroundColor: '#fdf4ff', borderRadius: 10 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#6b21a8', margin: '0 0 4px' }}>New Suggestion</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#a855f7', margin: 0, lineHeight: 1.5 }}>Based on your journaling, a 5-minute breathing exercise before bed might improve sleep.</p>
              </div>
            </div>
          </div>

          {/* Weekly View */}
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f0f4f8' }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 16px' }}>Weekly View</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#414751' }}>Mon – Wed</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, color: '#10b981' }}>High Activity</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#414751' }}>Goal completion</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, color: '#005da7' }}>+12%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FAB */}
      <button onClick={() => setShowModal(true)} style={{
        position: 'fixed', bottom: (isMobile || isTablet) ? 84 : 24, left: (isMobile || isTablet) ? 20 : 24, right: 'auto',
        width: 56, height: 56, borderRadius: '50%', border: 'none',
        backgroundColor: '#005da7', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,93,167,0.35)', cursor: 'pointer',
        transition: 'transform 0.15s', zIndex: 50,
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <Icon name="sparkles" size={22} color="#fff" />
      </button>

      {showModal && <CreateGoalModal onClose={() => { setShowModal(false); setEditGoal(null); }} onCreate={handleCreate} onUpdate={handleUpdate} initialGoal={editGoal} />}
      {celebrationOverlay}
      {shareOverlay}
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

// ── Phase / Goal completion celebration ──────────────────────────────
function PhaseCompleteCelebration({ celebration, onClose, onShare }) {
  const { goal, phase, isGoalComplete } = celebration;
  const completedCount = goal.phases.filter(p => p.status === 'completed').length;
  const pct = Math.round(completedCount / goal.phases.length * 100);
  const accent = isGoalComplete ? '#005144' : '#005da7';

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1500,
      backgroundColor: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'pcc-fade 0.2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        backgroundColor: '#fff', borderRadius: 20, width: 460, maxWidth: '100%',
        boxShadow: '0 24px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
        animation: 'pcc-pop 0.28s cubic-bezier(.2,.8,.3,1.1)',
      }}>
        {/* Hero */}
        <div style={{
          background: `linear-gradient(135deg, ${accent}, ${isGoalComplete ? '#0a8c75' : '#2976c7'})`,
          padding: '32px 28px 24px', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', left: -20, bottom: -40, width: 110, height: 110, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
              animation: 'pcc-pop 0.5s cubic-bezier(.2,.8,.3,1.4)',
            }}>
              <Icon name={isGoalComplete ? 'sparkles' : 'check'} size={30} color="#fff" />
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', margin: '0 0 6px' }}>
              {isGoalComplete ? 'Goal Achieved' : 'Milestone Complete'}
            </p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 24, margin: 0, lineHeight: 1.2 }}>
              {isGoalComplete ? goal.title : phase.title}
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', lineHeight: 1.5 }}>
              {isGoalComplete
                ? `You've completed every phase. That's a real win.`
                : `${completedCount} of ${goal.phases.length} phases done in ${goal.title}.`}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: '20px 28px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#717783' }}>Goal Progress</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: accent }}>{pct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, backgroundColor: '#ebeef0', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', backgroundColor: accent, borderRadius: 99, transition: 'width 0.6s ease' }} />
          </div>
        </div>

        {/* Actions: SHARE PROGRESS as primary */}
        <div style={{ padding: '16px 28px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ShareProgressButton onClick={onShare} label={isGoalComplete ? 'Share this win' : 'Share Progress'} />
          <button onClick={onClose} style={{
            padding: '11px', borderRadius: 10, border: 'none', background: 'transparent',
            color: '#717783', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Keep going</button>
        </div>
      </div>
      <style>{`
        @keyframes pcc-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pcc-pop { 0% { opacity: 0; transform: scale(0.92) } 100% { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

Object.assign(window, { GoalsScreen });
