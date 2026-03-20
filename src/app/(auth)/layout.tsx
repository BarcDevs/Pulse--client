import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--surface-page)] via-[var(--primary-light)]/30 to-[var(--accent-light)]/20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link href="/" className="text-xl font-semibold text-[var(--primary)]">
          HealEase
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/help"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Help
          </Link>
          <Link
            href="/about"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            About
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-[var(--muted-foreground)]">
        <p>2024 HEALEASE. ALL RIGHTS RESERVED.</p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <Link href="/support" className="hover:text-[var(--foreground)]">
            SUPPORT
          </Link>
          <Link href="/privacy" className="hover:text-[var(--foreground)]">
            PRIVACY POLICY
          </Link>
          <Link href="/terms" className="hover:text-[var(--foreground)]">
            TERMS OF SERVICE
          </Link>
        </div>
      </footer>
    </div>
  )
}
