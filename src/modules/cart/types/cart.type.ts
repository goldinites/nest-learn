import { CartItemResponse } from '@/modules/cart/types/cart-item.type';

export type CartResponse = {
  id: number;
  userId: number;
  items: CartItemResponse[];
  totalItems: number;
  totalPrice: number;
};
