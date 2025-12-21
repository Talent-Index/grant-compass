// SheFi-inspired minimal navigation
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { CreditBadge } from '@/components/credits/CreditBadge';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/grants', label: 'Discover' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#community', label: 'Success stories' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/30">
      <nav className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav - centered */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <CreditBadge />
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => signOut()}
                className="text-muted-foreground"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Sign in
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button variant="default" size="sm" className="bg-emerald hover:bg-emerald/90 text-emerald-foreground">
                  Get matched
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu - Clean drawer */}
      <div className={cn(
        'md:hidden fixed inset-x-0 top-16 bg-background border-b border-border/30 transition-all duration-300 ease-out',
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      )}>
        <div className="container py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'block py-3 text-base font-medium transition-colors',
                isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
              )}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 space-y-3">
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button variant="outline" className="w-full min-h-[44px]">
                Sign in
              </Button>
            </Link>
            <Link to="/onboarding" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button className="w-full min-h-[44px] bg-emerald hover:bg-emerald/90 text-emerald-foreground">
                Get matched
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}