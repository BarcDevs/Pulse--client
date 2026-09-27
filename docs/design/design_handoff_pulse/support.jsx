// support.jsx — Help center / support page
// ── SUPPORT SCREEN ─────────────────────────────────────────────────────────
function SupportScreen({ onNavigate }) {
  const [query, setQuery] = React.useState('');
  const [openFaq, setOpenFaq] = React.useState(0);
  const [topic, setTopic] = React.useState('account');
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const categories = [
    { id: 'getting-started', icon: 'sparkles', title: 'Getting Started', desc: 'Set up your profile, navigate the app, and build your first goal.', count: 12, color: C.primary, bg: C.primaryLight },
    { id: 'tracking',        icon: 'activity', title: 'Tracking & Check-Ins', desc: 'How daily check-ins, streaks, and activities work.', count: 18, color: C.accent, bg: C.accentLight },
    { id: 'goals',           icon: 'target',   title: 'Goals & Milestones', desc: 'Create, edit, and complete recovery milestones.', count: 9,  color: C.secondary, bg: C.secondaryLight },
    { id: 'community',       icon: 'users',    title: 'Community & Sharing', desc: 'Peer groups, posts, and sharing your progress.', count: 14, color: '#7d4495', bg: '#f8d8ff' },
    { id: 'care-team',       icon: 'heart',    title: 'Care Team', desc: 'Connect with clinicians and share data securely.', count: 7,  color: '#ec4899', bg: '#fce7f3' },
    { id: 'privacy',         icon: 'shield',   title: 'Privacy & Security', desc: 'Your data, encryption, and account safety.', count: 11, color: '#0ea5e9', bg: '#dbeafe' },
  ];

  const faqs = [
    { q: 'Is my health data really private?', a: 'Yes. All check-in data, journal entries, and clinical notes are encrypted at rest (AES-256) and in transit (TLS 1.3). Pulse is HIPAA-compliant and SOC 2 Type II certified. We never sell your data, and care-team access requires your explicit, revocable consent.' },
    { q: 'What happens if I miss a check-in?', a: "Nothing punitive — your streak simply pauses. You can backfill up to 3 days of check-ins from the Dashboard. Recovery isn't about perfection; it's about coming back." },
    { q: 'Can I share progress with my therapist?', a: "Absolutely. From Settings → Care Team, invite your clinician by email. They get a read-only view of the data you explicitly choose to share (mood, pain, goal completion, journal entries — or any subset)." },
    { q: 'How is the AI used in Pulse?', a: 'AI is used to surface patterns (e.g., "your mood is 20% higher on days you stretch") and suggest activities. It does not make clinical decisions. All AI suggestions are reviewed by our clinical advisory board, and you can disable AI insights anytime in Settings.' },
    { q: 'What if I am in crisis?', a: 'Tap the red Crisis button in any screen, or call/text 988 (US/Canada). Our in-app safety plan walks you through grounding exercises, contacts, and reasons for living. We also surface local resources based on your region.' },
    { q: 'Can I export or delete my data?', a: "Yes — at any time. Settings → Data → 'Export everything' produces a portable JSON+PDF archive. 'Delete account' wipes your data within 30 days (or immediately on written request). We honor GDPR, CCPA, and PIPEDA." },
  ];

  const topics = ['Account & sign-in', 'Billing', 'Technical issue', 'Privacy & data', 'Care team access', 'Feedback', 'Other'];

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="How can we help?"
        subtitle="Search articles, browse categories, or reach a real human on our care team. We typically respond within 4 hours during business days."
        kicker="Support Center" icon="helpCircle" onNavigate={onNavigate}
      />

      <div style={{ padding: '32px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 28 }}>
          <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            <Icon name="search" size={18} color={C.mutedFg} />
          </div>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Try “backfill check-in”, “connect therapist”, “export data”…"
            style={{ width: '100%', padding: '14px 16px 14px 46px', borderRadius: 12, border: `1.5px solid ${C.border}`,
              fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, backgroundColor: C.card, outline: 'none', boxSizing: 'border-box',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.border} />
        </div>

        {/* Quick help cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}>
          {[
            { icon: 'messageCircle', title: 'Chat with support', desc: 'Avg reply 4 min · 6am–10pm', color: C.primary, action: 'Start chat' },
            { icon: 'heart',         title: 'Talk to your care team', desc: 'Secure clinical channel', color: '#ec4899', action: 'Open channel' },
            { icon: 'phone',         title: 'Crisis support', desc: 'Call or text 988 — 24/7', color: C.destructive, action: 'Get help now' },
          ].map(c => (
            <div key={c.title} style={{ backgroundColor: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, backgroundColor: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={c.icon} size={20} color={c.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: C.foreground, margin: 0 }}>{c.title}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '2px 0 0' }}>{c.desc}</p>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.color, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>{c.action} →</button>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: C.foreground, margin: '0 0 16px' }}>Browse topics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
          {categories.map(cat => (
            <button key={cat.id} style={{
              backgroundColor: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`,
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left',
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.boxShadow = `0 4px 16px ${cat.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon name={cat.icon} size={18} color={cat.color} />
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: C.foreground, margin: '0 0 4px' }}>{cat.title}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: C.mutedFg, margin: '0 0 12px', lineHeight: 1.55 }}>{cat.desc}</p>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: cat.color }}>{cat.count} articles →</span>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: C.foreground, margin: '0 0 16px' }}>Frequently asked</h3>
        <div style={{ backgroundColor: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden', marginBottom: 40 }}>
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                <button onClick={() => setOpenFaq(open ? -1 : i)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '18px 22px',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14.5, color: C.foreground, paddingRight: 16 }}>{f.q}</span>
                  <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, backgroundColor: open ? C.primary : C.muted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#fff' : C.mutedFg} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </button>
                {open && (
                  <div style={{ padding: '0 22px 22px', maxWidth: 720 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact form */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 32, marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32, alignItems: 'start' }}>
            <div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: C.foreground, margin: '0 0 8px' }}>Still need help?</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, margin: '0 0 18px' }}>
                Send us a note and a real person from our support team will reply — usually within 4 hours during business days, always within 24.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                {[
                  { icon: 'mail', label: 'support@pulse.app' },
                  { icon: 'phone', label: '+1 (888) 555-HEAL' },
                  { icon: 'globe', label: 'Available in 12 languages' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.foreground, fontFamily: 'Inter, sans-serif' }}>
                    <Icon name={item.icon} size={14} color={C.primary} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {!sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.mutedFg, display: 'block', marginBottom: 8 }}>Topic</label>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {topics.map(t => {
                      const active = topic === t;
                      return (
                        <button key={t} onClick={() => setTopic(t)} style={{
                          padding: '6px 14px', borderRadius: 99, border: `1.5px solid ${active ? C.primary : C.border}`,
                          backgroundColor: active ? C.primaryLight : C.card, color: active ? C.primary : C.mutedFg,
                          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                        }}>{t}</button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.mutedFg, display: 'block', marginBottom: 8 }}>Your message</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what's going on. The more detail, the better we can help."
                    style={{ width: '100%', minHeight: 130, padding: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground,
                      border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', resize: 'vertical', boxSizing: 'border-box', backgroundColor: C.bg, lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = C.primary}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="shield" size={12} color={C.secondary} /> Encrypted end-to-end. We never share with third parties.
                  </p>
                  <button onClick={() => message.trim() && setSent(true)}
                    style={{ padding: '11px 22px', borderRadius: 10, border: 'none',
                      background: message.trim() ? `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted,
                      color: message.trim() ? '#fff' : C.mutedFg,
                      fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                      cursor: message.trim() ? 'pointer' : 'not-allowed',
                      boxShadow: message.trim() ? '0 4px 14px rgba(0,93,167,0.25)' : 'none',
                    }}>Send message</button>
                </div>
              </div>
            ) : (
              <div style={{ padding: '32px 24px', textAlign: 'center', backgroundColor: C.bg, borderRadius: 12, border: `1px solid ${C.border}` }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #d1fae5, #7cf8dd)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <Icon name="check" size={26} color="#005144" />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: C.foreground, margin: '0 0 6px' }}>Message sent</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 14px', lineHeight: 1.6 }}>We'll get back to you at your account email within 4 hours.</p>
                <button onClick={() => { setSent(false); setMessage(''); }} style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Send another</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { SupportScreen });
