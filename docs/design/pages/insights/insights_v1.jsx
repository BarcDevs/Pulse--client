// insights.jsx — AI Insights page
// ─── INSIGHTS ─────────────────────────────────────────────────
function InsightsScreen({ onNavigate }) {
  const [patternTab, setPatternTab] = React.useState('30days');

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: C.bg }}>
      <TopBar title="Insights" subtitle="AI-powered analysis of your journey" onNavigate={onNavigate} />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Critical Insight (2/3) + Milestone (1/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#FEE2E2', padding: '4px 12px', borderRadius: 99, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: C.destructive }}>
                <Icon name="activity" size={12} color={C.destructive} /> Critical Insight
              </span>
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: C.foreground, lineHeight: 1.35, margin: '0 0 12px' }}>
              Your mood improves by 15% on days including mobility stretching.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.mutedFg, lineHeight: 1.7, margin: '0 0 20px' }}>
              Our analysis shows a direct correlation between your 8 AM stretching routine and peak afternoon energy levels.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: `linear-gradient(to right, ${C.primaryGradStart}, ${C.primaryGradEnd})`, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Schedule Stretch</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, color: C.mutedFg, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
                <Icon name="trendingUp" size={16} color={C.mutedFg} /> View Data Correlation
              </button>
            </div>
          </div>

          {/* Milestone Card */}
          <div style={{ background: `linear-gradient(135deg, ${C.primaryGradStart}, #1e3a8a)`, borderRadius: 16, padding: 24, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Icon name="award" size={16} color="rgba(255,255,255,0.8)" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Next Milestone</span>
            </div>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#fff', margin: '0 0 6px' }}>60 Days Clean</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: '0 0 16px', lineHeight: 1.6 }}>You're on an incredible streak. Keep going - you're almost there!</p>
            <div style={{ height: 6, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: '75%', height: '100%', backgroundColor: '#7CF8DD', borderRadius: 99 }} />
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>8 days to go</p>
          </div>
        </div>

        {/* Alert Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ borderRadius: 16, backgroundColor: '#FEF2F2', border: `1px solid ${C.destructive}25`, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="activity" size={18} color={C.destructive} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 6px' }}>Pain Trend Alert</h4>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, margin: '0 0 14px' }}>Slightly higher pain levels recorded today compared to your 7-day average. Your sleep quality was also 12% lower last night.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: C.destructive }}>Attention Required</span>
                  <button style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Update Journal</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderRadius: 16, backgroundColor: C.secondaryLight + '60', border: `1px solid ${C.secondary}25`, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: C.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="lightbulb" size={18} color={C.secondary} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 6px' }}>Actionable Step</h4>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, margin: '0 0 14px' }}>Try 10 minutes of restorative yoga today to manage pain and improve evening relaxation before your next sleep cycle.</p>
                <button style={{ padding: '7px 16px', borderRadius: 8, border: 'none', backgroundColor: C.secondary, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Start Session Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Behavioral Patterns */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: 0 }}>Behavioral Patterns</h4>
            <div style={{ display: 'flex', gap: 2, backgroundColor: C.muted, borderRadius: 8, padding: 3 }}>
              {['7days', '30days'].map(t => (
                <button key={t} onClick={() => setPatternTab(t)} style={{ padding: '4px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, backgroundColor: patternTab === t ? (t === '30days' ? C.primary : C.card) : 'transparent', color: patternTab === t ? (t === '30days' ? '#fff' : C.foreground) : C.mutedFg, boxShadow: patternTab === t && t !== '30days' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                  {t === '7days' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            {/* Correlation */}
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>Correlation</p>
              <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 8px' }}>Social Interaction vs. Stress</h5>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, margin: '0 0 12px' }}>You report 23% lower stress levels on days when you participate in community group chats.</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 48 }}>
                {[40, 65, 50, 80, 45, 70, 55].map((h, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', backgroundColor: C.primaryLight, height: h + '%' }} />
                ))}
              </div>
            </div>
            {/* Observation */}
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>Observation</p>
              <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 8px' }}>Morning Routine Impact</h5>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, lineHeight: 1.65, margin: '0 0 16px' }}>Completing a Daily Check-In before 9:00 AM leads to a 30% higher chance of reaching all daily recovery goals.</p>
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 32, color: C.foreground, lineHeight: 1 }}>82%</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: '4px 0 0' }}>Success rate when daily</p>
              </div>
            </div>
            {/* AI Prediction */}
            <div style={{ background: `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})`, borderRadius: 14, padding: 20, color: '#fff' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', margin: '0 0 8px', textTransform: 'uppercase' }}>AI Prediction</p>
              <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#fff', margin: '0 0 8px' }}>Projected Recovery Path</h5>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: '0 0 16px' }}>If current adherence maintains, you are on track to increase your range of motion by 8% next week.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="trendingUp" size={14} color="rgba(255,255,255,0.8)" />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>High Confidence Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend Summary */}
        <div style={{ backgroundColor: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: C.foreground, margin: '0 0 4px' }}>Weekly Trend Summary</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, margin: 0 }}>Comprehensive overview of your physiological and mental markers.</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.foreground, cursor: 'pointer' }}>
              <Icon name="trendingUp" size={14} color={C.mutedFg} /> Export Report
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { label: 'Vitality Score', val: '78', trend: '+3%', trendColor: C.secondary, desc: 'Consistent upward trend' },
              { label: 'Engagement', val: 'Low', trend: 'Improve', trendColor: C.warning, desc: 'Below baseline in sharing' },
              { label: 'Sleep Quality', val: '8.2', trend: '/10 Stable', trendColor: C.secondary, desc: 'Above the 75th percentile' },
              { label: 'Mood Stability', val: 'High', trend: 'Positive', trendColor: C.secondary, desc: 'Improving steadily' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: C.muted, borderRadius: 12, padding: 16 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: C.mutedFg, margin: '0 0 8px', textTransform: 'uppercase' }}>{stat.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: C.foreground }}>{stat.val}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: stat.trendColor, fontWeight: 500 }}>{stat.trend}</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <AppFooter onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { InsightsScreen });
