// settings.jsx — Settings page
// ─── SETTINGS ────────────────────────────────────────────────
function SettingsScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('notifications');
  const [notifToggles, setNotifToggles] = React.useState({ push: true, reminders: true, ai: true, community: false, milestone: true });
  const [privToggles, setPrivToggles] = React.useState({ shareData: false, anonymousMode: true, activityVisible: true });
  const [appPrefs, setAppPrefs] = React.useState({ darkMode: false, language: 'English' });

  function Toggle({ on, onChange }) {
    return (
      <div onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 99, backgroundColor: on ? C.primary : C.border, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </div>
    );
  }

  function SettingRow({ label, desc, children }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: `1px solid ${C.border}` }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.foreground, margin: '0 0 2px' }}>{label}</p>
          {desc && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{desc}</p>}
        </div>
        {children}
      </div>
    );
  }

  const tabs = [
    { id: 'notifications', icon: 'bell', label: 'Notifications' },
    { id: 'privacy', icon: 'lock', label: 'Privacy' },
    { id: 'security', icon: 'shield', label: 'Account & Security' },
    { id: 'preferences', icon: 'settings', label: 'App Preferences' },
  ];

  const setNotif = (key) => (val) => setNotifToggles(t => ({ ...t, [key]: val }));
  const setPriv = (key) => (val) => setPrivToggles(t => ({ ...t, [key]: val }));

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title="Settings" subtitle="Manage your preferences" onNavigate={onNavigate} />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
          {/* Tab sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, textAlign: 'left', backgroundColor: activeTab === tab.id ? C.primary : 'transparent', color: activeTab === tab.id ? '#fff' : C.mutedFg, transition: 'all 0.15s' }}
                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = C.muted; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <Icon name={tab.icon} size={18} color={activeTab === tab.id ? '#fff' : C.mutedFg} />
                {tab.label}
              </button>
            ))}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 8 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: C.mutedFg, letterSpacing: '0.06em', padding: '0 16px', marginBottom: 4, textTransform: 'uppercase' }}>Support</p>
              <button onClick={() => onNavigate('support')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.mutedFg, backgroundColor: 'transparent', width: '100%', textAlign: 'left' }}>
                <Icon name="messageCircle" size={18} color={C.mutedFg} /> Help Center
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {activeTab === 'notifications' && (
              <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 4px' }}>Notifications</h4>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 4px' }}>Control how and when Pulse contacts you.</p>
                <SettingRow label="Push notifications" desc="Receive alerts on your device"><Toggle on={notifToggles.push} onChange={setNotif('push')} /></SettingRow>
                <SettingRow label="Daily reminders" desc="Get reminded for your daily check-in"><Toggle on={notifToggles.reminders} onChange={setNotif('reminders')} /></SettingRow>
                <SettingRow label="AI insights" desc="Be notified when new AI observations are ready"><Toggle on={notifToggles.ai} onChange={setNotif('ai')} /></SettingRow>
                <SettingRow label="Community alerts" desc="Replies and mentions in discussions"><Toggle on={notifToggles.community} onChange={setNotif('community')} /></SettingRow>
                <SettingRow label="Milestone alerts" desc="Celebrate when you hit a new milestone"><Toggle on={notifToggles.milestone} onChange={setNotif('milestone')} /></SettingRow>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 4px' }}>Privacy</h4>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 4px' }}>Your data, your control.</p>
                <SettingRow label="Share anonymized data" desc="Help improve Pulse with anonymous usage data"><Toggle on={privToggles.shareData} onChange={setPriv('shareData')} /></SettingRow>
                <SettingRow label="Anonymous mode" desc="Hide your identity in community discussions"><Toggle on={privToggles.anonymousMode} onChange={setPriv('anonymousMode')} /></SettingRow>
                <SettingRow label="Activity visible to mentors" desc="Allow your care team to view progress"><Toggle on={privToggles.activityVisible} onChange={setPriv('activityVisible')} /></SettingRow>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 20px' }}>Account & Security</h4>
                {[
                  { label: 'Email address', val: 'alex.rivera@email.com' },
                  { label: 'Password', val: '••••••••••••' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 16 }}>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: C.mutedFg, letterSpacing: '0.06em', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{f.label}</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input defaultValue={f.val} style={{ flex: 1, padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${C.border}`, borderRadius: 8, outline: 'none', backgroundColor: C.bg }} />
                      <button style={{ padding: '9px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.primary, fontWeight: 600, cursor: 'pointer' }}>Update</button>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, display: 'flex', gap: 12 }}>
                  <button onClick={() => onNavigate('landing')} style={{ padding: '9px 20px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.mutedFg, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name="logout" size={16} color={C.mutedFg} /> Sign Out
                  </button>
                  <button style={{ padding: '9px 20px', borderRadius: 8, border: `1px solid #fecaca`, backgroundColor: '#fff8f8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: C.destructive, cursor: 'pointer' }}>Delete Account</button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 4px' }}>App Preferences</h4>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 4px' }}>Customize your Pulse experience.</p>
                <SettingRow label="Dark mode" desc="Switch to a darker interface"><Toggle on={appPrefs.darkMode} onChange={v => setAppPrefs(p => ({ ...p, darkMode: v }))} /></SettingRow>
                <SettingRow label="Language" desc="Choose your preferred language">
                  <select value={appPrefs.language} onChange={e => setAppPrefs(p => ({ ...p, language: e.target.value }))}
                    style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, backgroundColor: C.bg, cursor: 'pointer', outline: 'none' }}>
                    {['English', 'Spanish', 'French', 'Hebrew'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </SettingRow>
              </div>
            )}

            {/* Save/Discard */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 4, borderTop: `1px solid ${C.border}` }}>
              <button style={{ padding: '10px 20px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.mutedFg, cursor: 'pointer' }}>Discard Changes</button>
              <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff', cursor: 'pointer' }}>Save Preferences</button>
            </div>
          </div>
        </div>
      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { SettingsScreen });
