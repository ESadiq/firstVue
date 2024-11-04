import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    cart: [] as CartItem[],
    wishlist: [] as Product[],
  }),

  actions: {
    addToCart(product: Product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    addToWishlist(product: Product) {
      if (!this.wishlist.some(item => item.id === product.id)) {
        this.wishlist.push(product);
      }
    },

    removeFromCart(id: number) {
      const itemIndex = this.cart.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        this.cart.splice(itemIndex, 1);
      }
    },

    removeFromWishlist(id: number) {
      const itemIndex = this.wishlist.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        this.wishlist.splice(itemIndex, 1);
      }
    },

    getCartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    getWishlistCount() {
      return this.wishlist.length;
    },
  },

  getters: {
    cartItems: (state) => state.cart,
    wishlistItems: (state) => state.wishlist,
    cartCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    wishlistCount: (state) => state.wishlist.length,
    totalCartPrice: (state) => {
      return state.cart.reduce((total, item) => total + item.price, 0);
    }
  },
});
