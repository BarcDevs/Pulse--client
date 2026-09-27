// legal.jsx — Privacy, Terms, Cookies, Accessibility (related legal docs)
// ── LEGAL DOC RENDERER ────────────────────────────────────────────────────
function LegalDoc({ kicker, title, subtitle, updated, sections, onNavigate, accent = C.primary, icon = 'shield' }) {
  const { isMobile } = useBreakpoint();
  const [activeId, setActiveId] = React.useState(sections[0]?.id);
  const refs = React.useRef({});

  React.useEffect(() => {
    const handler = () => {
      const scrollY = document.querySelector('[data-legal-scroll]')?.scrollTop || 0;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = refs.current[s.id];
        if (el && el.offsetTop - 120 <= scrollY) current = s.id;
      }
      setActiveId(current);
    };
    const scroller = document.querySelector('[data-legal-scroll]');
    if (scroller) scroller.addEventListener('scroll', handler);
    return () => { if (scroller) scroller.removeEventListener('scroll', handler); };
  }, [sections]);

  const jumpTo = (id) => {
    const el = refs.current[id];
    const scroller = document.querySelector('[data-legal-scroll]');
    if (el && scroller) scroller.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div data-legal-scroll style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title={title} subtitle={subtitle} kicker={kicker} icon={icon} accent={accent}
        onNavigate={onNavigate}
        breadcrumb={[{ label: 'Dashboard', page: 'dashboard' }, { label: 'Legal' }, { label: kicker }]}
      />
      <div style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.card, padding: isMobile ? '12px 16px' : '16px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>
          <span><strong style={{ color: C.foreground }}>Last updated:</strong> {updated}</span>
          <span>·</span>
          <span><strong style={{ color: C.foreground }}>Version:</strong> 4.2</span>
          <span>·</span>
          <span><strong style={{ color: C.foreground }}>Effective in:</strong> Global</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map(t => {
              const page = t === 'Privacy' ? 'privacy' : t === 'Terms' ? 'terms' : t === 'Cookies' ? 'cookies' : 'accessibility';
              const active = kicker.toLowerCase().includes(t.toLowerCase());
              return (
                <button key={t} onClick={() => onNavigate(page)} style={{
                  padding: '5px 12px', borderRadius: 99, border: `1.5px solid ${active ? accent : C.border}`,
                  backgroundColor: active ? accent + '18' : C.card,
                  color: active ? accent : C.mutedFg,
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                }}>{t}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: isMobile ? '16px 16px 0' : '32px 32px 0', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
          {/* TOC */}
          <nav style={{ position: 'sticky', top: 32, alignSelf: 'start' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.mutedFg, margin: '0 0 12px' }}>On this page</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sections.map((s, i) => {
                const active = activeId === s.id;
                return (
                  <button key={s.id} onClick={() => jumpTo(s.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px',
                    textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: 13,
                    color: active ? accent : C.mutedFg, fontWeight: active ? 600 : 400,
                    borderLeft: `2px solid ${active ? accent : 'transparent'}`,
                    transition: 'all 0.15s', lineHeight: 1.5,
                  }}>{i + 1}. {s.title}</button>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <article style={{ maxWidth: 720 }}>
            {sections.map((s, i) => (
              <section key={s.id} ref={el => refs.current[s.id] = el} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: C.foreground, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                  <span style={{ color: accent, marginRight: 8 }}>{i + 1}.</span>{s.title}
                </h2>
                {s.body.map((block, bi) => {
                  if (typeof block === 'string') {
                    return <p key={bi} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: C.foreground, lineHeight: 1.75, margin: '0 0 14px' }}>{block}</p>;
                  }
                  if (block.list) {
                    return (
                      <ul key={bi} style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
                        {block.list.map((item, ii) => (
                          <li key={ii} style={{ display: 'flex', gap: 12, padding: '6px 0', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, lineHeight: 1.65 }}>
                            <div style={{ flexShrink: 0, marginTop: 8, width: 5, height: 5, borderRadius: '50%', backgroundColor: accent }} />
                            <span><strong style={{ color: C.foreground }}>{item.label && item.label + ' — '}</strong>{item.text || item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.callout) {
                    return (
                      <div key={bi} style={{
                        display: 'flex', gap: 12, padding: 16, borderRadius: 12,
                        backgroundColor: block.tone === 'warn' ? '#fff5f5' : accent + '12',
                        border: `1px solid ${block.tone === 'warn' ? '#ffd6d6' : accent + '30'}`,
                        margin: '8px 0 18px',
                      }}>
                        <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name={block.icon || 'info'} size={14} color={block.tone === 'warn' ? C.destructive : accent} />
                        </div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: C.foreground, lineHeight: 1.65, margin: 0 }}>{block.callout}</p>
                      </div>
                    );
                  }
                  if (block.table) {
                    return (
                      <div key={bi} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', margin: '8px 0 18px' }}>
                        {block.table.map((row, ri) => (
                          <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 0.8fr', padding: '12px 14px', borderTop: ri === 0 ? 'none' : `1px solid ${C.border}`, backgroundColor: ri === 0 ? C.muted : C.card, fontFamily: 'Inter, sans-serif', fontSize: 13, color: ri === 0 ? C.mutedFg : C.foreground, fontWeight: ri === 0 ? 700 : 400, letterSpacing: ri === 0 ? '0.05em' : 0, textTransform: ri === 0 ? 'uppercase' : 'none', alignItems: 'center', lineHeight: 1.5 }}>
                            <div>{row[0]}</div>
                            <div>{row[1]}</div>
                            <div>{row[2]}</div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
              </section>
            ))}

            {/* Document footer */}
            <div style={{ marginTop: 24, marginBottom: 48, padding: 24, borderRadius: 14, backgroundColor: C.muted, border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, fontWeight: 600, margin: '0 0 6px' }}>Questions about this document?</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, margin: '0 0 14px' }}>Our Data Protection Officer is Maya Chen. She and the team respond to every legal inquiry within 30 days.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('support')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Contact support</button>
                <button style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Email dpo@pulse.app</button>
                <button style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Download PDF</button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

// ── PRIVACY POLICY ─────────────────────────────────────────────────────────
function PrivacyScreen({ onNavigate }) {
  const sections = [
    { id: 'overview', title: 'Overview', body: [
      'Pulse exists to support your recovery. That means every choice we make about your data starts from one principle: it belongs to you, not us. We collect only what we need, encrypt everything, and never sell or rent your information.',
      { callout: 'Plain-language summary: We treat your health data like a therapist would — confidential, secure, and shared only with your explicit permission.', icon: 'shield' },
    ] },
    { id: 'data-we-collect', title: 'Data we collect', body: [
      'We collect three categories of information, each with a clear purpose:',
      { table: [
        ['Category', 'Examples', 'Purpose'],
        ['Account', 'Name, email, password (hashed)', 'Authentication'],
        ['Health data', 'Mood, pain, journal entries, goals', 'Track recovery'],
        ['Device', 'IP address, browser, app version', 'Security & support'],
      ] },
      'We do not collect biometric identifiers, location history, or contacts unless you explicitly enable a feature that requires them (and you can revoke that consent anytime).',
    ] },
    { id: 'how-we-use', title: 'How we use your data', body: [
      'Your data is used for four things — and nothing else:',
      { list: [
        { label: 'Service delivery', text: 'Showing your check-ins, charts, goals, and AI suggestions.' },
        { label: 'Safety', text: 'Detecting account compromise and surfacing crisis resources when patterns suggest risk.' },
        { label: 'Care team sharing', text: 'Only with clinicians you explicitly authorize.' },
        { label: 'Aggregated research', text: 'Optional. Fully anonymized. Opt out anytime in Settings → Data.' },
      ] },
    ] },
    { id: 'sharing', title: 'Sharing & disclosure', body: [
      'We never sell your data. We share it only in these specific cases:',
      { list: [
        { label: 'With you', text: 'Always. You can export everything in one click.' },
        { label: 'With your care team', text: "Only the categories you explicitly toggle on, and only with clinicians you've invited." },
        { label: 'With service providers', text: 'Cloud hosting (AWS, Frankfurt region), email delivery, and analytics — all bound by HIPAA Business Associate Agreements.' },
        { label: 'When legally required', text: 'We will challenge overbroad requests and notify you unless legally prohibited.' },
      ] },
    ] },
    { id: 'security', title: 'Security', body: [
      'We protect your data with multiple layers of defense:',
      { list: [
        { label: 'Encryption in transit', text: 'TLS 1.3 with perfect forward secrecy.' },
        { label: 'Encryption at rest', text: 'AES-256 with keys held in HSMs.' },
        { label: 'Access controls', text: 'Engineer access requires manager approval, is time-limited, and fully audited.' },
        { label: 'Penetration testing', text: 'Annual third-party tests; latest report available on request.' },
      ] },
    ] },
    { id: 'your-rights', title: 'Your rights', body: [
      'Under GDPR, CCPA, PIPEDA and similar laws, you have the right to access, correct, port, restrict, or delete your data. We honor these rights for everyone, regardless of where you live.',
      { list: [
        { label: 'Access & export', text: "Settings → Data → 'Export everything'. JSON + PDF, delivered in under 24 hours." },
        { label: 'Correct', text: 'Edit any check-in, journal entry, or profile field at any time.' },
        { label: 'Delete', text: 'One-click account deletion. Hard delete within 30 days (immediate on written request).' },
      ] },
    ] },
    { id: 'retention', title: 'Data retention', body: [
      'We keep data only as long as it serves your recovery or we are legally required to. When you delete your account, your data is removed from production within 24 hours and from backups within 30 days.',
    ] },
    { id: 'children', title: 'Children', body: [
      'Pulse is not directed to children under 16. If you believe a child has created an account, contact dpo@pulse.app and we will delete it within 7 days.',
    ] },
    { id: 'changes', title: 'Changes to this policy', body: [
      "We will email you at least 30 days before any material change. Minor edits (typos, clarifications) are posted with the 'last updated' date.",
    ] },
  ];

  return <LegalDoc kicker="Privacy Policy" title="Your data, your rules." subtitle="The plain-language version of how we handle the information you share with Pulse." updated="April 28, 2026" sections={sections} onNavigate={onNavigate} accent={C.primary} icon="shield" />;
}

// ── TERMS OF SERVICE ───────────────────────────────────────────────────────
function TermsScreen({ onNavigate }) {
  const sections = [
    { id: 'agreement', title: 'Agreement', body: [
      "By creating an account or using Pulse, you agree to these Terms and to our Privacy Policy. If you don't agree, please don't use the service — and email us if you want help moving your data elsewhere.",
      { callout: 'Pulse is not a substitute for medical care. In a crisis, call or text 988 (US/Canada) or your local emergency number.', tone: 'warn', icon: 'alertTriangle' },
    ] },
    { id: 'eligibility', title: 'Eligibility', body: [
      'You must be 16 or older to use Pulse. By signing up, you confirm you are of legal age and capable of entering a binding agreement.',
    ] },
    { id: 'your-account', title: 'Your account', body: [
      'You are responsible for the activity on your account. Keep your password safe, use two-factor authentication, and let us know immediately if you suspect unauthorized access.',
      { list: [
        { label: 'One person, one account', text: "Don't share your account or impersonate someone else." },
        { label: 'Accurate information', text: 'Provide truthful info for medication tracking and clinical sharing.' },
        { label: 'Account suspension', text: 'We may suspend accounts that violate these Terms, with notice except in safety emergencies.' },
      ] },
    ] },
    { id: 'medical', title: 'Not medical advice', body: [
      'Pulse provides tools, insights, and community — not medical advice. Our AI suggestions are informational and have been reviewed by our clinical advisory board, but they are not a diagnosis or a treatment plan.',
      'Always consult a licensed healthcare provider for medical decisions. If you are experiencing a mental-health emergency, contact emergency services or 988.',
    ] },
    { id: 'community', title: 'Community conduct', body: [
      'Our community is a sanctuary. To keep it safe, all members agree to:',
      { list: [
        { label: 'Respect each other', text: 'No harassment, hate speech, or judgmental responses to disclosures.' },
        { label: 'Protect privacy', text: "Don't share screenshots, names, or identifying details from other members." },
        { label: 'Stay supportive, not prescriptive', text: 'Share your experience; let clinicians prescribe.' },
        { label: 'Report concerns', text: 'Flag content that worries you — our moderators review within 1 hour.' },
      ] },
    ] },
    { id: 'content', title: 'Your content', body: [
      'You own everything you create in Pulse — your journal entries, check-ins, posts, and goals. You grant us a limited license to display this content back to you (and to anyone you explicitly share with). We never use your content to train AI models without separate, opt-in consent.',
    ] },
    { id: 'subscriptions', title: 'Subscriptions & billing', body: [
      'Pulse has a free tier and an optional Premium plan. You can cancel anytime; cancellation takes effect at the end of your billing cycle and we never auto-charge for renewals without 7 days notice.',
      { table: [
        ['Plan', 'Includes', 'Price'],
        ['Free', 'Check-ins, goals, community', '$0'],
        ['Premium', 'AI insights, care-team sharing, exports', '$9 / mo'],
        ['Sponsored', 'Premium, billed to clinician or employer', 'Varies'],
      ] },
    ] },
    { id: 'termination', title: 'Termination', body: [
      'You can delete your account anytime from Settings → Data. We may terminate accounts that violate these Terms, with notice and an opportunity to export your data — except in cases of safety risk or fraud.',
    ] },
    { id: 'liability', title: 'Limitation of liability', body: [
      'To the maximum extent permitted by law, Pulse, Inc. is not liable for indirect, incidental, or consequential damages. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim arose.',
      'Nothing in these Terms limits liability that cannot be limited by law — including liability for gross negligence, fraud, or personal injury.',
    ] },
    { id: 'governing-law', title: 'Governing law', body: [
      'These Terms are governed by the laws of Ontario, Canada. Disputes will be resolved by binding arbitration in Toronto, except where local consumer law requires court access.',
    ] },
    { id: 'contact', title: 'Contact', body: [
      'Questions about these Terms? Email legal@pulse.app or write to Pulse, Inc., 200 King Street West, Suite 1400, Toronto, ON M5H 3T4, Canada.',
    ] },
  ];

  return <LegalDoc kicker="Terms of Service" title="The agreement between you and Pulse." subtitle="The rules of the road for using Pulse — written in plain English, then again in legal English." updated="April 28, 2026" sections={sections} onNavigate={onNavigate} accent={C.accent || '#7d4495'} icon="bookmark" />;
}

// ── COOKIE POLICY ──────────────────────────────────────────────────────────
function CookiesScreen({ onNavigate }) {
  const { isMobile } = useBreakpoint();
  const [prefs, setPrefs] = React.useState({ essential: true, analytics: true, personalization: false, marketing: false });
  const [saved, setSaved] = React.useState(false);

  const togglePref = (k) => { if (k === 'essential') return; setPrefs(p => ({ ...p, [k]: !p[k] })); setSaved(false); };

  const cookieGroups = [
    { id: 'essential', name: 'Strictly necessary', required: true, desc: 'Authentication tokens, security flags, and CSRF tokens. Without these, the app cannot function.',
      examples: [{ name: 'he_session', purpose: 'Keeps you signed in', expiry: '30 days' }, { name: 'he_csrf', purpose: 'Prevents request forgery', expiry: 'Session' }] },
    { id: 'analytics', name: 'Analytics', required: false, desc: 'Help us understand which features help recovery (in aggregate, never tied to your identity).',
      examples: [{ name: 'he_anon_id', purpose: 'Anonymous usage metrics', expiry: '180 days' }, { name: '_ph_events', purpose: 'Feature interaction counts', expiry: '90 days' }] },
    { id: 'personalization', name: 'Personalization', required: false, desc: 'Remember preferences like language, theme, and dashboard layout.',
      examples: [{ name: 'he_locale', purpose: 'Preferred language', expiry: '1 year' }, { name: 'he_layout', purpose: 'Dashboard arrangement', expiry: '1 year' }] },
    { id: 'marketing', name: 'Marketing', required: false, desc: 'Off by default. Used only on pulse.app marketing pages — never inside the app.',
      examples: [{ name: 'he_utm', purpose: 'Attribution for referrals', expiry: '90 days' }] },
  ];

  const sections = [
    { id: 'what', title: 'What cookies we use', body: [
      'Cookies are small text files stored on your device. We use them sparingly, and never to track you across other websites.',
    ] },
    { id: 'manage', title: 'Manage your preferences', body: [
      'You can change your choices anytime. Disabling a category clears its cookies immediately.',
    ] },
    { id: 'third-party', title: 'Third parties', body: [
      'We use a small number of trusted vendors, all bound by HIPAA Business Associate Agreements:',
      { list: [
        { label: 'AWS', text: 'Hosting and storage (Frankfurt region).' },
        { label: 'Stripe', text: 'Subscription billing.' },
        { label: 'PostHog', text: 'Self-hosted product analytics.' },
      ] },
    ] },
    { id: 'changes', title: 'Changes', body: [
      'When we add, remove, or change cookies, we update this page and (if changes are material) prompt you to re-confirm your preferences.',
    ] },
  ];

  return (
    <div data-legal-scroll style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Cookies & your choices."
        subtitle="A short policy, because we use cookies sparingly. Manage your preferences inline — changes apply instantly."
        kicker="Cookie Policy" icon="settings" accent={C.secondary}
        onNavigate={onNavigate}
        breadcrumb={[{ label: 'Dashboard', page: 'dashboard' }, { label: 'Legal' }, { label: 'Cookies' }]}
      />
      <div style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.card, padding: isMobile ? '12px 16px' : '16px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 18, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, flexWrap: 'wrap' }}>
          <span><strong style={{ color: C.foreground }}>Last updated:</strong> April 28, 2026</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map(t => {
              const page = t.toLowerCase();
              const active = t === 'Cookies';
              return (
                <button key={t} onClick={() => onNavigate(page)} style={{ padding: '5px 12px', borderRadius: 99, border: `1.5px solid ${active ? C.secondary : C.border}`, backgroundColor: active ? C.secondaryLight : C.card, color: active ? '#005144' : C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>{t}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: isMobile ? '16px' : '32px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {/* Preference cards */}
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: C.foreground, margin: '0 0 6px' }}>Your cookie preferences</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: C.mutedFg, margin: '0 0 20px', lineHeight: 1.6 }}>Toggle categories on or off. We never enable marketing cookies inside the recovery app.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {cookieGroups.map(g => {
            const on = prefs[g.id];
            return (
              <div key={g.id} style={{ backgroundColor: C.card, border: `1px solid ${on ? C.primary + '40' : C.border}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.15s' }}>
                <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: C.foreground, margin: 0 }}>{g.name}</h4>
                      {g.required && <span style={{ padding: '2px 8px', borderRadius: 99, backgroundColor: C.muted, color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Always on</span>}
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0, lineHeight: 1.6 }}>{g.desc}</p>
                  </div>
                  {/* Toggle */}
                  <button onClick={() => togglePref(g.id)} disabled={g.required}
                    style={{ width: 44, height: 24, borderRadius: 99, border: 'none',
                      backgroundColor: on ? C.primary : C.border,
                      position: 'relative', cursor: g.required ? 'not-allowed' : 'pointer',
                      opacity: g.required ? 0.6 : 1, transition: 'background 0.15s', flexShrink: 0,
                    }}>
                    <span style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.18s' }} />
                  </button>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, backgroundColor: C.bg }}>
                  {g.examples.map((ex, i) => (
                    <div key={ex.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 120px', padding: '10px 20px', borderTop: i === 0 ? 'none' : `1px solid ${C.border}`, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.foreground, alignItems: 'center' }}>
                      <code style={{ fontFamily: 'ui-monospace, SF Mono, monospace', fontSize: 11, color: C.primary }}>{ex.name}</code>
                      <span style={{ color: C.mutedFg }}>{ex.purpose}</span>
                      <span style={{ color: C.mutedFg, textAlign: 'right' }}>{ex.expiry}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 48 }}>
          <button onClick={() => { setPrefs({ essential: true, analytics: false, personalization: false, marketing: false }); setSaved(false); }} style={{ padding: '10px 18px', borderRadius: 10, border: `1.5px solid ${C.border}`, backgroundColor: C.card, color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Reject all optional</button>
          <button onClick={() => { setPrefs({ essential: true, analytics: true, personalization: true, marketing: false }); setSaved(false); }} style={{ padding: '10px 18px', borderRadius: 10, border: `1.5px solid ${C.border}`, backgroundColor: C.card, color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Accept recommended</button>
          <button onClick={() => setSaved(true)} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,93,167,0.25)' }}>
            {saved ? '✓ Saved' : 'Save preferences'}
          </button>
        </div>

        {/* Policy body */}
        <div>
          <article style={{ maxWidth: 720, margin: '0 auto' }}>
            {sections.map((s, i) => (
              <section key={s.id} style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: C.foreground, margin: '0 0 12px' }}><span style={{ color: C.secondary, marginRight: 8 }}>{i + 1}.</span>{s.title}</h2>
                {s.body.map((block, bi) => {
                  if (typeof block === 'string') return <p key={bi} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: C.foreground, lineHeight: 1.75, margin: '0 0 14px' }}>{block}</p>;
                  if (block.list) return (
                    <ul key={bi} style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
                      {block.list.map((item, ii) => (
                        <li key={ii} style={{ display: 'flex', gap: 12, padding: '6px 0', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, lineHeight: 1.65 }}>
                          <div style={{ flexShrink: 0, marginTop: 8, width: 5, height: 5, borderRadius: '50%', backgroundColor: C.secondary }} />
                          <span><strong>{item.label} — </strong>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  );
                  return null;
                })}
              </section>
            ))}
          </article>
        </div>
      </div>

      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

// ── ACCESSIBILITY ──────────────────────────────────────────────────────────
function AccessibilityScreen({ onNavigate }) {
  const sections = [
    { id: 'commitment', title: 'Our commitment', body: [
      'Recovery should be accessible to everyone — regardless of how you see, hear, move, or process information. Pulse is built to meet WCAG 2.2 Level AA, and our team treats accessibility as a clinical safety issue, not a checkbox.',
      { callout: 'Plain-language summary: If something in Pulse is hard for you to use, that\'s a bug — please tell us so we can fix it.', icon: 'heart' },
    ] },
    { id: 'conformance', title: 'Conformance status', body: [
      'Pulse is partially conformant with WCAG 2.2 Level AA. "Partially" means most of the app meets the standard, but some areas — flagged below — are still being remediated.',
      { table: [
        ['Surface', 'Status', 'Last audited'],
        ['Dashboard, Check-in, Goals', 'Conformant', 'Mar 2026'],
        ['Community feed', 'Conformant', 'Mar 2026'],
        ['Insights & charts', 'Partially conformant', 'Mar 2026'],
        ['Onboarding tour', 'In remediation (target: Jun 2026)', 'Feb 2026'],
      ] },
    ] },
    { id: 'features', title: 'Built-in accessibility features', body: [
      'Every recovery surface ships with these defaults — no extension or workaround required:',
      { list: [
        { label: 'Full keyboard navigation', text: 'Every action — check-in, goal creation, posting, navigating — is reachable with Tab, Enter, and arrow keys. Visible focus rings are always on.' },
        { label: 'Screen reader support', text: 'Tested with VoiceOver (macOS, iOS), NVDA, JAWS, and TalkBack. Charts include text alternatives; emoji are paired with text labels.' },
        { label: 'Adjustable text size', text: 'Resize up to 200% without loss of content. Honors your OS-level Dynamic Type / font scale settings.' },
        { label: 'Contrast modes', text: 'Light, dark, and high-contrast themes. Minimum 4.5:1 contrast for body text; 7:1 in high-contrast mode.' },
        { label: 'Reduced motion', text: 'Honors prefers-reduced-motion. Disables parallax, auto-playing animations, and decorative transitions.' },
        { label: 'Captions & transcripts', text: 'All guided-breathing audio and video meditations include synced captions and downloadable transcripts.' },
      ] },
    ] },
    { id: 'standards', title: 'Standards we follow', body: [
      'We design and test against multiple overlapping standards so accommodations stack rather than conflict:',
      { list: [
        { label: 'WCAG 2.2 Level AA', text: 'Web Content Accessibility Guidelines — the global standard.' },
        { label: 'EN 301 549', text: 'European accessibility requirement for digital products.' },
        { label: 'Section 508', text: 'US federal procurement standard.' },
        { label: 'ADA Title III', text: 'US Americans with Disabilities Act — places of public accommodation.' },
        { label: 'AODA', text: 'Accessibility for Ontarians with Disabilities Act (our home jurisdiction).' },
      ] },
    ] },
    { id: 'assistive', title: 'Tested assistive technology', body: [
      'Each release is tested with a representative sample of assistive tech on real devices, not emulators:',
      { table: [
        ['Tool', 'Platform', 'Tested release'],
        ['VoiceOver', 'macOS 14, iOS 17', '2026.4'],
        ['NVDA 2024.1', 'Windows 11 + Firefox/Chrome', '2026.4'],
        ['JAWS 2024', 'Windows 11 + Chrome', '2026.4'],
        ['TalkBack', 'Android 14', '2026.4'],
        ['Dragon NaturallySpeaking', 'Windows 11', '2026.3'],
        ['Switch Control', 'iOS 17', '2026.4'],
      ] },
    ] },
    { id: 'known-issues', title: 'Known issues', body: [
      'We list current gaps publicly so you can plan around them. Each has an owner and a target fix date.',
      { list: [
        { label: 'Onboarding tour (target: Jun 2026)', text: 'Spotlight overlay sometimes traps focus on iOS VoiceOver. Workaround: skip the tour from the welcome screen.' },
        { label: 'Insights charts (target: May 2026)', text: 'Trend sparklines lack data-table fallback in NVDA browse mode. Workaround: use the data table view toggle.' },
        { label: 'Community video posts (target: Jul 2026)', text: 'Auto-generated captions for member-uploaded videos have ~88% accuracy. Members can edit captions before publishing.' },
      ] },
    ] },
    { id: 'feedback', title: 'Report an issue', body: [
      'Found a barrier? We want to know. Our accessibility team replies within 2 business days with an acknowledgement, fix estimate, and an immediate workaround where possible.',
      { list: [
        { label: 'Email', text: 'access@pulse.app — fastest channel; goes directly to our accessibility lead.' },
        { label: 'In-app', text: 'Settings → Help → "Report an accessibility issue" — includes optional screen-reader log capture.' },
        { label: 'Phone & TTY', text: '+1 (888) 555-HEAL · TTY: 711 · Available 6am–10pm ET.' },
        { label: 'Mail', text: 'Accessibility, Pulse Inc., 200 King Street West, Suite 1400, Toronto, ON M5H 3T4, Canada.' },
      ] },
    ] },
    { id: 'process', title: 'How we work on accessibility', body: [
      'Accessibility is not a phase; it\'s a practice. Here is what that looks like internally:',
      { list: [
        { label: 'Designed in', text: 'Every feature ships with an accessibility annotation review before engineering starts.' },
        { label: 'Tested before release', text: 'Every release passes automated checks (axe-core) and manual screen-reader checks before going to production.' },
        { label: 'Audited annually', text: 'Independent audit by Fable each year; latest report available on request.' },
        { label: 'Lived experience', text: 'Our advisory panel includes 8 users who are blind, low-vision, Deaf, hard-of-hearing, motor-impaired, or neurodivergent.' },
      ] },
    ] },
  ];

  return <LegalDoc kicker="Accessibility" title="Recovery, accessible to everyone." subtitle="How Pulse is built, tested, and improved so it works with the assistive technology you already trust." updated="April 28, 2026" sections={sections} onNavigate={onNavigate} accent={C.secondary} icon="heart" />;
}

Object.assign(window, { LegalDoc, PrivacyScreen, TermsScreen, CookiesScreen, AccessibilityScreen });
