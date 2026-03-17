import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

const statusIcons = {
  pending: Clock,
  preparing: Package,
  out_for_delivery: Truck,
  delivered: CheckCircle,
  cancelled: CheckCircle,
};

const statusColors = {
  pending: 'text-yellow-500',
  preparing: 'text-blue-500',
  out_for_delivery: 'text-purple-500',
  delivered: 'text-green-500',
  cancelled: 'text-red-500',
};

export default function Orders() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="container py-12 space-y-6">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {!orders || orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status] || Clock;
            return (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 font-bold capitalize ${statusColors[order.status]}`}>
                    <StatusIcon className="h-5 w-5" />
                    {order.status.replace('_', ' ')}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Items</h4>
                      <ul className="space-y-2">
                        {order.order_items?.map((item) => (
                          <li key={item.id} className="text-sm flex justify-between">
                            <span>{item.quantity}x {item.pizza?.name || 'Pizza'}</span>
                            <span>{formatCurrency(item.price_at_time * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(order.total_amount)}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Delivery Address</h4>
                      <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                      <h4 className="font-semibold mt-4 mb-2">Contact</h4>
                      <p className="text-sm text-muted-foreground">{order.contact_phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
