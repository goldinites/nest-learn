import { CartItemResponse } from '@/modules/cart/types/cart-item.type';

export type CartResponse = {
  id: number;
  items: CartItemResponse[];
  totalPrice: number;
};
