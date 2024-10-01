<template>
  <div class="container">
    <div class="products-container">
      <div v-for="product in paginatedProducts" :key="product.id" class="originalDiv">
        <div class="products-items">
          <div @click="selectProduct(product)">
            <router-link :to="{ path: '/users/production', query: { productId: product.id } }">
              <img :src="product.images[0].src" />
            </router-link>
          </div>
          <div class="products-item">
            <p class="products-title">{{ product.nameProduct }}</p>
            <div class="price-soldout">
              <p class="price">{{ product.price }}<span style="color: black;"> บาท</span></p>
              <!-- <p class="sold-out">ขายแล้ว {{ product.soldCount }} ชิ้น</p> -->
              <p class="sold-out">ขายเเล้ว:{{ Alltotalsell }}ชิ้น</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <paginationComponent :currentPage="currentPage" :totalPages="totalPages" @update:page="gotoPage" />
  </div>
</template>

<script>
import paginationComponent from '../pagination-component.vue';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12,
      filteredProducts: []
    };
  },
  components: {
    paginationComponent
  },
  created() {
    this.loadProducts();
  },
  computed: {
    ...mapGetters(['products']),
    Alltotalsell() {
      return this.filteredProducts.reduce((total, product) => {
        return total + (product.totalSell || 0);
      }, 0);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const products = this.products.slice(start, end);
      console.log('Paginated products:', products);
      return products;
    }
  },
  methods: {
    async fetchShopDetails() {
            try {
                const response = await axios.get('http://localhost:8081/shop/shopsFollow');
                const shops = response.data.data || [];
                const shop = shops.find(shop => shop.email === this.userEmail);
                if (shop) {
                    this.shopName = shop.shopName;
                    this.shopId = shop.shopId;
                    this.StoreFollow = shop.isFollowing;
                    this.followerCount = shop.follow;
                    this.filteredProducts = this.products.filter(product => product.shopId === this.shopId);
                } else {
                    console.error('Shop not found');
                }

            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        },
    ...mapActions(['setSelectedProduct']),
    async loadProducts() {
      try {
        const response = await axios.get('http://localhost:8081/selling/productss');
        this.$store.commit('SET_PRODUCTS', response.data);
        console.log('Fetched products:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    gotoPage(page) {
      this.currentPage = page;
    },
    selectProduct(product) {
      this.setSelectedProduct(product);
    }
  }
};
</script>



<style scoped>
/* ------------------------------------------ */
/* ----------------------toptree-products---------------- */
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: #f3efe8;
  align-items: center;
}

.products-container {
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  background-color: #f3efe8;
  margin-top: 1.5rem;
}

.originalDiv {
  flex: 0 1 calc(16.66% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.products-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: #ffffff;
}

.products-items img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

.products-items p {
  width: 200px;
  height: 70px;
  text-align: center;
}

.products-item {
  width: 100%;
  height: 140px;
  background: #ffffff;
  text-align: center;
}

.products-title {
  font-size: 20px;
  margin: 0;
  margin-top: 10px;
}

.price {
  font-size: 1.15rem;
  color: #b80d0d;
}

.sold-out {
  font-size: 0.75rem;
  margin-right: 10px;

}

.price-soldout {
  width: 200px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  padding-bottom: 0.5rem;
}
</style>