<template>
    <div class="container">
        <div id="storeContainer">
            <!-- ข้อมูลร้านค้า -->
            <div id="storeLeft">
                <div id="storeLeftIMG">
                    <img src="../assets/1.png" alt="Store Image">
                </div>
                <div id="storeLeftTXT">
                    <p id="namestore">{{ shopName }}</p>
                    <p>Active 4 นาที ที่ผ่านมา</p>
                    <div id="storeLeftButton">
                        <button @click="handleToggleFollow">
                            <font-awesome-icon :icon="['fas', 'plus']" class="font-awesome" />
                            <p>{{ StoreFollow ? 'ติดตามแล้ว' : 'ติดตาม' }}</p>
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
                <p>รายการสินค้า:<span>{{ filteredProducts.length }}</span></p>
                <p>เวลาในการตอบกลับ: ภายในไม่กี่ชั่วโมง</p>
                <p>เข้าร่วมเมื่อ: 24 เดือนที่ผ่านมา</p>
                <p>ผู้ติดตาม: <span>{{ followerCount }}</span> คน</p>
            </div>
        </div>
        <div class="products-container">
            <div v-for="product in filteredProducts" :key="product.id" class="originalDiv">
                <div class="products-items">
                    <div @click="selectProduct(product)">
                        <router-link :to="{ path: '/users/production', query: { productId: product.id } }">
                            <img :src="product.images[0].src" alt="Product Image" />
                        </router-link>
                    </div>
                    <div class="products-item">
                        <p class="products-title">{{ product.nameProduct }}</p>
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
import { mapState, mapActions } from 'vuex';
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
            shopId: null,
            shopName: '',
            productId: null,
            products: [],
            filteredProducts: [],
            StoreFollow: false,
            followerCount: 0,
            userEmail: '',
        };
    },
    computed: {
        ...mapState(['shopInfo']),
    },
    async mounted() {
        const user = localStorage.getItem('user');

        // ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่
        if (user) {
            try {
                // แปลง JSON เป็นอ็อบเจ็กต์
                const userObject = JSON.parse(user);

                // เข้าถึงค่า email
                this.userEmail = userObject.email;
                console.log('User email:', this.userEmail); // ควรแสดงค่าอีเมลที่ถูกต้อง

                // ดำเนินการต่อกับ productId และ shopId
                this.productId = new URLSearchParams(window.location.search).get('productId');
                if (this.productId) {
                    this.fetchProductDetails();
                    this.fetchShopDetails();
                }
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
            }
        } else {
            console.warn('No user found in localStorage');
        }
        this.productId = new URLSearchParams(window.location.search).get('productId');
        if (this.productId) {
            await this.fetchProductDetails();
            await this.fetchShopDetails();
        }
    },
    methods: {
        ...mapActions(['fetchProducts']),
        async fetchProductDetails() {
            try {
                const response = await axios.get("http://localhost:8081/selling/productss");
                this.products = response.data || [];

                console.log('Product Details:', this.products); // ล็อกข้อมูลสินค้า

                if (response.data && response.data.length > 0) {
                    const product = response.data.find(product => product.id == this.productId);
                    if (product) {
                        this.shopId = product.shopId;
                        console.log('Shop ID:', this.shopId); // ล็อก shopId
                    } else {
                        console.error('Product not found');
                    }
                } else {
                    console.error('No products found');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },
        async fetchShopDetails() {
            try {
                if (this.shopId) {
                    const response = await axios.get('http://localhost:8081/shop/shopsFollow', {
                        params: { email: this.userEmail }
                    });
                    const shops = response.data.data || [];
                    const shop = shops.find(shop => shop.shopId === this.shopId);
                    if (shop) {
                        this.shopName = shop.shopName;
                        this.StoreFollow = shop.isFollowing; // ใช้ค่า isFollowing ที่ได้รับจาก API
                        this.followerCount = shop.follow; // ตั้งค่า followerCount ตามข้อมูลที่ได้รับ
                        this.filteredProducts = this.products.filter(product => product.shopId === this.shopId);
                        console.log('Shop details:', shop);
                    } else {
                        console.error('Shop not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        }
        ,
        async handleToggleFollow() {
            try {
                console.log('shopId:', this.shopId);
                console.log('userEmail:', this.userEmail);
                if (this.shopId !== null && this.userEmail) {
                    const followChange = this.StoreFollow ? -1 : 1;
                    console.log("Toggling follow status");

                    // ส่งข้อมูลไปยัง API เพื่ออัปเดตสถานะการติดตาม
                    const response = await axios.post('http://localhost:8081/shop/follow', {
                        email: this.userEmail,
                        shopId: this.shopId,
                        followChange: followChange
                    });

                    // อัปเดตสถานะการติดตามและจำนวนผู้ติดตาม
                    this.StoreFollow = !this.StoreFollow;
                    this.followerCount = response.data.followCount;

                    console.log('Follow Status:', this.StoreFollow);
                    console.log('Follower Count:', this.followerCount);

                    // ดึงข้อมูลร้านค้าใหม่เพื่ออัปเดต UI
                    await this.fetchShopDetails();
                }
            } catch (error) {
                console.error('Error toggling follow status:', error);
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