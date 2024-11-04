import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    cart: [] as Product[], 
    wishlist: [] as Product[],
  }),
  actions: {
    addToCart(product: Product) {
      this.cart.push(product);
    },
    addToWishlist(product: Product) {
      this.wishlist.push(product);
    },
    getCartCount() {
      return this.cart.length;
    },
    getWishlistCount() {
      return this.wishlist.length;
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    wishlistItems: (state) => state.wishlist,
    cartCount: (state) => state.cart.length,
    wishlistCount: (state) => state.wishlist.length,
  },
});


// import { defineStore } from 'pinia';

// export const useStore = defineStore('counter', {
//   state: () => ({
//     wishlist: [] as any[]
//   }),
//   actions: {
//     addToWishlist(product: any) {
//       if (!this.wishlist.includes(product)) {
//         this.wishlist.push(product);
//       }
//     }
//   }
// });

// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     orders: [] as { id: number; title: string; price: number; quantity: number }[], 
//   }),
//   actions: {
//     addToOrders(product: { id: number; title: string; price: number }) {
//       const existingProduct = this.orders.find((item) => item.id === product.id);

//       if (existingProduct) {
        
//         existingProduct.quantity++;
//       } else {
        
//         this.orders.push({ ...product, quantity: 1 });
//       }
//     },
//   },
// });









