<template>
    <div class="container">
        <div id="storeContainer">
            <div id="storeLeft">
                <div id="storeLeftIMG">
                    <div class="upload-container">
                        <div v-if="images.length > 0" class="images-container" id="container-product-images">
                            <div v-for="(image, index) in images" :key="image.id" class="image-wrapper">
                                <img :src="image.src" alt="Product Image" class="uploaded-image" />
                                <span class="delete-icon" @click="removeImage(index)">x</span>

                            </div>
                        </div>

                        <div v-else class="upload-icon-container">
                            <font-awesome-icon :icon="['fas', 'image']" @click="triggerFileInput('product')"
                                class="upload-icon" />
                            <input type="file" ref="productImageInput" class="image-upload" accept="image/*"
                                @change="previewImage($event, 'images')" multiple style="display: none" />
                        </div>

                        <p id="photo-product-images-error" v-if="photoProductImagesError" style="color: red">
                            กรุณาอัพโหลดรูปภาพ</p>
                    </div>
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
                            <font-awesome-icon :icon="['fas', 'house']" class="font-awesome" />
                            <p>หน้าร้าน</p>
                        </button>
                    </div>
                </div>
            </div>
            <div id="line"></div>
            <div id="storeRight">
                <p>จำนวนคนที่ถูกใจสินค้า:{{ this.likeCount }}</p>
                <p>รายการสินค้า:<span>{{ filteredProducts.length }}</span></p>
                <p>เข้าร่วมเมื่อ: <span>{{ createdAt }}</span></p>
                <p>ผู้ติดตาม: <span>{{ followerCount }}</span> คน</p>
            </div>
        </div>
        <div class="products-container">
            <div v-for="product in filteredProducts" :key="product.id" class="originalDiv">
                <div class="products-items">
                    <div>
                        <router-link :to="{ path: '/users/production', query: { productId: product.id } }">
                            <img v-if="product.images && product.images.length > 0" :src="product.images[0].src" alt="Product Image" />
                        </router-link>
                        <button @click="deleteProduct(product.id)" class="delete-button">X</button>
                    </div>
                    <div class="products-item">
                        <p class="products-title">{{ product.nameProduct }}</p>
                        <div class="price-soldout">
                            <p class="price">{{ product.price }}</p>
                            <p class="sold-out">ขายแล้ว {{ product.totalSell }} ชิ้น</p>
                        </div>
                    </div>

                </div>
                <button @click="goToEditProduct(product.id)" class="edit-button">แก้ไข</button>
                <div v-if="showEditForm && editProductId === product.id" class="edit-form">
                    <h2>แก้ไขสินค้า</h2>

                    <label for="nameProduct">ชื่อสินค้า</label>
                    <input id="nameProduct" v-model="editProduct.nameProduct" placeholder="ชื่อสินค้า" />

                    <label for="price">ราคา</label>
                    <input id="price" v-model="editProduct.price" type="number" placeholder="ราคา" />

                    <label for="totalSell">จำนวนสินค้า</label>
                    <input id="totalSell" v-model="editProduct.totalSell" type="number" placeholder="จำนวนสินค้า" />

                    <button @click="saveProductEdit">บันทึก</button>
                    <button @click="closeEditForm">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faComment, faHouse } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import { mapActions } from 'vuex';
import Pica from 'pica';

library.add(faPlus, faComment, faHouse);

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            showEditForm: false,
            editProductId: null,
            editProduct: {
                id: null,
                nameProduct: '',
                price: 0,
                totalSell: 0
            },
            shopId: [],
            shopName: '',
            productId: null,
            products: [],
            filteredProducts: [],
            StoreFollow: false,
            followerCount: 0,
            likeCount: 0,
            createdAt: '',
            userEmail: '',
            images: [],
        };
    },

    async mounted() {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObject = JSON.parse(user);
                this.userEmail = userObject.email;
                console.log('User email:', this.userEmail);
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
            }
        } else {
            console.warn('No user found in localStorage');
        }
        await this.fetchProductDetails();
        await this.fetchShopDetails();
    },
   
    methods: {
        goToEditProduct(productId) {
            this.$router.push({ path: '/shop/EditProduct', query: { productId } });
        },
        // openEditForm(product) {
        //     this.showEditForm = true;
        //     this.editProductId = product.id;
        //     this.editProduct = { ...product }; 
        // },
        // closeEditForm() {
        //     this.editProductId = null;
        //     this.showEditForm = false;
        // },
        // async saveProductEdit() {
        //     try {
        //         await axios.put(`http://localhost:8081/selling/products/${this.editProduct.id}`, {
        //             nameProduct: this.editProduct.nameProduct,
        //             price: this.editProduct.price,
        //             totalSell: this.editProduct.totalSell
        //         });

        //         const index = this.products.findIndex(p => p.id === this.editProduct.id);
        //         if (index !== -1) {
        //             this.$set(this.products, index, { ...this.editProduct });
        //         }

        //         this.showEditForm = false;
        //         console.log('อัปเดตสินค้าสำเร็จ');
        //     } catch (error) {
        //         console.error('Error updating product:', error);
        //     }
        // },
        async fetchProductDetails() {
            try {
                const response = await axios.get("http://localhost:8081/selling/productss");
                this.products = response.data || [];
                this.likeCount = this.products.reduce((totalLikes, product) => totalLikes + (product.likes || 0), 0);
                console.log('Product Details:', this.products);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },
        async fetchShopDetails() {
            try {
                const response = await axios.get('http://localhost:8081/shop/shops');
                const shops = response.data.data || [];
                const shop = shops.find(shop => shop.email === this.userEmail);
                console.log(shop.createdAt);
                if (shop) {
                    this.shopName = shop.shopName;
                    this.shopId = shop.shopId;
                    this.createdAt = new Date(shop.createdAt).toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' });
                    this.followerCount = shop.follow;
                    this.filteredProducts = this.products.filter(product => product.shopId === this.shopId);
                    console.log("this.filteredProducts", this.filteredProducts);

                    if (shop.image) {
                        this.images.push({
                            id: `image${this.nextImageId++}`,
                            src: shop.image,
                        });
                    }
                } else {
                    console.error('Shop not found');
                }

            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        },
        triggerFileInput(inputName) {
            const refName = this.$refs[`${inputName}ImageInput`];
            if (refName) refName.click();
        }
        ,
        async handleToggleFollow() {
            try {
                if (this.shopId !== null && this.userEmail) {
                    const followChange = this.StoreFollow ? -1 : 1;
                    console.log("Toggling follow status");

                    const response = await axios.patch('http://localhost:8081/shop/follow', {
                        email: this.userEmail,
                        shopId: this.shopId,
                        followChange: followChange
                    });

                    this.StoreFollow = !this.StoreFollow;
                    this.followerCount = response.data.followCount;

                    console.log('Follow Status:', this.StoreFollow);
                    console.log('Follower Count:', this.followerCount);
                }
            } catch (error) {
                console.error('Error toggling follow status:', error);
            }
        },
        async deleteProduct(productId) {
            try {
                const confirmDelete = confirm('คุณต้องการลบสินค้านี้หรือไม่?');
                if (confirmDelete) {
                    // ส่งคำขอไปยัง backend API เพื่อลบสินค้า
                    await axios.delete(`http://localhost:8081/selling/products/${productId}`);
                    // ลบสินค้าออกจากรายการที่แสดงบนหน้าเว็บ
                    this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
                    console.log('ลบสินค้าสำเร็จ');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },
        async previewImage(event) {
            const pica = Pica();
            const files = event.target.files;
            const targetArray = this.images;

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = async () => {
                        const originalCanvas = document.createElement('canvas');
                        originalCanvas.width = img.width;
                        originalCanvas.height = img.height;
                        const originalCtx = originalCanvas.getContext('2d');
                        originalCtx.drawImage(img, 0, 0, img.width, img.height);

                        const resizedCanvas = document.createElement('canvas');
                        const max_width = 400;
                        const max_height = 300;
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > max_width) {
                                height = (height * max_width) / width;
                                width = max_width;
                            }
                        } else {
                            if (height > max_height) {
                                width = (width * max_height) / height;
                                height = max_height;
                            }
                        }

                        resizedCanvas.width = width;
                        resizedCanvas.height = height;

                        await pica.resize(originalCanvas, resizedCanvas);
                        const blob = await pica.toBlob(resizedCanvas, 'image/jpeg', 0.75);
                        const readerBlob = new FileReader();
                        readerBlob.onloadend = () => {
                            targetArray.push({
                                id: `image${this.nextImageId++}`,
                                src: readerBlob.result,
                            });
                            this.saveSettings();
                        };
                        readerBlob.readAsDataURL(blob);
                    };
                };
                reader.readAsDataURL(file);
            });
            event.target.value = "";
        },
        removeImage(index) {
            this.images.splice(index, 1);
        },
        async saveSettings() {
            try {
                const image = this.images.length > 0 ? this.images[0].src : '';
                const payload = {
                    email: this.userEmail,
                    image,
                };
                console.log('Payload:', payload);
                await axios.put('http://localhost:8081/shop/account', payload);
            } catch (error) {
                console.error('Error updating account:', error);
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}

.delete-button {
    position: absolute;
    top: 6px;
    right: 6px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
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

.delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    border-radius: 50%;
    cursor: pointer;
}

.image-wrapper {
    position: relative;
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
    gap: 20px;
}

#storeRight p {
    font-size: 21px;
}

.upload-icon {
    font-size: 90px;
    /* Increased font size for the icon */
    color: #888;
    cursor: pointer;
    margin-bottom: 10px;
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
    margin-left: 20px;
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
    position: relative;
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