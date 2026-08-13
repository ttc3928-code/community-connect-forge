import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from '@/lib/router-compat';
import { Button } from '@/components/ui/button';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Menu, X, Lock, LogOut, User, LifeBuoy, Settings, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useSOS } from '@/contexts/SOSContext';

const publicNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Daily Surrender', path: '/surrender' },
  { label: 'My Habits', path: '/habits' },
  { label: 'Devotionals', path: '/devotionals' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Journal', path: '/journal' },
  { label: 'My Circle', path: '/my-circle', premium: true },
  { label: 'About', path: '/about' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { openSOS } = useSOS();

  const navLinks = user
    ? [
        publicNavLinks.find((l) => l.path === '/dashboard')!,
        ...publicNavLinks.filter((l) => l.path !== '/' && l.path !== '/dashboard'),
      ]
    : publicNavLinks;

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <ShieldIcon className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
            <span className="font-heading text-lg font-semibold">
              Iron <span className="text-primary">Sharpens</span> Iron
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }
                `}
              >
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.premium && (
                    <span className="badge-premium">
                      <Lock className="w-2.5 h-2.5" />
                      Premium
                    </span>
                  )}
                </span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={openSOS}
              aria-label="Emergency help"
              className="gap-1.5"
            >
              <LifeBuoy className="w-4 h-4" />
              <span className="hidden sm:inline">Emergency</span>
            </Button>
            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium truncate max-w-32">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile / Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (

              <>
                <Link to="/auth?mode=signin">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup" className="hidden sm:block">
                  <Button variant="default" size="sm">Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path) 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.premium && (
                      <span className="badge-premium">
                        <Lock className="w-2.5 h-2.5" />
                        Premium
                      </span>
                    )}
                  </span>
                </Link>
              ))}
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => { setMobileMenuOpen(false); openSOS(); }}
              >
                <LifeBuoy className="w-4 h-4 mr-2" />
                Emergency Need
              </Button>
              <div className="pt-4 border-t border-border space-y-2">
                {!loading && user ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full mb-2">
                        <Settings className="w-4 h-4 mr-2" />
                        Profile / Settings
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>

                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth?mode=signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
