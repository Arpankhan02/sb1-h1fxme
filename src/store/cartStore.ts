import { create } from 'zustand';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  total: number;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + product.price,
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        total: state.total + product.price,
      };
    }),

  removeItem: (productId) =>
    set((state) => {
      const itemToRemove = state.items.find((item) => item.id === productId);
      const newItems = state.items.filter((item) => item.id !== productId);
      return {
        items: newItems,
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
      };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return {
        items: updatedItems,
        total: newTotal,
      };
    }),
}));
