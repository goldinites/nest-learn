import { Cart } from '@/modules/cart/entities/cart.entity';
import { CartItem } from '@/modules/cart/entities/cart-item.entity';
import { CartItemResponse } from '@/modules/cart/types/cart-item.type';
import { CartResponse } from '@/modules/cart/types/cart.type';

export function mapCartItemToDto(item: CartItem): CartItemResponse {
  return {
    id: item.id,
    bookId: item.book.id,
    title: item.book.title,
    price: item.book.price,
    quantity: item.quantity,
  };
}

export function mapCartToDto(cart: Cart): CartResponse {
  const items: CartItemResponse[] = cart.items.map(mapCartItemToDto);

  return {
    id: cart.id,
    items,
    totalPrice: items.reduce(
      (sum: number, item: CartItemResponse): number =>
        sum + item.quantity * (item.price ?? 0),
      0,
    ),
  };
}
