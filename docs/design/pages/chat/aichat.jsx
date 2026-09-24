
// aichat.jsx — aligned with real codebase colors + user (Alex Rivera / AR)

function AIChatScreen({ onNavigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const [messages, setMessages] = React.useState([
  { role: 'assistant', text: "Hello Alex. I'm here to support you today. How are you feeling in your recovery journey this morning? Remember, every small step is a victory." },
  { role: 'user', text: "I'm feeling a bit restless today. I didn't sleep very well last night and it's making me feel slightly anxious." },
  { role: 'assistant', text: "I understand. Restlessness is a very common part of the process. It's your body and mind finding their new balance. Would you like to try a quick grounding exercise, or would some sleep improvement tips be more helpful?", chips: ['Try grounding exercise', 'Sleep environment tips'] }]
  );
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Local, scripted companion. Used when the live Claude bridge isn't
  // available (standalone export, shared link, download) so the prototype
  // demos cleanly everywhere instead of surfacing "preview token required".
  const localReply = (msg) => {
    const t = msg.toLowerCase();
    if (/(sleep|tired|insomnia|rest|awake|night)/.test(t))
      return "Sleep struggles are so common in recovery — your nervous system is recalibrating. Try keeping screens away for the last 30 minutes before bed and a consistent wind-down time. Even imperfect rest still counts as progress.";
    if (/(anxious|anxiety|panic|nervous|restless|worried|stress)/.test(t))
      return "That restlessness is real, and you're not alone in it. Let's slow it down together: breathe in for 4, hold for 4, out for 6, and notice five things you can see around you. You're safe in this moment.";
    if (/(stretch|exercise|move|workout|walk|active)/.test(t))
      return "Gentle movement is a wonderful choice. Try this 5-minute set: neck rolls, shoulder circles, a standing forward fold, and two slow cat-cows. Move only as far as feels kind to your body today.";
    if (/(eat|meal|food|hungry|nutrition|diet)/.test(t))
      return "Nourishing yourself is part of healing. Aim for something with protein and color — oats with berries, or eggs with greens. Small, regular meals keep your energy and mood steadier through the day.";
    if (/(sad|down|low|depress|hopeless|lonely|cry)/.test(t))
      return "I'm really glad you told me. Heavy days are part of the path, not a failure on it. Be as gentle with yourself as you'd be with a close friend — and if this feeling stays, reaching out to your support team is a strong, healthy step.";
    if (/(relapse|urge|craving|tempt|slip)/.test(t))
      return "Noticing the urge instead of acting on it is already a real victory. Cravings rise and fall like a wave — try delaying 15 minutes, calling someone, or stepping outside. You've gotten through every one so far.";
    if (/(thank|thanks|better|good|great|grateful)/.test(t))
      return "It means a lot to hear that. Hold onto this feeling — you earned it through your own effort. I'm right here whenever you need to talk again.";
    if (/(ground|exercise|calm|breathe|meditat)/.test(t))
      return "Let's ground together. Plant both feet, take a slow breath, and name: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you can taste. Notice how your body settles as you go.";
    return "Thank you for sharing that with me. Whatever you're carrying today, you don't have to hold it alone — every small step forward is a victory. What would feel most supportive right now?";
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', text: msg }];
    setMessages(newMessages);
    setLoading(true);

    // Only attempt the live API when the host bridge is actually present.
    const liveAvailable = typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function';

    if (liveAvailable) {
      try {
        const history = newMessages.map((m) => ({ role: m.role, content: m.text }));
        const response = await window.claude.complete({
          messages: [{
            role: 'user',
            content: `You are a compassionate recovery support AI companion for Pulse. Help people on their recovery journeys (addiction, illness, injury, mental health). Keep responses warm, supportive, concise (2-4 sentences), and practical. Never give medical advice. Encourage professional help for serious issues. The user's name is Alex Rivera.\n\nConversation:\n${history.slice(0, -1).map((m) => m.role.toUpperCase() + ': ' + m.content).join('\n')}\n\nUSER: ${msg}\n\nRespond as Pulse Assistant:`
          }]
        });
        setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
        setLoading(false);
        return;
      } catch (e) {
        // Bridge present but unauthorized/failed — fall through to local reply.
      }
    }

    // Scripted fallback with a short, natural delay.
    await new Promise((r) => setTimeout(r, 650));
    setMessages((prev) => [...prev, { role: 'assistant', text: localReply(msg) }]);
    setLoading(false);
  };

  const suggestions = [
  { icon: 'moon', text: 'How can I improve my sleep?' },
  { icon: 'dumbbell', text: 'Suggest a 5-min stretching routine' },
  { icon: 'leaf', text: 'Recovery-friendly meal ideas' }];


  const insights = [
  { icon: 'sparkles', label: 'EMOTIONAL TREND', color: C.accent, bg: C.accentLight, title: 'Resilience is increasing', desc: "You've handled 3 stressful triggers this week with positive coping mechanisms." },
  { icon: 'moon', label: 'SLEEP QUALITY', color: C.primary, bg: C.primaryLight, title: 'Rest improvement needed', desc: 'Your average sleep duration has dropped by 45 minutes. Consistency is key.' }];


  return (
    <div style={{ flex: 1, display: 'flex', overflow: isMobile ? 'visible' : 'hidden', backgroundColor: C.bg }}>
      {/* Main chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <TopBar title="AI Chat" subtitle="Your supportive recovery companion" onNavigate={onNavigate} />

        {/* Safe space badge */}
        <div style={{ position: 'absolute', top: 16, right: 296, zIndex: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: 99, padding: '4px 12px' }}>
            <Icon name="shield" size={12} color={C.success} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: C.success, letterSpacing: '0.05em' }}>SAFE SPACE</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((msg, i) =>
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 6 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: isMobile ? '92%' : '78%' }}>
                {/* Avatar */}
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                  {msg.role === 'assistant' ?
                <img src="spark.webp" alt="Spark" style={{ height: 24, display: 'block' }} /> :
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12, color: C.primary }}>AR</span>
                }
                </div>
                <div>
                  <div style={{
                  padding: '11px 15px',
                  borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                  backgroundColor: msg.role === 'user' ? C.primaryGradStart : C.card,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.07)'
                }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: msg.role === 'user' ? '#fff' : C.foreground, margin: 0 }}>{msg.text}</p>
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: C.mutedFg, marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left', letterSpacing: '0.04em' }}>
                    {msg.role === 'assistant' ? 'ASSISTANT' : 'YOU'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              {msg.chips &&
            <div style={{ display: 'flex', gap: 8, marginLeft: 42, flexWrap: 'wrap' }}>
                  {msg.chips.map((chip, j) =>
              <button key={j} onClick={() => sendMessage(chip)}
              style={{ padding: '5px 13px', borderRadius: 99, border: `1.5px solid ${C.border}`, backgroundColor: C.card, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, color: C.primary, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = C.primaryLight;e.currentTarget.style.borderColor = C.primary;}}
              onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = C.card;e.currentTarget.style.borderColor = C.border;}}>
                      {chip}
                    </button>
              )}
                </div>
            }
            </div>
          )}

          {loading &&
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="spark.webp" alt="Spark" style={{ height: 24, display: 'block' }} />
              </div>
              <div style={{ backgroundColor: C.card, borderRadius: '4px 14px 14px 14px', padding: '12px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((d, k) =>
                <div key={k} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.mutedFg, animation: `bounce 1.2s ease ${d}s infinite` }} />
                )}
                </div>
              </div>
            </div>
          }
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 6 &&
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, letterSpacing: '0.06em', width: '100%', textTransform: 'uppercase' }}>Suggested for you</span>
            {suggestions.map((s, i) =>
          <button key={i} onClick={() => sendMessage(s.text)}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 99, border: `1px solid ${C.border}`, backgroundColor: C.card, cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.mutedFg, boxShadow: '0 1px 2px rgba(0,0,0,0.04)', transition: 'all 0.15s' }}
          onMouseEnter={(e) => {e.currentTarget.style.borderColor = C.primary;e.currentTarget.style.color = C.primary;}}
          onMouseLeave={(e) => {e.currentTarget.style.borderColor = C.border;e.currentTarget.style.color = C.mutedFg;}}>
                <Icon name={s.icon} size={14} color="currentColor" /> {s.text}
              </button>
          )}
          </div>
        }

        {/* Input bar */}
        <div style={{ padding: isMobile ? '10px 12px 14px' : '12px 24px 20px', borderTop: `1px solid ${C.border}`, backgroundColor: C.card, display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={{ width: 38, height: 38, borderRadius: '50%', border: `1px solid ${C.border}`, backgroundColor: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Icon name="plus" size={16} color={C.mutedFg} />
          </button>
          <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {e.preventDefault();sendMessage();}}}
          placeholder="Type your message here..."
          style={{ flex: 1, padding: '10px 16px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.foreground, border: `1px solid ${C.border}`, borderRadius: 99, outline: 'none', backgroundColor: C.bg }} />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
          style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: input.trim() && !loading ? `linear-gradient(135deg, ${C.primaryGradStart}, ${C.primaryGradEnd})` : C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'background 0.2s', boxShadow: input.trim() ? '0 4px 12px rgba(0,93,167,0.25)' : 'none' }}>
            <Icon name="send" size={16} color={input.trim() && !loading ? '#fff' : C.mutedFg} />
          </button>
        </div>
      </div>

      {/* Right panel — hidden on mobile/tablet */}
      {!isMobile && !isTablet && <div style={{ width: 272, borderLeft: `1px solid ${C.border}`, backgroundColor: C.card, overflowY: 'auto', padding: 20, flexShrink: 0 }}>
        <div style={{ marginBottom: 18 }}>
          <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.foreground, margin: '0 0 3px' }}>Recent Insights</h4>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, margin: 0 }}>Analysis from your last 7 days</p>
        </div>

        {insights.map((ins, i) =>
        <div key={i} style={{ backgroundColor: ins.bg, borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={ins.icon} size={13} color={ins.color} />
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', color: ins.color, textTransform: 'uppercase' }}>{ins.label}</span>
            </div>
            <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: C.foreground, margin: '0 0 5px' }}>{ins.title}</h5>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.mutedFg, lineHeight: 1.6, margin: 0 }}>{ins.desc}</p>
          </div>
        )}

        {/* Next milestone */}
        <div style={{ background: `linear-gradient(135deg, ${C.primaryGradStart}, #1e3a8a)`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Next Milestone</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0' }}>
            <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#fff', margin: 0 }}>150 Days
</h5>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: '#7CF8DD', backgroundColor: 'rgba(124,248,221,0.15)', padding: '3px 10px', borderRadius: 99 }}>8 days to go</span>
          </div>
          <div style={{ height: 5, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
            <div style={{ width: '95%', height: '100%', backgroundColor: '#7CF8DD', borderRadius: 99 }} />
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: '14px 0', borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 12, color: C.primary, lineHeight: 1.7, margin: '0 0 6px' }}>"The journey of a thousand miles begins with a single step."</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.mutedFg, margin: 0 }}>- Lao Tzu</p>
        </div>
      </div>}

      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
      `}</style>
    </div>);
}

Object.assign(window, { AIChatScreen });