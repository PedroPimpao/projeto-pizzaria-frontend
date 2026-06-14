'use client';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { Order } from '@/lib/types';
import { Eye, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatPriceToBRL } from '@/lib/format';
import { OrderModal } from './order-modal';
import PageTitle from '../pageTitle';

interface OrdersProps {
  token: string;
}

const Orders = ({ token }: OrdersProps) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await apiClient<Order[]>('/orders?draft=false', {
        method: 'GET',
        cache: 'no-store',
        token: token,
      });

      const pendingOrders = response.filter((order) => !order.status);

      setOrders(pendingOrders);
      setLoading(false);
      console.log(pendingOrders);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadOrders() {
      await fetchOrders();
    }
    loadOrders();
  }, []);

  const calculateOrderTotal = (order: Order) => {
    if (!order.items) return 0;
    return order.items.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
  };

  return (
    <>
      <div className="mb-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <PageTitle title="Pedidos" subtitle="Gerencie os pedidos da cozinha" />
          <Button
            size={'default'}
            variant={'default'}
            className="mt-4 md:mt-0"
            onClick={fetchOrders}
          >
            <RefreshCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div>
          <p className="text-center text-gray-300">Carregando pedidos...</p>
        </div>
      ) : orders.length === 0 ? (
        <div>
          <p className="text-center text-gray-300">Nenhum pedido encontrado</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id} className="bg-app-card border-app-border border text-white">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg font-bold lg:text-xl">
                    Mesa: {order.table}
                  </CardTitle>
                  <Badge
                    variant={order.status ? 'secondary' : 'default'}
                    className="text-xs select-none"
                  >
                    {order.status ? 'Em produção' : 'Pronto'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="mt-auto space-y-3 sm:space-y-4">
                <div>
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-1">
                      {order.items.slice(0, 5).map((item) => (
                        <p key={item.id} className="text-xs text-gray-300 sm:text-sm">
                          - {item.amount}x {item.product.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-app-border flex flex-col items-center justify-between gap-3 border-t pt-4 xl:flex-row">
                  <div className="flex flex-row gap-2 self-start">
                    <p className="text-sm text-gray-400 md:text-base">Total:</p>
                    <p className="text-brand-primary text-base font-bold">
                      {formatPriceToBRL(calculateOrderTotal(order))}
                    </p>
                  </div>
                  <Button
                    className="flex w-full flex-row xl:w-auto"
                    size={'sm'}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <Eye /> Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <OrderModal
            orderId={selectedOrder}
            onClose={async () => {
              setSelectedOrder(null);
              await fetchOrders();
            }}
            token={token}
          />
        </div>
      )}
    </>
  );
};

export { Orders };
