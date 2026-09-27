// responsive.jsx — shared responsive utilities

// ── Sidebar drawer context (for mobile hamburger/overlay) ─────────────────
const SidebarCtx = React.createContext({ open: false, toggle: () => {}, close: () => {} });

function SidebarProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const toggle = React.useCallback(() => setOpen(v => !v), []);
  const close  = React.useCallback(() => setOpen(false), []);
  return (
    <SidebarCtx.Provider value={{ open, toggle, close }}>
      {children}
    </SidebarCtx.Provider>
  );
}

// ── Breakpoint hook ───────────────────────────────────────────────────────
// isMobile  < 768px  → bottom nav + drawer
// isTablet  768–1023px → 64px icon sidebar
// isDesktop ≥ 1024px  → full 256px sidebar
function useBreakpoint() {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return {
    width: w,
    isMobile:  w < 768,
    isTablet:  w >= 768 && w < 1024,
    isDesktop: w >= 1024,
  };
}

// ── Sidebar context consumer ───────────────────────────────────────────────
function useSidebar() {
  return React.useContext(SidebarCtx);
}

Object.assign(window, { SidebarProvider, useBreakpoint, useSidebar });
