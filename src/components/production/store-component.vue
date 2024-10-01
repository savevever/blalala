<template>
    <div class="container">
        <div id="storeContainer">
            <div id="storeLeft">
                <div id="storeLeftIMG">
                    <router-link :to="{ path: '/store/storepage', query: { productId: productId } }">
                        <img src="../../assets/1.png" alt="">
                    </router-link>
                </div>
                <div id="storeLeftTXT">
                    <p id="namestore">{{ shopName }}</p>
                    <p>Active 4 นาที ที่ผ่านมา</p>
                    <div id="storeLeftButton">
                        <button @click="handleToggleFollow">
                            <font-awesome-icon :icon="['fas', 'plus']" class="font-awesome" />
                            <p>{{ StoreFollow ? 'ติดตามแล้ว' : 'ติดตาม' }}</p>
                        </button>
                        <!-- <button>
                            <font-awesome-icon :icon="['fas', 'comment']" class="font-awesome" />
                            <p>แชท</p>
                        </button> -->
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
                <p>รายการสินค้า: 199</p>
                <p>เวลาในการตอบกลับ: ภายในไม่กี่ชั่วโมง</p>
                <p>เข้าร่วมเมื่อ: 24เดือนที่ผ่านมา</p>
                <p>ผู้ติดตาม: <span>{{ followerCount }}</span> คน</p>
            </div>
        </div>
    </div>
</template>

<script>
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
            StoreFollow: false,
            followerCount: 0,
        };
    },
    async mounted() {
        // Get productId from the URL
        this.productId = new URLSearchParams(window.location.search).get('productId');

        if (this.productId) {
            await this.fetchProductDetails();
            await this.fetchShopDetails();
        }
    },
    methods: {
        async fetchProductDetails() {
            try {
                const response = await axios.get("http://localhost:8081/selling/productss");
                if (response.data && response.data.length > 0) {
                    const product = response.data.find(product => product.id == this.productId);
                    if (product) {
                        this.shopId = product.shopId; // Store the shopId from the product
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
                    const response = await axios.get('http://localhost:8081/shop/shops', {
                        params: { email: this.userEmail }
                    });
                    const shops = response.data.data || [];
                    const shop = shops.find(shop => shop.shopId === this.shopId);
                    if (shop) {
                        this.shopName = shop.shopName;
                        this.StoreFollow = shop.isFollowing; 
                        this.followerCount = shop.follow; 
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
    width: 1300px;
    flex-direction: column;
    align-items: center;
}

#storeContainer {
    width: 1285px;
    height: 114px;
    border-radius: 15px;
    background: #FFF;
    margin: 20px 0 20px 0;
    display: flex;
    padding: 10px;
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
    margin-right: 40px;
}

#storeRight p {
    font-size: 18px;
}

#storeLeftIMG img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-right: 15px;
}

#line {
    width: 3px;
    height: 100px;
    background-color: rgb(116, 111, 111);
    margin-right: 40px;
}

#namestore {
    font-size: 29px;
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
    width: 13px;
    height: 18px;
    margin-right: 5px;
}
</style>