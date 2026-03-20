'use client'

import { useState } from 'react'

import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="pt-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--secondary-light)]">
            <Mail className="size-8 text-[var(--secondary)]" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">
            Check your email
          </h2>
          <p className="mt-2 text-[var(--muted-foreground)]">
            {"We've sent a password reset link to"}{' '}
            <span className="font-medium text-[var(--foreground)]">{email}</span>
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Login
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-md">
      {/* Branding */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-[var(--primary)]">HealEase</h1>
        <p className="text-sm text-[var(--muted-foreground)]">THE DIGITAL SANCTUARY</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Forgot password?</CardTitle>
          <CardDescription>
            {"Don't worry, it happens to the best of us. Enter the email address associated with your account and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]"
              >
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-[var(--border)] bg-[var(--muted)] pr-10"
                  required
                />
                <Mail className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
              {!isLoading && <ArrowRight className="ml-2 size-4" />}
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--foreground)] hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to Login
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
            If you no longer have access to your email, please contact our{' '}
            <Link href="/support" className="text-[var(--primary)] hover:underline">
              support team
            </Link>{' '}
            for identity verification.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
