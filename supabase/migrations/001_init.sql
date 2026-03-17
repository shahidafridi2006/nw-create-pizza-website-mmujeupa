-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Pizzas Table
CREATE TABLE IF NOT EXISTS pizzas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'classic',
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  total_amount NUMERIC(10, 2) NOT NULL,
  delivery_address TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  pizza_id UUID REFERENCES pizzas(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_time NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pizzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for Pizzas (Public Read)
CREATE POLICY "Pizzas are viewable by everyone" ON pizzas
  FOR SELECT USING (true);

-- Policies for Orders (User specific)
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for Order Items (User specific via Order)
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Seed Data
INSERT INTO pizzas (name, description, price, image_url, category) VALUES
('Margherita', 'Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil.', 12.99, 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800', 'classic'),
('Pepperoni Feast', 'Double pepperoni, mozzarella, and our signature tomato sauce.', 14.99, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800', 'classic'),
('Garden Veggie', 'Bell peppers, onions, mushrooms, black olives, and fresh tomatoes.', 13.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', 'vegetarian'),
('BBQ Chicken', 'Grilled chicken, red onions, cilantro, and tangy BBQ sauce.', 15.99, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800', 'specialty'),
('Truffle Mushroom', 'Wild mushrooms, truffle oil, roasted garlic, and parmesan.', 17.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', 'premium'),
('Spicy Diavola', 'Spicy salami, chili flakes, mozzarella, and hot honey drizzle.', 16.99, 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&q=80&w=800', 'specialty');
