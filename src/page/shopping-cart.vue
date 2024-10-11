<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1>ตะกร้าสินค้า</h1>
                <div id="item-container">
                    <div v-for="(product, index) in cartItems" :key="index" class="item">
                        <div class="items">
                            <input type="checkbox" v-model="product.checkbox" class="checked"
                                @change="setSelectItem(product)">
                            <img :src="product.image" alt="" style="width: 100px; height: 100px;">

                            <div class="item-1">
                                <p><span> {{ product.nameProduct }}</span></p>
                                <p> ตัวเลือก:<span>{{ product.productTypes }}</span></p>
                            </div>
                            <div class="item-2">
                                <div class="quantitycount">
                                    <input type="number" v-model="product.quantity" min="1"
                                        @change="onQuantityChange(product.id, product.quantity)">
                                </div>
                                <div class="product-line-price">{{ calculateLinePrice(product).toFixed(2) }} บาท</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-button">
                        <button @click="handleClick">สั่งซื้อ</button>
                        <button @click="selectAllbutton(cartItems)">เลือกสินค้าทั้งหมด</button>
                        <button @click="clearCart">ลบรายการสินค้า</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export default {

    data() {
        return {
            selectedItems: [],
            cartItems: [],
            currentPage: 1,
            itemsPerPage: 12,
            totalItems: 0,
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.cartItems.slice(start, end);
        },
        totalPrice() {
            if (this.selectedItems.length > 0) {
                return this.calculateLinePrice(this.selectedItems[0]).toFixed(2);
            }
            return 0;
        }
    },
    methods: {
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
        async loadCart() {
            try {
                console.log("sssssss");

                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in localStorage');
                }
                const userEmail = user.email;
                if (!userEmail) {
                    throw new Error('User email not found');
                }
                const response = await axios.get('http://localhost:8081/products/getCart');
                const allCartItems = response.data;
                // กรองข้อมูลตามอีเมลของผู้ใช้
                this.cartItems = allCartItems.filter(entry => entry.email === userEmail);
                // ตั้งค่า quantity เริ่มต้น
                this.cartItems.forEach(item => {
                    if (item.quantity === 0) {
                        item.quantity = 1;
                    }
                });

                console.log(this.cartItems);
                this.totalItems = this.cartItems.length;
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },
        calculateLinePrice(product) {
            return product.price * product.quantity;
        },
        userEmail() {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('User Email:', user ? user.email : null);
            return user ? user.email : null;
        },
        addToHistoryClicked() {
            if (this.selectedItems.length > 0) {
                this.selectedItems.forEach(product => {
                    const calculatedPrice = this.calculateLinePrice(product).toFixed(2); // คำนวณราคา

                    const productData = {
                        productId: product.id,
                        nameProduct: product.nameProduct,
                        price: calculatedPrice, // ใช้ราคาใหม่ที่คำนวณมา
                        quantity: product.quantity,
                        image: product.image,
                        email: product.email,
                        shopId: product.shopId,
                        productTypes: product.productTypes
                    };

                    console.log('Product Data for History:', productData);

                    axios.post('http://localhost:8081/products/createHistoryEntry', productData)
                        .then(response => {
                            console.log("Product added to history:", response.data);
                        })
                        .catch(error => {
                            console.error("Error details:", error.response ? error.response.data : error);
                        });
                });
            }
        },
        handleClick() {
            this.addToHistoryClicked();
            this.payment();
        },
        payment() {
            const selectedIds = this.selectedItems.map(product => product.id);
            const totalAmount = this.selectedItems.reduce((sum, product) => sum + this.calculateLinePrice(product), 0).toFixed(2);

            console.log("Selected IDs for payment:", selectedIds);
            console.log("Total amount:", totalAmount);

            axios.post('http://localhost:8081/2c2p/paymentToken', {
                // ProductID: selectedIds.join(', '),
                amount: totalAmount
            })
                .then(paymentResponse => {
                    const payloadObject = paymentResponse.data;
                    const payload = payloadObject.payload.payload.toString();
                    console.log('Payload received from 2C2P:', payload);

                    if (typeof payload === 'string') {
                        const decoded = jwtDecode(payload);
                        console.log('Decoded JWT:', decoded);
                        const webPaymentUrl = decoded.webPaymentUrl;

                        if (webPaymentUrl) {
                            window.location.href = webPaymentUrl;
                        } else {
                            alert('ไม่พบลิงก์สำหรับการจ่ายเงินใน Payload');
                        }
                    } else {
                        console.error('Invalid token: Payload is not a string', payload);
                        alert('เกิดข้อผิดพลาดในการประมวลผล payment token');
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Error processing payment token:', error.response.data);
                    } else {
                        console.error('Error processing payment token:', error.message);
                    }
                    alert('เกิดข้อผิดพลาดในการประมวลผล payment token');
                });
        },
        onQuantityChange(productId, quantity) {
            const product = this.cartItems.find(item => item.id === productId);
            if (product) {
                product.quantity = quantity;
                const updatedPrice = this.calculateLinePrice(product).toFixed(2);
                console.log('Quantity updated:', product);
                console.log('Updated price:', updatedPrice);
            } else {
                console.error('Product not found');
            }
        },
        async removeFromCart(productId) {
            try {
                await axios.delete(`http://localhost:8081/products/delCart/${productId}`);
                this.cartItems = this.cartItems.filter(item => item.id !== productId);
                this.totalItems = this.cartItems.length;
            } catch (error) {
                console.error('Error removing product from cart:', error);
            }
        },
        async clearCart() {
            const itemsToRemove = this.selectedItems.filter(product => product.checkbox);

            try {
                // Send a delete request for each selected product
                for (const product of itemsToRemove) {
                    await axios.delete(`http://localhost:8081/delCart/delHistory/${product.productId}`);
                    console.log(`Deleted product with ID: ${product.productId}`);
                }

                // After removing the items, refresh the history
                await this.loadHistory();

            } catch (error) {
                console.error('Error canceling orders:', error);
            }
        },
        selectAllbutton(allItems) {
            allItems.forEach(product => {
                product.checkbox = !product.checkbox;
            });
        },
        async checkout() {
            const totalAmount = this.cartTotal;
            const success = await this.processPayment({ userId: 1, amount: totalAmount }); // สมมุติว่าใช้ user id 1
            if (success) {
                alert('ชำระเงินสำเร็จ');
                console.log('ยอดเงินคงเหลือ: ' + this.currentBalance);
                this.$store.commit('REMOVE_ALL_CART_ITEMS');
            } else {
                alert('ยอดเงินไม่พอ');
            }
        },
        gotoPage(page) {
            this.currentPage = page;
        },
    },
    async mounted() {
        await this.loadCart();
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

#Purchase-history-right {
    padding: 20px;
    /* padding-bottom:30px ; */
    width: 920px;
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
}

.item-2 {
    display: flex;
    gap: 70px;
    margin-left: 60px;
    align-items: center;
}

.checkbox {
    width: 30px;
    height: 30px;
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
    gap: 1rem;
}

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}

.item {
    background-color: #ffffff;
    width: 94%;
    display: flex;
    align-items: center;
    padding: 1rem 1.3rem 1rem 1.3rem;
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
    background: #fde0ae;
    border-width: 1px;
    border-color: #fcdca6;
}

.item-button :nth-child(2) {
    width: 140px;
    height: 41px;
    background: #ffffff;
    border: 0.2px solid #ccc;
}

.item-button :nth-child(3) {
    width: 152px;
    height: 41px;
    background: #ffffff;
    border: 0.2px solid #ccc;
}

.quantitycount {
    display: flex;
}



.quantitycount input {
    font-size: 22px;
    height: 30px;
    width: 55px;
    text-align: center;
}

.quantitycount button {
    width: 30px;
    font-size: 20px;
    height: 30px;
}

.item-1 {
    display: flex;
    align-items: center;
    gap: 14rem;
}

.item-1 p {
    display: flex;
    width: 100px;
    align-items: center;
}

.item-1 span {
    font-size: 24px;
}

.product-line-price {
    display: flex;
    width: 70px;
}
</style>