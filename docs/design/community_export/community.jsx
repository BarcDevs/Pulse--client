// community.jsx — Community feed + post detail
// ─── COMMUNITY ───────────────────────────────────────────────
function CommunityScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('Popular');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [tagFilter, setTagFilter] = React.useState(null);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [likes, setLikes] = React.useState({});
  const [newPostOpen, setNewPostOpen] = React.useState(false);
  const [newPostTitle, setNewPostTitle] = React.useState('');
  const [newPostContent, setNewPostContent] = React.useState('');
  const [newPostCategory, setNewPostCategory] = React.useState('discussion');
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [newPostTags, setNewPostTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState('');
  const [touched, setTouched] = React.useState({});
  const markTouched = (f) => setTouched(t => ({ ...t, [f]: true }));

  // Field-level errors. Returns a string if invalid, otherwise null.
  const errors = {
    title:    !newPostTitle.trim()    ? 'Give your post a title so people know what it’s about.' : null,
    content:  !newPostContent.trim()  ? 'Add a few words — even a sentence helps others respond.' : null,
    category: !newPostCategory        ? 'Pick a category for this conversation.' : null,
    tags:     newPostTags.length < 1  ? 'Add at least one tag so the right people find this.'
            : newPostTags.length > 5  ? 'You can only add up to 5 tags.' : null,
  };
  const showErr = (field) => (touched[field] && errors[field]) ? errors[field] : null;

  // High-level conversation types (category = required, single-select via dropdown)
  const CATEGORIES = [
    { id: 'recovery',    label: 'Recovery Journey',            desc: 'Milestones, setbacks, progress stories' },
    { id: 'therapy',     label: 'Therapy & Physical Recovery', desc: 'Physical therapy, exercises, sessions' },
    { id: 'mental',      label: 'Mental & Emotional Wellbeing',desc: 'Mood, stress, motivation, mindset' },
    { id: 'milestones',  label: 'Goals & Progress',            desc: 'Recovery goals and milestones' },
    { id: 'lifestyle',   label: 'Lifestyle & Daily Wellness',  desc: 'Sleep, nutrition, routines' },
    { id: 'support',     label: 'Community Support',           desc: 'Encouragement and peer connection' },
    { id: 'questions',   label: 'Questions & Guidance',        desc: 'Ask the community for input' },
    { id: 'stories',     label: 'Recovery Stories',            desc: 'Share your full experience' },
    { id: 'discussion',  label: 'Open Discussion',             desc: 'Anything else recovery-related' },
  ];

  // Curated tag suggestions — specific subject tags users can pick from.
  const TAG_SUGGESTIONS = [
    'fracture', 'surgery', 'spinal-injury', 'stroke', 'chronic-pain', 'mobility',
    'recovery-journey', 'physical-therapy', 'occupational-therapy',
    'exercise', 'stretching', 'walking', 'pain-management',
    'anxiety', 'motivation', 'burnout', 'loneliness', 'frustration', 'confidence',
    'sleep', 'nutrition', 'mindfulness',
    'family-support', 'routines', 'work-return',
    'success-story', 'advice', 'beginner-question',
  ];

  const addTag = (t) => {
    const clean = t.trim().toLowerCase().replace(/^#/, '').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!clean) return;
    if (newPostTags.includes(clean)) return;
    if (newPostTags.length >= 5) return;
    setNewPostTags([...newPostTags, clean]);
    setTagInput('');
  };
  const removeTag = (t) => setNewPostTags(newPostTags.filter(x => x !== t));

  const resetComposer = () => {
    setNewPostOpen(false); setCategoryOpen(false);
    setNewPostTitle(''); setNewPostContent('');
    setNewPostCategory('discussion'); setNewPostTags([]); setTagInput('');
    setTouched({});
  };

  const handlePostSubmit = () => {
    if (Object.values(errors).some(Boolean)) {
      setTouched({ title: true, content: true, category: true, tags: true });
      return;
    }
    resetComposer();
  };

  const canPost = !Object.values(errors).some(Boolean);
  const tagSuggestions = tagInput
    ? TAG_SUGGESTIONS.filter(t => t.includes(tagInput.toLowerCase()) && !newPostTags.includes(t)).slice(0, 6)
    : TAG_SUGGESTIONS.filter(t => !newPostTags.includes(t)).slice(0, 6);
  const [openPost, setOpenPost] = React.useState(null);

  const tabs = ['Popular', 'Recent', 'Unanswered'];

  const postsData = [
    { id: 1, category: 'recovery', tags: ['recovery-journey', 'mindfulness', 'routines'], author: 'Marcus T.', timeAgo: '3 hours ago', title: 'My first 90 days: Finding peace in the routine of early mornings.', content: "I used to dread the sunrise because it meant another day of struggle. Now, my 5 AM tea and meditation are the anchor of my day. If you're in the first...", votes: 47, replies: 18, hasMedia: false },
    { id: 2, category: 'support', tags: ['anxiety', 'family-support', 'advice'], author: 'Sarah Jenkins', timeAgo: '5 hours ago', title: "Managing social anxiety during family gatherings this weekend", content: "Does anyone have tips for navigating conversations about 'why I'm not drinking' with pushy relatives? Feeling a bit nervous about the upcoming...", votes: 123, replies: 42, hasMedia: false },
    { id: 3, category: 'therapy', tags: ['stretching', 'physical-therapy', 'chronic-pain'], author: 'YogaCoach_Ben', timeAgo: '8 hours ago', title: 'Gentle 10-minute flow for releasing neck tension.', content: '', votes: 89, replies: 24, hasMedia: true },
  ];

  const [replyText, setReplyText] = React.useState('');
  const [replyOpen, setReplyOpen] = React.useState(false);
  const [replies, setReplies] = React.useState({
    1: [
      { id: 2, author: 'Dr. Rivera', initials: 'DR', bg: C.secondary, text: 'This is a beautiful example of building a recovery identity. The routine is key to neurological re-patterning.', timeAgo: '1 hour ago', verified: true },
      { id: 1, author: 'Sarah Jenkins', initials: 'SJ', bg: C.primary, text: "Thank you for sharing this. The 5 AM routine really resonates - I've been trying to make mornings my anchor too.", timeAgo: '2 hours ago' },
    ],
    2: [
      { id: 1, author: 'Marcus T.', initials: 'MT', bg: C.accent, text: "I've been there. I just say 'I'm not drinking tonight' without explaining. Most people respect it.", timeAgo: '4 hours ago' },
    ],
    3: [],
  });

  const toggleLike = (id) => setLikes(l => ({ ...l, [id]: !l[id] }));
  const getCount = (post) => post.votes + (likes[post.id] ? 1 : 0);

  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };
  const [saved, setSaved] = React.useState({});
  const toggleSave = (id) => {
    setSaved(s => {
      const next = { ...s, [id]: !s[id] };
      showToast(next[id] ? 'Saved to your bookmarks' : 'Removed from saved');
      return next;
    });
  };
  const applyTagFilter = (t) => {
    setTagFilter(t);
    showToast(`Filtered by #${t}`);
  };
  const sharePost = async (post) => {
    const url = `https://pulse.app/community/${post.id}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      }
      showToast('Link copied to clipboard');
    } catch (e) { showToast('Could not copy link'); }
  };

  // Color swatch per category id — used for chips on posts AND the filter strip.
  const CATEGORY_COLORS = {
    recovery:   { bg: '#F3E8FF', text: '#7e22ce' },
    therapy:    { bg: '#D1FAE5', text: '#065f46' },
    mental:     { bg: '#FCE7F3', text: '#be185d' },
    milestones: { bg: '#FEF3C7', text: '#a16207' },
    lifestyle:  { bg: '#E0F2FE', text: '#0369a1' },
    support:    { bg: '#DBEAFE', text: '#1d4ed8' },
    questions:  { bg: '#FFE4E6', text: '#be123c' },
    stories:    { bg: '#EDE9FE', text: '#5b21b6' },
    discussion: { bg: '#E2E8F0', text: '#334155' },
  };
  const getCategoryLabel = (id) => (CATEGORIES.find(c => c.id === id)?.label) || id;
  const getCategoryColors = (id) => CATEGORY_COLORS[id] || { bg: C.muted, text: C.mutedFg };

  const filteredPosts = postsData.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (tagFilter && !(p.tags || []).includes(tagFilter)) return false;
    return true;
  });

  const mentors = [
    { name: 'David Chen', role: 'Certified Coach', avatar: 'D', online: true },
    { name: 'Maria G.', role: 'Wellness Guide', avatar: 'M', online: false },
  ];

  const trendingTopics = ['DailyGratitude', 'SobrietyTips', 'HealthyHabits', 'SelfCare', 'SleepHygiene'];

  const submitReply = (postId) => {
    if (!replyText.trim()) return;
    setReplies(r => ({ ...r, [postId]: [{ id: Date.now(), author: 'Alex Rivera', initials: 'AR', bg: C.primaryGradStart, text: replyText.trim(), timeAgo: 'just now' }, ...(r[postId] || [])] }));
    setReplyText('');
    setReplyOpen(false);
  };

  // ── Post detail view ──────────────────────────────────────
  if (openPost) {
    const post = postsData.find(p => p.id === openPost);
    const postReplies = replies[openPost] || [];
    return (
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
        {toast && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1a2b3c', color: '#fff', padding: '10px 18px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="check" size={14} color="#10b981" /> {toast}
          </div>
        )}
        <TopBar title="Community" subtitle="Connect with others on their recovery journey" onNavigate={onNavigate} />
        <div style={{ display: 'flex', gap: 24, padding: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Back */}
            <button onClick={() => setOpenPost(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.primary, padding: 0, alignSelf: 'flex-start' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Community
            </button>

            {/* Post body */}
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ padding: '3px 12px', borderRadius: 99, fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif', backgroundColor: getCategoryColors(post.category).bg, color: getCategoryColors(post.category).text }}>{getCategoryLabel(post.category)}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>Posted by <strong style={{ color: C.foreground }}>{post.author}</strong> - {post.timeAgo}</span>
              </div>
              <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: C.foreground, margin: '0 0 14px', lineHeight: 1.35 }}>{post.title}</h1>
              {post.content && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.8, margin: '0 0 20px' }}>{post.content} And so every morning now is a gift I give myself - a quiet hour before the world wakes up where I can just be.</p>}
              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '0 0 20px' }}>
                  {post.tags.map(t => (
                    <button key={t} onClick={() => { applyTagFilter(t); setOpenPost(null); }} style={{ padding: '4px 12px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: 'transparent', color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.color = C.primary; e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.backgroundColor = C.primaryLight; }}
                      onMouseLeave={e => { e.currentTarget.style.color = C.mutedFg; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
              {post.hasMedia && (
                <div style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: C.muted, aspectRatio: '16/9', maxHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: C.primary + 'E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderLeft: '22px solid #fff', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 5 }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 14, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '3px 10px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#fff' }}>10:24</div>
                </div>
              )}
              {/* Vote + actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                {(() => {
                  const isLiked = !!likes[post.id];
                  const n = getCount(post);
                  return (
                    <button
                      onClick={() => toggleLike(post.id)}
                      aria-pressed={isLiked}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        backgroundColor: isLiked ? '#FEE2E2' : C.muted,
                        color: isLiked ? C.destructive : C.mutedFg,
                        border: 'none', borderRadius: 99, padding: '6px 14px',
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                        transition: 'background-color 0.15s',
                      }}
                    >
                      <Icon name="heart" size={15} color="currentColor" />
                      <span>{n}</span>
                      <span style={{ fontWeight: 500 }}>Showed support</span>
                    </button>
                  );
                })()}
                {[
                  { icon: 'share2', label: 'Share', onClick: () => sharePost(post), active: false },
                  { icon: 'bookmark', label: saved[post.id] ? 'Saved' : 'Save', onClick: () => toggleSave(post.id), active: !!saved[post.id] },
                ].map(({ icon, label, onClick, active }) => (
                  <button key={label} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif', fontSize: 13, color: active ? C.primary : C.mutedFg, fontWeight: active ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.foreground; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.mutedFg; }}>
                    <Icon name={icon} size={16} color="currentColor" /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Replies */}
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 16px' }}>{postReplies.length} {postReplies.length === 1 ? 'Reply' : 'Replies'}</h4>

              {/* Reply CTA or expanded form */}
              <div style={{ paddingBottom: 20, marginBottom: postReplies.length > 0 ? 4 : 0, borderBottom: postReplies.length > 0 ? `1px solid ${C.border}` : 'none' }}>
                {!replyOpen ? (
                  <button
                    onClick={() => setReplyOpen(true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                      padding: '12px 16px', borderRadius: 10,
                      border: `1px solid ${C.border}`, backgroundColor: C.card,
                      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      transition: 'border-color 0.15s, background-color 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.backgroundColor = C.primaryLight + '40'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.card; }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: C.primary }}>AR</span>
                    </div>
                    <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>Write a supportive reply…</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13 }}>
                      <Icon name="messageSquare" size={13} color="#fff" /> Reply
                    </span>
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: C.primary }}>AR</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <textarea autoFocus value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a supportive reply..."
                        style={{ width: '100%', minHeight: 96, padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6, transition: 'border-color 0.15s' }}
                        onFocus={e => e.target.style.borderColor = C.primary}
                        onBlur={e => e.target.style.borderColor = C.border} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                        <button onClick={() => { setReplyOpen(false); setReplyText(''); }} style={{ padding: '9px 18px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                          Cancel
                        </button>
                        <button onClick={() => submitReply(post.id)} disabled={!replyText.trim()} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: replyText.trim() ? `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted, color: replyText.trim() ? '#fff' : C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: replyText.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}>
                          Post Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {postReplies.length === 0 && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, margin: '8px 0 0' }}>No replies yet. Be the first to respond!</p>
              )}
              {/* Sorted newest → oldest */}
              {postReplies.map((reply, i) => (
                <div key={reply.id} style={{ display: 'flex', gap: 12, padding: '16px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: reply.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#fff' }}>{reply.initials}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground }}>{reply.author}</span>
                      {reply.verified && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: C.secondary, backgroundColor: C.secondaryLight, padding: '1px 6px', borderRadius: 4 }}>PRO</span>}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>{reply.timeAgo}</span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, lineHeight: 1.7, margin: 0 }}>{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar (reused) */}
          <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 14px' }}>Recovery Mentors</h4>
              {mentors.map((mentor, i) => (
                <div key={mentor.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: i === 0 ? '0 0 12px' : '12px 0 0', borderTop: i > 0 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.primary }}>{mentor.avatar}</span>
                      </div>
                      {mentor.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', backgroundColor: C.success, border: `2px solid ${C.card}` }} />}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.foreground, margin: 0 }}>{mentor.name}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{mentor.role}</p>
                    </div>
                  </div>
                  <button style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: C.foreground, cursor: 'pointer' }}>Chat</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1a2b3c', color: '#fff', padding: '10px 18px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="check" size={14} color="#10b981" /> {toast}
        </div>
      )}
      <TopBar title="Community" subtitle="Connect with others on their recovery journey" onNavigate={onNavigate} />
      <div style={{ display: 'flex', gap: 24, padding: 24, alignItems: 'flex-start' }}>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Search + new post */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <Icon name="search" size={16} color={C.mutedFg} />
              </div>
              <input placeholder="Search discussions..." style={{ width: '100%', padding: '9px 12px 9px 38px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${C.border}`, borderRadius: 10, outline: 'none', backgroundColor: C.card, boxSizing: 'border-box' }} />
            </div>
            <button onClick={() => setNewPostOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
              <Icon name="plus" size={14} color="#fff" /> New Post
            </button>
          </div>

          {newPostOpen && (
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: `1.5px solid ${C.primary}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 2px' }}>Share with the community</h4>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>Pick a category and a few tags so the right people can find it.</p>
                </div>
                <button onClick={resetComposer} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="close" size={16} color={C.mutedFg} /></button>
              </div>

              <input value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} onBlur={() => markTouched('title')} placeholder="Post title…"
                style={{ width: '100%', padding: '11px 14px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${showErr('title') ? C.destructive : C.border}`, borderRadius: 8, outline: 'none', boxSizing: 'border-box', marginBottom: showErr('title') ? 4 : 12 }} />
              {showErr('title') && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('title')}
                </p>
              )}

              <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)} onBlur={() => markTouched('content')} placeholder="Share your story, ask a question, or offer encouragement…"
                style={{ width: '100%', minHeight: 100, padding: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${showErr('content') ? C.destructive : C.border}`, borderRadius: 8, outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: showErr('content') ? 4 : 18 }} />
              {showErr('content') && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('content')}
                </p>
              )}

              {/* Category — required, single select via dropdown */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.foreground, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Category <span style={{ color: C.destructive, fontWeight: 600 }}>*</span></label>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>What type of conversation is this?</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => { setCategoryOpen(o => !o); markTouched('category'); }}
                    onBlur={() => markTouched('category')}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      backgroundColor: C.card,
                      border: `1px solid ${showErr('category') ? C.destructive : categoryOpen ? C.primary : C.border}`,
                      boxSizing: 'border-box',
                    }}>
                    {(() => {
                      const cat = CATEGORIES.find(c => c.id === newPostCategory);
                      return cat ? (
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.foreground, margin: '0 0 2px' }}>{cat.label}</p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.desc}</p>
                        </div>
                      ) : (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>Choose a category…</span>
                      );
                    })()}
                    <Icon name={categoryOpen ? 'chevronUp' : 'chevronDown'} size={16} color={C.mutedFg} />
                  </button>

                  {categoryOpen && (
                    <div role="listbox" style={{
                      position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20,
                      backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                      maxHeight: 320, overflowY: 'auto', padding: 4,
                    }}>
                      {CATEGORIES.map(cat => {
                        const selected = newPostCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => { setNewPostCategory(cat.id); setCategoryOpen(false); }}
                            style={{
                              width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10,
                              padding: '10px 12px', textAlign: 'left', borderRadius: 7,
                              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                              backgroundColor: selected ? C.primaryLight : 'transparent',
                            }}
                            onMouseEnter={e => { if (!selected) e.currentTarget.style.backgroundColor = C.muted; }}
                            onMouseLeave={e => { if (!selected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                          >
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 600, color: selected ? C.primary : C.foreground, margin: '0 0 2px' }}>{cat.label}</p>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
                            </div>
                            {selected && <Icon name="check" size={15} color={C.primary} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {showErr('category') && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('category')}
                  </p>
                )}
              </div>

              {/* Tags — 1–5 required, autocomplete */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.foreground, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tags <span style={{ color: C.destructive, fontWeight: 600 }}>*</span></label>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: newPostTags.length >= 1 && newPostTags.length <= 5 ? C.mutedFg : C.destructive }}>{newPostTags.length}/5 · add 1–5 specific topics</span>
                </div>

                <div style={{ border: `1px solid ${showErr('tags') ? C.destructive : C.border}`, borderRadius: 10, padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', minHeight: 44, marginBottom: 10 }}>
                  {newPostTags.map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 4px 4px 10px', borderRadius: 99, backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600 }}>
                      {t}
                      <button type="button" onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.primary }}>
                        <Icon name="close" size={12} color="currentColor" />
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ',' || e.key === ' ') && tagInput.trim()) {
                        e.preventDefault(); addTag(tagInput);
                      } else if (e.key === 'Backspace' && !tagInput && newPostTags.length) {
                        removeTag(newPostTags[newPostTags.length - 1]);
                      }
                    }}
                    placeholder={newPostTags.length === 0 ? 'Type a topic, e.g. fracture, anxiety, meditation…' : newPostTags.length < 5 ? 'Add another…' : 'Max 5 tags'}
                    disabled={newPostTags.length >= 5}
                    onBlur={() => markTouched('tags')}
                    style={{ flex: 1, minWidth: 140, border: 'none', outline: 'none', padding: '6px 4px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, background: 'transparent' }}
                  />
                </div>

                {newPostTags.length < 5 && tagSuggestions.length > 0 && (
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: '0 0 6px' }}>{tagInput ? 'Suggestions' : 'Popular topics'}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {tagSuggestions.map(t => (
                        <button key={t} type="button" onClick={() => addTag(t)} style={{ padding: '5px 12px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, cursor: 'pointer' }}>
                          + {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {showErr('tags') && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('tags')}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                <button onClick={resetComposer} style={{ padding: '9px 18px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.mutedFg, cursor: 'pointer' }}>Cancel</button>
                <button
                  onClick={handlePostSubmit}
                  style={{
                    padding: '9px 22px', borderRadius: 8, border: 'none',
                    background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`,
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
                    color: '#fff', cursor: 'pointer',
                  }}>
                  Post
                </button>
              </div>
            </div>
          )}

          {/* Posts card */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            {/* Tabs row + category filter button */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', flex: 1 }}>
                {tabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '14px 24px', fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === tab ? C.primary : C.mutedFg, borderBottom: activeTab === tab ? `2px solid ${C.primary}` : '2px solid transparent', marginBottom: -1 }}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Category filter — compact dropdown */}
              <div style={{ position: 'relative', padding: '8px 12px' }}>
                {(() => {
                  const activeCat = categoryFilter === 'all' ? null : CATEGORIES.find(c => c.id === categoryFilter);
                  const activeColors = activeCat ? getCategoryColors(activeCat.id) : null;
                  return (
                    <button
                      onClick={() => setFilterOpen(o => !o)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '7px 12px', borderRadius: 8,
                        border: `1px solid ${filterOpen ? C.primary : C.border}`,
                        backgroundColor: activeCat ? activeColors.bg : C.card,
                        color: activeCat ? activeColors.text : C.foreground,
                        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                      {activeCat ? activeCat.label : 'All categories'}
                      <Icon name={filterOpen ? 'chevronUp' : 'chevronDown'} size={14} color="currentColor" />
                    </button>
                  );
                })()}

                {filterOpen && (
                  <>
                    <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
                    <div role="listbox" style={{
                      position: 'absolute', top: 'calc(100% + 4px)', right: 12, zIndex: 20,
                      width: 280,
                      backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                      maxHeight: 380, overflowY: 'auto', padding: 6,
                    }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.mutedFg, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 10px 6px', margin: 0 }}>Filter by category</p>
                      {[{ id: 'all', label: 'All categories', desc: 'Show every post' }, ...CATEGORIES].map(cat => {
                        const selected = categoryFilter === cat.id;
                        const colors = cat.id === 'all' ? null : getCategoryColors(cat.id);
                        const count = cat.id === 'all' ? postsData.length : postsData.filter(p => p.category === cat.id).length;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => { setCategoryFilter(cat.id); setFilterOpen(false); }}
                            style={{
                              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                              padding: '9px 10px', textAlign: 'left', borderRadius: 8,
                              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                              backgroundColor: selected ? C.primaryLight : 'transparent',
                            }}
                            onMouseEnter={e => { if (!selected) e.currentTarget.style.backgroundColor = C.muted; }}
                            onMouseLeave={e => { if (!selected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                          >
                            {colors ? (
                              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: colors.text, flexShrink: 0 }} />
                            ) : (
                              <span style={{ width: 10, height: 10, borderRadius: 3, border: `1.5px solid ${C.mutedFg}`, flexShrink: 0 }} />
                            )}
                            <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: selected ? C.primary : C.foreground }}>{cat.label}</span>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>{count}</span>
                            {selected && <Icon name="check" size={14} color={C.primary} />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Active tag filter pill */}
            {tagFilter && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderBottom: `1px solid ${C.border}`, backgroundColor: C.muted + '50' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tag</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 4px 4px 12px', borderRadius: 99, backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600 }}>
                  {tagFilter}
                  <button onClick={() => setTagFilter(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: C.primary, borderRadius: '50%' }} aria-label="Clear tag filter">
                    <Icon name="close" size={12} color="currentColor" />
                  </button>
                </span>
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: C.muted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <Icon name="messageSquare" size={22} color={C.mutedFg} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.foreground, margin: '0 0 4px' }}>No posts match these filters yet</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>{tagFilter ? `Try removing the ${tagFilter} tag or` : 'Try'} picking a different category.</p>
              </div>
            )}
            {filteredPosts.map((post, i) => (
              <div key={post.id} onClick={() => setOpenPost(post.id)} style={{ padding: 24, borderTop: i === 0 ? 'none' : `1px solid ${C.border}`, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.muted + '50'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ padding: '2px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif', backgroundColor: getCategoryColors(post.category).bg, color: getCategoryColors(post.category).text }}>{getCategoryLabel(post.category)}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>Posted by {post.author} - {post.timeAgo}</span>
                      {(() => {
                        const n = getCount(post);
                        return (
                          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>
                            <Icon name="heart" size={13} color={C.destructive} />
                            <span><strong style={{ color: C.foreground, fontWeight: 600 }}>{n}</strong> showed support</span>
                          </span>
                        );
                      })()}
                    </div>
                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 6px' }}>{post.title}</h3>
                    {post.content && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content}</p>}
                    {post.hasMedia && (
                      <div style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: C.muted, aspectRatio: '16/9', maxHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative' }}>
                        <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: C.primary + 'E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 0, height: 0, borderLeft: '18px solid #fff', borderTop: '11px solid transparent', borderBottom: '11px solid transparent', marginLeft: 4 }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: 8, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '2px 8px', fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#fff' }}>10:24</div>
                      </div>
                    )}
                    {(post.tags || []).length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                        {post.tags.map(t => (
                          <button key={t} onClick={(e) => { e.stopPropagation(); applyTagFilter(t); }} style={{ padding: '3px 10px', borderRadius: 99, border: `1px solid ${tagFilter === t ? C.primary : C.border}`, backgroundColor: tagFilter === t ? C.primaryLight : 'transparent', color: tagFilter === t ? C.primary : C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                      {[
                        { icon: 'messageSquare', label: post.replies + ' replies', onClick: (e) => { e.stopPropagation(); setOpenPost(post.id); }, active: false },
                        { icon: 'share2', label: 'Share', onClick: (e) => { e.stopPropagation(); sharePost(post); }, active: false },
                        { icon: 'bookmark', label: saved[post.id] ? 'Saved' : 'Save', onClick: (e) => { e.stopPropagation(); toggleSave(post.id); }, active: !!saved[post.id] },
                      ].map(({ icon, label, onClick, active }) => (
                        <button key={label} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif', fontSize: 12, color: active ? C.primary : C.mutedFg, fontWeight: active ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.foreground; }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.mutedFg; }}>
                          <Icon name={icon} size={15} color="currentColor" /> {label}
                        </button>
                      ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar — matches CommunitySidebar.tsx */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Recovery Mentors */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 14px' }}>Recovery Mentors</h4>
            {mentors.map((mentor, i) => (
              <div key={mentor.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: i === 0 ? '0 0 12px' : '12px 0 0', borderTop: i > 0 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.primary }}>{mentor.avatar}</span>
                    </div>
                    {mentor.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', backgroundColor: C.success, border: `2px solid ${C.card}` }} />}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.foreground, margin: 0 }}>{mentor.name}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{mentor.role}</p>
                  </div>
                </div>
                <button style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: C.foreground, cursor: 'pointer' }}>Chat</button>
              </div>
            ))}
          </div>

          {/* Community Sanctuary */}
          <div style={{ borderRadius: 16, backgroundColor: C.primaryLight + '60', border: `1px solid ${C.primary}30`, padding: 20 }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 8px' }}>Community Sanctuary</h4>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 14px', lineHeight: 1.6 }}>Pulse is a safe, non-judgmental space. We prioritize empathy, privacy, and supportive dialogue.</p>
            {[
              { icon: 'shield', text: 'Be kind and be open' },
              { icon: 'lock', text: 'No unsolicited medical advice' },
              { icon: 'user', text: 'Protect user anonymity' },
            ].map(rule => (
              <div key={rule.text} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon name={rule.icon} size={15} color={C.secondary} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>{rule.text}</span>
              </div>
            ))}
            <button style={{ marginTop: 8, width: '100%', padding: '8px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.foreground, cursor: 'pointer' }}>Read Guidelines</button>
          </div>

          {/* Trending Topics */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 14px' }}>Trending Topics</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {trendingTopics.map(topic => (
                <button key={topic} style={{ padding: '6px 12px', borderRadius: 99, backgroundColor: C.muted, fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = C.primary; e.currentTarget.style.backgroundColor = C.primaryLight; }}
                  onMouseLeave={e => { e.currentTarget.style.color = C.mutedFg; e.currentTarget.style.backgroundColor = C.muted; }}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { CommunityScreen });
