// app_chrome.jsx — Shared AppFooter + PageHeader
// ── Reusable AppFooter ─────────────────────────────────────────────────────
function AppFooter({ onNavigate, variant = 'app' }) {
  const isLanding = variant === 'minimal' || variant === 'marketing';

  const linkCol = (title, items) => (
    <div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700, color: C.foreground, margin: '0 0 20px' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(it => (
          <button key={it.label} onClick={() => it.page && onNavigate && onNavigate(it.page)}
            style={{ background: 'none', border: 'none', cursor: it.page ? 'pointer' : 'default', padding: 0, textAlign: 'left',
              fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, transition: 'color 0.15s' }}
            onMouseEnter={e => { if (it.page) e.currentTarget.style.color = C.primary; }}
            onMouseLeave={e => { if (it.page) e.currentTarget.style.color = C.mutedFg; }}>
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );

  const socialIcon = (label, href, bgColor, svg) => (
    <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: bgColor, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.15s, opacity 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.88'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1'; }}>
      {svg}
    </a>
  );

  const facebookSvg = (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1877F2" />
      <path d="M17.9 26v-9.2h3.1l.5-3.6h-3.6v-2.3c0-1 .3-1.7 1.8-1.7h1.9V6c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.7H11v3.6h3.1V26h3.8z" fill="#fff" />
    </svg>
  );

  const xSvg = (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="3" fill="#000" />
      <path d="M18.9 14.3 24.5 8h-1.4l-4.9 5.5L14.4 8H9.7l5.9 8.4L9.7 24h1.4l5.2-5.8L20.5 24h4.7l-6.3-9.7zm-1.8 2-.6-.9-4.7-6.5h2.1l3.9 5.3.6.9 5 6.9h-2.1l-4.2-5.7z" fill="#fff" />
    </svg>
  );

  const linkedinSvg = (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="3" fill="#0A66C2" />
      <path d="M11.4 24V12.9H7.7V24h3.7zM9.6 11.4c1.3 0 2.1-.9 2.1-1.9 0-1.1-.8-1.9-2-1.9s-2.1.9-2.1 1.9c0 1.1.8 1.9 2 1.9zm4.1 12.6h3.7v-6.2c0-.3 0-.7.1-.9.3-.7.9-1.4 1.9-1.4 1.4 0 1.9 1 1.9 2.6V24h3.7v-6.4c0-3.4-1.8-5-4.2-5-2 0-2.9 1.1-3.4 1.9V12.9h-3.7c0 1 0 11.1 0 11.1z" fill="#fff" />
    </svg>
  );

  const followCol = (
    <div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700, color: C.foreground, margin: '0 0 20px' }}>Follow Us</p>
      <div style={{ display: 'flex', gap: 12 }}>
        {socialIcon('Facebook', '#', '#1877F2', facebookSvg)}
        {socialIcon('X', '#', '#000', xSvg)}
        {socialIcon('LinkedIn', '#', '#0A66C2', linkedinSvg)}
      </div>
    </div>
  );

  const brandCol = (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <img src="pulse-logo.webp" alt="Pulse" style={{ width: 36, height: 36, objectFit: 'contain', display: 'block' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, letterSpacing: '-0.4px', color: C.logo || C.foreground }}>Pulse</span>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.mutedFg, lineHeight: 1.6, margin: 0 }}>
        Supporting your recovery journey
      </p>
    </div>
  );

  const productItems = [
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Daily Check-In', page: 'checkin' },
    { label: 'Goals', page: 'goals' },
    { label: 'Progress', page: 'progress' },
    { label: 'Community', page: 'community' },
  ];

  const supportItems = [
    { label: 'Help Center', page: 'support' },
    { label: 'Crisis Resources', page: 'support' },
    { label: 'Contact Us', page: 'support' },
    { label: 'System Status', page: null },
  ];

  const legalItems = [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' },
    { label: 'Cookie Policy', page: 'cookies' },
    { label: 'Accessibility', page: 'accessibility' },
  ];

  const companyItems = [
    { label: 'About', page: null },
    { label: 'Care Team', page: null },
    { label: 'Research', page: null },
    { label: 'Careers', page: null },
  ];

  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.bg, padding: '56px 48px 28px', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isLanding ? '1.6fr 1fr 1fr' : '1.4fr 1fr 1fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40 }}>
          {brandCol}
          {!isLanding && linkCol('Product', productItems)}
          {!isLanding && linkCol('Support', supportItems)}
          {linkCol('Legal', legalItems)}
          {!isLanding && linkCol('Company', companyItems)}
          {followCol}
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28, textAlign: 'center' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>
            © {new Date().getFullYear()} Pulse. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── Page chrome (for legal + support inside app) ──────────────────────────
function PageHeader({ title, subtitle, kicker, accent = C.primary, icon, onNavigate, breadcrumb }) {
  return (
    <>
      <TopBar title={title} subtitle={subtitle} onNavigate={onNavigate} />
      <div style={{ padding: '40px 32px 32px', borderBottom: `1px solid ${C.border}`, backgroundColor: C.card }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
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

Object.assign(window, { AppFooter, PageHeader });
