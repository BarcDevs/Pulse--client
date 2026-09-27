// community.jsx — Community feed + post detail
// ─── COMMUNITY ───────────────────────────────────────────────
function CommunityScreen({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [activeTab, setActiveTab] = React.useState('Popular');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [tagFilter, setTagFilter] = React.useState(null);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const filterBtnRef = React.useRef(null);
  const [filterPos, setFilterPos] = React.useState(null);
  const postFormRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (!filterOpen || !filterBtnRef.current) return;
    const update = () => {
      const r = filterBtnRef.current.getBoundingClientRect();
      setFilterPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [filterOpen]);
  const [likes, setLikes] = React.useState({});
  const [newPostOpen, setNewPostOpen] = React.useState(false);
  const [newPostTitle, setNewPostTitle] = React.useState('');
  const [newPostContent, setNewPostContent] = React.useState('');
  const [newPostCategory, setNewPostCategory] = React.useState('discussion');
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [newPostTags, setNewPostTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState('');
  const [touched, setTouched] = React.useState({});
  const markTouched = (f) => setTouched((t) => ({ ...t, [f]: true }));

  // Field-level errors. Returns a string if invalid, otherwise null.
  const errors = {
    title: !newPostTitle.trim() ? 'Give your post a title so people know what it’s about.' : null,
    content: !newPostContent.trim() ? 'Add a few words — even a sentence helps others respond.' : null,
    category: !newPostCategory ? 'Pick a category for this conversation.' : null,
    tags: newPostTags.length < 1 ? 'Add at least one tag so the right people find this.' :
    newPostTags.length > 5 ? 'You can only add up to 5 tags.' : null
  };
  const showErr = (field) => touched[field] && errors[field] ? errors[field] : null;

  // High-level conversation types (category = required, single-select via dropdown)
  const CATEGORIES = [
  { id: 'recovery', label: 'Recovery Journey', desc: 'Milestones, setbacks, progress stories' },
  { id: 'therapy', label: 'Therapy & Physical Recovery', desc: 'Physical therapy, exercises, sessions' },
  { id: 'mental', label: 'Mental & Emotional Wellbeing', desc: 'Mood, stress, motivation, mindset' },
  { id: 'milestones', label: 'Goals & Progress', desc: 'Recovery goals and milestones' },
  { id: 'lifestyle', label: 'Lifestyle & Daily Wellness', desc: 'Sleep, nutrition, routines' },
  { id: 'support', label: 'Community Support', desc: 'Encouragement and peer connection' },
  { id: 'questions', label: 'Questions & Guidance', desc: 'Ask the community for input' },
  { id: 'stories', label: 'Recovery Stories', desc: 'Share your full experience' },
  { id: 'discussion', label: 'Open Discussion', desc: 'Anything else recovery-related' }];


  // Curated tag suggestions — specific subject tags users can pick from.
  const TAG_SUGGESTIONS = [
  'fracture', 'surgery', 'spinal-injury', 'stroke', 'chronic-pain', 'mobility',
  'recovery-journey', 'physical-therapy', 'occupational-therapy',
  'exercise', 'stretching', 'walking', 'pain-management',
  'anxiety', 'motivation', 'burnout', 'loneliness', 'frustration', 'confidence',
  'sleep', 'nutrition', 'mindfulness',
  'family-support', 'routines', 'work-return',
  'success-story', 'advice', 'beginner-question'];


  const addTag = (t) => {
    const clean = t.trim().toLowerCase().replace(/^#/, '').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!clean) return;
    if (newPostTags.includes(clean)) return;
    if (newPostTags.length >= 5) return;
    setNewPostTags([...newPostTags, clean]);
    setTagInput('');
  };
  const removeTag = (t) => setNewPostTags(newPostTags.filter((x) => x !== t));

  const resetComposer = () => {
    setNewPostOpen(false);setCategoryOpen(false);
    setNewPostTitle('');setNewPostContent('');
    setNewPostCategory('discussion');setNewPostTags([]);setTagInput('');
    setTouched({});
  };

  const openPostFormAndScroll = () => {
    setNewPostOpen(true);
    setTimeout(() => {
      if (postFormRef.current) {
        postFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handlePostSubmit = () => {
    if (Object.values(errors).some(Boolean)) {
      setTouched({ title: true, content: true, category: true, tags: true });
      return;
    }
    resetComposer();
  };

  const canPost = !Object.values(errors).some(Boolean);
  const tagSuggestions = tagInput ?
  TAG_SUGGESTIONS.filter((t) => t.includes(tagInput.toLowerCase()) && !newPostTags.includes(t)).slice(0, 6) :
  TAG_SUGGESTIONS.filter((t) => !newPostTags.includes(t)).slice(0, 6);
  const [openPost, setOpenPost] = React.useState(null);
  React.useEffect(() => { setVisibleReplyCount(REPLIES_PER_PAGE); }, [openPost]);

  const tabs = ['Popular', 'Recent', 'Unanswered'];

  const CURRENT_USER = 'Alex Rivera';
  const [posts, setPosts] = React.useState([
  { id: 100, category: 'discussion', tags: ['gratitude', 'small-wins'], author: 'Alex Rivera', timeAgo: '12 min ago', title: 'Three small wins from this week worth celebrating', content: "I almost didn't post this, but I want to remember the small stuff. 1) Said no to a 9pm work call. 2) Walked instead of scrolled. 3) Asked for help, twice...", votes: 8, replies: 2, hasMedia: false },
  { id: 1, category: 'recovery', tags: ['recovery-journey', 'mindfulness', 'routines'], author: 'Marcus T.', timeAgo: '3 hours ago', edited: true, title: 'My first 90 days: Finding peace in the routine of early mornings.', content: "I used to dread the sunrise because it meant another day of struggle. Now, my 5 AM tea and meditation are the anchor of my day. If you're in the first...", votes: 47, replies: 18, hasMedia: false },
  { id: 2, category: 'support', tags: ['anxiety', 'family-support', 'advice'], author: 'Sarah Jenkins', timeAgo: '5 hours ago', title: "Managing social anxiety during family gatherings this weekend", content: "Does anyone have tips for navigating conversations about 'why I'm not drinking' with pushy relatives? Feeling a bit nervous about the upcoming...", votes: 123, replies: 42, hasMedia: false },
  { id: 3, category: 'therapy', tags: ['stretching', 'physical-therapy', 'chronic-pain'], author: 'YogaCoach_Ben', timeAgo: '8 hours ago', edited: true, title: 'Gentle 10-minute flow for releasing neck tension.', content: '', votes: 89, replies: 24, hasMedia: true },
  { id: 4, category: 'milestones', tags: ['recovery-journey', 'success-story', 'walking'], author: 'Priya N.', timeAgo: '11 hours ago', title: 'Hit 5,000 steps today — six weeks ago I could barely stand', content: "After my ankle surgery in March, the doctor said it would be months before I could walk a normal distance. Today I made it around the whole neighborhood without stopping once. Logging it here so I remember on the harder days.", votes: 64, replies: 19, hasMedia: false },
  { id: 5, category: 'mental', tags: ['anxiety', 'mindfulness', 'beginner-question'], author: 'Jordan K.', timeAgo: '14 hours ago', title: 'How do you stop the spiral when recovery feels too slow?', content: "Two months in and some days it feels like I'm moving backwards. I know healing isn't linear, but my brain keeps comparing me to where I was. What actually helps you when you get stuck in that loop?", votes: 38, replies: 27, hasMedia: false },
  { id: 6, category: 'lifestyle', tags: ['nutrition', 'routines'], author: 'Wellness with Nia', timeAgo: '1 day ago', title: 'Simple anti-inflammatory meals I batch-cook on Sundays', content: "Sharing my Sunday prep list: turmeric lentil soup, salmon and roasted greens, chia overnight oats, a small jar of pickled ginger. About ninety minutes of work, feeds me through Thursday. Happy to drop recipes in the replies.", votes: 71, replies: 14, hasMedia: false },
  { id: 7, category: 'questions', tags: ['work-return', 'advice', 'burnout'], author: 'Tom Reilly', timeAgo: '1 day ago', title: 'Returning to work next week — how did you pace yourself?', content: "First day back at the office is Monday after ten weeks off. Worried about overdoing it on day one and crashing for the rest of the week. Anyone been through this and want to share what worked?", votes: 29, replies: 16, hasMedia: false }]);


  // Additional posts loaded in batches as the user scrolls.
  const MORE_POSTS = React.useMemo(() => [
  { id: 8, category: 'stories', tags: ['stroke', 'recovery-journey', 'success-story'], author: 'Elena V.', timeAgo: '2 days ago', title: 'One year since my stroke — what I wish I knew on day one', content: "A year ago today I couldn't read my own name on a hospital wristband. Yesterday I finished a novel. Sharing five things I wish someone had told me at the start of all this.", votes: 214, replies: 53, hasMedia: false },
  { id: 9, category: 'therapy', tags: ['physical-therapy', 'exercise', 'mobility'], author: 'PT_Coach_Rae', timeAgo: '2 days ago', title: 'Three under-the-radar mobility drills your PT may have skipped', content: "Low effort, high return. I program these for almost every client and they take maybe four minutes total. No equipment — do them while your coffee brews.", votes: 102, replies: 31, hasMedia: false },
  { id: 10, category: 'support', tags: ['loneliness', 'motivation', 'family-support'], author: 'Hana M.', timeAgo: '2 days ago', title: "It's lonely when everyone else has moved on from your injury", content: "Six months in and the check-ins have basically stopped. People assume I'm fine because I look fine. Not really looking for advice — just wanted to say it out loud somewhere safe.", votes: 156, replies: 48, hasMedia: false },
  { id: 11, category: 'mental', tags: ['sleep', 'mindfulness', 'pain-management'], author: 'Ravi S.', timeAgo: '3 days ago', title: 'A 4-7-8 breathing pattern that finally got me sleeping through the night', content: "Tried every sleep app on the market. What actually worked was embarrassingly simple — inhale four counts, hold seven, exhale eight. Three rounds and I'm out. Sharing in case anyone else is staring at the ceiling at 3am.", votes: 88, replies: 22, hasMedia: false },
  { id: 12, category: 'recovery', tags: ['chronic-pain', 'confidence', 'recovery-journey'], author: 'Carlos D.', timeAgo: '3 days ago', title: "Pain flared today and I didn't catastrophize for the first time", content: "Small win but a big one. Old me would have spent the afternoon Googling worst-case scenarios. Today I put the heating pad on, watched a movie, and trusted my body to settle.", votes: 47, replies: 11, hasMedia: false },
  { id: 13, category: 'milestones', tags: ['exercise', 'success-story', 'confidence'], author: 'Mei L.', timeAgo: '4 days ago', title: 'First swim since my shoulder surgery', content: "Twenty laps, slow and ugly, and I cried in the parking lot afterward — in a good way. Posting before the doubt creeps back in.", votes: 119, replies: 26, hasMedia: false },
  { id: 14, category: 'therapy', tags: ['occupational-therapy', 'mobility', 'advice'], author: 'OT_Sandra', timeAgo: '4 days ago', title: "Adaptive kitchen tools that genuinely changed my clients' quality of life", content: "If grip strength or one-handed cooking is your reality right now, here's a short list of tools that come up over and over in my practice. Nothing fancy, most under twenty dollars.", votes: 65, replies: 19, hasMedia: false },
  { id: 15, category: 'discussion', tags: ['motivation', 'routines'], author: 'Sam Whitaker', timeAgo: '5 days ago', title: 'What is the smallest habit that has had the biggest impact on your recovery?', content: "For me it was making the bed before PT. Sounds silly. It signals that the day has actually started and the rest follows. Curious what tiny thing has done outsized work for you.", votes: 92, replies: 41, hasMedia: false },
  { id: 16, category: 'questions', tags: ['surgery', 'beginner-question', 'advice'], author: 'Avery P.', timeAgo: '5 days ago', title: "Pre-op tomorrow — what do you wish you'd packed for the hospital?", content: "I have headphones, lip balm, an extra phone charger, comfy socks. What else? First-timer here and trying very hard not to spiral.", votes: 41, replies: 38, hasMedia: false },
  { id: 17, category: 'lifestyle', tags: ['sleep', 'nutrition', 'routines'], author: 'Wellness with Nia', timeAgo: '6 days ago', title: 'Three evening rituals that helped me wind down without screens', content: "A cup of tulsi tea, ten pages of fiction, a slow body scan. Boring on paper, life-changing in practice. Three months screen-free after 9pm and counting.", votes: 78, replies: 17, hasMedia: false },
  { id: 18, category: 'mental', tags: ['motivation', 'frustration', 'confidence'], author: 'Marcus T.', timeAgo: '1 week ago', title: 'The day I stopped apologizing for taking up space in physical therapy', content: "I caught myself saying sorry every time I needed an extra rest between sets. My PT gently called it out and it changed everything about how I show up to my sessions.", votes: 134, replies: 29, hasMedia: false },
  { id: 19, category: 'stories', tags: ['spinal-injury', 'recovery-journey', 'success-story'], author: 'Tomás R.', timeAgo: '1 week ago', title: 'From hospital bed to garden bench — a slow story in six photos', content: "Eighteen months. A slipped disc, a fusion, and roughly a thousand five-minute walks. Sharing the photos because progress doesn't always feel real until you see it laid out side by side.", votes: 287, replies: 62, hasMedia: true },
  { id: 20, category: 'support', tags: ['family-support', 'advice', 'confidence'], author: 'Devon A.', timeAgo: '1 week ago', title: 'How do you ask for help without feeling like a burden?', content: "Six weeks post-op and my partner has been incredible, but I can see the fatigue setting in. I want to ask my sister for some weekend coverage and I keep freezing up. Anyone scripted this conversation before?", votes: 54, replies: 33, hasMedia: false },
  { id: 21, category: 'lifestyle', tags: ['walking', 'mindfulness', 'routines'], author: 'Asha G.', timeAgo: '1 week ago', title: 'Why my daily 20-minute walk is non-negotiable now', content: "Same loop, same time, every day. No headphones, no podcast, no goals. Just twenty minutes of putting one foot in front of the other. It is the closest thing to therapy I can do for free.", votes: 96, replies: 21, hasMedia: false },
  { id: 22, category: 'milestones', tags: ['physical-therapy', 'success-story'], author: 'Kai O.', timeAgo: '2 weeks ago', title: 'Graduated from PT today after 14 months', content: "Walked in on crutches in March of last year. Walked out today with a high five and a discharge note. To anyone in week three wondering if it gets easier — it does. Slowly. But it does.", votes: 198, replies: 44, hasMedia: false }],
  []);


  const PAGE_SIZE = 4;
  const [moreLoaded, setMoreLoaded] = React.useState(0);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const hasMore = moreLoaded < MORE_POSTS.length;
  const sentinelRef = React.useRef(null);

  const loadMore = React.useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    // Simulate a network request so the skeleton/spinner has a moment to breathe.
    setTimeout(() => {
      setPosts((ps) => {
        const next = MORE_POSTS.slice(moreLoaded, moreLoaded + PAGE_SIZE);
        return [...ps, ...next];
      });
      setMoreLoaded((n) => Math.min(n + PAGE_SIZE, MORE_POSTS.length));
      setLoadingMore(false);
    }, 900);
  }, [loadingMore, hasMore, moreLoaded, MORE_POSTS]);

  // Auto-load via IntersectionObserver when the sentinel scrolls into view.
  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) loadMore();
    }, { rootMargin: '300px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore, hasMore, moreLoaded]);


  const [replyText, setReplyText] = React.useState('');
  const [replyOpen, setReplyOpen] = React.useState(false);
  const [replyingTo, setReplyingTo] = React.useState(null); // {id, author} when chained
  const replyTextareaRef = React.useRef(null);
  const [replies, setReplies] = React.useState({
    1: [
    { id: 2, author: 'Dr. Rivera', initials: 'DR', bg: C.secondary, text: 'This is a beautiful example of building a recovery identity. The routine is key to neurological re-patterning.', timeAgo: '1 hour ago', verified: true, likes: 18 },
    { id: 3, author: 'Marcus T.', initials: 'MT', bg: C.accent, text: "Thanks Dr. Rivera - that framing of 'neurological re-patterning' is exactly what made it click for me. I'll dig into the resources you shared last week.", timeAgo: '55 min ago', likes: 7, replyTo: { author: 'Dr. Rivera', id: 2 } },
    { id: 100, author: 'Alex Rivera', initials: 'AR', bg: C.primaryGradStart, text: "Marcus, this really resonated. The quiet hour before everyone else is up has been the only thing keeping me steady through week 4.", timeAgo: '40 min ago', edited: true, likes: 4, replyTo: { author: 'Marcus T.', id: 3 } },
    { id: 1, author: 'Sarah Jenkins', initials: 'SJ', bg: C.primary, text: "Thank you for sharing this. The 5 AM routine really resonates - I've been trying to make mornings my anchor too.", timeAgo: '2 hours ago', likes: 6 },
    { id: 101, author: 'Priya N.', initials: 'PN', bg: C.accent, text: "Day 47 here and reading this felt like permission to slow down. The 'peace in the routine' part especially - I kept chasing big milestones and missing the quiet steady ones.", timeAgo: '2 hours ago', likes: 9 },
    { id: 102, author: 'Tom Reilly', initials: 'TR', bg: C.secondary, text: "What time do you actually wake up for the 5 AM block? I'm a night owl and the mornings are my hardest hurdle.", timeAgo: '3 hours ago', likes: 3 },
    { id: 103, author: 'Marcus T.', initials: 'MT', bg: C.accent, text: "Tom, I started at 6:30 and only crept earlier once it stopped feeling like punishment. Give yourself a few weeks.", timeAgo: '2 hours ago', likes: 5, replyTo: { author: 'Tom Reilly', id: 102 } },
    { id: 104, author: 'Elena V.', initials: 'EV', bg: C.primary, text: "Saving this. One year out from my stroke and the routine is still the scaffolding that holds the whole day up.", timeAgo: '4 hours ago', likes: 11 },
    { id: 105, author: 'Jordan K.', initials: 'JK', bg: C.primaryGradStart, text: "Needed this today. Week 3 and I was starting to think the slow days meant I was failing. Apparently they're the point.", timeAgo: '5 hours ago', likes: 8 }],

    2: [
    { id: 1, author: 'Marcus T.', initials: 'MT', bg: C.accent, text: "I've been there. I just say 'I'm not drinking tonight' without explaining. Most people respect it.", timeAgo: '4 hours ago', likes: 12 }],

    3: []
  });

  const [replyLikes, setReplyLikes] = React.useState({});
  const toggleReplyLike = (rid) => setReplyLikes((s) => ({ ...s, [rid]: !s[rid] }));
  const [collapsedReplies, setCollapsedReplies] = React.useState({});
  const toggleCollapse = (rid) => setCollapsedReplies((s) => ({ ...s, [rid]: !s[rid] }));
  const REPLIES_PER_PAGE = 3;
  const [visibleReplyCount, setVisibleReplyCount] = React.useState(REPLIES_PER_PAGE);

  // Edit/delete state for own posts + replies
  const [editingPostId, setEditingPostId] = React.useState(null);
  const [postDraft, setPostDraft] = React.useState({ title: '', content: '', category: '', tags: [] });
  const [editCategoryOpen, setEditCategoryOpen] = React.useState(false);
  const [editTagInput, setEditTagInput] = React.useState('');
  const addEditTag = (raw) => {
    const clean = raw.trim().toLowerCase().replace(/^#/, '').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!clean) return;
    if (postDraft.tags.includes(clean)) return;
    if (postDraft.tags.length >= 5) return;
    setPostDraft((d) => ({ ...d, tags: [...d.tags, clean] }));
    setEditTagInput('');
  };
  const removeEditTag = (t) => setPostDraft((d) => ({ ...d, tags: d.tags.filter((x) => x !== t) }));
  const editTagSuggestions = editTagInput ?
  TAG_SUGGESTIONS.filter((t) => t.includes(editTagInput.toLowerCase()) && !postDraft.tags.includes(t)).slice(0, 6) :
  TAG_SUGGESTIONS.filter((t) => !postDraft.tags.includes(t)).slice(0, 6);
  const [editingReply, setEditingReply] = React.useState(null); // { postId, replyId }
  const [replyDraft, setReplyDraft] = React.useState('');
  const [confirmDelete, setConfirmDelete] = React.useState(null); // { kind: 'post'|'reply', postId, replyId? }
  const [openMenu, setOpenMenu] = React.useState(null); // e.g. 'post-100' or 'reply-3'
  React.useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [openMenu]);

  const startEditPost = (p) => {setEditingPostId(p.id);setPostDraft({ title: p.title, content: p.content || '', category: p.category, tags: [...(p.tags || [])] });setEditCategoryOpen(false);setEditTagInput('');};
  const cancelEditPost = () => {setEditingPostId(null);setPostDraft({ title: '', content: '', category: '', tags: [] });setEditCategoryOpen(false);setEditTagInput('');};
  const saveEditPost = (id) => {
    if (!postDraft.title.trim()) return;
    if (!postDraft.category) return;
    if (postDraft.tags.length < 1 || postDraft.tags.length > 5) return;
    setPosts((ps) => ps.map((p) => p.id === id ? { ...p, title: postDraft.title.trim(), content: postDraft.content, category: postDraft.category, tags: postDraft.tags, edited: true } : p));
    cancelEditPost();
    showToast('Post updated');
  };
  const deletePost = (id) => {
    setPosts((ps) => ps.filter((p) => p.id !== id));
    setReplies((r) => {const n = { ...r };delete n[id];return n;});
    setConfirmDelete(null);
    setOpenPost(null);
    showToast('Post deleted');
  };
  const startEditReply = (postId, reply) => {setEditingReply({ postId, replyId: reply.id });setReplyDraft(reply.text);};
  const cancelEditReply = () => {setEditingReply(null);setReplyDraft('');};
  const saveEditReply = (postId, replyId) => {
    if (!replyDraft.trim()) return;
    setReplies((r) => ({
      ...r,
      [postId]: (r[postId] || []).map((rep) => rep.id === replyId ? { ...rep, text: replyDraft.trim(), edited: true } : rep)
    }));
    cancelEditReply();
    showToast('Reply updated');
  };
  const deleteReply = (postId, replyId) => {
    setReplies((r) => ({ ...r, [postId]: (r[postId] || []).filter((rep) => rep.id !== replyId) }));
    setConfirmDelete(null);
    showToast('Reply deleted');
  };

  const toggleLike = (id) => setLikes((l) => ({ ...l, [id]: !l[id] }));
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
    setSaved((s) => {
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
        ta.value = url;ta.style.position = 'fixed';ta.style.opacity = '0';
        document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);
      }
      showToast('Link copied to clipboard');
    } catch (e) {showToast('Could not copy link');}
  };

  // Color swatch per category id — used for chips on posts AND the filter strip.
  const CATEGORY_COLORS = {
    recovery: { bg: '#F3E8FF', text: '#7e22ce' },
    therapy: { bg: '#D1FAE5', text: '#065f46' },
    mental: { bg: '#FCE7F3', text: '#be185d' },
    milestones: { bg: '#FEF3C7', text: '#a16207' },
    lifestyle: { bg: '#E0F2FE', text: '#0369a1' },
    support: { bg: '#DBEAFE', text: '#1d4ed8' },
    questions: { bg: '#FFE4E6', text: '#be123c' },
    stories: { bg: '#EDE9FE', text: '#5b21b6' },
    discussion: { bg: '#E2E8F0', text: '#334155' }
  };
  const getCategoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id;
  const getCategoryColors = (id) => CATEGORY_COLORS[id] || { bg: C.muted, text: C.mutedFg };

  const filteredPosts = posts.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (tagFilter && !(p.tags || []).includes(tagFilter)) return false;
    return true;
  });

  const mentors = [
  { name: 'David Chen', role: 'Certified Coach', avatar: 'D', online: true },
  { name: 'Maria G.', role: 'Wellness Guide', avatar: 'M', online: false }];


  const trendingTopics = ['DailyGratitude', 'SobrietyTips', 'HealthyHabits', 'SelfCare', 'SleepHygiene'];

  const submitReply = (postId) => {
    if (!replyText.trim()) return;
    const newReply = { id: Date.now(), author: 'Alex Rivera', initials: 'AR', bg: C.primaryGradStart, text: replyText.trim(), timeAgo: 'just now', likes: 0 };
    if (replyingTo) newReply.replyTo = { author: replyingTo.author, id: replyingTo.id };
    setReplies((r) => ({ ...r, [postId]: [newReply, ...(r[postId] || [])] }));
    setReplyText('');
    setReplyOpen(false);
    setReplyingTo(null);
  };

  // ── Post detail view ──────────────────────────────────────
  if (openPost) {
    const post = posts.find((p) => p.id === openPost);
    if (!post) {setOpenPost(null);return null;}
    const postReplies = replies[openPost] || [];
    const isOwnPost = post.author === CURRENT_USER;
    return (
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
        {toast &&
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1a2b3c', color: '#fff', padding: '10px 18px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="check" size={14} color="#10b981" /> {toast}
          </div>
        }
        {confirmDelete &&
        <div onClick={() => setConfirmDelete(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.48)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 380, backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.destructive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
                </div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: C.foreground, margin: 0 }}>{confirmDelete.kind === 'post' ? 'Delete this post?' : 'Delete this reply?'}</h3>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.55, color: C.mutedFg, margin: '0 0 18px' }}>{confirmDelete.kind === 'post' ? 'This will permanently remove your post and all of its replies. This action cannot be undone.' : 'This will permanently remove your reply. This action cannot be undone.'}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button onClick={() => setConfirmDelete(null)} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => confirmDelete.kind === 'post' ? deletePost(confirmDelete.postId) : deleteReply(confirmDelete.postId, confirmDelete.replyId)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: C.destructive, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#fff', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        }
        <TopBar title="Community" subtitle={post?.title || 'Connect with others on their recovery journey'} onNavigate={onNavigate} />
        <div style={{ display: 'flex', gap: isMobile ? 0 : 24, padding: isMobile ? 16 : 24, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Back */}
            <button onClick={() => setOpenPost(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.primary, padding: 0, alignSelf: 'flex-start' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Back to Community
            </button>

            {/* Post body */}
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {editingPostId !== post.id && <span style={{ padding: '3px 12px', borderRadius: 99, fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif', backgroundColor: getCategoryColors(post.category).bg, color: getCategoryColors(post.category).text }}>{getCategoryLabel(post.category)}</span>}
                <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 6, rowGap: 2, fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>
                  <span>Posted by</span>
                  <button onClick={(e) => {e.stopPropagation();onNavigate && onNavigate('profile', { author: post.author });}} style={{ background: 'none', border: 'none', padding: 0, margin: 0, font: 'inherit', color: C.foreground, fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = C.primary} onMouseLeave={(e) => e.currentTarget.style.color = C.foreground}>{post.author}</button>
                  <span aria-hidden="true">·</span>
                  <span>{post.timeAgo}</span>
                  {post.edited && <span style={{ fontStyle: 'italic', opacity: 0.85 }} title="This post has been edited">(edited)</span>}
                </span>
                {isOwnPost && editingPostId !== post.id &&
                <div style={{ marginLeft: 'auto', position: 'relative' }} onMouseDown={(e) => e.stopPropagation()}>
                    <button onClick={() => setOpenMenu(openMenu === `post-${post.id}` ? null : `post-${post.id}`)} aria-label="Post options" aria-haspopup="menu" aria-expanded={openMenu === `post-${post.id}`}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: openMenu === `post-${post.id}` ? C.muted : 'transparent', border: 'none', cursor: 'pointer', color: C.mutedFg, transition: 'background-color 0.15s, color 0.15s' }}
                  onMouseEnter={(e) => {if (openMenu !== `post-${post.id}`) {e.currentTarget.style.backgroundColor = C.muted;e.currentTarget.style.color = C.foreground;}}}
                  onMouseLeave={(e) => {if (openMenu !== `post-${post.id}`) {e.currentTarget.style.backgroundColor = 'transparent';e.currentTarget.style.color = C.mutedFg;}}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
                    </button>
                    {openMenu === `post-${post.id}` &&
                  <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 30, minWidth: 160, backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.12)', padding: 4 }}>
                        <button role="menuitem" onClick={() => {startEditPost(post);setOpenMenu(null);}}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', textAlign: 'left', border: 'none', background: 'transparent', borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: C.foreground }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.muted}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <Icon name="edit" size={14} color="currentColor" /> Edit post
                        </button>
                        <button role="menuitem" onClick={() => {setConfirmDelete({ kind: 'post', postId: post.id });setOpenMenu(null);}}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', textAlign: 'left', border: 'none', background: 'transparent', borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: C.destructive }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
                          Delete post
                        </button>
                      </div>
                  }
                  </div>
                }
              </div>
              {editingPostId === post.id ?
              <div style={{ marginBottom: 16 }}>
                  <input value={postDraft.title} onChange={(e) => setPostDraft((d) => ({ ...d, title: e.target.value }))} placeholder="Post title…"
                style={{ width: '100%', padding: '12px 14px', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: C.foreground, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', boxSizing: 'border-box', marginBottom: 10 }}
                onFocus={(e) => e.target.style.borderColor = C.primary}
                onBlur={(e) => e.target.style.borderColor = C.border} />
                  <textarea value={postDraft.content} onChange={(e) => setPostDraft((d) => ({ ...d, content: e.target.value }))} placeholder="Share your story…"
                style={{ width: '100%', minHeight: 120, padding: 14, fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6, color: C.foreground, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = C.primary}
                onBlur={(e) => e.target.style.borderColor = C.border} />

                  {/* Category */}
                  <div style={{ marginTop: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.foreground, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Category <span style={{ color: C.destructive, fontWeight: 600 }}>*</span></label>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <button type="button" onClick={() => setEditCategoryOpen((o) => !o)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 14px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', backgroundColor: C.card, border: `1px solid ${editCategoryOpen ? C.primary : C.border}`, boxSizing: 'border-box' }}>
                        {(() => {
                        const cat = CATEGORIES.find((c) => c.id === postDraft.category);
                        return cat ?
                        <div style={{ minWidth: 0 }}>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.foreground, margin: '0 0 2px' }}>{cat.label}</p>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.desc}</p>
                            </div> :

                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>Choose a category…</span>;

                      })()}
                        <Icon name={editCategoryOpen ? 'chevronUp' : 'chevronDown'} size={16} color={C.mutedFg} />
                      </button>
                      {editCategoryOpen &&
                    <div role="listbox" style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20, backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.12)', maxHeight: 320, overflowY: 'auto', padding: 4 }}>
                          {CATEGORIES.map((cat) => {
                        const selected = postDraft.category === cat.id;
                        return (
                          <button key={cat.id} type="button" onClick={() => {setPostDraft((d) => ({ ...d, category: cat.id }));setEditCategoryOpen(false);}}
                          style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, padding: '10px 12px', textAlign: 'left', borderRadius: 7, border: 'none', cursor: 'pointer', fontFamily: 'inherit', backgroundColor: selected ? C.primaryLight : 'transparent' }}
                          onMouseEnter={(e) => {if (!selected) e.currentTarget.style.backgroundColor = C.muted;}}
                          onMouseLeave={(e) => {if (!selected) e.currentTarget.style.backgroundColor = 'transparent';}}>
                                <div style={{ minWidth: 0 }}>
                                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 600, color: selected ? C.primary : C.foreground, margin: '0 0 2px' }}>{cat.label}</p>
                                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
                                </div>
                                {selected && <Icon name="check" size={15} color={C.primary} />}
                              </button>);

                      })}
                        </div>
                    }
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.foreground, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tags <span style={{ color: C.destructive, fontWeight: 600 }}>*</span></label>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: postDraft.tags.length >= 1 && postDraft.tags.length <= 5 ? C.mutedFg : C.destructive }}>{postDraft.tags.length}/5 · 1–5 tags</span>
                    </div>
                    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', minHeight: 44, marginBottom: 10 }}>
                      {postDraft.tags.map((t) =>
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 4px 4px 10px', borderRadius: 99, backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600 }}>
                          {t}
                          <button type="button" onClick={() => removeEditTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.primary }}>
                            <Icon name="close" size={12} color="currentColor" />
                          </button>
                        </span>
                    )}
                      <input value={editTagInput} onChange={(e) => setEditTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ',' || e.key === ' ') && editTagInput.trim()) {
                        e.preventDefault();addEditTag(editTagInput);
                      } else if (e.key === 'Backspace' && !editTagInput && postDraft.tags.length) {
                        removeEditTag(postDraft.tags[postDraft.tags.length - 1]);
                      }
                    }}
                    placeholder={postDraft.tags.length === 0 ? 'Type a topic…' : postDraft.tags.length < 5 ? 'Add another…' : 'Max 5 tags'}
                    disabled={postDraft.tags.length >= 5}
                    style={{ flex: 1, minWidth: 140, border: 'none', outline: 'none', padding: '6px 4px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, background: 'transparent' }} />
                    </div>
                    {postDraft.tags.length < 5 && editTagSuggestions.length > 0 &&
                  <div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: '0 0 6px' }}>{editTagInput ? 'Suggestions' : 'Popular topics'}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {editTagSuggestions.map((t) =>
                      <button key={t} type="button" onClick={() => addEditTag(t)} style={{ padding: '5px 12px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, cursor: 'pointer' }}>
                              + {t}
                            </button>
                      )}
                        </div>
                      </div>
                  }
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                    <button onClick={cancelEditPost} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground, cursor: 'pointer' }}>Cancel</button>
                    {(() => {
                    const valid = !!postDraft.title.trim() && !!postDraft.category && postDraft.tags.length >= 1 && postDraft.tags.length <= 5;
                    return (
                      <button onClick={() => saveEditPost(post.id)} disabled={!valid} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: valid ? `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: valid ? '#fff' : C.mutedFg, cursor: valid ? 'pointer' : 'not-allowed' }}>Save changes</button>);

                  })()}
                  </div>
                </div> :

              <>
                  <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: C.foreground, margin: '0 0 14px', lineHeight: 1.35 }}>{post.title}</h1>
                  {post.content && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.8, margin: '0 0 20px' }}>{post.content}{post.id === 1 ? ' And so every morning now is a gift I give myself - a quiet hour before the world wakes up where I can just be.' : ''}</p>}
                </>
              }
              {editingPostId !== post.id && post.tags && post.tags.length > 0 &&
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '0 0 20px' }}>
                  {post.tags.map((t) =>
                <button key={t} onClick={() => {applyTagFilter(t);setOpenPost(null);}} style={{ padding: '4px 12px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: 'transparent', color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                onMouseEnter={(e) => {e.currentTarget.style.color = C.primary;e.currentTarget.style.borderColor = C.primary;e.currentTarget.style.backgroundColor = C.primaryLight;}}
                onMouseLeave={(e) => {e.currentTarget.style.color = C.mutedFg;e.currentTarget.style.borderColor = C.border;e.currentTarget.style.backgroundColor = 'transparent';}}>
                      {t}
                    </button>
                )}
                </div>
              }
              {post.hasMedia &&
              <div style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: C.muted, aspectRatio: '16/9', maxHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: C.primary + 'E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderLeft: '22px solid #fff', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 5 }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 14, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '3px 10px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#fff' }}>10:24</div>
                </div>
              }
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
                        transition: 'background-color 0.15s'
                      }}>
                      
                      <Icon name="heart" size={15} color="currentColor" fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{n}</span>
                      <span style={{ fontWeight: 500 }}>Showed support</span>
                    </button>);

                })()}
                {[
                { icon: 'share2', label: 'Share', onClick: () => sharePost(post), active: false },
                { icon: 'bookmark', label: saved[post.id] ? 'Saved' : 'Save', onClick: () => toggleSave(post.id), active: !!saved[post.id] }].
                map(({ icon, label, onClick, active }) =>
                <button key={label} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif', fontSize: 13, color: active ? C.primary : C.mutedFg, fontWeight: active ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => {if (!active) e.currentTarget.style.color = C.foreground;}}
                onMouseLeave={(e) => {if (!active) e.currentTarget.style.color = C.mutedFg;}}>
                    <Icon name={icon} size={16} color="currentColor" fill={active ? 'currentColor' : 'none'} /> {label}
                  </button>
                )}
              </div>
            </div>

            {/* Replies */}
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 16px' }}>{postReplies.length} {postReplies.length === 1 ? 'Reply' : 'Replies'}</h4>

              {/* Reply CTA or expanded form */}
              <div style={{ paddingBottom: 20, marginBottom: postReplies.length > 0 ? 4 : 0, borderBottom: postReplies.length > 0 ? `1px solid ${C.border}` : 'none' }}>
                {!replyOpen ?
                <button
                  onClick={() => setReplyOpen(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    padding: '12px 16px', borderRadius: 10,
                    border: `1px solid ${C.border}`, backgroundColor: C.card,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    transition: 'border-color 0.15s, background-color 0.15s'
                  }}
                  onMouseEnter={(e) => {e.currentTarget.style.borderColor = C.primary;e.currentTarget.style.backgroundColor = C.primaryLight + '40';}}
                  onMouseLeave={(e) => {e.currentTarget.style.borderColor = C.border;e.currentTarget.style.backgroundColor = C.card;}}>
                  
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: C.primary }}>AR</span>
                    </div>
                    <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>Write a supportive reply…</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13 }}>
                      <Icon name="messageSquare" size={13} color="#fff" /> Reply
                    </span>
                  </button> :

                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: C.primary }}>AR</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      {replyingTo &&
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 12px', borderRadius: 99, backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                          <Icon name="messageSquare" size={11} color={C.primary} />
                          <span>Replying to @{replyingTo.author}</span>
                          <button onClick={() => setReplyingTo(null)} aria-label="Cancel mention" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'inline-flex', alignItems: 'center', color: C.primary }}>
                            <Icon name="close" size={11} color="currentColor" />
                          </button>
                        </div>
                    }
                      <textarea ref={replyTextareaRef} autoFocus value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder={replyingTo ? `Write your reply to ${replyingTo.author}...` : "Write a supportive reply..."}
                    style={{ width: '100%', minHeight: 96, padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6, transition: 'border-color 0.15s' }}
                    onFocus={(e) => e.target.style.borderColor = C.primary}
                    onBlur={(e) => e.target.style.borderColor = C.border} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                        <button onClick={() => {setReplyOpen(false);setReplyText('');setReplyingTo(null);}} style={{ padding: '9px 18px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                          Cancel
                        </button>
                        <button onClick={() => submitReply(post.id)} disabled={!replyText.trim()} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: replyText.trim() ? `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted, color: replyText.trim() ? '#fff' : C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: replyText.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}>
                          Post Reply
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>

              {postReplies.length === 0 &&
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, margin: '8px 0 0' }}>No replies yet. Be the first to respond!</p>
              }
              {/* Build known names list for @mention rendering */}
              {(() => {
                const knownAuthors = [post.author, ...postReplies.map((r) => r.author)];
                const sortedNames = [...new Set(knownAuthors)].sort((a, b) => b.length - a.length);
                const renderMentions = (text) => {
                  const parts = [];
                  let idx = 0;
                  while (idx < text.length) {
                    if (text[idx] === '@') {
                      let matched = null;
                      for (const name of sortedNames) {
                        if (text.slice(idx + 1, idx + 1 + name.length) === name) {matched = name;break;}
                      }
                      if (matched) {
                        parts.push({ type: 'mention', value: matched });
                        idx += 1 + matched.length;
                        continue;
                      }
                    }
                    if (parts.length === 0 || parts[parts.length - 1].type !== 'text') parts.push({ type: 'text', value: '' });
                    parts[parts.length - 1].value += text[idx];
                    idx++;
                  }
                  return parts.map((p, k) => p.type === 'mention' ?
                  <button key={k} onClick={(e) => {e.stopPropagation();onNavigate && onNavigate('profile', { author: p.value });}} style={{ background: 'none', border: 'none', padding: 0, margin: 0, font: 'inherit', color: C.primary, fontWeight: 600, cursor: 'pointer' }}>@{p.value}</button> :
                  <React.Fragment key={k}>{p.value}</React.Fragment>);
                };
                const byId = {};
                postReplies.forEach((r) => {byId[r.id] = { ...r, children: [] };});
                const roots = [];
                postReplies.forEach((r) => {
                  const node = byId[r.id];
                  if (r.replyTo && byId[r.replyTo.id]) {
                    // Cap nesting at one level: attach to the top-level root ancestor.
                    let anc = byId[r.replyTo.id];
                    const guard = new Set();
                    while (anc.replyTo && byId[anc.replyTo.id] && !guard.has(anc.id)) {guard.add(anc.id);anc = byId[anc.replyTo.id];}
                    anc.children.push(node);
                  } else {
                    roots.push(node);
                  }
                });
                const renderReply = (reply, isFirstRoot) => {
                  const isOwnReply = reply.author === CURRENT_USER;
                  const isEditingThisReply = editingReply && editingReply.postId === post.id && editingReply.replyId === reply.id;
                  return (
                    <div key={reply.id}>
              <div style={{ display: 'flex', gap: 12, padding: '16px 0', borderTop: isFirstRoot ? 'none' : `1px solid ${C.border}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: reply.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: '#fff' }}>{reply.initials}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground }}>{reply.author}</span>
                      {reply.author === post.author && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 0.3, color: C.primary, backgroundColor: C.primaryLight, padding: '1px 6px', borderRadius: 4 }} title="Original poster">AUTHOR</span>}
                      {reply.verified && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: C.secondary, backgroundColor: C.secondaryLight, padding: '1px 6px', borderRadius: 4 }}>PRO</span>}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>{reply.timeAgo}</span>
                      {reply.edited && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontStyle: 'italic', color: C.mutedFg, opacity: 0.85 }} title="This reply has been edited">(edited)</span>}
                      {reply.replyTo &&
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>
                          <span>· replying to</span>
                          <button onClick={(e) => {e.stopPropagation();onNavigate && onNavigate('profile', { author: reply.replyTo.author });}} style={{ background: 'none', border: 'none', padding: 0, margin: 0, font: 'inherit', color: C.primary, fontWeight: 600, cursor: 'pointer' }}>@{reply.replyTo.author}</button>
                        </span>
                            }
                    </div>
                    {isEditingThisReply ?
                          <div>
                        <textarea value={replyDraft} onChange={(e) => setReplyDraft(e.target.value)} autoFocus
                            style={{ width: '100%', minHeight: 72, padding: 10, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: C.foreground, border: `1.5px solid ${C.primary}`, borderRadius: 8, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                          <button onClick={() => saveEditReply(post.id, reply.id)} disabled={!replyDraft.trim()} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: replyDraft.trim() ? `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: replyDraft.trim() ? '#fff' : C.mutedFg, cursor: replyDraft.trim() ? 'pointer' : 'not-allowed' }}>Save</button>
                          <button onClick={cancelEditReply} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: C.foreground, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div> :

                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, lineHeight: 1.7, margin: 0, wordBreak: 'break-word' }}>{renderMentions(reply.text)}</p>
                          }
                    {!isEditingThisReply && (() => {
                            const liked = !!replyLikes[reply.id];
                            const count = (reply.likes || 0) + (liked ? 1 : 0);
                            return (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                          <button onClick={() => toggleReplyLike(reply.id)} aria-pressed={liked} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: liked ? 600 : 500, color: liked ? C.destructive : C.mutedFg, transition: 'color 0.15s' }}
                                onMouseEnter={(e) => {if (!liked) e.currentTarget.style.color = C.destructive;}}
                                onMouseLeave={(e) => {if (!liked) e.currentTarget.style.color = C.mutedFg;}}>
                            <Icon name="heart" size={13} color="currentColor" fill={liked ? 'currentColor' : 'none'} />
                            <span>{count}</span>
                          </button>
                          <button onClick={() => {setReplyingTo({ id: reply.id, author: reply.author });setReplyOpen(true);setReplyText('');setTimeout(() => {if (replyTextareaRef.current) replyTextareaRef.current.focus();}, 50);}} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: C.mutedFg, transition: 'color 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = C.foreground}
                                onMouseLeave={(e) => e.currentTarget.style.color = C.mutedFg}>
                            Reply
                          </button>
                          {isOwnReply &&
                                <div style={{ position: 'relative', marginLeft: 'auto' }} onMouseDown={(e) => e.stopPropagation()}>
                              <button onClick={() => setOpenMenu(openMenu === `reply-${reply.id}` ? null : `reply-${reply.id}`)} aria-label="Reply options" aria-haspopup="menu" aria-expanded={openMenu === `reply-${reply.id}`}
                                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 6, background: openMenu === `reply-${reply.id}` ? C.muted : 'transparent', border: 'none', cursor: 'pointer', color: C.mutedFg, transition: 'background-color 0.15s, color 0.15s' }}
                                  onMouseEnter={(e) => {if (openMenu !== `reply-${reply.id}`) {e.currentTarget.style.backgroundColor = C.muted;e.currentTarget.style.color = C.foreground;}}}
                                  onMouseLeave={(e) => {if (openMenu !== `reply-${reply.id}`) {e.currentTarget.style.backgroundColor = 'transparent';e.currentTarget.style.color = C.mutedFg;}}}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
                              </button>
                              {openMenu === `reply-${reply.id}` &&
                                  <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, zIndex: 30, minWidth: 150, backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.12)', padding: 4 }}>
                                  <button role="menuitem" onClick={() => {startEditReply(post.id, reply);setOpenMenu(null);}}
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', background: 'transparent', borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: C.foreground }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.muted}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <Icon name="edit" size={13} color="currentColor" /> Edit reply
                                  </button>
                                  <button role="menuitem" onClick={() => {setConfirmDelete({ kind: 'reply', postId: post.id, replyId: reply.id });setOpenMenu(null);}}
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', background: 'transparent', borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: C.destructive }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
                                    Delete reply
                                  </button>
                                </div>
                                  }
                            </div>
                                }
                        </div>);

                          })()}
                  </div>
                </div>
                {reply.children && reply.children.length > 0 && (() => {
                        const n = reply.children.length;
                        const collapsed = !!collapsedReplies[reply.id];
                        return (
                          <React.Fragment>
                    <button onClick={() => toggleCollapse(reply.id)} style={{ marginLeft: 48, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: '0 0 6px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.primary }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 0.15s' }} aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                      {collapsed ? `Show ${n} ${n === 1 ? 'reply' : 'replies'}` : 'Hide replies'}
                    </button>
                    {!collapsed &&
                            <div style={{ marginLeft: 18, paddingLeft: 16, borderLeft: `2px solid ${C.border}` }}>
                        {reply.children.map((child, ci) => renderReply(child, ci === 0))}
                      </div>
                            }
                  </React.Fragment>);

                      })()}
                </div>);

                };
                return (
                  <React.Fragment>
                    {roots.slice(0, visibleReplyCount).map((r, i) => renderReply(r, i === 0))}
                    {roots.length > visibleReplyCount && (
                      <button onClick={() => setVisibleReplyCount((n) => n + REPLIES_PER_PAGE)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', marginTop: 16, padding: '12px 16px', borderRadius: 10, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: C.primary, cursor: 'pointer', transition: 'background-color 0.15s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.muted}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.card}>
                        See {Math.min(REPLIES_PER_PAGE, roots.length - visibleReplyCount)} more {roots.length - visibleReplyCount === 1 ? 'reply' : 'replies'}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                    )}
                    {visibleReplyCount > REPLIES_PER_PAGE && roots.length > REPLIES_PER_PAGE && (
                      <button onClick={() => setVisibleReplyCount(REPLIES_PER_PAGE)} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', padding: 4, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.mutedFg, cursor: 'pointer' }}>
                        Show less
                      </button>
                    )}
                  </React.Fragment>
                );
              })()}
            </div>
          </div>

          {/* Sidebar (reused) */}
          {!isMobile && !isTablet && <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 14px' }}>Recovery Mentors</h4>
              {mentors.map((mentor, i) =>
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
              )}
            </div>
          </div>}
        </div>
      </div>);

  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      {toast &&
      <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1a2b3c', color: '#fff', padding: '10px 18px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="check" size={14} color="#10b981" /> {toast}
        </div>
      }
      <TopBar title="Community" subtitle="Connect with others on their recovery journey" onNavigate={onNavigate} />
      <div style={{ display: 'flex', gap: isMobile ? 0 : 24, padding: isMobile ? 16 : 24, alignItems: 'flex-start' }}>

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

          {newPostOpen &&
          <div ref={postFormRef} style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: `1.5px solid ${C.primary}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 2px' }}>Share with the community</h4>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>Posts are visible to all Pulse members. Be kind - no medical advice.</p>
                </div>
                <button onClick={resetComposer} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="close" size={16} color={C.mutedFg} /></button>
              </div>

              <input value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} onBlur={() => markTouched('title')} placeholder="Post title…"
            style={{ width: '100%', padding: '11px 14px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${showErr('title') ? C.destructive : C.border}`, borderRadius: 8, outline: 'none', boxSizing: 'border-box', marginBottom: showErr('title') ? 4 : 12 }} />
              {showErr('title') &&
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('title')}
                </p>
            }

              <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} onBlur={() => markTouched('content')} placeholder="Share your story, ask a question, or offer encouragement…"
            style={{ width: '100%', minHeight: 100, padding: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${showErr('content') ? C.destructive : C.border}`, borderRadius: 8, outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: showErr('content') ? 4 : 18 }} />
              {showErr('content') &&
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('content')}
                </p>
            }

              {/* Category — required, single select via dropdown */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.foreground, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Category <span style={{ color: C.destructive, fontWeight: 600 }}>*</span></label>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>What type of conversation is this?</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <button
                  type="button"
                  onClick={() => {setCategoryOpen((o) => !o);markTouched('category');}}
                  onBlur={() => markTouched('category')}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                    padding: '12px 14px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    backgroundColor: C.card,
                    border: `1px solid ${showErr('category') ? C.destructive : categoryOpen ? C.primary : C.border}`,
                    boxSizing: 'border-box'
                  }}>
                    {(() => {
                    const cat = CATEGORIES.find((c) => c.id === newPostCategory);
                    return cat ?
                    <div style={{ minWidth: 0 }}>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.foreground, margin: '0 0 2px' }}>{cat.label}</p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.desc}</p>
                        </div> :

                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>Choose a category…</span>;

                  })()}
                    <Icon name={categoryOpen ? 'chevronUp' : 'chevronDown'} size={16} color={C.mutedFg} />
                  </button>

                  {categoryOpen &&
                <div role="listbox" style={{
                  position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20,
                  backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  maxHeight: 320, overflowY: 'auto', padding: 4
                }}>
                      {CATEGORIES.map((cat) => {
                    const selected = newPostCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {setNewPostCategory(cat.id);setCategoryOpen(false);}}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10,
                          padding: '10px 12px', textAlign: 'left', borderRadius: 7,
                          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                          backgroundColor: selected ? C.primaryLight : 'transparent'
                        }}
                        onMouseEnter={(e) => {if (!selected) e.currentTarget.style.backgroundColor = C.muted;}}
                        onMouseLeave={(e) => {if (!selected) e.currentTarget.style.backgroundColor = 'transparent';}}>
                        
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 600, color: selected ? C.primary : C.foreground, margin: '0 0 2px' }}>{cat.label}</p>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
                            </div>
                            {selected && <Icon name="check" size={15} color={C.primary} />}
                          </button>);

                  })}
                    </div>
                }
                </div>
                {showErr('category') &&
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('category')}
                  </p>
              }
              </div>

              {/* Tags — 1–5 required, autocomplete */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.foreground, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tags <span style={{ color: C.destructive, fontWeight: 600 }}>*</span></label>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: newPostTags.length >= 1 && newPostTags.length <= 5 ? C.mutedFg : C.destructive }}>{newPostTags.length}/5 · add 1–5 specific topics</span>
                </div>

                <div style={{ border: `1px solid ${showErr('tags') ? C.destructive : C.border}`, borderRadius: 10, padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', minHeight: 44, marginBottom: 10 }}>
                  {newPostTags.map((t) =>
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 4px 4px 10px', borderRadius: 99, backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600 }}>
                      {t}
                      <button type="button" onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.primary }}>
                        <Icon name="close" size={12} color="currentColor" />
                      </button>
                    </span>
                )}
                  <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ',' || e.key === ' ') && tagInput.trim()) {
                      e.preventDefault();addTag(tagInput);
                    } else if (e.key === 'Backspace' && !tagInput && newPostTags.length) {
                      removeTag(newPostTags[newPostTags.length - 1]);
                    }
                  }}
                  placeholder={newPostTags.length === 0 ? 'Type a topic, e.g. fracture, anxiety, meditation…' : newPostTags.length < 5 ? 'Add another…' : 'Max 5 tags'}
                  disabled={newPostTags.length >= 5}
                  onBlur={() => markTouched('tags')}
                  style={{ flex: 1, minWidth: 140, border: 'none', outline: 'none', padding: '6px 4px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, background: 'transparent' }} />
                
                </div>

                {newPostTags.length < 5 && tagSuggestions.length > 0 &&
              <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: '0 0 6px' }}>{tagInput ? 'Suggestions' : 'Popular topics'}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {tagSuggestions.map((t) =>
                  <button key={t} type="button" onClick={() => addTag(t)} style={{ padding: '5px 12px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, cursor: 'pointer' }}>
                          + {t}
                        </button>
                  )}
                    </div>
                  </div>
              }
                {showErr('tags') &&
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.destructive, margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="alertTriangle" size={12} color={C.destructive} /> {showErr('tags')}
                  </p>
              }
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                <button onClick={resetComposer} style={{ padding: '9px 18px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.mutedFg, cursor: 'pointer' }}>Cancel</button>
                <button
                onClick={handlePostSubmit}
                style={{
                  padding: '9px 22px', borderRadius: 8, border: 'none',
                  background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`,
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
                  color: '#fff', cursor: 'pointer'
                }}>
                  Post
                </button>
              </div>
            </div>
          }

          {/* Posts card */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            {/* Tabs row + category filter button */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', flex: 1 }}>
                {tabs.map((tab) =>
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '14px 24px', fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === tab ? C.primary : C.mutedFg, borderBottom: activeTab === tab ? `2px solid ${C.primary}` : '2px solid transparent', marginBottom: -1 }}>
                    {tab}
                  </button>
                )}
              </div>

              {/* Category filter — compact dropdown */}
              <div style={{ position: 'relative', padding: '8px 12px' }}>
                {(() => {
                  const activeCat = categoryFilter === 'all' ? null : CATEGORIES.find((c) => c.id === categoryFilter);
                  const activeColors = activeCat ? getCategoryColors(activeCat.id) : null;
                  return (
                    <button
                      ref={filterBtnRef}
                      onClick={() => setFilterOpen((o) => !o)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '7px 12px', borderRadius: 8,
                        border: `1px solid ${filterOpen ? C.primary : C.border}`,
                        backgroundColor: activeCat ? activeColors.bg : C.card,
                        color: activeCat ? activeColors.text : C.foreground,
                        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap'
                      }}>
                      
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                      {activeCat ? activeCat.label : 'All categories'}
                      <Icon name={filterOpen ? 'chevronUp' : 'chevronDown'} size={14} color="currentColor" />
                    </button>);

                })()}

                {filterOpen && filterPos &&
                <>
                    <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000 }} />
                    <div role="listbox" style={{
                    position: 'fixed', top: filterPos.top, right: filterPos.right, zIndex: 1001,
                    width: 280,
                    backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                    maxHeight: 'min(480px, calc(100vh - ' + (filterPos.top + 16) + 'px))', overflowY: 'auto', padding: 6
                  }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, color: C.mutedFg, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 10px 6px', margin: 0 }}>Filter by category</p>
                      {[{ id: 'all', label: 'All categories', desc: 'Show every post' }, ...CATEGORIES].map((cat) => {
                      const selected = categoryFilter === cat.id;
                      const colors = cat.id === 'all' ? null : getCategoryColors(cat.id);
                      const count = cat.id === 'all' ? posts.length : posts.filter((p) => p.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {setCategoryFilter(cat.id);setFilterOpen(false);}}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 10px', textAlign: 'left', borderRadius: 8,
                            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            backgroundColor: selected ? C.primaryLight : 'transparent'
                          }}
                          onMouseEnter={(e) => {if (!selected) e.currentTarget.style.backgroundColor = C.muted;}}
                          onMouseLeave={(e) => {if (!selected) e.currentTarget.style.backgroundColor = 'transparent';}}>
                          
                            {colors ?
                          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: colors.text, flexShrink: 0 }} /> :

                          <span style={{ width: 10, height: 10, borderRadius: 3, border: `1.5px solid ${C.mutedFg}`, flexShrink: 0 }} />
                          }
                            <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: selected ? C.primary : C.foreground }}>{cat.label}</span>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>{count}</span>
                            {selected && <Icon name="check" size={14} color={C.primary} />}
                          </button>);

                    })}
                    </div>
                  </>
                }
              </div>
            </div>

            {/* Active tag filter pill */}
            {tagFilter &&
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderBottom: `1px solid ${C.border}`, backgroundColor: C.muted + '50' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.mutedFg, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Tag</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 4px 4px 12px', borderRadius: 99, backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600 }}>
                  {tagFilter}
                  <button onClick={() => setTagFilter(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: C.primary, borderRadius: '50%' }} aria-label="Clear tag filter">
                    <Icon name="close" size={12} color="currentColor" />
                  </button>
                </span>
              </div>
            }

            {filteredPosts.length === 0 &&
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: C.muted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <Icon name="messageSquare" size={22} color={C.mutedFg} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.foreground, margin: '0 0 4px' }}>No posts match these filters yet</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>{tagFilter ? `Try removing the ${tagFilter} tag or` : 'Try'} picking a different category.</p>
              </div>
            }
            {filteredPosts.map((post, i) =>
            <div key={post.id} onClick={() => setOpenPost(post.id)} style={{ padding: 24, borderTop: i === 0 ? 'none' : `1px solid ${C.border}`, cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.muted + '50'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ padding: '2px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif', backgroundColor: getCategoryColors(post.category).bg, color: getCategoryColors(post.category).text }}>{getCategoryLabel(post.category)}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 6, rowGap: 2, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>
                        <span>Posted by</span>
                        <button onClick={(e) => {e.stopPropagation();onNavigate && onNavigate('profile', { author: post.author });}} style={{ background: 'none', border: 'none', padding: 0, margin: 0, font: 'inherit', color: C.foreground, fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = C.primary} onMouseLeave={(e) => e.currentTarget.style.color = C.foreground}>{post.author}</button>
                        <span aria-hidden="true">·</span>
                        <span>{post.timeAgo}</span>
                        {post.edited && <span style={{ fontStyle: 'italic', opacity: 0.85 }} title="This post has been edited">(edited)</span>}
                      </span>
                      {(() => {
                    const n = getCount(post);
                    return (
                      <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>
                            <Icon name="heart" size={13} color={C.destructive} />
                            <span><strong style={{ color: C.foreground, fontWeight: 600 }}>{n}</strong> showed support</span>
                          </span>);

                  })()}
                    </div>
                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 6px' }}>{post.title}</h3>
                    {post.content && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content}</p>}
                    {post.hasMedia &&
                <div style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: C.muted, aspectRatio: '16/9', maxHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative' }}>
                        <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: C.primary + 'E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 0, height: 0, borderLeft: '18px solid #fff', borderTop: '11px solid transparent', borderBottom: '11px solid transparent', marginLeft: 4 }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: 8, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '2px 8px', fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#fff' }}>10:24</div>
                      </div>
                }
                    {(post.tags || []).length > 0 &&
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                        {post.tags.map((t) =>
                  <button key={t} onClick={(e) => {e.stopPropagation();applyTagFilter(t);}} style={{ padding: '3px 10px', borderRadius: 99, border: `1px solid ${tagFilter === t ? C.primary : C.border}`, backgroundColor: tagFilter === t ? C.primaryLight : 'transparent', color: tagFilter === t ? C.primary : C.mutedFg, fontFamily: 'Inter, sans-serif', fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                            {t}
                          </button>
                  )}
                      </div>
                }
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                      {[
                  { icon: 'messageSquare', label: post.replies + ' replies', onClick: (e) => {e.stopPropagation();setOpenPost(post.id);}, active: false },
                  { icon: 'share2', label: 'Share', onClick: (e) => {e.stopPropagation();sharePost(post);}, active: false },
                  { icon: 'bookmark', label: saved[post.id] ? 'Saved' : 'Save', onClick: (e) => {e.stopPropagation();toggleSave(post.id);}, active: !!saved[post.id] }].
                  map(({ icon, label, onClick, active }) =>
                  <button key={label} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif', fontSize: 12, color: active ? C.primary : C.mutedFg, fontWeight: active ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => {if (!active) e.currentTarget.style.color = C.foreground;}}
                  onMouseLeave={(e) => {if (!active) e.currentTarget.style.color = C.mutedFg;}}>
                          <Icon name={icon} size={15} color="currentColor" fill={active ? 'currentColor' : 'none'} /> {label}
                        </button>
                  )}
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — matches CommunitySidebar.tsx */}
        {!isMobile && !isTablet && <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Recovery Mentors */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 14px' }}>Recovery Mentors</h4>
            {mentors.map((mentor, i) =>
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
            )}
          </div>

          {/* Community Sanctuary */}
          <div style={{ borderRadius: 16, backgroundColor: C.primaryLight + '60', border: `1px solid ${C.primary}30`, padding: 20 }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 8px' }}>Community Sanctuary</h4>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: '0 0 14px', lineHeight: 1.6 }}>Pulse is a safe, non-judgmental space. We prioritize empathy, privacy, and supportive dialogue.</p>
            {[
            { icon: 'shield', text: 'Be kind and be open' },
            { icon: 'lock', text: 'No unsolicited medical advice' },
            { icon: 'user', text: 'Protect user anonymity' }].
            map((rule) =>
            <div key={rule.text} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon name={rule.icon} size={15} color={C.secondary} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>{rule.text}</span>
              </div>
            )}
            <button style={{ marginTop: 8, width: '100%', padding: '8px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: C.foreground, cursor: 'pointer' }}>Read Guidelines</button>
          </div>

          {/* Trending Topics */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 14px' }}>Trending Topics</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {trendingTopics.map((topic) =>
              <button key={topic} style={{ padding: '6px 12px', borderRadius: 99, backgroundColor: C.muted, fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={(e) => {e.currentTarget.style.color = C.primary;e.currentTarget.style.backgroundColor = C.primaryLight;}}
              onMouseLeave={(e) => {e.currentTarget.style.color = C.mutedFg;e.currentTarget.style.backgroundColor = C.muted;}}>
                  {topic}
                </button>
              )}
            </div>
          </div>
        </div>}
      </div>

      {/* FAB for new post */}
      <button onClick={openPostFormAndScroll} style={{
        position: 'fixed', bottom: (isMobile || isTablet) ? 84 : 24, left: (isMobile || isTablet) ? 20 : 24, right: 'auto',
        width: 56, height: 56, borderRadius: '50%', border: 'none',
        backgroundColor: '#005da7', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,93,167,0.35)', cursor: 'pointer',
        transition: 'transform 0.15s', zIndex: 50,
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <Icon name="plus" size={22} color="#fff" />
      </button>
    </div>);
}

Object.assign(window, { CommunityScreen });