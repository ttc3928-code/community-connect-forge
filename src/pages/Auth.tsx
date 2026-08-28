import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { communityClient as supabase } from '@/lib/community-client';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'signin';
  const isSignUp = mode === 'signup';
  const isForgot = mode === 'forgot';
  
  const { signUp, signIn, user, loading: authLoading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading && !isForgot) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate, isForgot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgot) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          toast.error(error.message);
        } else {
          setResetSent(true);
          toast.success('Reset link sent — check your inbox.');
        }
      } else if (isSignUp) {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created! Welcome to the brotherhood.');
          navigate('/dashboard');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Welcome back, brother!');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const [googleError, setGoogleError] = useState<string | null>(null);

  const describeGoogleError = (message?: string): string => {
    const msg = (message || '').toLowerCase();
    if (msg.includes('popup') && (msg.includes('closed') || msg.includes('cancel'))) {
      return 'The Google sign-in window was closed before finishing. No account was signed in — try again when you\'re ready.';
    }
    if (msg.includes('popup') || msg.includes('blocked')) {
      return 'Your browser blocked the sign-in popup. Allow popups for this site, then try again.';
    }
    if (msg.includes('cancel')) {
      return 'Google sign-in was cancelled.';
    }
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('offline')) {
      return 'Couldn\'t reach Google. Check your internet connection and try again.';
    }
    if (msg.includes('provider') || msg.includes('unsupported')) {
      return 'Google sign-in isn\'t available right now. Please use email sign-in or try again later.';
    }
    return message
      ? `Google sign-in failed: ${message}`
      : 'Google sign-in failed. Please try again, or use email sign-in below.';
  };

  const handleGoogle = async () => {
    if (googleLoading) return; // guard against double-taps
    setGoogleLoading(true);
    setGoogleError(null);
    const fail = (message?: string) => {
      const friendly = describeGoogleError(message);
      setGoogleError(friendly);
      toast.error(friendly);
      setGoogleLoading(false);
    };
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        fail(result.error.message);
        return;
      }
      if (result.redirected) return; // navigating to Google — keep the spinner
      toast.success('Signed in with Google. Welcome!');
      navigate('/dashboard');
    } catch (error) {
      fail(error instanceof Error ? error.message : undefined);
    }
  };


  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back Link */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <ShieldIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h1 className="font-heading text-2xl font-bold mb-2">
                {isForgot ? 'Reset Your Password' : isSignUp ? 'Join the Brotherhood' : 'Welcome Back'}
              </h1>
              <p className="text-muted-foreground">
                {isForgot
                  ? resetSent
                    ? 'Check your email for the reset link. It may take a minute to arrive.'
                    : "Enter your email and we'll send you a link to set a new password."
                  : isSignUp 
                    ? 'Create your account to start your journey to freedom.'
                    : 'Sign in to continue your journey.'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>

              {!isForgot && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {!isSignUp && (
                    <div className="text-right">
                      <Link to="/auth?mode=forgot" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isForgot ? 'Sending Link...' : isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  isForgot ? (resetSent ? 'Resend Link' : 'Send Reset Link') : isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            {!isForgot && (
              <>
                <div className="flex items-center gap-3 my-6">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleGoogle}
                  disabled={googleLoading}
                  aria-busy={googleLoading}
                >
                  {googleLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.6c-.1 1.1-.9 2.8-2.5 3.9l-.02.15 3.6 2.8.25.03c2.3-2.1 3.6-5.2 3.6-8.8Z" />
                      <path fill="#34A853" d="M12 24c3.3 0 6-1.1 8-2.9l-3.8-3c-1 .7-2.4 1.2-4.2 1.2a7.3 7.3 0 0 1-6.9-5l-.14.01-3.7 2.9-.05.14A12 12 0 0 0 12 24Z" />
                      <path fill="#FBBC05" d="M5.1 14.3a7.4 7.4 0 0 1-.4-2.3c0-.8.15-1.6.4-2.3v-.15l-3.8-3-.12.06A12 12 0 0 0 0 12c0 1.9.5 3.8 1.2 5.4l3.9-3.1Z" />
                      <path fill="#EA4335" d="M12 4.7c2.3 0 3.9 1 4.8 1.9l3.5-3.4C18 1.2 15.3 0 12 0A12 12 0 0 0 1.2 6.6l3.9 3.1A7.3 7.3 0 0 1 12 4.7Z" />
                    </svg>
                  )}
                  {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
                </Button>

                {googleError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    <p className="font-medium mb-0.5">Couldn't sign in with Google</p>
                    <p className="text-destructive/80">{googleError}</p>
                  </div>
                )}
              </>
            )}



            {/* Toggle */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isForgot ? (
                <>
                  Remembered it?{' '}
                  <Link to="/auth?mode=signin" className="text-primary hover:underline font-medium">
                    Back to sign in
                  </Link>
                </>
              ) : isSignUp ? (
                <>
                  Already have an account?{' '}
                  <Link to="/auth?mode=signin" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <Link to="/auth?mode=signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            By continuing, you agree to our{' '}
            <Link to="#" className="hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="#" className="hover:underline">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
