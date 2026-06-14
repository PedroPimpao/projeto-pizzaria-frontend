export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'EXTERNAL' | 'SUPER_ADMIN' | 'USER_ROOT';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'EXTERNAL' | 'SUPER_ADMIN' | 'USER_ROOT';
  token: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  disabled: boolean;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
}

export interface Items {
  id: string
  amount: number
  product: {
    id: string
    name: string
    price: number
    description: string
    banner: string
  }
}

export interface Order{
  id: string
  table: string
  name?: string
  status: boolean
  draft: boolean
  createdAt: string
  updatedAt: string
  items?: Items[]
}
