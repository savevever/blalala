<template>
  <div class="container">
    <div class="products-container">
      <div v-for="product in paginatedProducts" :key="product.id" class="originalDiv">
        <div class="products-items">
          <router-link to="/users/production" @click.prevent="selectProduct(product)">
            <!-- <img :src="require('@/assets/1.png')" /> -->
            <img :src="product.imageSource" />
          </router-link>
          <div class="products-item">
            <p class="products-title">{{ product.title }}</p>
            <div class="price-soldout">
              <p class="price">{{ product.price }}</p>
              <p class="sold-out">ขายแล้ว {{ product.soldCount }} ชิ้น</p>
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

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12,
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
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    }
  },
  methods: {
    ...mapActions(['loadProducts', 'setSelectedProduct']),
    gotoPage(page) {
      this.currentPage = page;
    },
    selectProduct(product) {
      this.setSelectedProduct(product);
      this.$router.push('/users/production'); 
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
  align-items: center;
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

.products-title {
  font-size: 20px;
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
  height: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  padding-bottom: 0.5rem;
}

.products-item {
  width: 100%;
  background: #ffffff;
  text-align: center;
}


</style>