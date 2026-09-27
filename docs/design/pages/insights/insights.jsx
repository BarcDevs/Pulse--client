
// insights.jsx — Insights page
// Repositioned per product direction:
//  - Softer, non-clinical correlation language ("tends to", "often coincides with")
//  - Removed AI forecasting, generic recommendations, export, vanity scores
//  - Added Recovery Reflection Timeline + Similar Journeys
//  - Simplified Behavioral Patterns to a clean insight feed
//  - Weekly summary is a narrative, not a KPI dashboard

function InsightsScreen({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title="Insights" subtitle="Patterns and reflections from your recovery journey" onNavigate={onNavigate} />
      <div style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24, maxWidth: 1240, margin: '0 auto' }}>

        {/* ─── Hero observation + Milestone ──────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '2fr 1fr', gap: isMobile ? 16 : 24 }}>
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: C.primaryLight, padding: '5px 12px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <Icon name="sparkles" size={12} color={C.primary} /> A pattern we noticed
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>Based on your last 28 days</span>
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 26, color: C.foreground, lineHeight: 1.35, margin: '0 0 14px', textWrap: 'pretty' }}>
              Your mornings tend to feel calmer on days that start with mobility stretching.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, margin: '0 0 22px', maxWidth: 580 }}>
              On the 11 mornings you logged a stretch session this month, your check-in mood was, on average, a little higher than the mornings you skipped it. It often coincides with steadier energy through the afternoon.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Add to morning routine</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
                Not relevant for me
              </button>
            </div>
          </div>

          {/* Next milestone — pulled from Recovery Goals */}
          <button onClick={() => onNavigate && onNavigate('goals')} style={{ background: `linear-gradient(135deg, ${C.primaryGradStart}, #1e3a8a)`, borderRadius: 16, padding: 24, color: '#fff', display: 'flex', flexDirection: 'column', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Icon name="target" size={15} color="rgba(255,255,255,0.85)" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.78)', textTransform: 'uppercase' }}>Next milestone</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '0 0 4px' }}>Mindful Reflection</p>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>Reach a 14-day journaling streak</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: '0 0 18px', lineHeight: 1.6 }}>You're 5 days in. Keep tonight's entry short if you need to — it still counts.</p>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ height: 6, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ width: '35.7%', height: '100%', backgroundColor: '#7CF8DD', borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.78)', margin: 0 }}>Day 5 of 14</p>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.78)' }}>View goal →</span>
              </div>
            </div>
          </button>
        </div>

        {/* ─── Recovery Reflection (NEW) ─────────────────────────────── */}
        <div style={{ position: 'relative', backgroundColor: C.card, borderRadius: 16, padding: '28px 28px 28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderLeft: `3px solid ${C.secondary}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: 0 }}>Looking back</h4>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>From your journal — Apr 27, 2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>Three weeks ago</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                "Honestly I don't know if I'll ever walk to the corner without my knee screaming. It feels stuck."
              </p>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: C.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="arrowRight" size={16} color={C.secondary} />
            </div>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: C.secondary, margin: '0 0 8px', textTransform: 'uppercase' }}>This week</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.7, margin: 0 }}>
                You completed <strong>four walks</strong>, the longest was <strong>22 minutes</strong>, and your pain on those days averaged <strong>2 / 10</strong> lower than three weeks ago.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0, lineHeight: 1.6 }}>You've come further than it might feel on the hard days.</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: 'transparent', color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>
              <Icon name="bookmark" size={14} color={C.mutedFg} /> Save this reflection
            </button>
          </div>
        </div>

        {/* ─── Things to keep an eye on (Interventions, expanded) ────── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: 0 }}>Things to keep an eye on</h4>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg }}>3 gentle nudges</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 16 }}>
            <InterventionCard
              tint={C.painLight + '60'}
              iconBg={C.painLight}
              accent={C.pain}
              icon="activity"
              kicker="Pain trend"
              title="Pain felt higher today"
              body="Your last three check-ins ran a bit above your 14-day baseline, and sleep was shorter on those nights too."
              cta="Add detail to today's check-in"
            />
            <InterventionCard
              tint="#FFFBEB"
              iconBg="#FEF3C7"
              accent={C.warning}
              icon="users"
              kicker="Quieter week"
              title="You've stepped back from community"
              body="You usually post or react in your circle every couple of days. It's been six. Totally fine — just flagging it in case it's not on purpose."
              cta="Peek at your circle"
            />
            <InterventionCard
              tint={C.secondaryLight + '80'}
              iconBg={C.secondaryLight}
              accent={C.secondary}
              icon="flame"
              kicker="Streak protection"
              title="Your check-in streak is at risk"
              body="You usually check in before 11 AM. If today gets away from you, a 10-second mood tap still keeps it alive."
              cta="Quick check-in"
            />
          </div>
        </div>

        {/* ─── This week, in a nutshell (narrative summary) ──────────── */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: '0 0 4px' }}>This week, in a nutshell</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>Week of May 11 — May 17, 2026</p>
            </div>
            <div style={{ display: 'flex', gap: 4, backgroundColor: C.muted, borderRadius: 8, padding: 3 }}>
              {['This week', 'Last week'].map((t, i) => (
                <button key={t} style={{ padding: '5px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, backgroundColor: i === 0 ? C.card : 'transparent', color: i === 0 ? C.foreground : C.mutedFg, boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.06)' : 'none' }}>{t}</button>
              ))}
            </div>
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: C.foreground, lineHeight: 1.7, margin: '0 0 24px', maxWidth: 820, textWrap: 'pretty' }}>
            A steadier week overall. Mood held more stable than it has in a while, and your pain trended slightly down through Wednesday. Sleep dipped toward the weekend — the two later nights showed up the next morning. You checked in on <strong>6 of 7 days</strong>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12 }}>
            <TrendChip label="Mood" value="Stable" direction="flat" detail="avg 6.8 / 10" color={C.mood} />
            <TrendChip label="Pain" value="Easing" direction="down" detail="avg 3.4, down from 3.9" color={C.pain} />
            <TrendChip label="Sleep" value="Slipped" direction="down" detail="6h 42m avg, ↓ 38 min" color={C.warning} />
            <TrendChip label="Check-ins" value="6 of 7" direction="up" detail="best week this month" color={C.secondary} />
          </div>
        </div>

        {/* ─── Insight feed (simplified behavioral patterns) ─────────── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: 0 }}>Other things we're seeing</h4>
            <button style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>See all observations →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ObservationRow
              icon="messageCircle"
              accent={C.primary}
              title="Community days feel lighter."
              body="On days you posted in your circle or replied to someone, your stress check-ins tended to land a little lower than the days you didn't."
              meta="Seen 7 times this month"
            />
            <ObservationRow
              icon="moon"
              accent={C.accent}
              title="Journaling at night often coincides with deeper sleep."
              body="When you journaled within an hour of bed, the next morning's sleep rating was usually higher. Not always — but enough that we wanted to mention it."
              meta="Seen on 9 of your last 14 nights"
            />
            <ObservationRow
              icon="calendarCheck"
              accent={C.warning}
              title="Mornings feel hardest on Mondays."
              body="Your Monday morning mood has been the lowest of the week for four weeks in a row. Worth knowing — maybe Sunday evening deserves a little extra care."
              meta="Pattern across the last 4 weeks"
            />
          </div>
        </div>

        {/* ─── Similar journeys (NEW community intelligence) ─────────── */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="users" size={22} color={C.accent} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: C.accent, textTransform: 'uppercase' }}>From similar journeys</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, padding: '2px 8px', borderRadius: 99, backgroundColor: C.muted }}>Anonymized · 1,240 people</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.foreground, lineHeight: 1.6, margin: 0, maxWidth: 720, textWrap: 'pretty' }}>
              People recovering from a similar knee procedure who kept a steady evening routine often reported better sleep by week eight. You're around week six.
            </p>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: 'transparent', color: C.foreground, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            How this works
          </button>
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '4px 0 8px', lineHeight: 1.6, textAlign: 'center', maxWidth: 640, alignSelf: 'center' }}>
          These are observations from your own logs, not medical advice. Patterns shift — we'll keep updating them as you check in.
        </p>

      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function InterventionCard({ tint, iconBg, accent, icon, kicker, title, body, cta }) {
  return (
    <div style={{ borderRadius: 14, backgroundColor: tint, border: `1px solid ${accent}22`, padding: 20, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={16} color={accent} />
        </div>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: accent, textTransform: 'uppercase' }}>{kicker}</span>
      </div>
      <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 6px', lineHeight: 1.4 }}>{title}</h5>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, margin: '0 0 16px', flex: 1 }}>{body}</p>
      <button style={{ alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: accent, background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {cta} <Icon name="arrowRight" size={13} color={accent} />
      </button>
    </div>
  );
}

function TrendChip({ label, value, direction, detail, color }) {
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, backgroundColor: C.card }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 10px', textTransform: 'uppercase' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: C.foreground, letterSpacing: '-0.01em' }}>{value}</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color }}>{arrow}</span>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0, lineHeight: 1.5 }}>{detail}</p>
    </div>
  );
}

function ObservationRow({ icon, accent, title, body, meta }) {
  return (
    <div style={{ backgroundColor: C.card, borderRadius: 14, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 18, alignItems: 'flex-start' }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: accent + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
        <Icon name={icon} size={18} color={accent} />
      </div>
      <div>
        <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 4px', lineHeight: 1.4 }}>{title}</h5>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: C.mutedFg, lineHeight: 1.65, margin: 0, maxWidth: 720 }}>{body}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, whiteSpace: 'nowrap' }}>{meta}</span>
        <button style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Helpful? · Not really</button>
      </div>
    </div>
  );
}

Object.assign(window, { InsightsScreen });
