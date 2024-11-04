<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const store = useCounterStore();
const products = ref<Product[]>([]);
const loading = ref(true);


const fetchProducts = async () => {
  try {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    products.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(() => {
  fetchProducts();
});


const addProductToCart = (product: Product) => {
  store.addToCart(product);
};

const addProductToWishlist = (product: Product) => {
  store.addToWishlist(product);
};
</script>

<template>
  <div class="product-list">
    <h2>All Products</h2>
    <div class="product-grid">
     
      <div v-if="loading" class="skeleton-item" v-for="n in 12" :key="n"></div>
      
      
      <div v-else class="product-item" v-for="product in products" :key="product.id">
        <img :src="product.image" alt="Product image" class="product-image" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }} USD</p>
        
        
        <button @click="addProductToCart(product)">Add to Cart</button>
        <button @click="addProductToWishlist(product)">Add to Wishlist</button>
      </div>
    </div>
  </div>
</template>

<style>


.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.product-item {
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 10px;
  text-align: center;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-item button {
  background-color: #8bb43c;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.product-item button:hover {
  background-color: #78a02e;
}

.skeleton-item {
  width: 100%;
  padding-top: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.skeleton-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>




