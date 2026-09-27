// live_agent.jsx — floating animated companion bubble that invites users into AI Chat
function LiveAgentWidget({ onNavigate, page }) {
  const { isMobile } = useBreakpoint();
  const messages = [
    "Need someone to talk to? I'm right here for you.",
    "Feeling stuck today? Let's talk it through together.",
    "Quick check-in? Tap me anytime you need support.",
    "Your recovery companion is just one click away.",
    "Restless or anxious? I can help you ground yourself."
  ];
  const [msgIndex, setMsgIndex] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const [phase, setPhase] = React.useState('hidden'); // hidden -> typing -> waiting -> typing...
  const [dismissed, setDismissed] = React.useState(false);
  const [blink, setBlink] = React.useState(false);

  const active = page === 'aichat';

  React.useEffect(() => {
    if (active || dismissed) return;
    const t = setTimeout(() => setPhase('typing'), 1400);
    return () => clearTimeout(t);
  }, [active, dismissed]);

  React.useEffect(() => {
    if (phase !== 'typing') return;
    const full = messages[msgIndex];
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 26 + Math.random() * 24);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('waiting'), 3400);
    return () => clearTimeout(t);
  }, [phase, typed, msgIndex]);

  React.useEffect(() => {
    if (phase !== 'waiting') return;
    const t = setTimeout(() => {
      setTyped('');
      setMsgIndex((i) => (i + 1) % messages.length);
      setPhase('typing');
    }, 1000);
    return () => clearTimeout(t);
  }, [phase]);

  React.useEffect(() => {
    let cancelled = false;
    (function loop() {
      const delay = 2200 + Math.random() * 2600;
      const t = setTimeout(() => {
        if (cancelled) return;
        setBlink(true);
        setTimeout(() => !cancelled && setBlink(false), 150);
        loop();
      }, delay);
    })();
    return () => { cancelled = true; };
  }, []);

  if (active || dismissed) return null;

  const go = () => onNavigate('aichat');

  return (
    <div style={{ position: 'fixed', right: isMobile ? 14 : 24, bottom: isMobile ? 84 : 24, zIndex: 70, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
      {phase !== 'hidden' &&
      <div onClick={go} style={{ maxWidth: isMobile ? 200 : 236, background: '#fff', borderRadius: 16, padding: '14px 30px 14px 16px', boxShadow: '0 8px 28px rgba(20,40,70,0.16)', border: `1px solid ${C.border}`, position: 'relative', cursor: 'pointer', animation: 'la-pop .3s ease' }}>
          <button onClick={(e) => { e.stopPropagation(); setDismissed(true); }} aria-label="Dismiss"
            style={{ position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: '50%', border: `1px solid ${C.border}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
            <Icon name="close" size={10} color={C.mutedFg} />
          </button>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.55, color: C.foreground, margin: 0, minHeight: '2.8em' }}>
            {typed}<span style={{ opacity: phase === 'typing' ? 1 : 0, color: C.mutedFg }}>▍</span>
          </p>
        </div>
      }
      <button onClick={go} aria-label="Open chat with Spark" style={{ position: 'relative', width: 60, height: 72, border: 'none', background: 'transparent', cursor: 'pointer', flexShrink: 0, padding: 0 }}>
        <div className="la-glow-ring" style={{ position: 'absolute', left: 6, right: 6, bottom: -2, height: 14, borderRadius: '50%' }} />
        <img className="la-sway" src="spark.webp" alt="Spark" style={{ position: 'relative', height: 72, display: 'block', margin: '0 auto', transformOrigin: '50% 90%', transform: blink ? 'scale(1.04,0.95)' : undefined, transition: 'transform .15s', filter: 'drop-shadow(0 6px 10px rgba(0,93,167,0.28))' }} />
      </button>
      <style>{`
        @keyframes la-pop{from{opacity:0;transform:translateY(6px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes la-sway{0%{transform:rotate(-4deg) translateY(0)}25%{transform:rotate(2deg) translateY(-3px)}50%{transform:rotate(4deg) translateY(0)}75%{transform:rotate(-2deg) translateY(-2px)}100%{transform:rotate(-4deg) translateY(0)}}
        .la-sway{animation:la-sway 4.5s ease-in-out infinite}
        .la-face{animation:la-face-tilt 5s ease-in-out infinite;transform-origin:center}
        @keyframes la-face-tilt{0%,100%{transform:rotate(0deg)}40%{transform:rotate(-4deg)}70%{transform:rotate(3deg)}}
        .la-eye{transition:height .1s}
        @keyframes la-glow{0%,100%{background:rgba(20,184,166,0.18);box-shadow:0 0 10px 2px rgba(20,184,166,0.18)}50%{background:rgba(20,184,166,0.32);box-shadow:0 0 18px 6px rgba(34,211,238,0.35)}}
        .la-glow-ring{animation:la-glow 6s ease-in-out infinite}
      `}</style>
    </div>);
}

Object.assign(window, { LiveAgentWidget });
