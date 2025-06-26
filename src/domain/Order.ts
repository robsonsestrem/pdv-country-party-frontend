import { Product } from './Product';

export interface OrderItem {
  product: Product;
  qtd_order_item: number;
}

export interface Order {
  id_order?: number;
  id_customer?: number;
  date_order?: string;
  status?: string;
  qtd_items: number;
  total: number;
  money_change?: number;
  discount_value?: number;
  items: OrderItem[];
}
