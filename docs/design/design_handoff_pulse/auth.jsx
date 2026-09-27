
// auth.jsx — aligned with actual codebase colors + design

function LandingPage({ onNavigate }) {
  const features = [
  { icon: 'calendarCheck', title: 'Smart Tracking', desc: 'Track mood, pain, and activities with ease through our intuitive, low-friction interface.', color: C.primary, bg: C.primaryLight },
  { icon: 'sparkles', title: 'AI-Driven Insights', desc: 'Personalized patterns and recommendations tailored specifically to your unique recovery journey.', color: C.accent, bg: C.accentLight },
  { icon: 'users', title: 'Supportive Community', desc: 'Connect with others who truly understand your path in a moderated, safe environment.', color: C.secondary, bg: C.secondaryLight }];

  const steps = [
  { n: '1', title: 'Check-in', desc: 'Spend 30 seconds a day documenting your feelings and physical state using our calming interface.' },
  { n: '2', title: 'Monitor', desc: 'Watch as Pulse transforms your data into beautiful, easy-to-understand visualizations.' },
  { n: '3', title: 'Grow', desc: 'Receive personalized prompts and community support to help you reach your recovery milestones.' }];

  const [navHov, setNavHov] = React.useState(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, overflowY: 'auto' }}>
      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}`, height: 64, display: 'flex', alignItems: 'center', padding: '0 48px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="pulse-logo.webp" alt="Pulse" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', color: C.logo }}>Pulse</span>
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          {[['How it Works', null], ['Community', 'community'], ['About', null], ['Help', 'support']].map(([label, page]) =>
          <a key={label} href="#" onClick={(e) => { e.preventDefault(); if (page) onNavigate(page); }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: navHov === label ? C.primary : C.mutedFg, textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={() => setNavHov(label)} onMouseLeave={() => setNavHov(null)}>{label}</a>
          )}
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <LanguageSwitcher variant="header" />
          <div style={{ width: 1, height: 24, backgroundColor: C.border, margin: '0 4px' }} />
          <button onClick={() => onNavigate('login')} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.mutedFg, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: 8 }}>Login</button>
          <button onClick={() => onNavigate('signup')} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 8, cursor: 'pointer', padding: '9px 18px', boxShadow: '0 4px 12px rgba(0,93,167,0.25)' }}>Sign Up</button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 48px 64px', display: 'flex', alignItems: 'center', gap: 64, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 56, lineHeight: 1.1, letterSpacing: '-2px', color: C.foreground, margin: '0 0 20px' }}>
            Recovery<br />Refined.<br /><span style={{ color: C.primary }}>Sanctuary</span><br />Found.
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.75, color: C.mutedFg, maxWidth: 400, margin: '0 0 32px' }}>
            Your recovery journey deserves more than just a tracker. Discover a supportive digital sanctuary designed to be your constant companion in wellness and healing.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button onClick={() => onNavigate('signup')} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 10, cursor: 'pointer', padding: '13px 28px', boxShadow: '0 4px 16px rgba(0,93,167,0.3)', transition: 'transform 0.15s, box-shadow 0.15s' }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-1px)';e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,93,167,0.35)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,93,167,0.3)';}}>
              Start Your Journey
            </button>
            <button onClick={() => onNavigate('community')} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '13px 4px', textDecoration: 'underline', textUnderlineOffset: 4, textDecorationThickness: 1.5, textDecorationColor: 'rgba(0,93,167,0.35)' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecorationColor = C.primary; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecorationColor = 'rgba(0,93,167,0.35)'; }}>
              Explore Community <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </button>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 440 }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,93,167,0.15)', background: `linear-gradient(135deg, ${C.primaryLight}, ${C.accentLight})`, height: 360, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Mood-over-time chart card */}
            <div style={{ width: 280, backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)', borderRadius: 16, padding: '18px 18px 14px', boxShadow: '0 8px 28px rgba(0,93,167,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: C.mutedFg, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Last 14 days</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: C.foreground }}>Feeling steadier</div>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.secondary, backgroundColor: C.secondaryLight, padding: '3px 8px', borderRadius: 99 }}>+18%</div>
              </div>
              <svg viewBox="0 0 240 88" style={{ width: '100%', height: 88, display: 'block' }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.primary} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[18, 36, 54, 72].map(y => <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 4" />)}
                <path d="M0 62 L18 56 L36 60 L54 48 L72 52 L90 38 L108 44 L126 30 L144 36 L162 24 L180 28 L198 20 L216 26 L234 16 L240 14 L240 88 L0 88 Z" fill="url(#moodFill)" />
                <path d="M0 62 L18 56 L36 60 L54 48 L72 52 L90 38 L108 44 L126 30 L144 36 L162 24 L180 28 L198 20 L216 26 L234 16 L240 14" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {[[0,62],[36,60],[72,52],[108,44],[144,36],[180,28],[216,26],[240,14]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r={i === 7 ? 4 : 2.5} fill="#fff" stroke={C.primary} strokeWidth={i === 7 ? 2.5 : 1.5} />
                ))}
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: 10, color: C.mutedFg }}>
                <span>Apr 15</span><span>Apr 22</span><span>Today</span>
              </div>
            </div>
            {/* Decorative streak ribbon */}
            <div style={{ position: 'absolute', left: 18, top: 22, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, padding: '10px 12px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {Array.from({ length: 28 }).map((_, i) => {
                const intensity = i < 24 ? 1 : i < 26 ? 0.55 : 0.2;
                return <div key={i} style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: i < 24 ? C.primary : i < 26 ? C.primaryLight : '#E2E8F0', opacity: intensity }} />;
              })}
            </div>
            <div style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: C.secondary }}>✦ 142 Day Streak</div>
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 20, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mood Today</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: C.foreground }}>8<span style={{ fontSize: 13, color: C.mutedFg, fontWeight: 400 }}>/10</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: C.muted, padding: '64px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 32, textAlign: 'center', letterSpacing: '-0.8px', color: C.foreground, marginBottom: 10 }}>Built for Your Peace of Mind</h2>
          <p style={{ textAlign: 'center', color: C.mutedFg, fontSize: 15, lineHeight: 1.6, marginBottom: 48 }}>Every feature is crafted to reduce cognitive load and provide clear, actionable paths forward.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {features.map((f, i) =>
            <div key={i} style={{ backgroundColor: C.card, borderRadius: 16, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon name={f.icon} size={22} color={f.color} />
                </div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: C.foreground, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: C.mutedFg, margin: 0 }}>{f.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 32, letterSpacing: '-0.8px', color: C.foreground, marginBottom: 36 }}>How Your Healing Unfolds</h2>
            {steps.map((step, i) =>
            <div key={i} style={{ display: 'flex', gap: 18, marginBottom: 28 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff' }}>{step.n}</span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: C.foreground, marginBottom: 6 }}>{step.title}</h4>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: C.mutedFg, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            )}
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.1)', background: `linear-gradient(160deg, #1e3a8a, ${C.foreground})`, padding: 28 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 14, textTransform: 'uppercase' }}>Weekly Recovery Trend</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90, marginBottom: 10 }}>
              {[6, 5, 7, 9, 6, 7, 8].map((v, i) =>
              <div key={i} style={{ flex: 1, height: v / 9 * 90 + 'px', borderRadius: '4px 4px 0 0', backgroundColor: i === 3 ? C.primary : 'rgba(255,255,255,0.15)' }} />
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) =>
              <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: i === 3 ? '#7CF8DD' : 'rgba(255,255,255,0.35)' }}>{d}</span>
              )}
            </div>
            <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', gap: 24 }}>
              {[['MOOD', '8/10', '#fff'], ['STREAK', '142', '#7CF8DD'], ['PROGRESS', '+15%', '#fff']].map(([l, v, c]) =>
              <div key={l}><div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: c }}>{v}</div><div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginTop: 3, textTransform: 'uppercase' }}>{l}</div></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '32px 48px 72px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', background: `linear-gradient(135deg, ${C.primaryGradStart}, #1e3a8a)`, borderRadius: 24, padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)' }} />
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 34, color: '#fff', letterSpacing: '-0.8px', margin: '0 0 14px', position: 'relative' }}>Join the Sanctuary Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, margin: '0 0 32px', position: 'relative' }}>Begin your refined recovery experience. Start tracking, connecting, and find your calm with Pulse.</p>
          <button onClick={() => onNavigate('signup')} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: C.primaryGradStart, backgroundColor: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', padding: '13px 32px', position: 'relative', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <AppFooter onNavigate={onNavigate} variant="minimal" />
    </div>);

}

function AuthCard({ title, subtitle, children }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <header style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', backgroundColor: C.card, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="pulse-logo.webp" alt="Pulse" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', color: C.logo }}>Pulse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => onNavigate('support')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.mutedFg, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 8 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.primary; e.currentTarget.style.backgroundColor = C.primaryLight; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.mutedFg; e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <Icon name="helpCircle" size={14} color="currentColor" />
            Help
          </button>
          <LanguageSwitcher variant="header" />
        </div>
      </header>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '28%', top: '12%', width: 180, height: 180, borderRadius: '50%', backgroundColor: C.primaryLight, opacity: 0.4 }} />
        <div style={{ position: 'absolute', left: '28%', bottom: '12%', width: 140, height: 140, borderRadius: '50%', backgroundColor: C.secondaryLight, opacity: 0.4 }} />
        <div style={{ width: '100%', maxWidth: 440, backgroundColor: C.card, borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,0.08)', padding: '36px 40px', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 26, textAlign: 'center', letterSpacing: '-0.5px', color: C.foreground, margin: '0 0 6px' }}>{title}</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, textAlign: 'center', color: C.mutedFg, margin: '0 0 24px', lineHeight: 1.6 }}>{subtitle}</p>
          {children}
        </div>
      </div>
    </div>);

}

function InputField({ label, type = 'text', placeholder, icon, value, onChange }) {
  const [showPw, setShowPw] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const actualType = type === 'password' && showPw ? 'text' : type;
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.foreground, marginBottom: 5 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Icon name={icon} size={15} color={focused ? C.primary : C.mutedFg} /></div>}
        <input type={actualType} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', padding: `10px ${type === 'password' ? '38px' : '12px'} 10px ${icon ? '38px' : '12px'}`, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1.5px solid ${focused ? C.primary : C.border}`, borderRadius: 8, outline: 'none', backgroundColor: C.card, boxShadow: focused ? `0 0 0 3px ${C.primaryLight}` : 'none', transition: 'border 0.15s, box-shadow 0.15s', boxSizing: 'border-box' }} />
        {type === 'password' &&
        <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
            <Icon name="eye" size={15} color={C.mutedFg} />
          </button>
        }
      </div>
    </div>);

}

function GoogleBtn({ label }) {
  return (
    <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '11px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, cursor: 'pointer', marginBottom: 18, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground }}>
      <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" /><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" /><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" /><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" /></svg>
      {label}
    </button>);

}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: C.border }} /><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>or</span><div style={{ flex: 1, height: 1, backgroundColor: C.border }} />
    </div>);

}

function LoginPage({ onNavigate }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = () => {
    if (!email || !password) {setError('Please fill in all fields.');return;}
    setError('');setLoading(true);
    setTimeout(() => {setLoading(false);onNavigate('dashboard');}, 900);
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to your recovery sanctuary.">
      <GoogleBtn label="Continue with Google" />
      <Divider />
      <InputField label="Email address" type="email" placeholder="you@example.com" icon="mail" value={email} onChange={setEmail} />
      <InputField label="Password" type="password" placeholder="Enter your password" icon="lock" value={password} onChange={setPassword} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: C.primary }} /><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>Remember me</span>
        </label>
        <button onClick={() => onNavigate('forgot')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</button>
      </div>
      {error && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.destructive, marginBottom: 12, textAlign: 'center' }}>{error}</p>}
      <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,93,167,0.25)', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, textAlign: 'center', color: C.mutedFg, marginTop: 18 }}>
        Don't have an account? <button onClick={() => onNavigate('signup')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontWeight: 600, fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Sign up free</button>
      </p>
    </AuthCard>);

}

function SignUpPage({ onNavigate }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const valid = name && email && password && agreed;

  return (
    <AuthCard title="Begin Your Journey" subtitle="Create an account to access your personalized wellness sanctuary.">
      <GoogleBtn label="Sign up with Google" />
      <Divider />
      <InputField label="Full name" placeholder="Alex Rivera" icon="user" value={name} onChange={setName} />
      <InputField label="Email address" type="email" placeholder="you@example.com" icon="mail" value={email} onChange={setEmail} />
      <InputField label="Password" type="password" placeholder="Create a strong password" icon="lock" value={password} onChange={setPassword} />
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', marginBottom: 18 }}>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ accentColor: C.primary, marginTop: 2 }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.5 }}>I agree to the <span style={{ color: C.primary }}>Terms of Service</span> and <span style={{ color: C.primary }}>Privacy Policy</span></span>
      </label>
      <button onClick={() => {if (valid) {setLoading(true);setTimeout(() => onNavigate('dashboard'), 900);}}} disabled={!valid || loading}
      style={{ width: '100%', padding: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 8, cursor: valid && !loading ? 'pointer' : 'not-allowed', opacity: !valid || loading ? 0.5 : 1, boxShadow: '0 4px 12px rgba(0,93,167,0.25)' }}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, textAlign: 'center', color: C.mutedFg, marginTop: 18 }}>
        Already have an account? <button onClick={() => onNavigate('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontWeight: 600, fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Sign in</button>
      </p>
    </AuthCard>);

}

Object.assign(window, { LandingPage, LoginPage, SignUpPage, AuthCard, InputField });