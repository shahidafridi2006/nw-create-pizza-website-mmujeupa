import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { usePizzas } from '@/hooks/usePizzas';
import PizzaCard from '@/components/PizzaCard';
import { ChevronRight, Star, Clock, Truck } from 'lucide-react';

export default function Home() {
  const { data: pizzas, isLoading } = usePizzas();
  const featuredPizzas = pizzas?.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden hero-gradient">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 space-y-6">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground mb-4">
              New: Truffle Mushroom Pizza
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              The Best Pizza <br />
              <span className="text-primary">In Your Town.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Experience the authentic taste of hand-tossed artisanal pizzas made with locally sourced ingredients and baked to perfection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8" variant="premium">
                  Order Now
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Menu
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">15k+</span>
                <span className="text-sm text-muted-foreground">Happy Customers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">4.9/5</span>
                <span className="text-sm text-muted-foreground">Average Rating</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000"
              alt="Delicious Pizza"
              className="relative rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Premium Quality", desc: "We use only the freshest, high-quality ingredients for every pizza." },
            { icon: Clock, title: "Fast Delivery", desc: "Your pizza arrives hot and fresh within 30 minutes or it's free." },
            { icon: Truck, title: "Free Shipping", desc: "Enjoy free delivery on all orders over $30 in the local area." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Menu */}
      <section className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Choices</h2>
            <p className="text-muted-foreground">Our customers' most loved pizzas this week.</p>
          </div>
          <Link href="/menu">
            <Button variant="link" className="gap-2">
              View All Menu <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPizzas?.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container">
        <div className="bg-primary rounded-3xl p-12 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 rotate-12"><PizzaIcon size={120} /></div>
             <div className="absolute bottom-10 right-10 -rotate-12"><PizzaIcon size={120} /></div>
          </div>
          <h2 className="text-4xl font-bold mb-6">Ready to taste the best pizza?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied pizza lovers. Order now and get 20% off your first order!
          </p>
          <Link href="/menu">
            <Button size="lg" variant="secondary" className="text-lg px-12">
              Order Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
