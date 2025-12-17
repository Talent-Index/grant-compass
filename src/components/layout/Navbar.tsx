// Navigation bar component
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/grants', label: 'Explore' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-emerald',
                isActive(link.href) ? 'text-emerald' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" className="min-h-[44px]">Sign In</Button>
          </Link>
          <Link to="/onboarding">
            <Button variant="hero" className="min-h-[44px]">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-300 bg-background border-b border-border/50',
        mobileMenuOpen ? 'max-h-80' : 'max-h-0'
      )}>
        <div className="container py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'block py-2 text-sm font-medium transition-colors',
                isActive(link.href) ? 'text-emerald' : 'text-muted-foreground'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border/50 space-y-3">
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="full" className="min-h-[44px]">
                Sign In
              </Button>
            </Link>
            <Link to="/onboarding" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="hero" size="full" className="min-h-[44px]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
