import { History, Package, ShoppingCart, Tags, User2, Users } from 'lucide-react';

export const menuItems = [
  { title: 'Pedidos', href: '/dashboard', icon: ShoppingCart },
  { title: 'Produtos', href: '/dashboard/products', icon: Package },
  { title: 'Categorias', href: '/dashboard/categories', icon: Tags },
  { title: 'Usuários', href: '/dashboard/users', icon: Users },
  { title: 'Historico de Pedidos', href: '/dashboard/past-orders', icon: History },
  { title: 'Perfil', href: '/profile', icon: User2 },
];
