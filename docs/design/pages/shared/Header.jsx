// ── Page chrome (for legal + support inside app) ──────────────────────────
function PageHeader({ title, subtitle, kicker, accent = C.primary, icon, onNavigate, breadcrumb }) {
    return (
        <>
            <TopBar title={title} subtitle={subtitle} onNavigate={onNavigate} />
            <div style={{ padding: '40px 32px 32px', borderBottom: `1px solid ${C.border}`, backgroundColor: C.card }}>
                <div style={{ maxWidth: 880, margin: '0 auto' }}>
                    {breadcrumb && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>
                            {breadcrumb.map((b, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <span>/</span>}
                                    {b.page ? (
                                        <button onClick={() => onNavigate && onNavigate(b.page)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 12, padding: 0 }}>{b.label}</button>
                                    ) : <span style={{ color: C.foreground, fontWeight: 500 }}>{b.label}</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                    {kicker && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 99, backgroundColor: C.primaryLight, color: accent, marginBottom: 14 }}>
                            {icon && <Icon name={icon} size={13} color={accent} />}
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{kicker}</span>
                        </div>
                    )}
                    <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 36, color: C.foreground, margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>{title}</h1>
                    {subtitle && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.mutedFg, margin: 0, maxWidth: 640, lineHeight: 1.65 }}>{subtitle}</p>}
                </div>
            </div>
        </>
    );
}

Object.assign(window, { PageHeader });