<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import bgImg from "@/assets/images/kermit-img.png";
import { useCounterStore } from '@/store/counter';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number };
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

const sortSelected = ref('');
const searchQuery = ref('');

const sortedAndFilteredProducts = computed(() => {
  let filteredProducts = products.value;
  
  if (searchQuery.value) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (sortSelected.value === 'Low to High') {
    return [...filteredProducts].sort((a, b) => a.price - b.price);
  }
  if (sortSelected.value === 'High to Low') {
    return [...filteredProducts].sort((a, b) => b.price - a.price);
  }
  if (sortSelected.value === 'A to Z') {
    return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortSelected.value === 'Z to A') {
    return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
  }
  if (sortSelected.value === 'Rating') {
    return [...filteredProducts].sort((a, b) => b.rating.rate - a.rating.rate);
  }
  return filteredProducts;
});

const addProductToCart = (product: Product) => {
  store.addToCart(product);
};

const addProductToWishlist = (product: Product) => {
  store.addToWishlist(product);
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <section class="hero">  
    <img :src="bgImg" alt="My Image" />
    <div class="buy-side">
      <h1><span style="color: #8bb43c;">Stan Smith</span>, <br> Forever!</h1>
      <a href=""><div class="btn">BUY</div></a>
    </div>
  </section>
  
  <section class="products">
    <h1>All Sneakers</h1>
    <div class="sort-search">
      <div class="sort">
        <form @submit.prevent>
          <label for="sort-list">Price:</label>
          <select v-model="sortSelected" id="sort-list">
            <option disabled value="">Please select one</option>
            <option>Low to High</option>
            <option>High to Low</option>
            <option>A to Z</option>
            <option>Z to A</option>
            <option>Rating</option>
          </select>
        </form>
      </div>

      <div class="search">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Search..." />
      </div>
    </div>

    <div class="product-list">
      <div class="product-grid">
        <div v-if="loading" class="skeleton-item" v-for="n in 12" :key="n"></div>
        
        <div v-else class="product-item" v-for="product in sortedAndFilteredProducts" :key="product.id">
          <img :src="product.image" alt="Product image" class="product-image" />
          <h3>{{ product.title }}</h3>
          <p>{{ product.price }} USD</p>
          <button @click="addProductToCart(product)" class="add">C</button>
          <button @click="addProductToWishlist(product)" class="fav">W</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Hero and product sections styling */
.skeleton-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding-top: 30px;
    width: 100%;
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

.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
}

.product-item {
  border-radius: 20px;
  box-shadow: 0px 0px 12px 2px rgba(0,0,0,0.2);
  padding: 10px;
  text-align: center;
  position: relative;
}

.product-image {
    width: 60%;
    height: 60%; 
    border-radius: 8px; 
    margin-top: 20px;
}

.product-item .fav {
  background-color: #FEF0F0;
  color: #FF8585;
  border: none;
  padding: 8px 12px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 30px;
  position: absolute;
  top: 10px;
  left: 15px;
}

.product-item .fav:hover {
  background-color: #FEF0F0;
  box-shadow: 0px 0px 16px 0px rgba(34, 60, 80, 0.5);
}

.product-item .add {
  background-color: #FEF0F0;
  color: #FF8585;
  border: none;
  padding: 8px 12px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.product-item .add:hover {
  background-color: #FEF0F0;
  box-shadow: 0px 0px 16px 0px rgba(34, 60, 80, 0.5);
}

#sort-list, .search input {
  background: none;
  border: none;
  color: #BDBDBD;
}

.search input::placeholder {
  color: #BDBDBD;
  padding-left: 15px;
}
</style>
