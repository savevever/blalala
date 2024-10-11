<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1>ประวัติการซื้อ</h1>
                <div id="item-container">
                    <div v-for="shop in shops" :key="shop.shopId" class="shop-container">
                        <h1>ชื่อร้าน: {{ shop.shopName }}</h1>
                        <div v-for="product in filteredProducts(shop.shopId)" :key="product.productId" class="item">
                            <div class="line"></div>
                            <div class="items">
                                <input type="checkbox" v-model="product.checkbox" class="checked"
                                @change="setSelectItem(product)">
                                <img :src="product.image" alt="" style="width: 70px; height: 70px; object-fit: cover;">
                                <div class="item-1">
                                    <p><span>{{ product.nameProduct }}</span></p>
                                </div>
                                <div class="item-2">
                                    <p>ตัวเลือก:<span>{{ product.productTypes }}</span></p>
                                    <router-link :to="{ path: '/selling/reviewPage', query: { productId: product.productId } }"><button>ให้คะเเนน</button></router-link>
                                    <p>{{ product.price }} บาท</p>
                                </div>
                            </div>
                            <!-- <div class="line"></div> -->
                        </div>
                        <div class="item-button">
                            <!-- <button @click="reorder(product)">สั่งซื้ออีกครั้ง</button> -->
                            <button @click="handleClick">สั่งซื้ออีกครั้ง</button>
                            <!-- <button @click="cancelOrder(product.productId)">ยกเลิกคำสั่งซื้อ</button> -->
                            <button @click="cancelOrder">ลบรายการสินค้า</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- <div v-for="shop in shops" :key="shop.shopId">
            <h1>ชื่อร้าน: {{ shop.shopName }}</h1>
            <div v-for="product in filteredProducts(shop.shopId)" :key="product.productId">
                <p>สินค้าของร้านค้านี้: {{ product.nameProduct }}</p>
            </div>
        </div> -->

    </div>
    <footerComponent></footerComponent>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            history: [],
            currentPage: 1,
            itemsPerPage: 12,
            totalItems: 0,
            shops: [],
            products: [],
            selectedItems: [],
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.history.slice(start, end);
        }
    },
    methods: {
        filteredProducts(shopId) {
            return this.products.filter(product => product.shopId === shopId);
        },
        async loadHistory() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }

                const response = await axios.get('http://localhost:8081/products/getHistory');
                const allHistory = response.data;

                // กรองข้อมูลตามอีเมลของผู้ใช้
                this.history = allHistory.filter(entry => entry.email === userEmail);
                this.totalItems = this.history.length;
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        },
        reorder(product) {
            console.log('Reordering product:', product);
        },
        async cancelOrder() {
            const itemsToRemove = this.selectedItems.filter(product => product.checkbox);

            try {
                // Send a delete request for each selected product
                for (const product of itemsToRemove) {
                    await axios.delete(`http://localhost:8081/products/delHistory/${product.productId}`);
                    console.log(`Deleted product with ID: ${product.productId}`);
                }

                // After removing the items, refresh the history
                await this.loadHistory();

            } catch (error) {
                console.error('Error canceling orders:', error);
            }
        },
        gotoPage(page) {
            this.currentPage = page;
        },
        handleRedirectToLocalhost() {
            const currentUrl = window.location.href;
            const expectedLocalhostUrl = 'http://localhost:8080/users/PurchaseHistory';
            console.log('Current URL:', currentUrl);
            if (currentUrl !== expectedLocalhostUrl) {
                const localhostUrl = currentUrl.replace(`${process.env.VUE_APP_NGROK_URL}users/PurchaseHistory`, expectedLocalhostUrl);
                console.log('Redirecting to:', localhostUrl);
                window.location.href = localhostUrl;
            }
        },
        async getProducts() {
            try {
                const response = await axios.get("http://localhost:8081/products/getHistory");
                this.products = response.data; // เก็บข้อมูลสินค้าทั้งหมด
                console.log("Fetched Products:", this.products); // Log ข้อมูลที่ดึงมา
            } catch (error) {
                console.error("Error fetching products:", error.response ? error.response.data : error);
            }
        },
        async getShops() {
            try {
                // ดึงข้อมูลร้านค้าทั้งหมดในครั้งเดียวจาก API
                const response = await axios.get('http://localhost:8081/shop/shops');
                const fetchedShops = response.data.data; // Assuming data contains an array of shops

                // ตรวจสอบว่า shopId แต่ละตัวอยู่ใน products หรือไม่ แล้วเพิ่มเฉพาะร้านค้าที่ไม่ซ้ำ
                const uniqueShopIds = [...new Set(this.products.map(product => product.shopId))];
                console.log("Unique Shop IDs:", uniqueShopIds); // Log shopId ที่ไม่ซ้ำกัน

                for (const shopId of uniqueShopIds) {
                    const existingShop = this.shops.find(shop => shop.shopId === shopId);
                    if (!existingShop) {
                        const shopData = fetchedShops.find(shop => shop.shopId === shopId);
                        if (shopData) {
                            this.shops.push({
                                shopId: shopData.shopId,
                                shopName: shopData.shopName
                            });
                            console.log("Added Shop:", shopData); // Log ร้านค้าที่ถูกเพิ่ม
                        }
                    }
                }
                console.log("All Shops:", this.shops); // Log ข้อมูลร้านค้าทั้งหมดที่ถูกดึงมา
            } catch (error) {
                console.error("Error fetching shops:", error.response ? error.response.data : error);
            }
        },
        setSelectItem(product) {
            if (product.checkbox) {
                // ถ้าถูกเลือก เพิ่มสินค้าเข้าไปใน selectedItems
                this.selectedItems.push(product);
            } else {
                // ถ้าถูกยกเลิกการเลือก เอาสินค้าออกจาก selectedItems
                const index = this.selectedItems.findIndex(item => item.id === product.id);
                if (index !== -1) {
                    this.selectedItems.splice(index, 1);
                }
            }
            console.log("Selected items:", this.selectedItems);
        },

    },
    async mounted() {
        this.handleRedirectToLocalhost();
        await this.getProducts();
        await this.getShops();
        await this.loadHistory();

    }
};
</script>




<style scoped>
.checked {
    width: 25px;
    height: 25px;
}
#Purchase-history-container {
    width: 1200px;
    height: auto;
    min-height: 690px;
    background-color: #EBE3D5;
    display: flex;
}

p {
    font-size: 18px;
}

#Purchase-history-right {
    padding: 20px;
    width: 920px;
    min-height: 690px;
    height: auto;
    /* เปลี่ยนจากค่า height คงที่เป็น auto */
    background-color: #F4F4F5;
    display: flex;
    flex-direction: column;
    overflow: visible;
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
    align-items: center;
}

.item-2 span {
    font-size: 20px;
}
.item-2 button {
    height: 40px;
}

.item-1 span {
    font-size: 20px;
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
    margin: 10px 0 10px 0;
}

.item-button {
    display: flex;
    width: 907px;
    margin-top: 10px;
    padding-right: 50px;
    justify-content: flex-end;
    gap: 2rem;
}

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}


#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
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