import { Link, useLocation } from 'wouter';
import { ShoppingCart, User, Pizza as PizzaIcon, Menu as MenuIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/orders', label: 'My Orders' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <PizzaIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Nova Pizza</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/checkout">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => supabase.auth.signOut()}
              className="hidden md:flex"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/auth">
              <Button variant="premium" size="sm" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "block text-lg font-medium",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Sign In</Button>
            </Link>
          )}
          {user && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                supabase.auth.signOut();
                setIsMenuOpen(false);
              }}
            >
              Sign Out
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
