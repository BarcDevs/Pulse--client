// profile.jsx — User profile page (own + view-only author profile)
// ─── PROFILE ─────────────────────────────────────────────────

// Static demo data for author views — different recovery identities so each profile feels real
const AUTHOR_PROFILES = {
  'Marcus T.': {
    name: 'Marcus T.', initials: 'MT', joined: 'Jan 2024', level: 'Level 5: Steady',
    bio: '90 days into early-morning recovery rituals. Tea, breath, slow sunrises.',
    focus: [
      { icon: 'leaf', label: 'Mindfulness', tone: 'accent' },
      { icon: 'sparkles', label: 'Routine Building', tone: 'secondary' },
    ],
    stats: [['90', 'Days'], ['12', 'Milestones'], ['7.8', 'Health Score']],
    posts: 24, replies: 86, supports: 412,
  },
  'Sarah Jenkins': {
    name: 'Sarah Jenkins', initials: 'SJ', joined: 'Sep 2023', level: 'Level 6: Resilient',
    bio: 'Working through social anxiety, one family dinner at a time. Here to listen.',
    focus: [
      { icon: 'brain', label: 'Mental Clarity', tone: 'secondary' },
      { icon: 'users', label: 'Peer Support', tone: 'primary' },
    ],
    stats: [['218', 'Days'], ['34', 'Milestones'], ['8.1', 'Health Score']],
    posts: 47, replies: 312, supports: 1284,
  },
  'YogaCoach_Ben': {
    name: 'YogaCoach_Ben', initials: 'YB', joined: 'May 2023', level: 'Level 8: Mentor',
    bio: 'Certified yoga instructor. Sharing gentle flows for recovery and chronic pain.',
    focus: [
      { icon: 'activity', label: 'Movement', tone: 'destructive' },
      { icon: 'leaf', label: 'Mindful Practice', tone: 'accent' },
    ],
    stats: [['368', 'Days'], ['52', 'Milestones'], ['9.2', 'Health Score']],
    posts: 128, replies: 540, supports: 4120,
  },
  'Dr. Rivera': {
    name: 'Dr. Rivera', initials: 'DR', joined: 'Mar 2023', level: 'Verified Practitioner',
    bio: 'Rehabilitation specialist. I share evidence-based notes — not medical advice.',
    focus: [
      { icon: 'clipboardCheck', label: 'Clinical Insight', tone: 'secondary' },
      { icon: 'brain', label: 'Neuro Recovery', tone: 'primary' },
    ],
    stats: [['—', 'Verified'], ['—', '—'], ['—', '—']],
    posts: 36, replies: 218, supports: 2103,
    verified: true,
  },
};

// ─── INTEREST CATALOG ───────────────────────────────────────
// Selectable focus areas, grouped by category. Each item carries its slug,
// English + Hebrew labels (app is bilingual), an icon, and a category tone.
const INTEREST_CATALOG = [
  {
    category: 'Physical Recovery', tone: 'destructive',
    items: [
      { slug: 'rehabilitation',        en: 'Rehabilitation',         he: 'שיקום',            icon: 'activity' },
      { slug: 'physical-therapy',      en: 'Physical Therapy',       he: 'פיזיותרפיה',        icon: 'dumbbell' },
      { slug: 'occupational-therapy',  en: 'Occupational Therapy',   he: 'ריפוי בעיסוק',      icon: 'clipboardCheck' },
      { slug: 'mobility',              en: 'Mobility',               he: 'ניידות ותנועה',     icon: 'activity' },
      { slug: 'injury-recovery',       en: 'Injury Recovery',        he: 'החלמה מפציעה',      icon: 'heart' },
      { slug: 'surgery-recovery',      en: 'Surgery Recovery',       he: 'החלמה מניתוח',      icon: 'clipboardCheck' },
      { slug: 'chronic-pain',          en: 'Chronic Pain',           he: 'כאב כרוני',         icon: 'activity' },
      { slug: 'pain-management',       en: 'Pain Management',        he: 'ניהול כאב',         icon: 'activity' },
      { slug: 'neurological-recovery', en: 'Neurological Recovery',  he: 'שיקום נוירולוגי',   icon: 'brain' },
      { slug: 'strength-building',     en: 'Strength Building',      he: 'בניית כוח',         icon: 'dumbbell' },
    ],
  },
  {
    category: 'Wellness', tone: 'secondary',
    items: [
      { slug: 'nutrition',      en: 'Nutrition',        he: 'תזונה',          icon: 'leaf' },
      { slug: 'sleep',          en: 'Sleep & Rest',     he: 'שינה ומנוחה',    icon: 'moon' },
      { slug: 'healthy-habits', en: 'Healthy Habits',   he: 'הרגלים בריאים',  icon: 'check' },
      { slug: 'fitness',        en: 'Physical Fitness', he: 'כושר גופני',     icon: 'dumbbell' },
      { slug: 'self-care',      en: 'Self Care',        he: 'טיפול עצמי',     icon: 'heart' },
    ],
  },
  {
    category: 'Mental & Emotional', tone: 'accent',
    items: [
      { slug: 'mental-health',       en: 'Mental Health',       he: 'בריאות נפשית',  icon: 'brain' },
      { slug: 'emotional-wellbeing', en: 'Emotional Wellbeing', he: 'רווחה רגשית',   icon: 'smile' },
      { slug: 'stress-management',   en: 'Stress Management',   he: 'ניהול מתחים',   icon: 'activity' },
      { slug: 'mindfulness',         en: 'Mindfulness',         he: 'מיינדפולנס',    icon: 'sparkles' },
      { slug: 'meditation',          en: 'Meditation',          he: 'מדיטציה',       icon: 'leaf' },
      { slug: 'motivation',          en: 'Motivation',          he: 'מוטיבציה',      icon: 'flame' },
    ],
  },
  {
    category: 'Community & Support', tone: 'primary',
    items: [
      { slug: 'peer-support',       en: 'Peer Support',       he: 'תמיכת עמיתים',    icon: 'users' },
      { slug: 'disability-support', en: 'Disability Support', he: 'תמיכה במוגבלויות', icon: 'heart' },
      { slug: 'goal-progress',      en: 'Goals & Progress',   he: 'התקדמות ומטרות',  icon: 'target' },
    ],
  },
];

// Flat lookup: slug -> { ...item, tone }
const INTEREST_BY_SLUG = {};
INTEREST_CATALOG.forEach(g => g.items.forEach(it => { INTEREST_BY_SLUG[it.slug] = { ...it, tone: g.tone }; }));

function toneColor(t) {
  switch (t) {
    case 'primary':     return { bg: C.primaryLight,   fg: C.primary };
    case 'secondary':   return { bg: C.secondaryLight, fg: C.secondary };
    case 'accent':      return { bg: C.accentLight,    fg: C.accent };
    case 'destructive': return { bg: '#FEE2E2',        fg: C.destructive };
    default:            return { bg: C.muted,          fg: C.mutedFg };
  }
}

function ProfileScreen({ onNavigate, viewedAuthor }) {
  const { isMobile, isTablet } = useBreakpoint();
  // If a viewedAuthor was passed in, render the read-only author profile
  if (viewedAuthor) {
    return <AuthorProfileView author={viewedAuthor} onNavigate={onNavigate} />;
  }
  return <OwnProfile onNavigate={onNavigate} />;
}

// ─── AUTHOR PROFILE (view-only) ─────────────────────────────
function AuthorProfileView({ author, onNavigate }) {
  const p = AUTHOR_PROFILES[author] || {
    name: author, initials: (author || '?').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(),
    joined: 'Recently', level: 'Community Member', bio: '',
    focus: [], stats: [['—', 'Days'], ['—', 'Posts'], ['—', 'Replies']],
    posts: 0, replies: 0, supports: 0,
  };
  const [following, setFollowing] = React.useState(false);

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title={p.name} subtitle="Community member" onNavigate={onNavigate} />
      <div style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>

        {/* Back to community */}
        <button onClick={() => onNavigate('community')} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, padding: 0 }}
          onMouseEnter={(e) => e.currentTarget.style.color = C.primary}
          onMouseLeave={(e) => e.currentTarget.style.color = C.mutedFg}>
          ← Back to Community
        </button>

        {/* Hero card */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary}40)`, border: `4px solid ${C.primaryLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 32, color: C.primary }}>{p.initials}</span>
              </div>
              {p.verified && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', backgroundColor: C.secondary, border: `2px solid ${C.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={14} color="#fff" />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: C.foreground, margin: '0 0 4px' }}>{p.name}</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 10px' }}>Member since {p.joined}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 99, backgroundColor: p.verified ? C.secondaryLight : C.accentLight }}>
                <Icon name="award" size={14} color={p.verified ? C.secondary : C.accent} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: p.verified ? C.secondary : C.accent }}>{p.level}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setFollowing(f => !f)} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', background: following ? C.muted : `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: following ? C.foreground : '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                {following ? 'Following' : 'Follow'}
              </button>
              <button style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="messageSquare" size={14} color={C.foreground} /> Message
              </button>
            </div>
          </div>

          {/* Bio */}
          {p.bio && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.7, margin: '24px 0 0' }}>{p.bio}</p>
          )}
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { val: p.posts, label: 'Posts', icon: 'edit', tone: 'primary' },
            { val: p.replies, label: 'Replies', icon: 'messageSquare', tone: 'secondary' },
            { val: p.supports, label: 'Supports given', icon: 'heart', tone: 'destructive' },
          ].map(s => {
            const c = toneColor(s.tone);
            return (
              <div key={s.label} style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.icon} size={20} color={c.fg} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: C.foreground, margin: 0 }}>{s.val.toLocaleString ? s.val.toLocaleString() : s.val}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Focus Areas */}
        {p.focus && p.focus.length > 0 && (
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 4px' }}>Focus Areas</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 16px' }}>What {p.name.split(' ')[0]} is working on.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {p.focus.map(f => {
                const c = toneColor(f.tone);
                return (
                  <div key={f.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, backgroundColor: c.bg }}>
                    <Icon name={f.icon} size={16} color={c.fg} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: c.fg }}>{f.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Note: this is a view-only public profile. No editable fields, no settings. */}
      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── OWN PROFILE (editable with edit toggle) ────────────────
function OwnProfile({ onNavigate }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [prefs, setPrefs] = React.useState(['Morning Walks', 'Meditation', 'Yoga']);
  const availablePrefs = ['Morning Walks', 'Meditation', 'Yoga', 'Journaling', 'Swimming', 'Cycling', 'Reading'];
  const togglePref = (p) => isEditing && setPrefs(ps => ps.includes(p) ? ps.filter(x => x !== p) : [...ps, p]);

  const initialFields = {
    'Full Name': 'Alex Rivera',
    'Username': '@alexrivera',
    'Email': 'alex.rivera@email.com',
    'Date of Birth': 'March 15, 1990',
    'Location': 'San Francisco, CA',
    'Recovery Type': 'Injury & Mobility',
    'Care Provider': 'Dr. Chen, Bay Area PT',
  };
  const [fields, setFields] = React.useState(initialFields);
  const [draft, setDraft] = React.useState(initialFields);

  const initialBio = 'On a journey back to full mobility after a knee injury. Finding steadiness through daily therapy, mindful movement, and a calmer headspace. Here to learn and cheer others on.';
  const [bio, setBio] = React.useState(initialBio);
  const [bioDraft, setBioDraft] = React.useState(initialBio);

  // Selected focus-area slugs (chosen from INTEREST_CATALOG). Default to a sensible starter set.
  const [focusSlugs, setFocusSlugs] = React.useState(['pain-management', 'mental-health', 'mindfulness']);
  const toggleFocus = (slug) => isEditing && setFocusSlugs(s => s.includes(slug) ? s.filter(x => x !== slug) : [...s, slug]);

  const activeGoals = [
    { label: 'Physio Therapy', progress: 80 },
    { label: 'Daily Meditation', progress: 65 },
    { label: 'Sleep Hygiene', progress: 40 },
  ];

  const startEdit = () => { setDraft(fields); setBioDraft(bio); setIsEditing(true); };
  const cancelEdit = () => { setDraft(fields); setBioDraft(bio); setIsEditing(false); };
  const saveEdit = () => { setFields(draft); setBio(bioDraft); setIsEditing(false); };

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title="Profile" subtitle="Your recovery identity" onNavigate={onNavigate} />
      <div style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>

        {/* Edit / Done banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 20px', borderRadius: 12, backgroundColor: isEditing ? C.primaryLight : C.card, border: `1px solid ${isEditing ? C.primary + '40' : C.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: isEditing ? C.primary : C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={isEditing ? 'edit' : 'eye'} size={16} color={isEditing ? '#fff' : C.mutedFg} />
            </div>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: 0 }}>
                {isEditing ? 'Editing your profile' : 'Viewing your profile'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>
                {isEditing ? 'Tap fields below to make changes. Don\u2019t forget to save.' : 'Switch to edit mode to update your details.'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {isEditing ? (
              <>
                <button onClick={cancelEdit} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
                <button onClick={saveEdit} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check" size={14} color="#fff" /> Save changes
                </button>
              </>
            ) : (
              <button onClick={startEdit} style={{ padding: '8px 18px', borderRadius: 8, border: `1px solid ${C.primary}`, backgroundColor: C.card, color: C.primary, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="edit" size={14} color={C.primary} /> Edit profile
              </button>
            )}
          </div>
        </div>

        {/* Top Row — User Card (1/3) + Basic Info (2/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 16 : 24 }}>
          {/* User Profile Card */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary}40)`, border: `4px solid ${C.primaryLight}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 32, color: C.primary }}>AR</span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', backgroundColor: isEditing ? C.primary : C.success, border: `2px solid ${C.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isEditing ? 'pointer' : 'default' }}>
                <Icon name={isEditing ? 'camera' : 'check'} size={14} color="#fff" />
              </div>
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 20, color: C.foreground, margin: '0 0 4px' }}>{fields['Full Name']}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 12px' }}>Member since Oct 2023</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
              {[['142', 'Days'], ['15', 'Milestones Completed'], ['6', 'Active Goals']].map(([val, label]) => (
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
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', columnGap: 28, rowGap: 16 }}>
              {Object.entries(fields).map(([label, val]) => (
                <div key={label} style={isEditing ? {} : { paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: C.mutedFg, letterSpacing: '0.07em', display: 'block', marginBottom: isEditing ? 6 : 3, textTransform: 'uppercase' }}>{label}</label>
                  {isEditing ? (
                    <input
                      value={draft[label]}
                      onChange={e => setDraft({ ...draft, [label]: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${C.border}`, borderRadius: 8, outline: 'none', backgroundColor: C.bg, boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = C.primary}
                      onBlur={e => e.target.style.borderColor = C.border} />
                  ) : (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: C.foreground, margin: 0 }}>{val}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About / Bio */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isEditing ? 14 : 12 }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: 0 }}>About</h3>
            {isEditing && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: bioDraft.length > 280 ? C.destructive : C.mutedFg }}>{bioDraft.length} / 280</span>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={bioDraft}
              onChange={e => setBioDraft(e.target.value.slice(0, 280))}
              rows={4}
              placeholder="Share a little about your recovery journey…"
              style={{ width: '100%', padding: '12px 14px', fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: C.foreground, border: `1px solid ${C.border}`, borderRadius: 10, outline: 'none', backgroundColor: C.bg, boxSizing: 'border-box', resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = C.border} />
          ) : bio ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.7, margin: 0 }}>{bio}</p>
          ) : (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, fontStyle: 'italic', margin: 0 }}>No bio yet. Switch to edit mode to add one.</p>
          )}
        </div>

        {/* Recovery Identity */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 4px' }}>Recovery Identity</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 20px' }}>
            {isEditing ? 'Core Focus Areas — tap to add or remove the areas you\u2019re working on.' : 'Core Focus Areas'}
          </p>

          {isEditing ? (
            /* EDIT MODE: grouped, selectable interest catalog */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 20 }}>
              {INTEREST_CATALOG.map(group => {
                const c = toneColor(group.tone);
                return (
                  <div key={group.category}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c.fg }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: C.mutedFg, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group.category}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {group.items.map(it => {
                        const sel = focusSlugs.includes(it.slug);
                        return (
                          <button key={it.slug} onClick={() => toggleFocus(it.slug)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 99, border: `1.5px solid ${sel ? c.fg : C.border}`, backgroundColor: sel ? c.bg : C.card, cursor: 'pointer', transition: 'all 0.15s' }}>
                            <Icon name={it.icon} size={15} color={sel ? c.fg : C.mutedFg} />
                            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: sel ? c.fg : C.mutedFg }}>{it.en}</span>
                            {sel && <Icon name="check" size={13} color={c.fg} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW MODE: selected focus areas as chips */
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {focusSlugs.length === 0 && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, fontStyle: 'italic', margin: 0 }}>No focus areas selected yet. Switch to edit mode to choose some.</p>
              )}
              {focusSlugs.map(slug => {
                const it = INTEREST_BY_SLUG[slug];
                if (!it) return null;
                const c = toneColor(it.tone);
                return (
                  <div key={slug} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, backgroundColor: c.bg }}>
                    <Icon name={it.icon} size={16} color={c.fg} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: c.fg }}>{it.en}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ backgroundColor: C.muted, borderRadius: 12, padding: 16 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, margin: 0 }}>
              "My goal is to regain physical mobility through consistent therapy while maintaining a calm, focused mindset during stressful transitions."
            </p>
          </div>
        </div>

        {/* Bottom Row — Activity Preferences (2/3) + Active Goals (1/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 16 : 24 }}>
          {/* Daily Activity Preferences */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 6px' }}>Daily Activity Preferences</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 16px' }}>
              {isEditing ? "Tap to add or remove. We'll personalize your suggestions." : 'Activities you enjoy.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(isEditing ? availablePrefs : prefs).map(p => {
                const sel = prefs.includes(p);
                return (
                  <button key={p} onClick={() => togglePref(p)} disabled={!isEditing} style={{ padding: '8px 16px', borderRadius: 99, border: `1.5px solid ${sel ? C.primary : C.border}`, backgroundColor: sel ? C.primaryLight : C.card, fontFamily: 'Inter, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: sel ? C.primary : C.mutedFg, cursor: isEditing ? 'pointer' : 'default', transition: 'all 0.15s' }}>
                    {isEditing && sel && <span style={{ marginRight: 4 }}>+</span>}{p}
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
          </div>
        </div>

      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { ProfileScreen });
