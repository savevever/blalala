<template>
    <div class="container">
        <div id="storeContainer">
            <!-- ข้อมูลร้านค้า -->
            <div id="storeLeft">
                <div id="storeLeftIMG">
                    <img src="../assets/1.png" alt="Store Image">
                </div>
                <div id="storeLeftTXT">
                    <p id="namestore">{{ shopInfo ? shopInfo.name : 'Loading...' }}</p>
                    <p>Active 4 นาที ที่ผ่านมา</p>
                    <div id="storeLeftButton">
                        <button @click="handleToggleFollow">
                            <font-awesome-icon :icon="['fas', 'plus']" class="font-awesome" />
                            <p>{{ isFollowed(shopId) ? 'ติดตามแล้ว' : 'ติดตาม' }}</p>
                        </button>
                        <button>
                            <font-awesome-icon :icon="['fas', 'comment']" class="font-awesome" />
                            <p>แชท</p>
                        </button>
                        <button>
                            <font-awesome-icon :icon="['fas', 'house']" class="font-awesome" />
                            <p>หน้าร้าน</p>
                        </button>
                    </div>
                </div>
            </div>
            <div id="line"></div>
            <div id="storeRight">
                <p>คะแนน: 51.9พัน</p>
                <p>รายการสินค้า: {{ products.length }}</p>
                <p>เวลาในการตอบกลับ: ภายในไม่กี่ชั่วโมง</p>
                <p>เข้าร่วมเมื่อ: 24 เดือนที่ผ่านมา</p>
                <p>ผู้ติดตาม: <span>{{ followerCount(shopId) }}</span> คน</p>
            </div>
        </div>
        <!-- ส่วนแสดงสินค้า -->
        <div class="products-container">
            <div v-for="product in filteredProducts" :key="product.id" class="originalDiv">
                <div class="products-items">
                    <div @click="selectProduct(product)">
                        <router-link :to="{ path: '/users/production', query: { productId: product.id } }">
                            <img :src="product.imageSource" />
                        </router-link>
                    </div>
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
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faComment, faHouse } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

library.add(faPlus, faComment, faHouse);

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            products: [], 
            seller: ''
        };
    },
    computed: {
        ...mapGetters(['shopInfo', 'isFollowed', 'followerCount']),
        shopId() {
            return this.shopInfo ? this.shopInfo.id : null;
        },
        filteredProducts() {
            console.log('Filtering products with seller:', this.seller);
            const filtered = this.products.filter(product => product.seller === this.seller);    
            console.log('Filtered products:', filtered);
            return filtered;
        }
    },
    async mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        // console.log('Product ID:', productId);
        if (productId) {
            await this.fetchShopInfo(productId);
            await this.loadProducts();
            this.setSeller(productId);
        }

    },
    methods: {
        ...mapActions(['fetchShopInfo', 'toggleFollowShop', 'setSelectedProduct']),
        handleToggleFollow() {
            if (this.shopId) {
                this.toggleFollowShop(this.shopId);
            }
        },
        selectProduct(product) {
            this.setSelectedProduct(product);
        },
        async loadProducts() {
            try {
                const response = await axios.get('http://localhost:8081/seller/item');
                this.products = response.data;
                console.log('Fetched products:', this.products);    
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        setSeller(productId) {
            const product = this.products.find(p => p.id == productId);
            console.log('Found product:', product); 

            if (product) {
                this.seller = product.seller;
                // console.log('Seller:', this.seller);
            }
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}

#storeContainer {
    width: 100vw;
    height: 250px;
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -70px
}

#storeRight {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
}

#storeLeft {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
}

#storeRight p {
    font-size: 21px;
}

#storeLeftIMG img {
    width: 130px;
    height: 130px;
    border-radius: 70px;
    margin-right: 15px;
}

#line {
    width: 3px;
    height: 200px;
    background-color: rgb(116, 111, 111);
    margin-right: 40px;
}

#namestore {
    font-size: 39px;
}

#storeLeftTXT {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

#storeLeftTXT button {
    display: flex;
    align-items: center;
    justify-content: center;
}

#storeLeftTXT p {
    margin: 0;
}

#storeLeftButton {
    display: flex;
    gap: 0.5rem;
}


#storeLeftButton button:first-child {
    background-color: #73FF67;
    border: 0.5px solid #398b32;
}

#storeLeftButton button:nth-child(2) {
    background-color: #67F6FF;
    border: 0.5px solid #33898f;
}

#storeLeftButton button:nth-child(3) {
    background-color: #FF9E67;
    border: 0.5px solid #7e492a;
    width: 80px;
}

.font-awesome {
    width: 16px;
    height: 21px;
    margin-right: 5px;
}

.detailStore {
    width: 1300px;
    height: 500px;
    background-color: #ffffff;

}

.detailStore p {
    margin: 50px;
    font-size: 20px;
}

.detailStore h2 {
    margin: 50px 0 0 50px;
}

textarea {
    margin: 50px;
    width: 93%;
    height: 330px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    resize: vertical;
    border: none;
}

/***** */
/* CSS ที่เกี่ยวกับสินค้า */
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

/* CSS อื่น ๆ ที่เกี่ยวข้องกับ storePage */
.container {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}
</style>