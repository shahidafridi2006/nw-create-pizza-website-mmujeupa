import { Pizza as PizzaIcon, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PizzaIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">Nova Pizza</span>
            </Link>
            <p className="text-muted-foreground max-w-xs mb-6">
              Crafting authentic artisanal pizzas with the finest ingredients and a passion for perfection. Delivered hot to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-sm text-muted-foreground hover:text-primary">Our Menu</Link></li>
              <li><Link href="/orders" className="text-sm text-muted-foreground hover:text-primary">Track Order</Link></li>
              <li><Link href="/auth" className="text-sm text-muted-foreground hover:text-primary">My Account</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nova Pizza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
