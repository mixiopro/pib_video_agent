Project Path: auth

Source Tree:

```
auth
├── signup
│   └── page.tsx
├── forgot-password
│   └── page.tsx
├── reset-password
│   └── page.tsx
└── login
    └── page.tsx

```

`/Users/kaustubh/playground/indie/mixio/kaustubha/monorepo/apps/app-kalaasetu/src/app/(frontend)/auth/signup/page.tsx`:

```tsx
'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/modules/auth/client'
import { Button } from '@mixio/ui/components/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@mixio/ui/components/card'
import { Input } from '@mixio/ui/components/input'
import { Label } from '@mixio/ui/components/label'
// Simple alert component replacement
const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={className}>{children}</div>

const AlertDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <p className={className}>{children}</p>
import { Loader2 } from 'lucide-react'

function SignupPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    try {
      const result = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      if ('error' in result && result.error) {
        setError(result.error.message || 'Signup failed')
        return
      }

      if ('data' in result && result.data) {
        setSuccess(true)
        // Redirect to verification notice page or login with return URL
        const redirectTo = searchParams?.get('redirectTo')
        const loginUrl = redirectTo
          ? `/auth/login?message=Please check your email to verify your account&redirectTo=${encodeURIComponent(redirectTo)}`
          : '/auth/login?message=Please check your email to verify your account'

        setTimeout(() => {
          router.push(loginUrl)
        }, 2000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Signup error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
          <Card>
            <CardHeader>
              <CardTitle className='text-center text-green-600'>
                Account Created!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className='border-green-200 bg-green-50 p-3 rounded'>
                <AlertDescription className='text-green-800'>
                  Please check your email to verify your account before signing
                  in.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link
              href='/auth/login'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {error && (
                <Alert className='border-red-200 bg-red-50 p-3 rounded'>
                  <AlertDescription className='text-red-800'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className='mt-1'
                  placeholder='Enter your full name'
                />
              </div>

              <div>
                <Label htmlFor='email'>Email address</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className='mt-1'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='mt-1'
                  placeholder='Enter your password'
                />
                <p className='mt-1 text-sm text-gray-500'>
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='mt-1'
                  placeholder='Confirm your password'
                />
              </div>

              <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto'></div>
            <p className='mt-2 text-gray-600'>Loading...</p>
          </div>
        </div>
      }
    >
      <SignupPageContent />
    </Suspense>
  )
}

```

`/Users/kaustubh/playground/indie/mixio/kaustubha/monorepo/apps/app-kalaasetu/src/app/(frontend)/auth/forgot-password/page.tsx`:

```tsx
'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { authClient } from '@/modules/auth/client'
import { Button } from '@mixio/ui/components/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@mixio/ui/components/card'
import { Input } from '@mixio/ui/components/input'
import { Label } from '@mixio/ui/components/label'
// Simple alert component replacement
const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={className}>{children}</div>

const AlertDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <p className={className}>{children}</p>
import { Loader2, ArrowLeft } from 'lucide-react'

function ForgotPasswordPageContent() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await authClient.forgetPassword({
        email,
        redirectTo: '/auth/reset-password',
      })

      if ('error' in result && result.error) {
        setError(result.error.message || 'Failed to send reset email')
        return
      }

      if ('data' in result && result.data) {
        setSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Forgot password error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
          <Card>
            <CardHeader>
              <CardTitle className='text-center text-green-600'>
                Reset Email Sent!
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Alert className='border-green-200 bg-green-50'>
                <AlertDescription className='text-green-800'>
                  We&apos;ve sent a password reset link to your email address.
                  Please check your inbox and follow the instructions to reset
                  your password.
                </AlertDescription>
              </Alert>
              <div className='text-center'>
                <Link
                  href='/auth/login'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  <ArrowLeft className='inline-block w-4 h-4 mr-1' />
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Reset your password
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {error && (
                <Alert className='border-red-200 bg-red-50'>
                  <AlertDescription className='text-red-800'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor='email'>Email address</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='mt-1'
                  placeholder='Enter your email'
                />
              </div>

              <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Send Reset Email
              </Button>

              <div className='text-center'>
                <Link
                  href='/auth/login'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  <ArrowLeft className='inline-block w-4 h-4 mr-1' />
                  Back to login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto'></div>
            <p className='mt-2 text-gray-600'>Loading...</p>
          </div>
        </div>
      }
    >
      <ForgotPasswordPageContent />
    </Suspense>
  )
}

```

`/Users/kaustubh/playground/indie/mixio/kaustubha/monorepo/apps/app-kalaasetu/src/app/(frontend)/auth/reset-password/page.tsx`:

```tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/modules/auth/client'
import { Button } from '@mixio/ui/components/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@mixio/ui/components/card'
import { Input } from '@mixio/ui/components/input'
import { Label } from '@mixio/ui/components/label'
// Simple alert component replacement
const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={className}>{children}</div>

const AlertDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <p className={className}>{children}</p>
import { Loader2, ArrowLeft } from 'lucide-react'

function ResetPasswordPageContent() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setError('Invalid or missing reset token')
    } else {
      setToken(tokenParam)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    if (!token) {
      setError('Invalid or missing reset token')
      setIsLoading(false)
      return
    }

    try {
      const result = await authClient.resetPassword({
        newPassword: formData.password,
        token,
      })

      if ('error' in result && result.error) {
        setError(result.error.message || 'Failed to reset password')
        return
      }

      if ('data' in result && result.data) {
        // Redirect to login with success message
        router.push(
          '/auth/login?message=Password reset successfully. Please sign in with your new password.'
        )
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Reset password error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!token && !error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <Loader2 className='mx-auto h-8 w-8 animate-spin' />
          <p className='mt-2 text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Set new password
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Enter your new password below
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {error && (
                <Alert className='border-red-200 bg-red-50'>
                  <AlertDescription className='text-red-800'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='mt-1'
                  placeholder='Enter your new password'
                />
                <p className='mt-1 text-sm text-gray-500'>
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='mt-1'
                  placeholder='Confirm your new password'
                />
              </div>

              <Button
                type='submit'
                disabled={isLoading || !token}
                className='w-full'
              >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Reset Password
              </Button>

              <div className='text-center'>
                <Link
                  href='/auth/login'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  <ArrowLeft className='inline-block w-4 h-4 mr-1' />
                  Back to login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto'></div>
            <p className='mt-2 text-gray-600'>Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordPageContent />
    </Suspense>
  )
}

```

`/Users/kaustubh/playground/indie/mixio/kaustubha/monorepo/apps/app-kalaasetu/src/app/(frontend)/auth/login/page.tsx`:

```tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/modules/auth/client'
import { Button } from '@mixio/ui/components/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@mixio/ui/components/card'
import { Input } from '@mixio/ui/components/input'
import { Label } from '@mixio/ui/components/label'
// Simple alert component replacement
const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={className}>{children}</div>

const AlertDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <p className={className}>{children}</p>
import { Loader2 } from 'lucide-react'

function LoginPageContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get message from URL params (for success messages from other pages)
    const urlMessage = searchParams.get('message')
    if (urlMessage) {
      setMessage(urlMessage)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if ('error' in result && result.error) {
        setError(result.error.message || 'Login failed')
        return
      }

      if ('data' in result && result.data) {
        // Get redirect URL from search params or default to dashboard
        const redirectTo = searchParams.get('redirectTo') || '/dashboard'
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link
              href='/auth/signup'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              create a new account
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {message && (
                <Alert className='border-blue-200 bg-blue-50 p-3 rounded'>
                  <AlertDescription className='text-blue-800'>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className='border-red-200 bg-red-50 p-3 rounded'>
                  <AlertDescription className='text-red-800'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor='email'>Email address</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className='mt-1'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className='mt-1'
                  placeholder='Enter your password'
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <Link
                    href='/auth/forgot-password'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto'></div>
            <p className='mt-2 text-gray-600'>Loading...</p>
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  )
}

```