<template>
    <div class="edit-product-container">
        <h2 class="title">แก้ไขสินค้า</h2>
        <div v-if="product" class="product-details">
            <label for="nameProduct">รูปภาพสินค้า:</label>
            <div class="product-info">
                <img :src="product.images[0]?.src" v-if="!isEditing.images" />
                <div>
                    <input type="file" ref="productImageInput" class="input-field" accept="image/*"
                        @change="previewImage($event, 'images')" multiple style="display: none" />
                    <button @click="triggerFileInput('product')" class="upload-button">เลือกภาพใหม่</button>
                    <div class="selected-images">
                        <div v-for="(image, index) in images" :key="image.id" class="image-wrapper">
                            <img :src="image.src" alt="Product Image" class="uploaded-image" />
                            <span class="delete-icon" @click="removeImage(index)">x</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-field">
                <label for="nameProduct">ชื่อสินค้า:</label>
                <div class="product-info">
                    <span v-if="!isEditing.nameProduct">{{ product.nameProduct }}</span>
                    <input v-else id="nameProduct" v-model="editProduct.nameProduct" type="text" class="input-field" />
                </div>
                <button @click="toggleEdit('nameProduct')" class="edit-button">
                    {{ isEditing.nameProduct ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="price">ราคา:</label>
                <div class="product-info">
                    <span v-if="!isEditing.price">{{ product.price }}</span>
                    <input v-else id="price" v-model="editProduct.price" type="number" class="input-field" />
                </div>
                <button @click="toggleEdit('price')" class="edit-button">
                    {{ isEditing.price ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="numberProducts">จำนวนสินค้า:</label>
                <div class="product-info">
                    <span v-if="!isEditing.numberProducts">{{ product.numberProducts }}</span>
                    <input v-else id="numberProducts" v-model="editProduct.numberProducts" type="number"
                        class="input-field" />
                </div>
                <button @click="toggleEdit('numberProducts')" class="edit-button">
                    {{ isEditing.numberProducts ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="category">หมวดหมู่:</label>
                <div class="product-info">
                    <span v-if="!isEditing.category">{{ product.category }}</span>
                    <input v-else id="category" v-model="editProduct.category" type="text" class="input-field" />
                </div>
                <button @click="toggleEdit('category')" class="edit-button">
                    {{ isEditing.category ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>
            <div class="product-field">
                <span>ประเภทสินค้า</span>
                <div v-for="(set, index) in productTypes" :key="index" class="input-group">
                    <div class="input-with-icon">
                        <input v-model="set.productType1" type="text" class="product-type"
                            placeholder="ประเภท เช่น สี ขนาด" />
                        <div v-for="(input, inputIndex) in set.inputProductType1" :key="inputIndex">
                            <input v-model="set.inputProductType1[inputIndex]" type="text" class="input-product-type"
                                placeholder="ขาว XXL" />
                        </div>

                    </div>
                </div>
                <button @click="toggleEdit('productTypes')" class="edit-button">
                    {{ isEditing.productTypes ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>

            <div class="product-field">
                <label for="productDetails">รายละเอียดสินค้า:</label>
                <div class="product-info">
                    <span v-if="!isEditing.productDetails">{{ product.productDetails }}</span>
                    <textarea v-else id="productDetails" v-model="editProduct.productDetails"
                        class="input-field"></textarea>
                </div>
                <button @click="toggleEdit('productDetails')" class="edit-button">
                    {{ isEditing.productDetails ? 'ยกเลิก' : 'แก้ไข' }}
                </button>
            </div>
            <label for="exampleImages">รูปภาพตัวอย่างสินค้า:</label>
            <div class="product-info">
                <img :src="imageList.length ? imageList[0].src : ''" v-if="!isEditing.imageList" />
                <div>
                    <input type="file" ref="exampleImageInput" class="input-field" accept="image/*"
                        @change="previewImageList($event)" multiple style="display: none" />
                    <button @click="triggerFileInput('exampleImageInput')" class="upload-button">เลือกภาพใหม่</button>
                    <div class="selected-images">
                        <div v-for="(image, index) in imageList" :key="image.id" class="image-wrapper">
                            <img :src="image.src" alt="Example Image" class="uploaded-image" />
                            <span class="delete-icon" @click="removeImageList(index)">x</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-group">
                <button @click="saveProductEdit" class="save-button">บันทึก</button>
                <button @click="cancelEdit" class="cancel-button">ยกเลิก</button>
            </div>
        </div>
        <div v-else class="loading">
            <p>กำลังโหลดข้อมูล...</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Pica from 'pica';
export default {
    data() {
        return {
            product: null,
            editProduct: {
                nameProduct: '',
                price: 0,
                numberProducts: 0,
                category: '',
                productDetails: '',
            },
            images: [],
            productTypes: [],
            imageList: [],
            nextImageId: 1,
            isEditing: {
                nameProduct: false,
                price: false,
                numberProducts: false,
                category: false,
                productDetails: false,
            },
        };
    },
    mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            this.fetchProductDetails(productId);
        }
    },
    async created() {
        const productId = this.$route.query.productId;
        this.fetchProductDetails(productId);
    },
    methods: {
        previewimageList(event) {
            const files = event.target.files;

            Array.from(files).forEach((file) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const image = {
                            id: `image${this.nextImageId++}`,
                            src: e.target.result,
                        };

                        this.imageList.push(image);
                    };
                    reader.readAsDataURL(file);
                }
            });

            event.target.value = '';
        },
        triggerimageList() {
            this.$refs.productImageInput.click();
        },
        removeimageList(index) {
            this.imageList.splice(index, 1);
        },
        //************************ */
        previewImage(event, type) {
            const pica = Pica();
            const files = event.target.files;
            const targetArray = type === 'images' ? this.images : this.imageList;

            // Clear the targetArray before adding new images
            targetArray.splice(0, targetArray.length);

            Array.from(files).forEach((file) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
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

                            pica.toBlob(resizedCanvas, 'image/jpeg', 0.75).then((blob) => {
                                const readerBlob = new FileReader();
                                readerBlob.onloadend = () => {
                                    targetArray.push({
                                        id: type === 'images' ? `image${this.nextImageId++}` : `example${this.nextImageId++}`,
                                        src: readerBlob.result,
                                    });
                                };
                                readerBlob.readAsDataURL(blob);
                            });
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });

            event.target.value = "";
        },
        toggleEdit(field) {
            this.isEditing[field] = !this.isEditing[field];
            if (!this.isEditing[field]) {
                this.editProduct[field] = this.product[field];
            }
        }, addInputField(index, type) {
            this.productTypes[index][type].push("");
        }, triggerFileInput(inputName) {
            const refMap = {
                product: 'productImageInput',
                example: 'exampleImageInput',
            };
            const refName = refMap[inputName];
            const input = this.$refs[refName];
            if (input) {
                input.click();
            }
        },
        removeImage(index) {
            this.images.splice(index, 1);
        },
        fetchProductDetails(productId) {
            console.log('Fetching product details for ID:', productId);
            axios.get('http://localhost:8081/selling/productss')
                .then(response => {
                    console.log('Response Data:', response.data);

                    if (response.data && response.data.length > 0) {
                        this.product = response.data.find(product => product.id == productId);
                        this.productTypes = this.product.productTypes || [];
                        this.imageList = this.product.imageList || [];
                    } else {
                        console.log('ไม่พบข้อมูลสินค้า');
                    }
                })
                .catch(error => {
                    console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
                });
        },
        async saveProductEdit() {
            console.log('Images:', this.images);
            console.log('ImageList:', this.imageList);
            try {
                const updateData = {
                    nameProduct: this.isEditing.nameProduct ? this.editProduct.nameProduct : this.product.nameProduct,
                    price: this.isEditing.price ? this.editProduct.price : this.product.price,
                    numberProducts: this.isEditing.numberProducts ? this.editProduct.numberProducts : this.product.numberProducts,
                    category: this.isEditing.category ? this.editProduct.category : this.product.category,
                    productDetails: this.isEditing.productDetails ? this.editProduct.productDetails : this.product.productDetails,
                    images: Array.from(this.images),
                    imageList: this.imageList,
                };
                console.log('Update Data:', updateData);
                await axios.put(`http://localhost:8081/selling/products/${this.product.id}`, updateData);
                alert('บันทึกสำเร็จ');
                this.$router.push('/selling/myStore');
            } catch (error) {
                console.error('Error updating product:', error);
                alert('เกิดข้อผิดพลาดในการบันทึกสินค้า');
            }
        },
        cancelEdit() {
            this.$router.push('/');
        }
    }
};
</script>
<style scoped>
.edit-product-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #343a40;
}

.product-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-field {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    max-width: 400px;
}

label {
    font-weight: bold;
    color: #495057;
}

.product-info {
    margin: 0;
    padding-left: 8px;
    font-size: 16px;
}

.input-field {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.save-button,
.cancel-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.save-button {
    background-color: #28a745;
    color: #fff;
}

.cancel-button {
    background-color: #dc3545;
    color: #fff;
}

.loading {
    text-align: center;
    font-size: 18px;
    color: #6c757d;
}
</style>