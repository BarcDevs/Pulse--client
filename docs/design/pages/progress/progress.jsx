// progress.jsx — matches ProgressContent.tsx exactly

function LineChart({ data, color = '#4a90e2', height = 160, labels, tipLabels, unit = '' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const VW = 500,VH = height;
  const PAD = { top: 12, bottom: labels ? 0 : 8, left: 4, right: 4 };
  const n = data.length;
  const xOf = (i) => PAD.left + i / (n - 1) * (VW - PAD.left - PAD.right);
  const yOf = (v) => PAD.top + (1 - (v - min) / range) * (VH - PAD.top - PAD.bottom - 8);
  const pts = data.map((v, i) => [xOf(i), yOf(v)]);

  // Smooth bezier
  let pathD = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1][0] + pts[i][0]) / 2;
    pathD += ` C ${cpx} ${pts[i - 1][1]}, ${cpx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
  }
  const areaD = pathD + ` L ${pts[pts.length - 1][0]} ${VH} L ${pts[0][0]} ${VH} Z`;
  const gradId = `pg${color.replace(/[^a-z0-9]/gi, '')}`;

  const svgRef = React.useRef(null);
  const [hoverIdx, setHoverIdx] = React.useState(null);

  const handleMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * VW;
    const innerW = VW - PAD.left - PAD.right;
    const frac = Math.max(0, Math.min(1, (px - PAD.left) / innerW));
    const idx = Math.round(frac * (n - 1));
    setHoverIdx(idx);
  };

  const activeIdx = hoverIdx;
  const tipW = 56,tipH = 22;

  return (
    <div>
      <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`}
      style={{ width: '100%', height: VH, display: 'block', cursor: 'crosshair' }}
      onMouseMove={handleMove}
      onMouseLeave={() => setHoverIdx(null)}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid lines */}
        {[0, 0.33, 0.66, 1].map((t, i) => {
          const y = PAD.top + t * (VH - PAD.top - PAD.bottom - 8);
          return <line key={i} x1={PAD.left} x2={VW - PAD.right} y1={y} y2={y} stroke="#e5e9eb" strokeWidth="0.8" />;
        })}
        <path d={areaD} fill={`url(#${gradId})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Hover guideline */}
        {activeIdx != null &&
        <line x1={xOf(activeIdx)} x2={xOf(activeIdx)}
        y1={PAD.top} y2={VH - PAD.bottom - 4}
        stroke="#c1c7d3" strokeWidth="1" strokeDasharray="3 3" />
        }
        {pts.map((p, i) => {
          const isLast = i === pts.length - 1;
          const isHover = activeIdx === i;
          return (
            <g key={i}>
              {(isLast || isHover) && <circle cx={p[0]} cy={p[1]} r="8" fill={color} fillOpacity="0.14" />}
              <circle cx={p[0]} cy={p[1]} r={isLast || isHover ? 4.5 : 3}
              fill={isLast || isHover ? color : '#fff'} stroke={color} strokeWidth="2" />
            </g>);

        })}
        {/* Tooltip */}
        {activeIdx != null && (() => {
          const tipLabel = tipLabels && tipLabels[activeIdx] ? tipLabels[activeIdx] : labels && labels[activeIdx];
          const valStr = `${data[activeIdx]}${unit}`;
          const text = tipLabel ? `${tipLabel} · ${valStr}` : valStr;
          const dynTipW = Math.max(56, text.length * 5.7 + 14);
          const tx = xOf(activeIdx);
          const ty = yOf(data[activeIdx]);
          const tipX = Math.min(Math.max(tx - dynTipW / 2, 2), VW - dynTipW - 2);
          const tipY = Math.max(PAD.top - 4, ty - tipH - 10);
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tipX} y={tipY} width={dynTipW} height={tipH} rx="5" fill={color} />
              <text x={tipX + dynTipW / 2} y={tipY + 14} textAnchor="middle"
              fill="#fff" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700">
                {text}
              </text>
            </g>);

        })()}
      </svg>
      {labels &&
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 2px 0' }}>
          {labels.map((l, i) => {
          const step = Math.max(1, Math.ceil(n / 7));
          const show = i % step === 0 || i === n - 1 || activeIdx === i;
          return (
            <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: activeIdx === i ? C.foreground : C.mutedFg, fontWeight: activeIdx === i ? 600 : 400, visibility: show ? 'visible' : 'hidden' }}>{l}</span>);

        })}
        </div>
      }
    </div>);

}

// ─────────────────────────────────────────────────────────────────
// Check-In History — collapsible per-day entries
// ─────────────────────────────────────────────────────────────────

const HISTORY_ENTRIES = [
{
  date: 'Wed, May 13, 2026',
  relative: 'Yesterday',
  mood: 7, pain: 3, energy: 8,
  activities: [
  { label: 'Stretching', icon: 'trendingUp' },
  { label: 'Hydrated', icon: 'activity' },
  { label: 'Sleeping well', icon: 'moon' },
  { label: 'Reading', icon: 'bookmark' }],

  notes: 'Slept solidly through the night for the first time in a while. Morning stretch felt easier — knees didn\'t lock up the way they did last week. Went for a short walk after lunch.',
  reflection: 'Your sleep quality is clearly translating to lower morning pain. Three of your last four 7+ mood days followed nights you logged "Sleeping well." Consider treating bedtime as part of your recovery routine, not just rest.'
},
{
  date: 'Tue, May 12, 2026',
  relative: '2 days ago',
  mood: 6, pain: 4, energy: 6,
  activities: [
  { label: 'Meditating', icon: 'leaf' },
  { label: 'Healthy eating', icon: 'leaf' }],

  notes: 'Felt a bit foggy in the afternoon. Pushed through with a 10-minute breathing session. Skipped the evening walk — wanted to but couldn\'t convince myself.',
  reflection: 'Even on lower-energy days, you chose meditation over disengaging entirely. That\'s a recovery signal worth noticing. The skipped walk isn\'t a setback — it\'s pacing.'
},
{
  date: 'Mon, May 11, 2026',
  relative: '3 days ago',
  mood: 5, pain: 5, energy: 5,
  activities: [
  { label: 'Stretching', icon: 'trendingUp' }],

  notes: 'Tough morning. Pain woke me up around 4am and I didn\'t fall back asleep until almost 6. Still managed to do the prescribed stretches before work.',
  reflection: 'Hard days are part of the curve, not a deviation from it. You still showed up for your stretches — that\'s the discipline your care team flagged as a strong predictor of long-term outcomes.'
},
{
  date: 'Sun, May 10, 2026',
  relative: '4 days ago',
  mood: 8, pain: 2, energy: 9,
  activities: [
  { label: 'Stretching', icon: 'trendingUp' },
  { label: 'Hydrated', icon: 'activity' },
  { label: 'Sleeping well', icon: 'moon' },
  { label: 'Healthy eating', icon: 'leaf' },
  { label: 'Reading', icon: 'bookmark' },
  { label: 'Family time', icon: 'sparkles' }],

  notes: 'Best day in weeks. Spent the afternoon outside with the family, no pain flare-ups. Sleep, food, movement — everything lined up.',
  reflection: 'This is what a "green" day looks like for you: sleep + hydration + light movement + social connection stacked together. Worth bookmarking for the next time you need a reminder that consistency compounds.'
},
{
  date: 'Sat, May 9, 2026',
  relative: '5 days ago',
  mood: 7, pain: 3, energy: 7,
  activities: [
  { label: 'Stretching', icon: 'trendingUp' },
  { label: 'Hydrated', icon: 'activity' },
  { label: 'Reading', icon: 'bookmark' }],

  notes: 'Calm Saturday. Did the longer stretch routine for the first time since last month — it felt achievable.',
  reflection: 'Progressing from the short to the longer stretch routine without flare-up is a real milestone. Your tolerance is building gradually, which is the goal.'
},
{
  date: 'Fri, May 8, 2026',
  relative: '6 days ago',
  mood: 6, pain: 4, energy: 6,
  activities: [
  { label: 'Meditating', icon: 'leaf' },
  { label: 'Hydrated', icon: 'activity' }],

  notes: 'End-of-week fatigue hit harder than expected. Kept things light, stuck to the basics.',
  reflection: 'You\'re learning to read the difference between productive rest and avoidance. Friday\'s entry reads like the former.'
}];


function MetricPill({ label, value, color, bg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, padding: '6px 10px', borderRadius: 8, backgroundColor: bg }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: C.mutedFg, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color }}>{value}</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>/10</span>
    </div>);

}

function CheckInHistoryItem({ entry, isLast }) {
  const [open, setOpen] = React.useState(false);
  const NOTE_LIMIT = 110;
  const truncated = entry.notes.length > NOTE_LIMIT;
  const notePreview = truncated && !open ? entry.notes.slice(0, NOTE_LIMIT).trimEnd() + '…' : entry.notes;

  return (
    <div style={{ padding: '20px 4px', borderBottom: isLast ? 'none' : `1px solid ${C.border}` }}>
      {/* Header row: date + metrics */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 140 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 2px' }}>{entry.date}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{entry.relative}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <MetricPill label="Mood" value={entry.mood} color={C.mood} bg={C.moodLight} />
          <MetricPill label="Pain" value={entry.pain} color={C.pain} bg={C.painLight} />
          <MetricPill label="Energy" value={entry.energy} color={C.energy} bg={C.energyLight} />
        </div>
      </div>

      {/* Activity chips */}
      {entry.activities.length > 0 &&
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {entry.activities.map((a, i) =>
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 9px', borderRadius: 999,
          backgroundColor: C.muted, border: `1px solid ${C.border}`,
          fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.foreground, fontWeight: 500
        }}>
              <Icon name={a.icon} size={11} color={C.mutedFg} />
              {a.label}
            </span>
        )}
        </div>
      }

      {/* Notes preview */}
      {entry.notes &&
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.6, color: C.foreground, margin: '12px 0 0', textWrap: 'pretty' }}>
          {notePreview}
        </p>
      }

      {/* Expand toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 12, padding: '6px 10px 6px 4px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
          color: open ? C.primary : C.mutedFg
        }}>
        
        <Icon name="sparkles" size={12} color={open ? C.primary : C.mutedFg} />
        {open ? 'Hide AI reflection' : 'View AI reflection'}
        <Icon name={open ? 'chevronUp' : 'chevronDown'} size={12} color={open ? C.primary : C.mutedFg} />
      </button>

      {/* Expanded reflection */}
      {open &&
      <div style={{
        marginTop: 8, padding: '14px 16px',
        backgroundColor: C.primaryLight,
        borderLeft: `3px solid ${C.primary}`,
        borderRadius: 8
      }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: C.primary, margin: '0 0 6px', textTransform: 'uppercase' }}>
            Reflection for this day
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: C.foreground, margin: 0, fontStyle: 'italic', textWrap: 'pretty' }}>
            "{entry.reflection}"
          </p>
        </div>
      }
    </div>);

}

function ProgressScreen({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [shareOpen, setShareOpen] = React.useState(false);
  const [period, setPeriod] = React.useState({ kind: 'week' });
  const { mood: moodSeries, pain: painSeries, energy: energySeries } = dataForPeriod(period);
  const dayLabels = moodSeries.map((p) => p.label);
  const tipLabels = moodSeries.map((p) => p.tipLabel || p.label);
  const moodData = moodSeries.map((p) => p.val);
  const painData = painSeries.map((p) => p.val);
  const energyData = energySeries.map((p) => p.val);

  const trendOf = (arr) => {
    if (arr.length < 2) return 0;
    const first = arr.slice(0, Math.ceil(arr.length / 2)).reduce((a, b) => a + b, 0) / Math.ceil(arr.length / 2);
    const last = arr.slice(Math.floor(arr.length / 2)).reduce((a, b) => a + b, 0) / Math.ceil(arr.length / 2);
    return last - first;
  };
  const moodTrend = trendOf(moodData);
  const painTrend = trendOf(painData);
  const energyTrend = trendOf(energyData);

  // Milestones = phases from Recovery Goals (source of truth: goals.jsx).
  // Each card maps to an actual goal phase, not a generic achievement badge.
  const milestones = [
  { icon: 'dumbbell', goal: 'Morning Mobility', title: 'Assess baseline flexibility', status: 'Completed Mar 14', state: 'done', iconBg: C.primaryLight, iconColor: C.primary },
  { icon: 'brain', goal: 'Mindful Reflection', title: 'Guided 7-day program', status: 'Completed Mar 26', state: 'done', iconBg: C.accentLight, iconColor: C.accent },
  { icon: 'users', goal: 'Community Engagement', title: 'Share & contribute', status: 'Completed Apr 29', state: 'done', iconBg: C.secondaryLight, iconColor: C.secondary },
  { icon: 'lightbulb', goal: 'Mindful Reflection', title: 'Reach a 14-day streak', status: 'Day 5 of 14', state: 'active', iconBg: '#FEF3C7', iconColor: C.warning }];


  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title="Progress" subtitle="Your recovery journey" onNavigate={onNavigate} />
      <div style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>

        {/* Page action bar — global share */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: -4 }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 4px', textTransform: 'uppercase' }}>Recovery snapshot</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, margin: 0 }}>Share where you are right now with your community or care team.</p>
          </div>
          <ShareProgressButton onClick={() => setShareOpen(true)} label="Share Progress" />
        </div>

        {/* Top Row — Stats (2/3) + Wellness Score (1/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '2fr 1fr', gap: isMobile ? 16 : 24 }}>
          {/* Stats: Current Streak + Total Milestones */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {/* Current Streak */}
            <div style={{ borderRadius: 16, backgroundColor: C.card, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>Current Streak</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 40, color: C.foreground, lineHeight: 1 }}>12</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: C.mutedFg }}>days</span>
                  </div>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="flame" size={24} color={C.warning} />
                </div>
              </div>
              {/* Last 14 days dot strip */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: C.mutedFg, textTransform: 'uppercase' }}>Last 14 days</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>13/14 checked in</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3 }}>
                  {[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((d, i) =>
                  <div key={i} style={{ height: 22, borderRadius: 4, backgroundColor: d ? i >= 2 ? C.warning : '#FBBF24' : C.border, opacity: d ? i >= 2 ? 1 : 0.5 : 1 }} />
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="award" size={13} color={C.secondary} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>Personal best</span>
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground }}>24 days</span>
              </div>
            </div>
            {/* Total Milestones */}
            <div style={{ borderRadius: 16, backgroundColor: C.card, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>GOAL STEPS</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 40, color: C.foreground, lineHeight: 1 }}>6</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg }}>of 11</span>
                  </div>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="target" size={24} color={C.accent} />
                </div>
              </div>
              {/* Milestone breakdown bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: C.mutedFg, textTransform: 'uppercase' }}>Across 3 goals</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>55% complete</span>
                </div>
                <div style={{ display: 'flex', height: 8, borderRadius: 99, overflow: 'hidden', backgroundColor: C.border }}>
                  <div style={{ width: '55%', backgroundColor: C.accent }} />
                  <div style={{ width: '18%', backgroundColor: C.accent, opacity: 0.45 }} />
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: C.accent }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>6 done</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: C.accent, opacity: 0.45 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>2 in progress</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: C.border }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>3 upcoming</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="flag" size={13} color={C.primary} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>Next up</span>
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground }}>150 days clean</span>
              </div>
            </div>
          </div>

          {/* Wellness Score */}
          <div style={{ borderRadius: 16, backgroundColor: C.card, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 4px', textTransform: 'uppercase' }}>Weekly Wellness Average</p>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, color: C.foreground, margin: 0 }}>Stable & Improving</h3>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg }}>vs last week</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: 16 }}>
              {[
              { label: 'Mood', val: '6.2', trend: 'Trending up', color: C.mood, icon: 'smile' },
              { label: 'Pain', val: '7.8', trend: 'Improved', color: C.pain, icon: 'activity' },
              { label: 'Energy', val: '8.1', trend: 'Rising', color: C.energy, icon: 'flame' }].
              map((s) =>
              <div key={s.label}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, margin: '0 0 4px' }}>
                    <Icon name={s.icon} size={13} color={s.color} />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.06em', color: C.mutedFg, margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 28, color: C.foreground }}>{s.val}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', color: C.mutedFg, fontSize: 13 }}>/ 10</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <Icon name="trendingUp" size={12} color={s.color} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: s.color }}>{s.trend}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: -8 }}>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: 0 }}>Trends</h3>
          <PeriodPicker value={period} onChange={setPeriod} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr', gap: isMobile ? 16 : 24 }}>
          {[
          { title: 'Mood Trend', data: moodData, color: C.mood, latest: `${moodData[moodData.length - 1]}/10`, trend: moodTrend, up: 'Trending up', down: 'Trending down', flat: 'Holding steady', desirable: 'up' },
          { title: 'Pain Intensity', data: painData, color: C.pain, latest: `${painData[painData.length - 1]}/10`, trend: painTrend, up: 'Increasing', down: 'Decreasing', flat: 'Stable', desirable: 'down' },
          { title: 'Energy Levels', data: energyData, color: C.energy, latest: `${energyData[energyData.length - 1]}/10`, trend: energyTrend, up: 'Rising', down: 'Declining', flat: 'Holding steady', desirable: 'up' }].
          map((chart, idx) => {
            const dir = Math.abs(chart.trend) < 0.4 ? 'flat' : chart.trend > 0 ? 'up' : 'down';
            const desc = dir === 'flat' ? chart.flat : dir === 'up' ? chart.up : chart.down;
            return (
              <div key={chart.title} style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.foreground, margin: '0 0 2px' }}>{chart.title}</h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{desc}</p>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: chart.color }}>{chart.latest}</span>
                </div>
                <LineChart data={chart.data} color={chart.color} height={140} labels={dayLabels} tipLabels={tipLabels} />
              </div>);

          })}
        </div>

        {/* Recovery Goal Milestones — pulled from goals.jsx phases */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: '0 0 4px' }}>Recovery Goal Milestones</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>Phases you've completed (and what's up next) across your goals.</p>
            </div>
            <button onClick={() => onNavigate('goals')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>See all goals →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16 }}>
            {milestones.map((m, i) => {
              const isActive = m.state === 'active';
              return (
                <button key={i} onClick={() => onNavigate('goals')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', borderRadius: 14, padding: 20, backgroundColor: C.muted, border: isActive ? `1.5px solid ${m.iconColor}55` : '1.5px solid transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: m.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={m.icon} size={20} color={m.iconColor} />
                    </div>
                    {isActive ?
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: m.iconColor, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 99, backgroundColor: m.iconBg }}>In progress</span> :

                    <Icon name="check" size={16} color={C.secondary} />
                    }
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: C.mutedFg, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>{m.goal}</p>
                  <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 6px', lineHeight: 1.35 }}>{m.title}</h5>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{m.status}</p>
                </button>);

            })}
          </div>
        </div>

        {/* Recovery Insight */}
        <div style={{ background: `linear-gradient(135deg, ${C.primaryGradStart}, #1e3a8a)`, borderRadius: 16, padding: 24, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon name="sparkles" size={16} color="rgba(255,255,255,0.8)" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Recovery Insight</span>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: '#fff', margin: '0 0 16px', maxWidth: 640 }}>
            "Your mood is <strong>20% higher</strong> on days you stretch. You've also maintained a consistent sleep schedule for 8 of the last 10 days — a key driver of reduced pain scores."
          </p>
          <button onClick={() => onNavigate('insights')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            View Full Insights <Icon name="arrowRight" size={14} color="#fff" />
          </button>
        </div>

        {/* Check-In History — detailed historical entries (last section) */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: '24px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: '0 0 4px' }}>Check-In History</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>
                A day-by-day log of how you've been feeling. Tap a card to see the AI reflection for that day.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => {
                  try {window.__heBackfillDate = null;} catch (e) {}
                  onNavigate('checkin');
                }}
                title="Log a check-in for a past day"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 12px',
                  border: `1px solid ${C.border}`,
                  borderRadius: 99,
                  backgroundColor: C.card,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                  color: C.foreground,
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {e.currentTarget.style.borderColor = C.primary;e.currentTarget.style.color = C.primary;}}
                onMouseLeave={(e) => {e.currentTarget.style.borderColor = C.border;e.currentTarget.style.color = C.foreground;}}>
                
                <Icon name="calendarCheck" size={12} color="currentColor" />
                Add past check-in
              </button>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.primary, fontWeight: 600, cursor: 'pointer' }}>
                View all →
              </span>
            </div>
          </div>
          <div>
            {HISTORY_ENTRIES.map((entry, i) =>
            <CheckInHistoryItem key={i} entry={entry} isLast={false} />
            )}
            {/* Missed-day backfill row — surfaces the gap before the current streak */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 16, flexWrap: 'wrap',
              padding: '18px 16px',
              marginTop: 6,
              backgroundColor: C.bg,
              border: `1.5px dashed ${C.accent}66`,
              borderRadius: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="calendarCheck" size={16} color={C.accent} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.foreground, margin: '0 0 2px' }}>
                    Fri, May 1, 2026 · Missed
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.5 }}>
                    No entry for this day. Backfill it to complete your history.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  try {window.__heBackfillDate = new Date(2026, 4, 1);} catch (e) {}
                  onNavigate('checkin');
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: 99,
                  backgroundColor: C.accent,
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(124,77,255,0.25)'
                }}>
                
                Backfill this day <Icon name="arrowRight" size={12} color="#fff" />
              </button>
            </div>
          </div>
        </div>

      </div>
      <AppFooter onNavigate={onNavigate} />
      {shareOpen && <ShareProgressModal payload={{
        kind: 'Recovery Snapshot',
        accent: '#005da7',
        headline: 'Day 142 of recovery',
        subhead: 'A snapshot of where I am right now.',
        stats: [
        { label: 'Streak', value: '12d' },
        { label: 'Mood avg', value: '8/10' },
        { label: 'Pain avg', value: '3/10' },
        { label: 'Milestones', value: '6' }],

        note: 'Small steps, every single day.'
      }} onClose={() => setShareOpen(false)} />}
    </div>);

}

Object.assign(window, { ProgressScreen, LineChart });