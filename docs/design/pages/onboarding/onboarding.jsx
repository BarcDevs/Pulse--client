// onboarding.jsx — Spark-guided conversational onboarding
// Persists structured recovery context for Check-in personalization, Spark AI
// insights/agent context, goal personalization, and product analytics.
// Data model: recoveryContext = { reason: string[]|null, stage, primaryChallenge, primaryChallengeNote, currentPriorities: string[]|null }
// Missing/skipped fields are stored as null/empty — never fabricated.

const OB_I18N = {
  en: {
    introBody: "Hi, I'm Spark. Before we get started, I'd like to get to know a little about where you are in your recovery. That will help me be here in a way that fits you.",
    introCta: "Let's begin",
    skipIntro: 'Skip introduction',
    continue: 'Continue',
    back: 'Back',
    skipQuestion: 'Skip for now',
    skipHint: 'The more you share, the more Spark can tailor the experience to you.',
    upTo3: 'Choose up to 3.',
    pickAny: 'Pick everything that applies.',
    otherPrompt: 'Want to tell me a little more?',
    otherPlaceholder: 'Optional',
    skipConfirmTitle: 'Want to skip the introduction?',
    skipConfirmBody: 'This is completely okay. You can always complete it later, and answering a few questions will help Spark tailor the experience to you.',
    skipConfirmContinue: 'Continue onboarding',
    skipConfirmSkip: 'Skip for now',
    q: {
      reason: { prompt: 'What brings you to Pulse?', options: [
        { id: 'injury', label: 'Injury' }, { id: 'surgery', label: 'Surgery recovery' },
        { id: 'chronic_pain', label: 'Chronic pain' }, { id: 'rehab', label: 'Physical rehabilitation' },
        { id: 'other', label: 'Other' },
      ]},
      stage: { prompt: 'Where would you say you are in your recovery right now?', options: [
        { id: 'starting', label: 'Just getting started' }, { id: 'middle', label: 'In the middle of recovery' },
        { id: 'steady', label: 'Making steady progress' }, { id: 'setbacks', label: 'Dealing with setbacks' },
        { id: 'unsure', label: 'Not sure yet' },
      ]},
      primaryChallenge: { prompt: "What's been the hardest part of your recovery so far?", options: [
        { id: 'pain', label: 'Managing pain' }, { id: 'motivation', label: 'Staying motivated' },
        { id: 'routines', label: 'Keeping up with routines' }, { id: 'emotional', label: 'Emotional wellbeing' },
        { id: 'normal_activities', label: 'Getting back to normal activities' }, { id: 'isolated', label: 'Feeling isolated' },
        { id: 'other', label: 'Something else' },
      ]},
      currentPriorities: { prompt: 'What matters most to you right now?', options: [
        { id: 'pain', label: 'Managing pain' }, { id: 'mood', label: 'Improving my mood' },
        { id: 'energy', label: 'Improving my energy' }, { id: 'activities', label: 'Getting back to activities' },
        { id: 'consistency', label: 'Staying consistent' }, { id: 'goal', label: 'Reaching a specific recovery goal' },
        { id: 'connection', label: 'Feeling less alone' },
      ]},
    },
    acks: {
      reason: { default: "Thanks for sharing that. It helps me understand where you're starting from." },
      stage: {
        starting: "That's a meaningful place to begin. Thanks for telling me.",
        middle: 'Good to know. This stage can take a lot of persistence.',
        steady: "That's great to hear. It's helpful to know things are moving steadily.",
        setbacks: 'That sounds like a hard stretch. Thanks for sharing that.',
        unsure: "That's completely okay. Recovery doesn't always fit neatly into a category.",
      },
      primaryChallenge: {
        pain: 'That sounds like it has been a challenging part of the journey. Thanks for sharing that.',
        motivation: 'That makes sense. Motivation can naturally ebb and flow.',
        routines: 'That can be challenging. Thanks for telling me.',
        emotional: 'That sounds like it has been a challenging part of the journey. Thanks for sharing that.',
        normal_activities: "That makes sense. It's helpful to know what you're working toward.",
        isolated: "Feeling isolated can be one of the hardest parts. I'm glad you told me.",
        other: 'Thanks for sharing that with me.',
      },
      currentPriorities: { default: "That makes sense. It's helpful to know what you're focusing on right now." },
      skipped: "No problem — we can come back to that another time.",
    },
    skippedNote: 'Skipped for now',
    completeLine1: 'Thanks. I have a better sense of where you are and what matters to you right now. We can take it one step at a time.',
    completeLine2: "Before we head into Pulse, let's take your first check-in. It'll give you a starting point for your recovery journey.",
    completeCta: 'Start my first check-in',
  },
  he: {
    introBody: 'היי, אני ספארק. לפני שנתחיל, אשמח להכיר קצת את תהליך ההחלמה שלך. זה יעזור לי להיות כאן בצורה שמתאימה לך.',
    introCta: 'בואו נתחיל',
    skipIntro: 'לדלג על ההיכרות',
    continue: 'המשך',
    back: 'חזרה',
    skipQuestion: 'לעבור הלאה',
    skipHint: 'ככל שתשתפו יותר, ספארק יוכל להתאים את החוויה טוב יותר.',
    upTo3: 'אפשר לבחור עד 3.',
    pickAny: 'אפשר לסמן יותר מאפשרות אחת.',
    otherPrompt: 'רוצים לספר קצת יותר?',
    otherPlaceholder: 'לא חובה',
    skipConfirmTitle: 'לדלג על ההיכרות?',
    skipConfirmBody: 'זה לגמרי בסדר. תמיד אפשר להשלים את זה מאוחר יותר, ומענה על כמה שאלות יעזור לספארק להתאים את החוויה אישית יותר.',
    skipConfirmContinue: 'להמשיך בהיכרות',
    skipConfirmSkip: 'לדלג בינתיים',
    q: {
      reason: { prompt: 'מה הביא אותך לפולס?', options: [
        { id: 'injury', label: 'פציעה' }, { id: 'surgery', label: 'החלמה מניתוח' },
        { id: 'chronic_pain', label: 'כאב כרוני' }, { id: 'rehab', label: 'שיקום פיזי' },
        { id: 'other', label: 'משהו אחר' },
      ]},
      stage: { prompt: 'איפה נמצאים כרגע בתהליך ההחלמה?', options: [
        { id: 'starting', label: 'רק בהתחלה' }, { id: 'middle', label: 'באמצע הדרך' },
        { id: 'steady', label: 'בהתקדמות יציבה' }, { id: 'setbacks', label: 'בתקופה של נסיגות' },
        { id: 'unsure', label: 'עדיין לא ברור' },
      ]},
      primaryChallenge: { prompt: 'מה היה החלק הכי מאתגר בהחלמה עד עכשיו?', options: [
        { id: 'pain', label: 'התמודדות עם כאב' }, { id: 'motivation', label: 'לשמור על מוטיבציה' },
        { id: 'routines', label: 'לעמוד בשגרה' }, { id: 'emotional', label: 'רווחה רגשית' },
        { id: 'normal_activities', label: 'לחזור לשגרת חיים רגילה' }, { id: 'isolated', label: 'תחושת בדידות' },
        { id: 'other', label: 'משהו אחר' },
      ]},
      currentPriorities: { prompt: 'מה הכי חשוב כרגע?', options: [
        { id: 'pain', label: 'להתמודד עם כאב' }, { id: 'mood', label: 'לשפר את מצב הרוח' },
        { id: 'energy', label: 'לשפר את רמת האנרגיה' }, { id: 'activities', label: 'לחזור לפעילויות' },
        { id: 'consistency', label: 'לשמור על עקביות' }, { id: 'goal', label: 'להגיע ליעד החלמה מסוים' },
        { id: 'connection', label: 'להרגיש פחות לבד' },
      ]},
    },
    acks: {
      reason: { default: 'תודה על השיתוף. זה עוזר לי להבין מאיפה מתחילים.' },
      stage: {
        starting: 'זו נקודת התחלה משמעותית. תודה שסיפרת לי.',
        middle: 'טוב לדעת. השלב הזה דורש הרבה התמדה.',
        steady: 'נהדר לשמוע. טוב לדעת שהדברים מתקדמים ביציבות.',
        setbacks: 'זו נשמעת כמו תקופה לא פשוטה. תודה על השיתוף.',
        unsure: 'זה לגמרי בסדר. החלמה לא תמיד נכנסת לקטגוריה מסודרת.',
      },
      primaryChallenge: {
        pain: 'זה נשמע כמו חלק מאתגר במסע. תודה על השיתוף.',
        motivation: 'זה הגיוני. מוטיבציה עולה ויורדת באופן טבעי.',
        routines: 'זה יכול להיות מאתגר. תודה שסיפרת לי.',
        emotional: 'זה נשמע כמו חלק מאתגר במסע. תודה על השיתוף.',
        normal_activities: 'זה הגיוני. טוב לדעת מה חשוב לחזור אליו.',
        isolated: 'תחושת בדידות יכולה להיות אחד החלקים הקשים ביותר. טוב ששיתפת.',
        other: 'תודה ששיתפת את זה.',
      },
      currentPriorities: { default: 'זה הגיוני. טוב לדעת במה מתמקדים כרגע.' },
      skipped: 'אין בעיה — אפשר לחזור לזה בפעם אחרת.',
    },
    skippedNote: 'דילוג בינתיים',
    completeLine1: 'תודה. עכשיו יש תמונה טובה יותר של איפה נמצאים ומה חשוב כרגע. אפשר להתקדם צעד אחד בכל פעם.',
    completeLine2: 'לפני שנכנסים לפולס, בואו נעשה את הדיווח היומי הראשון. זו תהיה נקודת פתיחה למסע ההחלמה.',
    completeCta: 'לדיווח היומי הראשון',
  },
};

const OB_ICONS = {
  reason: { injury: 'activity', surgery: 'calendarCheck', chronic_pain: 'flame', rehab: 'dumbbell', other: 'sparkles' },
  stage: { starting: 'flag', middle: 'trendingUp', steady: 'award', setbacks: 'alertTriangle', unsure: 'helpCircle' },
  primaryChallenge: { pain: 'flame', motivation: 'target', routines: 'calendarCheck', emotional: 'brain', normal_activities: 'trendingUp', isolated: 'users', other: 'sparkles' },
  currentPriorities: { pain: 'flame', mood: 'smile', energy: 'activity', activities: 'dumbbell', consistency: 'calendarCheck', goal: 'target', connection: 'users' },
};

const OB_FIELDS = ['reason', 'stage', 'primaryChallenge', 'currentPriorities'];
const OB_MULTI = { reason: true, stage: false, primaryChallenge: false, currentPriorities: true };

function SparkAvatar({ size = 32 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
      <img src="spark.webp" alt="Spark" style={{ height: size * 0.74, display: 'block' }} />
    </div>
  );
}

const emptyAnswers = () => ({ reason: null, stage: null, primaryChallenge: null, primaryChallengeNote: '', currentPriorities: null });

function OnboardingScreen({ onNavigate }) {
  const { isMobile } = useBreakpoint();
  const [langCode, setLangCode] = React.useState(() => {
    try { return localStorage.getItem('pulse_lang') || 'EN'; } catch (e) { return 'EN'; }
  });
  React.useEffect(() => {
    const h = (e) => setLangCode(e.detail);
    window.addEventListener('pulse-lang-change', h);
    return () => window.removeEventListener('pulse-lang-change', h);
  }, []);
  const isRTL = langCode === 'HE';
  const t = OB_I18N[isRTL ? 'he' : 'en'];

  const [answers, setAnswers] = React.useState(emptyAnswers());
  const [step, setStep] = React.useState('intro'); // 'intro' | 0..3 | 'complete'
  const [pending, setPending] = React.useState(false); // brief "thinking" pause before revealing next question
  const [draft, setDraft] = React.useState([]); // in-progress multi-select for current question
  const [otherNote, setOtherNote] = React.useState('');
  const [skipConfirmOpen, setSkipConfirmOpen] = React.useState(false);
  const [lastAckKey, setLastAckKey] = React.useState(null); // avoid two identical acks back-to-back
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [step, pending]);

  // Seed draft/note when stepping into a question that already has an answer (Back navigation)
  React.useEffect(() => {
    if (typeof step !== 'number') return;
    const field = OB_FIELDS[step];
    const val = answers[field];
    if (OB_MULTI[field]) setDraft(Array.isArray(val) ? val : []);
    if (field === 'primaryChallenge') setOtherNote(answers.primaryChallengeNote || '');
  }, [step]);

  const getAck = (field, value) => {
    if (value == null || (Array.isArray(value) && value.length === 0)) return t.acks.skipped;
    let text;
    if (field === 'reason') text = t.acks.reason.default;
    else if (field === 'currentPriorities') text = t.acks.currentPriorities.default;
    else text = t.acks[field][value] || t.acks[field].other;
    return text;
  };

  const summarize = (field, value) => {
    if (value == null || (Array.isArray(value) && value.length === 0)) return t.skippedNote;
    const opts = t.q[field].options;
    const ids = Array.isArray(value) ? value : [value];
    let text = ids.map(id => opts.find(o => o.id === id)?.label).filter(Boolean).join(', ');
    if (field === 'primaryChallenge' && value === 'other' && answers.primaryChallengeNote) text += ` — "${answers.primaryChallengeNote}"`;
    return text;
  };

  const goToStep = (next) => {
    setPending(false);
    setDraft([]);
    setStep(next);
  };

  const advance = (field, value) => {
    setAnswers(a => ({ ...a, [field]: value }));
    setPending(true);
    setTimeout(() => goToStep(step === 3 ? 'complete' : step + 1), 1100);
  };

  const selectSingle = (field, id) => { if (pending) return; advance(field, id); };
  const toggleMulti = (field, id, max) => {
    setDraft(d => {
      if (d.includes(id)) return d.filter(x => x !== id);
      if (max && d.length >= max) return d;
      return [...d, id];
    });
  };
  const submitMulti = (field) => { if (draft.length === 0 || pending) return; advance(field, draft); };
  const skipQuestion = (field) => { if (pending) return; advance(field, field === 'primaryChallenge' ? null : (OB_MULTI[field] ? null : null)); };
  const goBack = () => { if (typeof step === 'number' && step > 0) goToStep(step - 1); else if (step === 0) goToStep('intro'); };

  const startOnboarding = () => setStep(0);

  const finish = () => {
    try {
      const ctx = { ...answers };
      if (ctx.primaryChallenge !== 'other') delete ctx.primaryChallengeNote;
      localStorage.setItem('pulse_recovery_context', JSON.stringify(ctx));
      localStorage.setItem('pulse_onboarding_complete', 'true');
    } catch (e) {}
    onNavigate('checkin');
  };

  const skipEntireOnboarding = () => {
    try {
      localStorage.setItem('pulse_onboarding_complete', 'true');
      localStorage.removeItem('pulse_recovery_context');
    } catch (e) {}
    onNavigate('checkin');
  };

  const completedUpTo = step === 'complete' ? 3 : typeof step === 'number' ? (pending ? step : step - 1) : -1;

  const bubble = (role, text, key) => (
    <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: role === 'user' ? 'flex-end' : 'flex-start', gap: 6 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: role === 'user' ? 'row-reverse' : 'row', maxWidth: isMobile ? '92%' : '80%' }}>
        {role === 'assistant' ? <SparkAvatar /> : (
          <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }} />
        )}
        <div style={{ padding: '11px 15px', borderRadius: role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px', backgroundColor: role === 'user' ? C.primaryGradStart : C.card, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: role === 'user' ? '#fff' : C.foreground, margin: 0, textAlign: 'start' }}>{text}</p>
        </div>
      </div>
    </div>
  );

  const messages = [];
  messages.push(bubble('assistant', t.introBody, 'intro'));
  for (let i = 0; i <= completedUpTo; i++) {
    const field = OB_FIELDS[i];
    messages.push(bubble('assistant', t.q[field].prompt, field + '-q'));
    messages.push(bubble('user', summarize(field, answers[field]), field + '-a'));
    messages.push(bubble('assistant', getAck(field, answers[field]), field + '-ack'));
  }
  if (typeof step === 'number' && !pending) {
    const field = OB_FIELDS[step];
    messages.push(bubble('assistant', t.q[field].prompt, field + '-active'));
  }
  if (pending) {
    messages.push(
      <div key="thinking" style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <SparkAvatar />
        <div style={{ backgroundColor: C.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 0.2, 0.4].map((d, k) => <div key={k} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.mutedFg, animation: `ob-bounce 1.2s ease ${d}s infinite` }} />)}
          </div>
        </div>
      </div>
    );
  }
  if (step === 'complete') {
    messages.push(bubble('assistant', t.completeLine1, 'complete-1'));
    messages.push(bubble('assistant', t.completeLine2, 'complete-2'));
  }

  // ── Action panel (bottom) ──────────────────────────────────────────────
  let actionPanel = null;
  if (step === 'intro') {
    actionPanel = (
      <div>
        <button onClick={startOnboarding} style={{ width: '100%', padding: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,93,167,0.3)' }}>
          {t.introCta}
        </button>
        <button onClick={() => setSkipConfirmOpen(true)} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: C.mutedFg }}>
          {t.skipIntro}
        </button>
      </div>
    );
  } else if (typeof step === 'number' && !pending) {
    const field = OB_FIELDS[step];
    const opts = t.q[field].options;
    const multi = OB_MULTI[field];
    const max = field === 'currentPriorities' ? 3 : null;
    actionPanel = (
      <div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '0 0 12px', textAlign: 'start' }}>{max ? t.upTo3 : (multi ? t.pickAny : '')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: (isMobile ? '1fr' : 'repeat(2, 1fr)'), gap: 10, marginBottom: multi ? 18 : 12 }}>
          {opts.map(o => {
            const sel = multi ? draft.includes(o.id) : answers[field] === o.id;
            return (
              <button key={o.id} onClick={() => multi ? toggleMulti(field, o.id, max) : selectSingle(field, o.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${sel ? C.primary : C.border}`, backgroundColor: sel ? C.primaryLight : C.card, cursor: 'pointer', textAlign: 'start', transition: 'all 0.15s' }}>
                <Icon name={OB_ICONS[field][o.id]} size={16} color={sel ? C.primary : C.mutedFg} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: sel ? C.primary : C.foreground, flex: 1 }}>{o.label}</span>
                {sel && <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check" size={10} color="#fff" /></div>}
              </button>
            );
          })}
        </div>
        {field === 'primaryChallenge' && answers.primaryChallenge === 'other' && (
          <input value={otherNote} onChange={e => setOtherNote(e.target.value)}
            onBlur={() => setAnswers(a => ({ ...a, primaryChallengeNote: otherNote }))}
            placeholder={t.otherPlaceholder}
            style={{ width: '100%', padding: '10px 13px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', backgroundColor: C.bg, marginBottom: 14, textAlign: 'start' }} />
        )}
        {multi && (
          <button onClick={() => submitMulti(field)} disabled={draft.length === 0}
            style={{ width: '100%', padding: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', background: draft.length ? `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted, border: 'none', borderRadius: 10, cursor: draft.length ? 'pointer' : 'not-allowed', boxShadow: draft.length ? '0 4px 16px rgba(0,93,167,0.3)' : 'none', marginBottom: 10 }}>
            {t.continue}
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          {typeof step === 'number' && (
            <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: C.mutedFg, padding: '4px 2px' }}>
              {t.back}
            </button>
          )}
          <div style={{ textAlign: 'end' }}>
            <button onClick={() => skipQuestion(field)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.primary, padding: '4px 2px', display: 'block' }}>
              {t.skipQuestion}
            </button>
          </div>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: '6px 0 0', textAlign: 'end' }}>{t.skipHint}</p>
      </div>
    );
  } else if (step === 'complete') {
    actionPanel = (
      <button onClick={finish} style={{ width: '100%', padding: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,93,167,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {t.completeCta} <Icon name="arrowRight" size={16} color="#fff" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
      </button>
    );
  }

  const stepIndex = typeof step === 'number' ? step : step === 'complete' ? 4 : -1;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <header style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 20px' : '0 48px', backgroundColor: C.card, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={window.__resources?.pulseLogo || 'pulse-logo.webp'} alt="Pulse" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', color: C.logo }}>Pulse</span>
        </div>
        <LanguageSwitcher variant="header" />
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'center', padding: isMobile ? '20px 14px' : '32px 24px', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: 620, backgroundColor: C.card, borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', maxHeight: isMobile ? '100%' : '82vh', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '16px 20px 0' }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: i <= stepIndex ? C.primary : C.border, transition: 'background-color 0.2s' }} />
            ))}
          </div>
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages}
          </div>
          <div style={{ padding: isMobile ? '14px 16px 18px' : '16px 24px 22px', borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
            {actionPanel}
          </div>
        </div>
      </div>

      {skipConfirmOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
          <div style={{ width: '100%', maxWidth: 380, backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: C.foreground, margin: '0 0 8px', textAlign: 'start' }}>{t.skipConfirmTitle}</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.6, margin: '0 0 20px', textAlign: 'start' }}>{t.skipConfirmBody}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => setSkipConfirmOpen(false)} style={{ width: '100%', padding: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                {t.skipConfirmContinue}
              </button>
              <button onClick={skipEntireOnboarding} style={{ width: '100%', padding: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.mutedFg, background: 'none', border: 'none', cursor: 'pointer' }}>
                {t.skipConfirmSkip}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes ob-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}

Object.assign(window, { OnboardingScreen });
