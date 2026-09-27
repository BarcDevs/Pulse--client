// profile.jsx — User profile page
// ─── PROFILE ─────────────────────────────────────────────────
function ProfileScreen({ onNavigate }) {
  const [prefs, setPrefs] = React.useState(['Morning Walks', 'Meditation', 'Yoga']);
  const availablePrefs = ['Morning Walks', 'Meditation', 'Yoga', 'Journaling', 'Swimming', 'Cycling', 'Reading'];
  const togglePref = (p) => setPrefs(ps => ps.includes(p) ? ps.filter(x => x !== p) : [...ps, p]);

  const focusAreas = [
    { icon: 'activity', label: 'Pain Management', bg: '#FEE2E2', color: C.destructive },
    { icon: 'brain', label: 'Mental Clarity', bg: C.secondaryLight, color: C.secondary },
    { icon: 'sparkles', label: 'Mindfulness', bg: C.accentLight, color: C.accent },
  ];

  const activeGoals = [
    { label: 'Physio Therapy', progress: 80 },
    { label: 'Daily Meditation', progress: 65 },
    { label: 'Sleep Hygiene', progress: 40 },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title="Profile" subtitle="Your recovery identity" onNavigate={onNavigate} />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Top Row — User Card (1/3) + Basic Info (2/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
          {/* User Profile Card */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary}40)`, border: `4px solid ${C.primaryLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 32, color: C.primary }}>AR</span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', backgroundColor: C.success, border: `2px solid ${C.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={14} color="#fff" />
              </div>
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 20, color: C.foreground, margin: '0 0 4px' }}>Alex Rivera</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 12px' }}>Member since Oct 2023</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, backgroundColor: C.secondaryLight }}>
              <Icon name="award" size={14} color={C.secondary} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.secondary }}>Level 4: Resilient</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
              {[['142', 'Days'], ['28', 'Milestones'], ['8.4', 'Health Score']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: C.foreground, margin: '0 0 2px' }}>{val}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: C.mutedFg, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 20px' }}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Full Name', val: 'Alex Rivera' },
                { label: 'Email', val: 'alex.rivera@email.com' },
                { label: 'Date of Birth', val: 'March 15, 1990' },
                { label: 'Location', val: 'San Francisco, CA' },
                { label: 'Recovery Type', val: 'Injury & Mobility' },
                { label: 'Care Provider', val: 'Dr. Chen, Bay Area PT' },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: C.mutedFg, letterSpacing: '0.06em', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{field.label}</label>
                  <input defaultValue={field.val} style={{ width: '100%', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${C.border}`, borderRadius: 8, outline: 'none', backgroundColor: C.bg, boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = C.primary}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              ))}
            </div>
            <button style={{ marginTop: 20, padding: '10px 20px', borderRadius: 8, border: 'none', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Save Changes</button>
          </div>
        </div>

        {/* Recovery Identity */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 4px' }}>Recovery Identity</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 20px' }}>Core Focus Areas</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {focusAreas.map(area => (
              <div key={area.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, backgroundColor: area.bg }}>
                <Icon name={area.icon} size={16} color={area.color} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: area.color }}>{area.label}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: C.muted, borderRadius: 12, padding: 16 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, margin: 0 }}>
              "My goal is to regain physical mobility through consistent therapy while maintaining a calm, focused mindset during stressful transitions."
            </p>
          </div>
        </div>

        {/* Bottom Row — Activity Preferences (2/3) + Active Goals (1/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Daily Activity Preferences */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 6px' }}>Daily Activity Preferences</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 16px' }}>Select activities you enjoy - we'll personalize your suggestions.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {availablePrefs.map(p => {
                const sel = prefs.includes(p);
                return (
                  <button key={p} onClick={() => togglePref(p)} style={{ padding: '8px 16px', borderRadius: 99, border: `1.5px solid ${sel ? C.primary : C.border}`, backgroundColor: sel ? C.primaryLight : C.card, fontFamily: 'Inter, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: sel ? C.primary : C.mutedFg, cursor: 'pointer', transition: 'all 0.15s' }}>
                    {sel && <span style={{ marginRight: 4 }}>+</span>}{p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Goals — matches ActiveGoals.tsx (blue gradient) */}
          <div style={{ borderRadius: 16, background: `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})`, padding: 24, color: '#fff' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', margin: '0 0 20px' }}>Active Goals</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeGoals.map(goal => (
                <div key={goal.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff' }}>{goal.label}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#fff' }}>{goal.progress}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: goal.progress + '%', backgroundColor: '#fff', borderRadius: 99, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('goals')} style={{ marginTop: 20, width: '100%', padding: '10px', borderRadius: 8, border: 'none', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}>
              View Roadmap
            </button>
          </div>
        </div>

        {/* System & Privacy */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 16px' }}>System & Privacy</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => onNavigate('settings')} style={{ padding: '9px 20px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.foreground, cursor: 'pointer' }}>Manage Settings</button>
            <button onClick={() => onNavigate('landing')} style={{ padding: '9px 20px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.mutedFg, cursor: 'pointer' }}>Sign Out</button>
            <button style={{ padding: '9px 20px', borderRadius: 8, border: `1px solid #fecaca`, backgroundColor: '#fff8f8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.destructive, cursor: 'pointer' }}>Delete Account</button>
          </div>
        </div>

      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { ProfileScreen });
