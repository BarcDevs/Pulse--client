// ── Reusable AppFooter ─────────────────────────────────────────────────────
function AppFooter({ onNavigate, variant = 'app' }) {
    const isMarketing = variant === 'marketing';
    const linkCol = (title, items) => (
        <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.mutedFg, margin: '0 0 14px' }}>{title}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {items.map(it => (
                    <button key={it.label} onClick={() => it.page && onNavigate && onNavigate(it.page)}
                            style={{ background: 'none', border: 'none', cursor: it.page ? 'pointer' : 'default', padding: 0, textAlign: 'left',
                                fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, transition: 'color 0.15s', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                            onMouseEnter={e => { if (it.page) e.currentTarget.style.color = C.primary; }}
                            onMouseLeave={e => { if (it.page) e.currentTarget.style.color = C.foreground; }}>
                        {it.label}
                        {it.badge && <span style={{ padding: '1px 6px', borderRadius: 99, backgroundColor: C.secondaryLight, color: C.teal || '#005144', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{it.badge}</span>}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <footer style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.card, padding: isMarketing ? '56px 48px 32px' : '40px 32px 28px', marginTop: 'auto' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 32, paddingBottom: 32, borderBottom: `1px solid ${C.border}` }}>
                    {/* Brand block */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="shield" size={13} color="#fff" />
                            </div>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 17, color: C.logo || C.foreground }}>HealEase</span>
                        </div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, maxWidth: 260, margin: '0 0 16px' }}>
                            A sanctuary for real recovery. Built with care, designed for clarity.
                        </p>
                        {/* Trust seal */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 99, backgroundColor: C.secondaryLight, color: '#005144' }}>
                            <Icon name="shield" size={12} color="#005144" />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>HIPAA · SOC 2 Type II</span>
                        </div>
                    </div>

                    {linkCol('Product', [
                        { label: 'Dashboard', page: 'dashboard' },
                        { label: 'Daily Check-In', page: 'checkin' },
                        { label: 'Goals', page: 'goals' },
                        { label: 'Progress', page: 'progress' },
                        { label: 'Community', page: 'community' },
                    ])}

                    {linkCol('Support', [
                        { label: 'Help Center', page: 'support' },
                        { label: 'Crisis Resources', page: 'support' },
                        { label: 'Contact Us', page: 'support' },
                        { label: 'System Status', page: null },
                    ])}

                    {linkCol('Legal', [
                        { label: 'Privacy Policy', page: 'privacy' },
                        { label: 'Terms of Service', page: 'terms' },
                        { label: 'Cookie Policy', page: 'cookies' },
                        { label: 'Accessibility', page: null },
                    ])}

                    {linkCol('Company', [
                        { label: 'About', page: null },
                        { label: 'Care Team', page: null },
                        { label: 'Research', page: null },
                        { label: 'Careers', page: null, badge: 'Hiring' },
                    ])}
                </div>

                {/* Bottom row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 22, gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>© {new Date().getFullYear()} HealEase, Inc. All rights reserved.</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>·</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>Made with care in Toronto & Lisbon.</span>
                    </div>
                    {/* Crisis line */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 10, backgroundColor: '#fff5f5', border: `1px solid #ffd6d6` }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.destructive }} />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.foreground }}>
              In crisis? <strong style={{ color: C.destructive }}>Call or text 988</strong> (US/Canada) — available 24/7.
            </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

Object.assign(window, { AppFooter });