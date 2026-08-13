import React from 'react';
import { Link } from '@/lib/router-compat';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Cross } from 'lucide-react';

const quickLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'About Us', path: '/about' },
  { label: 'Sign In', path: '/auth?mode=signin' },
];

const supportLinks = [
  { label: 'Help Center', path: '/help' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <ShieldIcon className="w-8 h-8 text-primary" />
              <span className="font-heading text-lg font-semibold">
                Iron <span className="text-primary">Sharpens</span> Iron
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              A brotherhood of men walking together toward freedom in Christ.
              You don't have to fight alone.
            </p>
            <p className="text-muted-foreground/70 text-xs italic">
              "As iron sharpens iron, so one person sharpens another." — Proverbs 27:17
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground/60 text-sm">
            © {new Date().getFullYear()} Iron Sharpens Iron. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground/60 text-sm">
            <Cross className="w-4 h-4" />
            <span>Built with faith for freedom</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
