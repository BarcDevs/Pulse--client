'use client'

import { useState } from 'react'

import { ArrowLeft, ArrowRight, Check, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const hasMinLength = password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasMinLength || !hasSpecialChar || !passwordsMatch) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/login')
    }, 1000)
  }

  return (
    <div className="w-full max-w-md">
      {/* Branding */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-[var(--primary)]">HealEase</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Recovery & Wellness Sanctuary</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Create New Password</CardTitle>
          <CardDescription>
            Choose a secure password to regain access to your recovery dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]"
              >
                NEW PASSWORD
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-[var(--border)] bg-[var(--muted)] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]"
              >
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 border-[var(--border)] bg-[var(--muted)] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-5 items-center justify-center rounded-full ${
                    hasMinLength
                      ? 'bg-[var(--secondary)] text-white'
                      : 'bg-[var(--muted)]'
                  }`}
                >
                  {hasMinLength && <Check className="size-3" />}
                </div>
                <span
                  className={
                    hasMinLength
                      ? 'text-[var(--secondary)]'
                      : 'text-[var(--muted-foreground)]'
                  }
                >
                  Min 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-5 items-center justify-center rounded-full ${
                    hasSpecialChar
                      ? 'bg-[var(--secondary)] text-white'
                      : 'bg-[var(--muted)]'
                  }`}
                >
                  {hasSpecialChar && <Check className="size-3" />}
                </div>
                <span
                  className={
                    hasSpecialChar
                      ? 'text-[var(--secondary)]'
                      : 'text-[var(--muted-foreground)]'
                  }
                >
                  One special symbol
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
              disabled={isLoading || !hasMinLength || !hasSpecialChar || !passwordsMatch}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
              {!isLoading && <ArrowRight className="ml-2 size-4" />}
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--foreground)] hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
            Having trouble?{' '}
            <Link href="/support" className="text-[var(--primary)] hover:underline">
              Contact Health Support
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
