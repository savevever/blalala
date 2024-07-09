<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1>ตะกร้าสินค้า</h1>
                <div id="item-container">
                    <div v-for="(product, index) in cartItems" :key="index" class="item">
                        <div class="items">
                            <input type="checkbox" v-model="product.checkbox" class="checked">
                            <img :src="product.imageSource" alt="" style="width: 100px; height: 100px;">
                            <div class="item-1">
                                <p>{{ product.title }}</p>
                                <p>ตัวเลือกสิ้นค้า:สีน้ำตาล</p>
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
                        <button @click="orderAgain">สั่งซื้ออีกครั้ง</button>
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
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            quantity: 1
        }
    },
    methods: {
        ...mapActions(['updateQuantity', 'removeFromCart', 'loadCart']),
        calculateLinePrice(product) {
            return product.price * product.quantity;
        },
        onQuantityChange(productId, quantity) {
            this.updateQuantity({ productId, quantity });
        },
        clearCart() {
            const itemsToRemove = this.cartItems.filter(product => product.checkbox);
            itemsToRemove.forEach(product => {
                this.removeFromCart(product.id);
            });
        },
        selectAllbutton(allItems) {
            allItems.forEach(product => {
                product.checkbox = !product.checkbox;
            });
        },
        orderAgain() {
            console.log('Order again logic goes here');
        },
        //  addToCartClicked() {
        //     const product = {
        //         id: this.product.id,
        //         title: this.product.title,
        //         price: this.product.price,
        //         quantity: this.count,
        //         imageSource: this.product.imageSource,
        //     };
        //     this.addToCart(product);
        // }
    },
    computed: {
        ...mapGetters(['cart']),
        cartItems() {
            console.log(this.cart);
            return this.cart;
        },
        selectedItems() {
            return this.cartItems.filter(product => product.checkbox);
        },
        totalPages() {
            return Math.ceil(this.cart.length / this.itemsPerPage);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.cart.slice(start, end);
        }
    },
    mounted() {
        this.loadCart();
    }
};
</script>


<style scoped>
/* สไตล์ที่คุณได้ระบุไปแล้ว */
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
}

.item-2 {
    display: flex;
    gap: 70px;
    margin-left: 70px;
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

.checked {
    width: 30px;
    height: 30px;
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
</style>
