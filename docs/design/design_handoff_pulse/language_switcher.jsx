
// language_switcher.jsx — shared language picker for header + auth pages

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'ES', label: 'Español' },
  { code: 'FR', label: 'Français' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'PT', label: 'Português' },
  { code: 'JA', label: '日本語' },
  { code: 'ZH', label: '中文' },
  { code: 'AR', label: 'العربية' },
];

function LanguageSwitcher({ variant = 'header' }) {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('pulse_lang') || 'EN'; } catch(e) { return 'EN'; }
  });
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const select = (code) => {
    setLang(code);
    try { localStorage.setItem('pulse_lang', code); } catch(e) {}
    setOpen(false);
  };

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const isHeader = variant === 'header';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: isHeader ? '7px 10px' : '7px 12px',
          background: 'none',
          border: `1px solid ${open ? (typeof C !== 'undefined' ? C.primary : '#2563EB') : (typeof C !== 'undefined' ? C.border : '#E2E8F0')}`,
          borderRadius: 8, cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13,
          color: typeof C !== 'undefined' ? C.foreground : '#0F172A',
          transition: 'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.backgroundColor = (typeof C !== 'undefined' ? C.muted : '#F1F5F9'); }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
        <Icon name="globe" size={14} color={typeof C !== 'undefined' ? C.mutedFg : '#64748B'} />
        <span>{current.code}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M3 4.5 L6 7.5 L9 4.5" stroke={typeof C !== 'undefined' ? C.mutedFg : '#64748B'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)', zIndex: 200,
          backgroundColor: '#fff', borderRadius: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          border: `1px solid ${typeof C !== 'undefined' ? C.border : '#E2E8F0'}`,
          overflow: 'hidden', minWidth: 180, padding: 4,
        }}>
          {LANGUAGES.map(l => {
            const active = l.code === lang;
            return (
              <button key={l.code} onClick={() => select(l.code)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '8px 10px', borderRadius: 6,
                  background: active ? (typeof C !== 'undefined' ? C.primaryLight : '#EEF2FF') : 'transparent',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  color: active ? (typeof C !== 'undefined' ? C.primary : '#2563EB') : (typeof C !== 'undefined' ? C.foreground : '#0F172A'),
                  fontWeight: active ? 600 : 400, textAlign: 'left',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = (typeof C !== 'undefined' ? C.muted : '#F1F5F9'); }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: active ? (typeof C !== 'undefined' ? C.primary : '#2563EB') : (typeof C !== 'undefined' ? C.mutedFg : '#64748B'), letterSpacing: '0.5px', minWidth: 22 }}>{l.code}</span>
                  <span>{l.label}</span>
                </span>
                {active && (
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="M3 7.5 L6 10 L11 4" stroke={typeof C !== 'undefined' ? C.primary : '#2563EB'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LanguageSwitcher });
