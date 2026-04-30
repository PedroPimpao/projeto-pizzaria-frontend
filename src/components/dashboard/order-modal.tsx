import { apiClient } from '@/lib/api';
import { Order } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { formatPriceToBRL } from '@/lib/format';
import { finishOrderAction } from '@/app/_actions/orders';
import { useRouter } from 'next/navigation';

interface OrderModalProps {
  orderId: string | null;
  onClose: () => void;
  token: string;
}

const OrderModal = ({ orderId, onClose, token }: OrderModalProps) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  const fetchOrder = async () => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient<Order>(`/order/detail?order_id=${orderId}`, {
        method: 'GET',
        token: token,
      });
      console.log(response);
      setLoading(false);
      setOrder(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadOrders() {
      await fetchOrder();
    }
    loadOrders();
  }, [orderId]);

  const calculateTotal = () => {
    if (!order?.items) return 0;
    return order.items.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
  };

  const handleFinishOrder = async () => {
    if (!orderId) return;

    const result = await finishOrderAction(orderId);
    if (!result.success) {
      console.log(result.error);
    }
    if (result.success) {
      router.refresh();
      onClose();
    }
  };

  return (
    <Dialog open={orderId !== null} onOpenChange={() => onClose()}>
      <DialogContent className="bg-app-card border-app-border max-w-2xl border p-6 text-white sm:min-w-150">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Detalhe do pedido</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400">Carregando...</p>
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Informações do pedido */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="mb-1 text-sm text-gray-400">Nome da categoria</p>
                <p className="text-lg font-semibold">Mesa {order.table}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-400">Cliente</p>
                <p className="text-lg font-semibold">{order.name || 'Sem nome'}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-400">Status</p>
                <span className="inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-nowrap text-orange-500">
                  Em produção
                </span>
              </div>
            </div>

            {/* Itens do pedido */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Itens do pedido</h3>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => {
                    const subtotal = item.product.price * item.amount;
                    return (
                      <div
                        key={item.id}
                        className="bg-app-background border-app-border rounded-lg border p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="mb-1 text-base font-semibold">{item.product.name}</h4>
                            <p className="text-sm text-gray-400">{item.product.description}</p>
                            <p className="mt-2 text-sm text-gray-400">
                              {formatPriceToBRL(item.product.price)} x {item.amount}
                            </p>
                          </div>
                          <div className="ml-4 text-right">
                            <p className="mb-1 text-sm text-gray-400">Quantidade: {item.amount}</p>
                            <p className="text-md font-semibold">
                              Subtotal: {formatPriceToBRL(subtotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="py-4 text-center text-gray-400">Nenhum item no pedido</p>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="border-app-border border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-brand-primary text-2xl font-bold">
                  {formatPriceToBRL(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter className="border-app-border flex flex-row gap-3 border-t bg-transparent sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onClose()}
            className="border-app-border flex-1 bg-transparent text-white hover:bg-transparent hover:text-white"
          >
            Fechar
          </Button>
          <Button
            className="bg-brand-primary hover:bg-brand-primary/90 flex-1 font-semibold text-white"
            disabled={loading}
            onClick={handleFinishOrder}
          >
            Finalizar pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { OrderModal };
