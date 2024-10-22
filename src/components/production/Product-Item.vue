<template>
    <div id="container">
        <div id="containerProductItem">
            <div id="ProductItem">
                <div id="ProductItemHead">
                    <div id="ProductItemImg">
                        <img :src="product && product.images && product.images.length > 0 ? product.images[0].src : '../../assets/default.png'"
                            id="Image" />
                    </div>
                    <div id="ProductItemTxt">
                        <div>
                            <h2>{{ product ? product.nameProduct : 'Loading...' }}</h2>
                        </div>
                        <div id="like">
                            <font-awesome-icon :icon="['fas', 'heart']" class="heart" :class="{ 'red': isPressedHeart }"
                                @click="handleToggleLike" />
                            <p><span>{{ this.likesCount }}</span> คนที่ถูกใจ</p>
                            <p><span>ขายแล้ว{{ Alltotalsell }}</span>ชิ้น</p>
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
                            <p>มีสินค้าทั้งหมด:<span>{{ product ? product.numberProducts : 'Loading...' }}</span> ชิ้น
                            </p>
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
                    <button @click="addToCartClicked" :disabled="!isProductTypeSelected"
                            class="btn1">เพิ่มสินค้าลงในตะกร้า</button>
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
            selectedOptions: [],
            filteredProducts: [],
            isPressedHeart: false,
            likesCount: 0
        };
    },
    computed: {
        ...mapGetters({
            product: 'selectedProduct'
        }),
        Alltotalsell() {
            return this.filteredProducts.reduce((total, product) => {
                return total + (product.totalSell || 0);
            }, 0);
        },
        isProductTypeSelected() {
            return this.selectedOptions.length > 0 && this.count > 0;
        }
    },
    methods: {
        async fetchShopDetails() {
            try {
                const response = await axios.get('http://localhost:8081/shop/shopsFollow');
                const shops = response.data.data || [];
                const shop = shops.find(shop => shop.email === this.userEmail);
                if (shop) {
                    this.shopName = shop.shopName;
                    this.shopId = shop.shopId;
                    this.StoreFollow = shop.isFollowing;
                    this.followerCount = shop.follow;
                    this.filteredProducts = this.products.filter(product => product.shopId === this.shopId);
                } else {
                    console.error('Shop not found');
                }

            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        },
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
                            this.likesCount = product.likes
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
            // console.log('User Email:', user ? user.email : null);
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

                axios.get(`http://localhost:8081/products/checkCart/${productData.productId}`)
                    .then(response => {
                        if (response.data.exists) {
                            axios.put(`http://localhost:8081/products/updateCartQuantity/${productData.productId}`, {
                                additionalQuantity: productData.quantity
                            })
                                .then(response => {
                                    console.log("Product quantity updated:", response.data);
                                })
                                .catch(error => {
                                    console.error("Error updating product quantity:", error);
                                });
                        } else {
                            axios.post('http://localhost:8081/products/createCartEntry', productData)
                                .then(response => {
                                    console.log("Product added to cart:", response.data);
                                })
                                .catch(error => {
                                    console.error("Error adding product to cart:", error);
                                });
                        }
                    })
                    .catch(error => {
                        console.error("Error checking cart:", error);
                    });
            }
        },
        handleClick() {
            this.addToHistoryClicked();
            // this.handleAddToHistory();
        },
        addToHistoryClicked() {
            if (this.product) {
                const selectedProductType = this.selectedOptions[0] || 'ค่าเริ่มต้น';
                const productData = {
                    productId: this.product.id,
                    nameProduct: this.product.nameProduct,
                    price: this.product.price,
                    quantity: this.count || 0,
                    image: this.product.images && this.product.images.length > 0 ? this.product.images[0].src : '../../assets/default.png',
                    email: this.userEmail(),
                    shopId: this.product.shopId,
                    productTypes: selectedProductType
                };
                // console.log('Product Data for History:', productData);
                axios.put(`http://localhost:8081/selling/updateProduct/${productData.productId}`, {
                    totalSell: parseInt(productData.quantity),
                    totalPrice: parseFloat(productData.price) * parseInt(productData.quantity)
                })
                    .then(response => {
                        console.log("Product added to history:", response.data);
                    })
                    .catch(error => {
                        console.error("Error details:", error.response.data);
                    });
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
            // console.log('Selected options:', this.selectedOptions);
        },
        async handleToggleLike() {
            if (this.product) {
                const productId = this.product.id;
                try {
                    const url = `http://localhost:8081/selling/product/${productId}/toggleLike`;
                    const likeChange = this.isPressedHeart ? -1 : 1;
                    console.log("likeChange", likeChange);

                    const response = await axios.put(url, {
                        likeChange: likeChange
                    });

                    console.log("Updated likes:", response.data); 

                    this.isPressedHeart = !this.isPressedHeart;
                } catch (error) {
                    console.error("Error toggling like:", error);
                }
            }
        },
        increment() {
            if (this.count < this.product.numberProducts) {
                this.count++;
            }

        },
        decrement() {
            if (this.count > 0) {
                this.count--;
            }
        },
        calculateLinePrice() {
            return this.product.price * this.count;
        },
        handleAddToHistory() {
            const totalAmount = this.calculateLinePrice().toFixed(2);
            if (this.isProductTypeSelected) {
                // const amountString = this.product.price.toString();
                const ProductIDString = this.product.id.toString();
                console.log(ProductIDString);
                axios.post('http://localhost:8081/2c2p/paymentToken', {
                    amount: totalAmount
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
    height: 450px;
    background-size: cover;
    background-position: center;
    object-fit: cover;
}

/* #ProductItemImg{
    max-height: 450px;
} */
#ProductItemHead {
    display: flex;
    gap: 40px;
    max-height: 460px;
    /* background-color: #ffffff; */
}

.product-type-group {
    display: flex;
    /* justify-content: center; */
    align-items: center;
}

.product-type-buttons button {
    background-color: #ffffff;
    border: 2px solid #E8E8E8;
    border-radius: 5px;
    /* outline: none;  */
}

#ProductItemTxt {
    width: 760px;
    height: 500px;
    padding: 25px;
    /* background-color: rgb(255, 255, 255); */
    display: flex;
    flex-direction: column;
    gap: 22px;

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
    padding: 15px 0 0 15px;
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
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;

}

#quantitycount button {
    height: 32px;
    background-color: #ffffff;
    border: 2px solid #E8E8E8;
}

#ProductItemBottom {
    display: flex;
    gap: 3.9rem;
    margin: 20px 0 20px 0;
    align-items: center;
}

#ProductItemButton {
    padding-top: 45px;
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
    background: #f5e7ce;
    border: 1px solid #ffae22;
    font-size: 16px;
    /* color: #ffffff; */
    cursor: pointer;
}

#quantitycount button {
    width: 30px;
    font-size: 20px;

}
</style>