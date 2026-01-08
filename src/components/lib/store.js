// components/lib/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Object} Variant
 * @property {string} color
 * @property {string} imageUrl
 * @property {string} [model3DUrl]
 */

/**
 * @typedef {Object} Product
 * @property {number|string} id - Updated to handle both numeric and string IDs from Sanity
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {string} category
 * @property {string} [model3DUrl]
 * @property {Variant[]} [variants]
 */

/**
 * @typedef {Product & { quantity: number, variant?: Variant }} CartItem
 */

/**
 * @typedef {Object} StoreState
 * @property {CartItem[]} cart
 * @property {boolean} isCartOpen
 * @property {(product: Product) => void} addToCart
 * @property {(id: number|string) => void} removeFromCart
 * @property {(id: number|string, quantity: number) => void} updateQuantity
 * @property {() => void} clearCart
 * @property {() => void} toggleCart
 * @property {() => number} getTotalPrice
 * @property {() => number} getTotalItems
 */

export const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id && item.variant?.color === product.variant?.color);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id && item.variant?.color === product.variant?.color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [
              ...cart,
              {
                ...product,
                quantity: 1,
                model3DUrl: product.model3DUrl || null,
                variant: product.variant || null,
              },
            ],
          });
        }
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          cart: get().cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        });
      },
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
     getTotalPrice: () => {
  return get().cart.reduce((total, item) => {
    const basePrice = Number(item.price) || 0;
    const vat = Number(item.vatRate) || 0; // agar vatRate ho to use karo
    return total + (basePrice + vat) * (item.quantity || 1);
  }, 0);
},

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + (item.quantity || 1), 0);
      },
    }),
    {
      name: "ecommerce-cart",
    }
  )
);