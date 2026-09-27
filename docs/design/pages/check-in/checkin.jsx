
// checkin.jsx — original 4-step design, updated to match real color tokens

// ── Backfill calendar data ───────────────────────────────────
// "Today" inside the prototype's timeline is May 14, 2026.
// 12-day streak ⇒ May 2 – May 13 all logged; May 1 = the missed day eligible for backfill.
const TODAY = new Date(2026, 4, 14); // May 14, 2026
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtFull = (d) => `${DOW[d.getDay()]}, ${MONTH_LONG[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
const fmtShort = (d) => `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`;
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const daysAgo = (n) => { const d = new Date(TODAY); d.setDate(d.getDate() - n); return d; };

// Build last 14 days from today (index 0 = today)
const BACKFILL_DAYS = Array.from({ length: 14 }, (_, i) => {
  const date = daysAgo(i);
  let status;
  if (i === 0) status = 'today';            // not yet logged
  else if (i === 13) status = 'missed';     // May 1 — the gap before the current 12-day streak
  else status = 'logged';                   // May 2 – May 13 (and Apr 30 fills in further back if surfaced)
  return { date, status, daysAgo: i };
});

function CheckInScreen({ onNavigate }) {
  const { isMobile } = useBreakpoint();
  const [step, setStep] = React.useState(0); // 0-3 form, 4 = confirmation
  const [mood, setMood] = React.useState(7);
  const [pain, setPain] = React.useState(3);
  const [energy, setEnergy] = React.useState(6);
  const [activities, setActivities] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [customActivity, setCustomActivity] = React.useState('');
  const [customActivities, setCustomActivities] = React.useState([]);

  // Backfill: which date is this check-in for? null = today.
  const [checkInDate, setCheckInDate] = React.useState(() => {
    // Allow external entry (e.g. from Progress page) to deep-link a backfill date.
    try {
      const stash = window.__heBackfillDate;
      if (stash instanceof Date) { delete window.__heBackfillDate; return stash; }
    } catch (e) {}
    return TODAY;
  });
  const [dateOpen, setDateOpen] = React.useState(false);
  const isBackfill = !sameDay(checkInDate, TODAY);
  const dateBtnRef = React.useRef(null);

  // Close popover on outside click / Esc
  React.useEffect(() => {
    if (!dateOpen) return;
    const onDoc = (e) => { if (dateBtnRef.current && !dateBtnRef.current.contains(e.target)) setDateOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setDateOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [dateOpen]);

  const activityList = [
    { id: 'meditating', label: 'Meditating', icon: 'leaf' },
    { id: 'stretching', label: 'Stretching', icon: 'trendingUp' },
    { id: 'sleeping', label: 'Sleeping well', icon: 'moon' },
    { id: 'hydrated', label: 'Hydrated', icon: 'activity' },
    { id: 'eating', label: 'Healthy eating', icon: 'leaf' },
    { id: 'reading', label: 'Reading', icon: 'bookmark' },
    { id: 'exercise', label: 'Exercise', icon: 'dumbbell' },
    { id: 'therapy', label: 'Therapy', icon: 'messageCircle' },
  ];

  const toggleActivity = (id) => setActivities(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);

  const addCustomActivity = () => {
    const trimmed = customActivity.trim();
    if (!trimmed) return;
    const id = 'custom_' + trimmed.toLowerCase().replace(/\s+/g, '_');
    setCustomActivities(a => a.some(x => x.id === id) ? a : [...a, { id, label: trimmed, icon: 'sparkles' }]);
    setActivities(a => a.includes(id) ? a : [...a, id]);
    setCustomActivity('');
  };

  const steps = ['Mood & Energy', 'Pain Level', 'Activities & Reflection'];

  // ── Date selector popover (for backfilling past check-ins) ────
  function DateSelector() {
    const label = sameDay(checkInDate, TODAY)
      ? `Today · ${fmtShort(checkInDate)}`
      : `${fmtShort(checkInDate)}`;
    return (
      <div ref={dateBtnRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setDateOpen(o => !o)}
          aria-expanded={dateOpen}
          aria-label="Change check-in date"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 12px 7px 10px',
            borderRadius: 99,
            border: `1px solid ${isBackfill ? C.accent + '55' : C.border}`,
            backgroundColor: isBackfill ? C.accentLight : C.card,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
            color: isBackfill ? C.accent : C.foreground,
            transition: 'all 0.15s',
          }}
        >
          <Icon name="calendarCheck" size={14} color={isBackfill ? C.accent : C.mutedFg} />
          <span style={{ color: isBackfill ? C.accent : C.mutedFg, fontWeight: 500 }}>
            {isBackfill ? 'Backfilling' : 'For'}
          </span>
          <span>{label}</span>
          <Icon name={dateOpen ? 'chevronUp' : 'chevronDown'} size={12} color={isBackfill ? C.accent : C.mutedFg} />
        </button>

        {dateOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 20,
            width: 320, maxWidth: '90vw',
            backgroundColor: C.card,
            borderRadius: 14,
            border: `1px solid ${C.border}`,
            boxShadow: '0 12px 32px rgba(15,23,42,0.18)',
            padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground, margin: 0 }}>Check-in date</p>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>Last 14 days</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '0 0 12px', lineHeight: 1.5 }}>
              Forgot to log a day? Pick a missed day to backfill it.
            </p>

            {/* Day-of-week header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <span key={i} style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 10, color: C.mutedFg, fontWeight: 600 }}>{d}</span>
              ))}
            </div>

            {/* Calendar grid — 14 days arranged in 2 rows aligned to weekday */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {(() => {
                // Build 14 days in chronological order ending today
                const days = BACKFILL_DAYS.slice().reverse(); // oldest → today
                // Pad start so first day lands on its real weekday column
                const pad = days[0].date.getDay();
                const cells = [];
                for (let i = 0; i < pad; i++) cells.push({ pad: true, key: 'p' + i });
                days.forEach(d => cells.push({ ...d, key: d.date.toISOString() }));
                return cells.map(cell => {
                  if (cell.pad) return <div key={cell.key} />;
                  const selected = sameDay(cell.date, checkInDate);
                  const isToday = cell.status === 'today';
                  const isMissed = cell.status === 'missed';
                  const isLogged = cell.status === 'logged';

                  let bg = 'transparent';
                  let color = C.foreground;
                  let border = `1px solid transparent`;
                  let badge = null;
                  let cursor = 'pointer';

                  if (isLogged) {
                    bg = C.secondaryLight;
                    color = C.secondary;
                    badge = <Icon name="check" size={9} color={C.secondary} />;
                    cursor = 'not-allowed';
                  } else if (isMissed) {
                    bg = C.bg;
                    color = C.foreground;
                    border = `1.5px dashed ${C.accent}80`;
                  } else if (isToday) {
                    bg = C.primaryLight;
                    color = C.primary;
                  }

                  if (selected) {
                    bg = isMissed ? C.accent : C.primary;
                    color = '#fff';
                    border = `1px solid ${bg}`;
                  }

                  const disabled = isLogged && !selected;
                  return (
                    <button
                      key={cell.key}
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;
                        setCheckInDate(cell.date);
                        setDateOpen(false);
                      }}
                      title={
                        isLogged ? `${fmtFull(cell.date)} — already logged` :
                        isMissed ? `${fmtFull(cell.date)} — missed, tap to backfill` :
                        `${fmtFull(cell.date)} — today`
                      }
                      style={{
                        position: 'relative',
                        aspectRatio: '1 / 1',
                        borderRadius: 10,
                        border,
                        backgroundColor: bg,
                        color,
                        cursor: disabled ? 'not-allowed' : cursor,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 13,
                        fontWeight: isToday || selected ? 700 : 500,
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.1s',
                        opacity: disabled ? 0.85 : 1,
                      }}
                      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      {cell.date.getDate()}
                      {badge && !selected && (
                        <span style={{ position: 'absolute', top: 2, right: 2, width: 12, height: 12, borderRadius: '50%', backgroundColor: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                });
              })()}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 14, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
              {[
                { label: 'Today', dot: C.primary },
                { label: 'Logged', dot: C.secondary },
                { label: 'Missed', dot: C.accent, dashed: true },
              ].map(l => (
                <span key={l.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: l.dashed ? 'transparent' : l.dot, border: l.dashed ? `1.5px dashed ${l.dot}` : 'none' }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const getMoodLabel = v => {
    if (v <= 2) return '😞 Very low - feeling quite down';
    if (v <= 4) return '😐 Below average - managing but difficult';
    if (v <= 6) return '🙂 Moderate - doing okay';
    if (v <= 8) return '😊 Good - feeling positive';
    return '😄 Excellent - feeling great!';
  };
  const getPainLabel = v => {
    if (v <= 2) return '✓ Minimal - barely noticeable';
    if (v <= 4) return '⚡ Mild - manageable discomfort';
    if (v <= 6) return '⚠ Moderate - affecting daily activities';
    if (v <= 8) return '🔴 Significant - difficult to ignore';
    return '🚨 Severe - please contact your care team';
  };

  function SliderInput({ label, value, onChange, color, getLabelFn }) {
    const pct = ((value - 1) / 9) * 100;
    return (
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground }}>{label}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color }}>
            {value}<span style={{ fontWeight: 400, fontSize: 14, color: C.mutedFg }}>/10</span>
          </span>
        </div>
        {getLabelFn && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '0 0 10px', lineHeight: 1.5 }}>{getLabelFn(value)}</p>
        )}
        <div style={{ height: 6, backgroundColor: C.muted, borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ width: pct + '%', height: '100%', backgroundColor: color, borderRadius: 99, transition: 'width 0.1s' }}/>
        </div>
        <input type="range" min={1} max={10} value={value} onChange={e => onChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: color, cursor: 'pointer', display: 'block' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>1</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>10</span>
        </div>
      </div>
    );
  }

  // Share modal state for the confirmation screen
  const [showShare, setShowShare] = React.useState(false);

  const sharePayload = {
    kind: 'Daily Check-In',
    accent: '#005da7',
    headline: `Day 142 check-in complete`,
    subhead: `Mood ${mood}/10 · Pain ${pain}/10 · Energy ${energy}/10`,
    stats: [
      { label: 'Mood', value: `${mood}/10` },
      { label: 'Pain', value: `${pain}/10` },
      { label: 'Energy', value: `${energy}/10` },
      { label: 'Activities', value: String(activities.length) },
    ],
    note: notes ? notes.slice(0, 140) : 'Showing up for myself, one day at a time.',
  };

  // ── Confirmation screen ──────────────────────────────────────
  if (step === 3) {
    return (
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
        <TopBar title="Daily Check-In" onNavigate={onNavigate} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: isBackfill ? C.accentLight : C.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name={isBackfill ? 'calendarCheck' : 'check'} size={32} color={isBackfill ? C.accent : C.secondary} />
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 28, color: C.foreground, marginBottom: 10 }}>
              {isBackfill ? 'Backfill complete!' : 'Check-In Complete!'}
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, marginBottom: 20 }}>
              {isBackfill
                ? `Thanks for filling in ${fmtFull(checkInDate)}. Your history is now complete through that day.`
                : `Great work, Alex. Your data has been recorded. Keep up the streak — you're on day 142!`}
            </p>

            {/* "For" date chip */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, backgroundColor: isBackfill ? C.accentLight : C.primaryLight, marginBottom: 22 }}>
              <Icon name="calendarCheck" size={12} color={isBackfill ? C.accent : C.primary} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: isBackfill ? C.accent : C.primary }}>
                {isBackfill ? 'Backfilled for' : 'For'} {fmtShort(checkInDate)}
              </span>
            </div>

            <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 16, textAlign: 'left' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, marginBottom: 14 }}>Today's Summary</h4>
              {[
                { label: 'Mood', value: mood + '/10', color: C.mood },
                { label: 'Pain', value: pain + '/10', color: pain > 6 ? C.destructive : C.pain },
                { label: 'Energy', value: energy + '/10', color: C.energy },
                { label: 'Activities', value: activities.length + ' logged', color: C.secondary },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg }}>{row.label}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: row.color }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: C.accentLight, borderRadius: 12, padding: 16, marginBottom: 24, textAlign: 'left', border: `1px solid ${C.accent}20` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon name="sparkles" size={14} color={C.accent} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', color: C.accent, textTransform: 'uppercase' }}>AI Observation</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 13, color: C.foreground, lineHeight: 1.65, margin: 0 }}>
                "Your pain level decreased from yesterday. The activities you logged today correlate with improved mood scores historically."
              </p>
            </div>

            {/* Primary action: share progress */}
            <ShareProgressButton onClick={() => setShowShare(true)} label="Share Progress" />

            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              <button onClick={() => onNavigate('dashboard')} style={{ flex: 1, padding: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.mutedFg, backgroundColor: C.muted, border: 'none', borderRadius: 10, cursor: 'pointer' }}>
                Back to Dashboard
              </button>
              <button onClick={() => onNavigate('progress')} style={{ flex: 1, padding: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.primary, backgroundColor: C.primaryLight, border: 'none', borderRadius: 10, cursor: 'pointer' }}>
                View Progress
              </button>
            </div>
          </div>
        </div>
        {showShare && <ShareProgressModal payload={sharePayload} onClose={() => setShowShare(false)} />}
      </div>
    );
  }

  // ── Multi-step form ──────────────────────────────────────────
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopBar title="Daily Check-In" subtitle="Your recovery data" onNavigate={onNavigate} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: isMobile ? '16px 12px' : '28px 24px' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>

          {/* Date selector — defaults to today, supports backfilling missed days */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <DateSelector />
            {isBackfill && (
              <button
                onClick={() => setCheckInDate(TODAY)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                  color: C.mutedFg, padding: '4px 8px',
                }}
              >
                ← Switch to today
              </button>
            )}
          </div>

          {/* Backfill banner */}
          {isBackfill && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 14px',
              backgroundColor: C.accentLight,
              border: `1px solid ${C.accent}33`,
              borderRadius: 12,
              marginBottom: 20,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="calendarCheck" size={14} color={C.accent} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.accent, margin: '0 0 2px' }}>
                  Backfilling {fmtFull(checkInDate)}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.5 }}>
                  Log how you remember feeling. We'll mark this entry as backfilled — your streak and AI reflection still count.
                </p>
              </div>
            </div>
          )}

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ height: 3, borderRadius: 99, backgroundColor: i <= step ? C.primary : C.border, transition: 'background 0.3s' }}/>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: i === step ? 600 : 400, color: i === step ? C.primary : C.mutedFg }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Card */}
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: isMobile ? 20 : 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 4px' }}>Step {step + 1} of {steps.length}</p>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: C.foreground, margin: 0 }}>{steps[step]}</h3>
            </div>

            {/* Step 0: Mood & Energy */}
            {step === 0 && (
              <div>
                <SliderInput label="How's your mood today?" value={mood} onChange={setMood} color={C.mood}
                  getLabelFn={getMoodLabel} />
                <SliderInput label="Energy level" value={energy} onChange={setEnergy} color={C.energy}
                  getLabelFn={v => v <= 3 ? '💤 Very fatigued' : v <= 6 ? '⚡ Moderate energy' : '✨ Feeling energized'} />
              </div>
            )}

            {/* Step 1: Pain */}
            {step === 1 && (
              <div>
                <SliderInput label="Pain or discomfort level" value={pain} onChange={setPain}
                  color={pain > 6 ? C.destructive : C.pain} getLabelFn={getPainLabel} />
                <div style={{ backgroundColor: C.bg, borderRadius: 10, padding: 14, border: `1px solid ${C.border}` }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0, lineHeight: 1.6 }}>
                    💡 <strong>Tip:</strong> If your pain level is above 7, consider contacting your care team today.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Activities & Reflection */}
            {step === 2 && (
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, marginBottom: 16 }}>Select all activities you engaged in today:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 }}>
                  {[...activityList, ...customActivities].map(a => {
                    const sel = activities.includes(a.id);
                    return (
                      <button key={a.id} onClick={() => toggleActivity(a.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
                        borderRadius: 10, border: `1.5px solid ${sel ? C.primary : C.border}`,
                        backgroundColor: sel ? C.primaryLight : C.card, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                      }}>
                        <Icon name={a.icon} size={16} color={sel ? C.primary : C.mutedFg} />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: sel ? C.primary : C.foreground, flex: 1 }}>{a.label}</span>
                        {sel && (
                          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon name="check" size={10} color="#fff" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Custom activity input */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                  <input
                    type="text"
                    value={customActivity}
                    onChange={e => setCustomActivity(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomActivity()}
                    placeholder="Add custom activity…"
                    style={{ flex: 1, padding: '9px 13px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', backgroundColor: C.bg }}
                  />
                  <button onClick={addCustomActivity} style={{ padding: '9px 16px', borderRadius: 10, border: 'none', backgroundColor: C.primaryLight, color: C.primary, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    + Add
                  </button>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, marginBottom: 6 }}>Reflection <span style={{ fontWeight: 400, color: C.mutedFg }}>(optional)</span></p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, marginBottom: 10 }}>Any additional thoughts or observations about today?</p>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder="E.g. Felt anxious in the morning but the walk helped. Had a good therapy session today..."
                    style={{ width: '100%', minHeight: 100, padding: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, lineHeight: 1.7, border: `1.5px solid ${C.border}`, borderRadius: 10, outline: 'none', resize: 'vertical', boxSizing: 'border-box', backgroundColor: C.bg }} />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                    {['Felt grateful today', 'Struggled with cravings', 'Good support from family', 'Challenging day'].map(prompt => (
                      <button key={prompt} onClick={() => setNotes(n => n + (n ? ' ' : '') + prompt)}
                        style={{ padding: '5px 12px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.mutedFg; }}>
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.mutedFg, backgroundColor: C.muted, border: 'none', borderRadius: 10, cursor: 'pointer' }}>
                  Back
                </button>
              )}
              <button onClick={() => step < 2 ? setStep(s => s + 1) : setStep(3)}
                style={{ flex: 2, padding: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,93,167,0.2)' }}>
                {step < 2 ? 'Continue' : 'Submit Check-In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CheckInScreen });
