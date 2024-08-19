<template>
    <div id="container">
        <div id="containerProductItem" v-if="product">
            <div id="ProductItem">
                <div id="ProductItemHead">
                    <div id="ProductItemImg">
                        <img :src="product.imageSource || '../../assets/default.png'" id="Image" />
                    </div>
                    <div id="ProductItemTxt">
                        <div>
                            <h2>{{ product.title || 'Loading...' }}</h2>
                        </div>
                        <div id="like">
                            <font-awesome-icon :icon="['fas', 'heart']" class="heart" :class="{ 'red': isPressedHeart }"
                                @click="handleToggleLike" />
                            <p><span>{{ likeCount }}</span> คนที่ถูกใจ</p>
                            <p><span>{{ product.soldCount || 0 }}</span> จำนวนขายแล้ว</p>
                        </div>
                        <p class="price">฿{{ product.price || 'Loading...' }}</p>
                        <div class="option">
                            <p>{{ product.option || 'Loading...' }}</p>
                            <button v-for="(category, index) in product.Category || []" :key="index"
                                @click="selectedButton = index" :class="{ 'pink': selectedButton === index }">
                                {{ category }}
                            </button>
                        </div>
                        <div class="quantity">
                            <p>จำนวน</p>
                            <div id="quantitycount">
                                <button @click="decrement">-</button>
                                <span>{{ count }}</span>
                                <button @click="increment">+</button>
                            </div>
                            <p>มีสินค้าทั้งหมด:<span>{{ product.stockCount || 0 }}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ProductItemBottom">
                <div id="ProductItemImgSlice">
                    <curosurSlice></curosurSlice>
                </div>
                <div id="ProductItemButton">
                    <router-link to="/users/cart"><button @click="addToCartClicked" class="btn1">เพิ่มสินค้าลงในตะกร้า</button></router-link>
                    <router-link to="/users/PurchaseHistory"><button class="btn2" @click="addToHistoryClicked">ซื้อสินค้าเลย</button></router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <p>ไม่พบข้อมูลสินค้า</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import curosurSlice from '../production/curosurSlice.vue';
import axios from 'axios';

library.add(faHeart);

export default {
    data() {
        return {
            count: 0,
            selectedButton: null,
            product: null, // เก็บข้อมูลผลิตภัณฑ์
        };
    },
    computed: {
        ...mapGetters(['likedProducts']),
        isPressedHeart() {
            return !!this.likedProducts[this.product?.id];
        },
        likeCount() {
            return this.isPressedHeart ? 1 : 0;
        }
    },
    components: {
        curosurSlice
    },
    methods: {
        ...mapActions(['addToCart', 'addToHistory', 'toggleLike']),
        addToCartClicked() {
            if (this.product) {
                const product = {
                    id: this.product.id,
                    title: this.product.title,
                    price: this.product.price,
                    quantity: this.count,
                    imageSource: this.product.imageSource,
                    option: this.product.option,
                    Category: this.product.Category,
                };
                this.addToCart(product);
            }
        },
        addToHistoryClicked() {
            if (this.product) {
                const product = {
                    id: this.product.id,
                    title: this.product.title,
                    price: this.product.price,
                    quantity: this.count,
                    imageSource: this.product.imageSource,
                };
                this.addToHistory(product);
            }
        },
        handleToggleLike() {
            if (this.product) {
                this.toggleLike(this.product.id);
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
    },
    created() {
        axios.get('http://localhost:8081/selling/product/latest')
            .then(response => {
                if (response.data) {
                    const productData = response.data;
                    productData.images = JSON.parse(productData.images); // Parse images
                    productData.productTypes = JSON.parse(productData.productTypes); // Parse productTypes

                    this.product = productData;

                    // Log ข้อมูลสินค้าในคอนโซล
                    console.log('ข้อมูลสินค้าที่ได้รับ:', this.product);
                } else {
                    console.error('รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง:', response.data);
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
            });
    },
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