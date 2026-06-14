import { History, Package, ShoppingCart, Tags, User } from 'lucide-react';

export const menuItems = [
  { title: 'Pedidos', href: '/dashboard', icon: ShoppingCart },
  { title: 'Produtos', href: '/dashboard/products', icon: Package },
  { title: 'Categorias', href: '/dashboard/categories', icon: Tags },
  { title: 'Usuários', href: '/dashboard/users', icon: User },
  { title: 'Historico de Pedidos', href: '/dashboard/past-orders', icon: History },
];
