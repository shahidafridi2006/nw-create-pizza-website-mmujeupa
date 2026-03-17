import { Pizza } from '@/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { Plus, ShoppingBag } from 'lucide-react';

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const addItem = useCart((state) => state.addItem);

  return (
    <Card className="overflow-hidden group hover:shadow-elegant transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pizza.image_url}
          alt={pizza.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-background/90 backdrop-blur-sm rounded-full">
            {pizza.category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{pizza.name}</h3>
          <span className="text-primary font-bold">{formatCurrency(pizza.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addItem(pizza)}
          className="w-full gap-2"
          variant="secondary"
        >
          <Plus className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
