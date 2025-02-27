import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/ProductTypes";

interface CartState {
  cart: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((product) =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((product) =>
              product.id === id ? { ...product, quantity: Math.max(1, product.quantity - 1) } : product
            )
            .filter((product) => product.quantity > 0), // Removes if quantity is 0
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // Storage key
    }
  )
);
