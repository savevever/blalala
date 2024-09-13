<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1>ประวัติการซื้อ</h1>
                <div id="item-container">
                    <div v-for="(product, index) in paginatedProducts" :key="index" class="item">
                        <div class="line"></div>
                        <div class="items">
                            <img :src="product.image" alt="" style="width: 100px; height: 100px;">
                            <div class="item-1">
                                <p><span>{{ product.nameProduct }}</span></p>
                            </div>
                            <div class="item-2">
                                <p>ตัวเลือก:<span>{{ product.productTypes }}</span> </p>
                                <p>{{ product.price }} บาท</p>
                                <!-- <p>สถานะ:จัดส่งแล้ว</p> -->
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="item-button">
                            <button @click="reorder(product)">สั่งซื้ออีกครั้ง</button>
                            <button @click="cancelOrder(product.id)">ยกเลิกคำสั่งซื้อ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        async cancelOrder(productId) {
            console.log(productId);

            try {
                const response = await axios.delete(`http://localhost:8081/products/delHistory/${productId}`);
                console.log(response.data);  // Log response

                // หลังจากลบเสร็จแล้ว ให้โหลดประวัติใหม่
                await this.loadHistory();
            } catch (error) {
                console.error('Error canceling order:', error);
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
                const localhostUrl = currentUrl.replace(`${ process.env.VUE_APP_NGROK_URL}users/PurchaseHistory`, expectedLocalhostUrl);
                console.log('Redirecting to:', localhostUrl);
                window.location.href = localhostUrl;
            }
        }
    },
    async mounted() {
        this.handleRedirectToLocalhost();

        await this.loadHistory();

    }
};
</script>




<style scoped>
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
}

.item-2 span {
    font-size: 25px;
}

.item-1 span {
    font-size: 25px;
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
}

.item-button {
    width: 100%;
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