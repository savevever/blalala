<template>
    <div id="container">
        <div id="containerProductItem">
            <div id="ProductItem">
                <!-- Product Item Header -->
                <div id="ProductItemHead">
                    <!-- Product Image -->
                    <div id="ProductItemImg">
                        <img :src="product && product.images && product.images.length > 0 ? product.images[0].src : '../../assets/default.png'"
                            id="Image" />
                    </div>
                    <!-- Product Details -->
                    <div id="ProductItemTxt">
                        <div>
                            <h2>{{ product ? product.nameProduct : 'Loading...' }}</h2>
                        </div>
                        <div id="like">
                            <font-awesome-icon :icon="['fas', 'heart']" class="heart" :class="{ 'red': isPressedHeart }"
                                @click="handleToggleLike" />
                            <!-- <p><span>11</span> คนที่ถูกใจ</p> -->
                            <p><span>{{ product ? product.soldCount : 0 }}</span> จำนวนขายแล้ว</p>
                        </div>
                        <p class="price">฿{{ product ? product.price : 'Loading...' }}</p>
                        <div class="option">
                            <div v-if="product && product.productTypes">
                                <div v-for="(type, index) in product.productTypes" :key="index"
                                    class="product-type-group">
                                    <p>{{ type.productType1 }}</p>
                                    <div class="product-type-buttons">
                                        <button v-for="(option, optionIndex) in type.inputProductType1"
                                            :key="optionIndex" @click="handleProductTypeClick(option, index)">
                                            {{ option }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="quantity">
                            <p>จำนวน</p>
                            <div id="quantitycount">
                                <button @click="decrement">-</button>
                                <span>{{ count }}</span>
                                <button @click="increment">+</button>
                            </div>
                            <p>มีสินค้าทั้งหมด:<span>21</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Product Item Bottom -->
            <div id="ProductItemBottom">
                <div id="ProductItemImgSlice">
                    <curosurSlice></curosurSlice>
                </div>
                <div id="ProductItemButton">
                    <router-link to="/users/cart"><button @click="addToCartClicked" :disabled="!isProductTypeSelected"
                            class="btn1">เพิ่มสินค้าลงในตะกร้า</button></router-link>
                    <!-- <router-link to="/users/PurchaseHistory"> -->
                    <button class="btn2" @click="handleClick" :disabled="!isProductTypeSelected">ซื้อสินค้าเลย</button>
                    <!-- </router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import curosurSlice from './curosurSlice.vue';
import { jwtDecode } from 'jwt-decode';

library.add(faHeart);

export default {
    components: {
        curosurSlice
    },
    data() {
        return {
            count: 0,
            selectedOptions: []
        };
    },
    computed: {
        ...mapGetters({
            product: 'selectedProduct'
        }),
        isProductTypeSelected() {
            return this.selectedOptions.length > 0;
        }
    },
    methods: {
        fetchProductDetails(productId) {
            console.log('Fetching product details for ID:', productId);
            axios.get('http://localhost:8081/selling/productss')
                .then(response => {
                    console.log('Response Data:', response.data);
                    if (response.data && response.data.length > 0) {

                        const product = response.data.find(product => product.id == productId);
                        if (product && product.productTypes) {
                            this.$store.dispatch('setSelectedProduct', product);
                            console.log('Product Types:', product.productTypes);
                        } else {
                            console.log('ไม่พบข้อมูลสินค้าที่มี ID นี้');
                        }
                    } else {
                        console.log('ไม่พบข้อมูลสินค้า');
                    }
                })
                .catch(error => {
                    console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
                });
        },
        userEmail() {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('User Email:', user ? user.email : null);
            return user ? user.email : null;
        },
        addToCartClicked() {
            if (this.product) {
                const selectedProductType = this.selectedOptions[0] || 'ค่าเริ่มต้น';
                const productData = {
                    productId: this.product.id,
                    nameProduct: this.product.nameProduct,
                    price: this.product.price,
                    quantity: this.count,
                    image: this.product.images && this.product.images.length > 0 ? this.product.images[0].src : '../../assets/default.png',
                    email: this.userEmail(),
                    shopId: this.product.shopId,
                    productTypes: selectedProductType
                };
                console.log('Product Data for Cart:', productData);

                axios.post('http://localhost:8081/products/createCartEntry', productData)
                    .then(response => {
                        console.log("Product added to cart:", response.data);
                    })
                    .catch(error => {
                        console.error("Error adding product to cart:", error);
                    });
            }
        },
        handleClick() {
            this.addToHistoryClicked();
            this.handleAddToHistory();
        },
        addToHistoryClicked() {
            if (this.product) {
                const selectedProductType = this.selectedOptions[0] || 'ค่าเริ่มต้น';
                const productData = {
                    productId: this.product.id,
                    nameProduct: this.product.nameProduct,
                    price: this.product.price,
                    quantity: this.count,
                    image: this.product.images && this.product.images.length > 0 ? this.product.images[0].src : '../../assets/default.png',
                    email: this.userEmail(),
                    shopId: this.product.shopId,
                    productTypes: selectedProductType
                };
                console.log('Product Data for History:', productData);
                axios.post('http://localhost:8081/products/createHistoryEntry', productData)
                    .then(response => {
                        console.log("Product added to history:", response.data);
                    })
                    .catch(error => {
                        console.error("Error details:", error.response.data);
                    });
            }
        },
        handleProductTypeClick(option, index) {
            this.selectedOptions[index] = option;
            console.log('Selected options:', this.selectedOptions);
        },
        handleToggleLike() {
            if (this.product) {
                // Handle the like toggle here, possibly using Vuex or another method
            }
        },
        increment() {
            this.count++;
        },
        decrement() {
            if (this.count > 0) {
                this.count--;
            }
        },
        handleAddToHistory() {
            if (this.isProductTypeSelected) {
                const amountString = this.product.price.toString();
                const ProductIDString = this.product.id.toString();
                console.log(amountString);

                axios.post('http://localhost:8081/2c2p/paymentToken', {
                    ProductID: ProductIDString,
                    amount: this.product.price
                })
                    .then(paymentResponse => {
                        const payloadObject = paymentResponse.data;
                        const payload = payloadObject.payload.payload.toString();
                        console.log('Payload received from 2C2P:', payload);

                        // Check if payload is a string and handle it
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
            } else {
                alert('กรุณาเลือกประเภทสินค้าก่อน');
            }
        }

    },
    mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            this.fetchProductDetails(productId);
        }
    }
};
</script>



<style scoped>
#Image {
    width: 450px;
    height: 500px;
    object-fit: cover;
}

#ProductItemHead {
    display: flex;
    gap: 40px;
    /* background-color: #ffffff; */
}

.product-type-group {
    display: flex;
    /* justify-content: center; */
    align-items: center;
}

#ProductItemTxt {
    width: 760px;
    height: 500px;
    padding: 25px;
    /* background-color: rgb(255, 255, 255); */
    display: flex;
    flex-direction: column;
    gap: 27px;

}

router-link {
    padding: 0;
    margin: 0;
    border: 0;
}

.heart {
    width: 30px;
    height: 30px;
    color: rgb(18, 20, 18);
    position: relative;
    transition: background-color 0.5s;
}

.red {
    color: red;
}


#like {
    /* margin: 20px 0 20px 0; */
    display: flex;
    align-items: center;
    gap: 35px;
}

#like p {
    font-size: 18px;
}

.option {
    display: flex;
    align-items: center;
    /* margin: 20px 0 20px 0; */
}

.option p {
    font-size: 22px;

}

.option button {
    padding: 10px 20px 10px 20px;
    margin: 0 10px 0 10px;
}

#container {
    /* height: 580px; */
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    /* padding-right: 60px; */
}

.pink {
    background-color: #ffb6c1;
    /* สีชมพูอ่อน */
}

.price {
    font-size: 25px;
}

#containerProductItem {
    display: flex;
    width: 1300px;
    flex-direction: column;
    background-color: #ffffff;
}

.quantity {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.quantity p {
    font-size: 20px;
}

#quantitycount {
    display: flex;
    align-items: center;
}

#quantitycount span {
    font-size: 22px;
    width: 55px;
    height: 30px;
    text-align: center;
    border-top: 1px solid #8f8c8c;
    border-bottom: 1px solid #8f8c8c;

}

#quantitycount button {
    height: 32px;
}

#ProductItemBottom {
    display: flex;
    gap: 3.9rem;
    margin: 20px 0 20px 0;
    align-items: center;
}

#ProductItemButton {
    display: flex;
    gap: 40px;

}

.btn1 {
    /* width: 200px;
    height: 70px; */
    background: #f5e7ce;
    font-size: 16px;
    border: 1px solid #ffae22;
    padding: 1rem 2rem 1rem 2rem;
    /* color: #8d5b04; */
    cursor: pointer;
}

.btn2 {
    padding: 1rem 2rem 1rem 2rem;
    background: #ffae22;
    font-size: 16px;
    border: 0;
    color: #ffffff;
    cursor: pointer;
}

#quantitycount button {
    width: 30px;
    font-size: 20px;

}
</style>