<template>
    <div id="container">

        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1>ประวัติการซื้อ</h1>
                <div id="item-container">
                    <div v-for="(product, index) in history" :key="index" class="item">
                        <div class="line"></div>
                        <div class="items">
                            <img :src="product.imageSource" alt="" style="width: 100px; height: 100px;">
                            <div class="item-1">
                                <p>{{ product.title }}</p>
                                <!-- <p>ตัวเลือกสินค้า: {{ item.option }}</p>     -->
                            </div>
                            <div class="item-2">
                                <p>{{ product.price }} บาท</p>
                                <p>{{ product.price }} บาท</p>
                                <p>สถานะ:จัดส่งเเล้ว</p>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="item-button">
                            <button >สั่งซื้ออีกครั้ง</button>
                            <button @click="cancelOrder(item.id)">ยกเลิกคำสั่งซื้อ</button>
                        </div>
                    </div>
                </div>
                <paginationComponent :currentPage="currentPage" :totalPages="totalPages" @update:page="gotoPage" />
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>
<script>
import paginationComponent from '../components/pagination-component.vue'
import { mapGetters, mapActions } from 'vuex';



export default {
    components: {
        paginationComponent
    },mounted() {
        this.loadHistory();
        console.log(this.history);
    }, methods: {
        ...mapActions(['loadHistory']),
        reorder(item) {
            this.$store.dispatch('addToCart', item);
        },
        // cancelOrder(productId) {
        //     // ฟังก์ชันสำหรับยกเลิกคำสั่งซื้อ
        // },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        toggleVisibility2() {
            this.isVisible2 = !this.isVisible2;
        }, gotoPage(page) {
            this.currentPage = page;
        }

    }, data() {
        return {
            isVisible: false,
            isVisible2: false,
            products: [],
            currentPage: 1,
            itemsPerPage: 12,
            totalItems: 0,

        };
    }, computed: {
        ...mapGetters(['history']),
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        }
    },
};
</script>
<style scoped>
#Purchase-history-container {
    width: 1200px;
    height: 680px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    display: flex;
}

#Purchase-history-right {
    padding: 20px;
    width: 920px;
    height: 690px;
    background-color: #F4F4F5;
    display: flex;
    flex-direction: column;
}

.items {
    display: flex;
    gap: 10px;
    width: 100%;
}

.item-2 {
    display: flex;
    gap: 70px;
    margin-left: 70px;
}

.item {
    width: 94%;
    background-color: #ffffff;
    padding: 1rem 1.3rem 1rem 1.3rem;
}

.line {
    width: 100%;
    height: 2px;
    background-color: rgb(179, 172, 172);
    margin: 20px 0 10px 0;
}

.item-button {
    display: flex;
    width: 900px;
    justify-content: flex-end;
    gap: 2rem;
}

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 30px; */
}



.item-button{
 width: 100%;
}
#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item-button :first-child {
    width: 122px;
    height: 41px;
    box-shadow: none;
    background: #fde0ae;
    border: 0.6px solid #fcdca6;
}

.item-button :nth-child(2) {
    width: 140px;
    height: 41px;
    box-shadow: none;
    background: #ffffff;
    border: 0.2px solid #ccc;
}


#Purchase-history-pagination {
    display: flex;
    margin-top: 80px;
    gap: 5px;
    width: 900px;
    justify-content: flex-end;
}

#Purchase-history-pagination button {
    width: auto;
    padding: 0px 10px 5px 10px;
    height: 20px;


}

.icon {
    font-size: 30px;

}
</style>