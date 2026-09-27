// share_progress.jsx — reusable share-progress flow shown after meaningful actions
// Exposes: <ShareProgressButton />, <ShareProgressModal />

(function () {
  const SP = {
    primary: '#005da7',
    primaryGrad: 'linear-gradient(135deg, #005da7, #2976c7)',
    primaryLight: '#e8f4fd',
    accent: '#7d4495',
    accentLight: '#f8d8ff',
    teal: '#005144',
    tealLight: '#7cf8dd',
    foreground: '#181c1e',
    mutedFg: '#717783',
    border: '#e2e8f0',
    bg: '#f7fafc',
    muted: '#f1f4f6',
    success: '#10b981',
    warning: '#f59e0b',
  };

  // ── Inline share button used at the end of meaningful actions ───────────
  function ShareProgressButton({ onClick, variant = 'primary', label = 'Share Progress', size = 'md' }) {
    const [hov, setHov] = React.useState(false);
    const isPrimary = variant === 'primary';
    const isGhost = variant === 'ghost';
    const padY = size === 'sm' ? 8 : 12;
    const padX = size === 'sm' ? 14 : 18;
    const fontSize = size === 'sm' ? 13 : 14;

    const base = {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: `${padY}px ${padX}px`,
      borderRadius: 10,
      fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize,
      cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
    };

    const variantStyle = isPrimary
      ? { background: SP.primaryGrad, color: '#fff', border: 'none', boxShadow: hov ? '0 6px 18px rgba(0,93,167,0.32)' : '0 4px 12px rgba(0,93,167,0.22)' }
      : isGhost
      ? { background: 'transparent', color: SP.primary, border: `1.5px solid ${hov ? SP.primary : SP.border}` }
      : { background: SP.primaryLight, color: SP.primary, border: 'none', filter: hov ? 'brightness(0.97)' : 'none' };

    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ ...base, ...variantStyle }}
      >
        <ShareIcon size={size === 'sm' ? 14 : 16} color={isPrimary ? '#fff' : SP.primary} />
        {label}
      </button>
    );
  }

  // Custom share-arrow icon (independent of Icon library)
  function ShareIcon({ size = 16, color = '#fff' }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    );
  }

  // ── Share preview card — visualises what the user is about to share ─────
  function SharePreviewCard({ payload }) {
    // payload: { kind, headline, subhead, stats: [{label, value, color?}], note }
    const accent = payload.accent || SP.primary;
    return (
      <div style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${accent}, ${shade(accent, 14)})`,
        color: '#fff',
        padding: 22,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      }}>
        {/* Decorative blob */}
        <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', right: 30, bottom: -30, width: 90, height: 90, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#fff' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{payload.kind}</span>
          </div>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, margin: '0 0 4px', lineHeight: 1.25 }}>{payload.headline}</h3>
          {payload.subhead && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '0 0 14px', lineHeight: 1.5 }}>{payload.subhead}</p>
          )}

          {payload.stats && payload.stats.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(payload.stats.length, 4)}, 1fr)`, gap: 8, marginTop: 14 }}>
              {payload.stats.map((s, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 10px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', margin: 0 }}>{s.label}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, margin: '2px 0 0' }}>{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {payload.note && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', margin: '14px 0 0', lineHeight: 1.55, borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 12 }}>
              "{payload.note}"
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.78)' }}>Alex R. · Day 142</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.78)' }}>PULSE</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Destination row ─────────────────────────────────────────────────────
  function DestRow({ icon, title, subtitle, selected, onClick, badge }) {
    const [hov, setHov] = React.useState(false);
    return (
      <button onClick={onClick}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%',
          padding: '12px 14px', borderRadius: 12,
          background: selected ? SP.primaryLight : hov ? SP.muted : '#fff',
          border: `1.5px solid ${selected ? SP.primary : SP.border}`,
          cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
        }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          backgroundColor: selected ? SP.primary : SP.muted,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'background 0.15s',
        }}>
          {icon(selected ? '#fff' : SP.mutedFg)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: SP.foreground, margin: 0 }}>{title}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: SP.mutedFg, margin: '2px 0 0', lineHeight: 1.4 }}>{subtitle}</p>
        </div>
        {badge && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: SP.success, textTransform: 'uppercase' }}>{badge}</span>}
        <div style={{
          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${selected ? SP.primary : SP.border}`,
          backgroundColor: selected ? SP.primary : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {selected && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
      </button>
    );
  }

  // ── Modal ───────────────────────────────────────────────────────────────
  function ShareProgressModal({ payload, onClose }) {
    const [destinations, setDestinations] = React.useState({ community: true, care: false, journal: false });
    const [message, setMessage] = React.useState('');
    const [visibility, setVisibility] = React.useState('first-name'); // 'full' | 'first-name' | 'anon'
    const [stage, setStage] = React.useState('compose'); // 'compose' | 'shared'
    const [copied, setCopied] = React.useState(false);

    const toggleDest = (k) => setDestinations(d => ({ ...d, [k]: !d[k] }));
    const anySelected = Object.values(destinations).some(Boolean);

    const handleShare = () => { if (anySelected) setStage('shared'); };

    const handleCopyLink = () => {
      const stub = `pulse.app/p/${Math.random().toString(36).slice(2, 8)}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(stub);
      } catch (e) { /* ignore */ }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };

    // Prevent body scroll
    React.useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }, []);

    return (
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        animation: 'sp-fade-in 0.18s ease',
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          backgroundColor: '#fff', borderRadius: 20, width: 720, maxWidth: '100%',
          maxHeight: '92vh', overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          display: 'flex', flexDirection: 'column',
          animation: 'sp-pop 0.22s cubic-bezier(.2,.8,.3,1.1)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: `1px solid ${SP.border}`, flexShrink: 0 }}>
            <div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: SP.foreground, margin: 0 }}>
                {stage === 'compose' ? 'Share your progress' : 'Shared!'}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: SP.mutedFg, margin: '2px 0 0' }}>
                {stage === 'compose' ? 'Celebrating wins keeps the momentum going.' : 'Your progress is on its way.'}
              </p>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: SP.mutedFg, display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = SP.muted}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {stage === 'compose' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, overflow: 'auto' }}>
              {/* LEFT: preview */}
              <div style={{ padding: 24, backgroundColor: SP.bg, borderRight: `1px solid ${SP.border}` }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: SP.mutedFg, margin: '0 0 10px' }}>Preview</p>
                <SharePreviewCard payload={payload} />

                {/* Visibility */}
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: SP.mutedFg, margin: '20px 0 8px' }}>Identity</p>
                <div style={{ display: 'flex', gap: 6, padding: 4, backgroundColor: '#fff', borderRadius: 10, border: `1px solid ${SP.border}` }}>
                  {[
                    { k: 'full', l: 'Alex Rivera' },
                    { k: 'first-name', l: 'Alex R.' },
                    { k: 'anon', l: 'Anonymous' },
                  ].map(opt => (
                    <button key={opt.k} onClick={() => setVisibility(opt.k)} style={{
                      flex: 1, padding: '7px 8px', border: 'none', borderRadius: 7,
                      background: visibility === opt.k ? SP.primary : 'transparent',
                      color: visibility === opt.k ? '#fff' : SP.mutedFg,
                      fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}>{opt.l}</button>
                  ))}
                </div>
              </div>

              {/* RIGHT: destinations + message */}
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: SP.mutedFg, margin: '0 0 8px' }}>Share with</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <DestRow
                      selected={destinations.community}
                      onClick={() => toggleDest('community')}
                      title="Pulse Community"
                      subtitle="Post to your peer support feed"
                      badge="Recommended"
                      icon={(c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                    />
                    <DestRow
                      selected={destinations.care}
                      onClick={() => toggleDest('care')}
                      title="Care Team"
                      subtitle="Send a private update to your clinicians"
                      icon={(c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>}
                    />
                    <DestRow
                      selected={destinations.journal}
                      onClick={() => toggleDest('journal')}
                      title="Save to journal"
                      subtitle="Keep a private record of this win"
                      icon={(c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>}
                    />
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: SP.mutedFg, margin: '0 0 8px' }}>Add a message <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: SP.mutedFg }}>(optional)</span></p>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    maxLength={240}
                    placeholder="What helped you today?"
                    style={{
                      width: '100%', minHeight: 84, padding: 12,
                      fontFamily: 'Inter, sans-serif', fontSize: 13, color: SP.foreground, lineHeight: 1.55,
                      border: `1.5px solid ${SP.border}`, borderRadius: 10, outline: 'none',
                      resize: 'vertical', boxSizing: 'border-box', backgroundColor: SP.bg,
                    }}
                    onFocus={e => e.target.style.borderColor = SP.primary}
                    onBlur={e => e.target.style.borderColor = SP.border}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: SP.mutedFg }}>Be kind to yourself.</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: SP.mutedFg }}>{message.length}/240</span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8, borderTop: `1px solid ${SP.border}` }}>
                  <button onClick={handleCopyLink} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${SP.border}`,
                    backgroundColor: '#fff', color: copied ? SP.success : SP.foreground,
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}>
                    {copied ? (
                      <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
                    ) : (
                      <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy link</>
                    )}
                  </button>
                  <div style={{ flex: 1 }} />
                  <button onClick={onClose} style={{
                    padding: '10px 14px', borderRadius: 10, border: 'none', background: 'transparent',
                    color: SP.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}>Not now</button>
                  <button
                    onClick={handleShare}
                    disabled={!anySelected}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 18px', borderRadius: 10, border: 'none',
                      background: anySelected ? SP.primaryGrad : SP.muted,
                      color: anySelected ? '#fff' : SP.mutedFg,
                      fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                      cursor: anySelected ? 'pointer' : 'not-allowed',
                      boxShadow: anySelected ? '0 4px 14px rgba(0,93,167,0.25)' : 'none',
                      transition: 'all 0.15s',
                    }}>
                    <ShareIcon size={14} color={anySelected ? '#fff' : SP.mutedFg} /> Share
                  </button>
                </div>
              </div>
            </div>
          )}

          {stage === 'shared' && (
            <div style={{ padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #d1fae5, #7cf8dd)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16, animation: 'sp-pop 0.4s cubic-bezier(.2,.8,.3,1.4)',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={SP.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: SP.foreground, margin: '0 0 6px' }}>Progress shared</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: SP.mutedFg, lineHeight: 1.6, maxWidth: 360, margin: '0 0 20px' }}>
                {[destinations.community && 'the community', destinations.care && 'your care team', destinations.journal && 'your journal'].filter(Boolean).join(', ').replace(/, ([^,]*)$/, ' and $1')} will see your update. Wins like this inspire others on the same path.
              </p>
              <div style={{ width: '100%', maxWidth: 380, marginBottom: 20 }}>
                <SharePreviewCard payload={payload} />
              </div>
              <button onClick={onClose} style={{
                padding: '11px 22px', borderRadius: 10, border: 'none',
                background: SP.primaryGrad, color: '#fff',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,93,167,0.25)',
              }}>Done</button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes sp-fade-in { from { opacity: 0 } to { opacity: 1 } }
          @keyframes sp-pop { 0% { opacity: 0; transform: scale(0.94) } 100% { opacity: 1; transform: scale(1) } }
        `}</style>
      </div>
    );
  }

  // ── helpers ─────────────────────────────────────────────────────────────
  function shade(hex, amt) {
    // lighten/darken — amt positive = lighten
    const m = hex.replace('#', '').match(/.{2}/g);
    if (!m) return hex;
    const [r, g, b] = m.map(h => parseInt(h, 16));
    const f = (v) => Math.min(255, Math.max(0, v + Math.round(amt * 2.55))).toString(16).padStart(2, '0');
    return `#${f(r)}${f(g)}${f(b)}`;
  }

  Object.assign(window, { ShareProgressButton, ShareProgressModal, SharePreviewCard, ShareIcon });
})();
