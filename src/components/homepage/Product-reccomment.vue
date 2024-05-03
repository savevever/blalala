<template>
  <div class="container">
    <div class="products-container">
      <div v-for="product in paginatedProducts" :key="product.id" class="originalDiv">
        <div class="products-items">
          <img :src="require('@/assets/1.png')" />
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
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>
      <button v-for="page in totalPages" :key="page" @click="gotoPage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      itemsPerPage: 12,
      totalItems: 0,
    };
  },
  created() {
    for (let i = 0; i < 24; i++) {  // สร้างข้อมูลตัวอย่าง 12 รายการ
      this.products.push({
        id: i + 1,
        imageSource: "2.png",
        title: "Product Title " + (i + 1),
        price: "245฿",
        soldCount: 2450 + i,
      });
    }
    this.totalItems = this.products.length;
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    }
  },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    gotoPage(page) {
      this.currentPage = page;
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
  background-color: #f5f5f5;
  align-items: center;
}

.products-container {
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  background-color: #f5f5f5;
  margin-top: 1.5rem;
}

.pagination button.active {
  font-weight: bold;
  background-color: rgb(214, 133, 57);
  border: rgb(240, 166, 97);
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

.pagination {
  width: 1300px;
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
}

.pagination button {
  padding: 0.3rem 0.7rem 0.3rem 0.7rem;
}

/* ------------------------------------------ */
/* ----------------------toptree-products-items---------------- */
</style>