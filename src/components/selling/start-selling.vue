<template>

    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet"
            href="https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dist/jquery.Thailand.min.css" />
    </head>
    <div id="form-container">
        <div class="upload-container">
            <span>รูปภาพสินค้า</span>
            <div class="images-container" id="container-product-images">
                <div v-for="(image, index) in images" :key="image.id" class="image-wrapper">
                    <img :src="image.src" alt="Product Image" class="uploaded-image" />
                    <span class="delete-icon" @click="removeImage(index)">x</span>
                </div>
            </div>
            <div class="upload-icon-container">
                <font-awesome-icon :icon="['fas', 'image']" @click="triggerFileInput('product')" class="upload-icon" />
            </div>

            <input type="file" ref="productImageInput" class="image-upload" accept="image/*"
                @change="previewImage($event, 'images')" multiple style="display: none" />

            <p id="photo-product-images-error" v-if="photoProductImagesError" style="color: red">
                กรุณาอัพโหลดรูปภาพ
            </p>
        </div>

        <div class="name-product">
            <span>ชื่อสินค้า</span>
            <textarea v-model="nameProduct" placeholder="ชื่อสินค้า"
                @input="adjustTextareaHeight($event.target)"></textarea>
        </div>
        <!-- ตัวอย่างรูปภาพสินค้า -->
        <div class="example-images-container">
            <span>ตัวอย่างรูปภาพสินค้า</span>
            <div class="images-list" id="container-example-images">
                <div v-for="(image, index) in imageList" :key="index" class="image-example-wrapper">
                    <img :src="image.src" :alt="`Product Image ${index + 1}`" class="uploaded-image" />
                    <span class="delete-example-icon" @click="removeExampleImage(index)">x</span>
                </div>
            </div>
            <!-- ปุ่มอัปโหลดรูปภาพสำหรับตัวอย่างรูปภาพสินค้า -->
            <div class="upload-icon-container">
                <font-awesome-icon :icon="['fas', 'image']" @click="triggerFileInput('example')" class="upload-icon" />
            </div>
            <input type="file" ref="exampleImageInput" class="image-upload" accept="image/*"
                @change="previewImage($event, 'imageList')" multiple style="display: none" />
        </div>

        <div class="category-name">
            <span>หมวดหมู่</span>
            <select v-model="category" @change="handleCategoryChange" ref="category" id="category">
                <option value="เสื้อผ้า">เสื้อผ้า</option>
                <option value="กระเป๋า">กระเป๋า</option>
                <option value="รองเท้า">รองเท้า</option>
                <option value="เครื่องประดับ">เครื่องประดับ</option>
                <option value="ของใช้ภายในบ้าน">ของใช้ภายในบ้าน</option>
                <option value="อาหารเครื่องดื่ม">อาหารเครื่องดื่ม</option>
                <option value="งานฝีมือ">งานฝีมือ</option>
                <option value="ความงาม">ความงาม</option>
                <option value="อื่นๆ">อื่นๆ</option>
            </select>
            <div v-if="category === 'อื่นๆ'" class="additional-input">
                <label for="other-category">ระบุหมวดหมู่:</label>
                <input type="text" id="other-category" v-model="otherCategory" />
            </div>
        </div>
        <div class="price-number-container">
            <div class="price-input">
                <span>ราคา</span>
                <input v-model="price" type="number" placeholder="ระบุราคา" />
            </div>
            <div class="number-products-input">
                <span>จำนวนสินค้า</span>
                <input v-model="numberProducts" type="number" placeholder="ระบุจำนวนสินค้า" />
            </div>
        </div>
        <div class="input-container">
            <span>ประเภทสินค้า</span>
            <div v-for="(set, index) in productTypes" :key="index" class="input-group">
                <div class="input-with-icon">
                    <input v-model="set.productType1" type="text" class="product-type"
                        placeholder="ประเภท เช่น สี ขนาด" />
                    <!-- <input v-model="set.productType1" type="text" class="product-type" placeholder="สีเขียว" /> -->
                    <div v-for="(input, inputIndex) in set.inputProductType1" :key="inputIndex">
                        <input v-model="set.inputProductType1[inputIndex]" type="text" class="input-product-type"
                            placeholder="เพิ่มเติม" />
                    </div>
                    <span class="add-input-icon" @click="addInputField(index)">
                        <i class="fa-solid fa-circle-plus"></i>
                    </span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px">
                <a class="add-set-icon" @click="addInputSet()">
                    <i class="fa-solid fa-circle-plus" id="add-set"></i>
                </a>
            </div>
        </div>

        <div class="details">
            <span>รายละเอียดสินค้า</span>
            <textarea v-model="productDetails" placeholder="รายละเอียดต่างๆ ของสินค้า"
                @input="adjustTextareaHeight($event.target)"></textarea>
        </div>
        <div>
            <p id="form-selling1-error" class="error-message" v-show="formError">
                กรุณากรอกข้อมูลให้ครบถ้วน
            </p>
        </div>

        <div class="btn-container">
            <router-link to="/">
                <button type="button" class="btn-back">ยกเลิก</button>
            </router-link>
            <!-- <router-link :to="{ path: '/store/storepage', query: { productId: product.id } }"> -->
            <button type="button" class="btn" @click="saveProductData">ถัดไป</button>
            <!-- </router-link> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            images: [],
            imageList: [],
            nextImageId: 0,
            photoProductImagesError: false,
            nameProduct: "",
            category: "",
            otherCategory: "",
            productDetails: "",
            productTypes: [
                {
                    productType1: "",
                    inputProductType1: [],
                    productType2: "",
                    inputProductType2: [],

                },
            ],
            price: "",
            numberProducts: "",
            formError: false,
        };
    },
    methods: {
        addInputField(index) {
            this.productTypes[index].inputProductType1.push("");
        },
        triggerFileInput(inputName) {
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
        previewImage(event, type) {
            const files = event.target.files; // Get the selected files
            const targetArray = type === 'images' ? this.images : this.imageList;
            Array.from(files).forEach((file) => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.src = e.target.result;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const max_width = 700; // กำหนดความกว้างสูงสุด
                            const max_height = 500; // กำหนดความสูงสูงสุด
                            let width = img.width;
                            let height = img.height;

                            // คำนวณขนาดใหม่ที่ลดลงตามอัตราส่วน
                            if (width > height) {
                                if (width > max_width) {
                                    height *= max_width / width;
                                    width = max_width;
                                }
                            } else {
                                if (height > max_height) {
                                    width *= max_height / height;
                                    height = max_height;
                                }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height);

                            // แปลง Canvas กลับไปเป็น Data URL
                            const dataUrl = canvas.toDataURL('image/jpeg', 0.75); // quality=0.75
                            // เพิ่มรูปภาพที่ถูกปรับขนาดลงในอาร์เรย์ images
                            targetArray.push({
                                id: type === 'images' ? `image${this.nextImageId++}` : `example${this.nextImageId++}`,
                                src: dataUrl,
                            });
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });

            event.target.value = "";
        },

        removeExampleImage(index) {
            this.imageList.splice(index, 1);
        },
        removeImage(index) {
            this.images.splice(index, 1); // Remove image from list
        },
        addInputSet() {
            this.productTypes.push({
                productType1: "",
                inputProductType1: [],
                productType2: "",
                inputProductType2: [],
                imageList: [],
                shopname: "",
                price: "",
                numberProducts: "",
            });
        },
        deleteInputSet(index) {
            this.productTypes.splice(index, 1);
        },
        handleCategoryChange() {
            if (this.category !== 'อื่นๆ') {
                this.otherCategory = ''; // Clear the input if not 'อื่นๆ'
            }
        },
        adjustTextareaHeight(textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + 2 + "px";
        },
        prepareData() {
            return {
                images: JSON.stringify(this.images.map(img => ({
                    id: img.id,
                    src: img.src
                }))),
                nameProduct: this.nameProduct,
                category: this.category,
                otherCategory: this.otherCategory,
                productDetails: this.productDetails,
                price: this.price,
                shopname: this.shopname,
                imageList: JSON.stringify(this.imageList.map(img => ({
                    id: img.id,
                    src: img.src
                }))),
                numberProducts: this.numberProducts,
                productTypes: JSON.stringify(this.productTypes.map(pt => ({
                    productType1: pt.productType1,
                    inputProductType1: pt.inputProductType1,
                    productType2: pt.productType2,
                    inputProductType2: pt.inputProductType2,
                }))),
                shopId: localStorage.getItem('shopId')
            };
        }
        ,

        async saveProductData() {
            if (this.images.length === 0) {
                this.photoProductImagesError = true;
                return;
            } else {
                this.photoProductImagesError = false;
            }

            // ดึงอีเมลจาก localStorage
            const email = JSON.parse(localStorage.getItem('user')).email;

            // ดึงข้อมูลร้านค้าเพื่อตรวจสอบ shopId โดยอีเมล
            let shopId = null;
            try {
                const response = await axios.get('http://localhost:8081/shop/shops');
                const shops = response.data.data;

                // หา shop ที่มีอีเมลตรงกัน
                const shop = shops.find(shop => shop.email === email);
                if (shop) {
                    shopId = shop.shopId;
                } else {
                    console.error('ไม่พบร้านค้าที่ตรงกับอีเมลที่ให้มา');
                    return;
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า:', error);
                return;
            }

            const formData = {
                ...this.prepareData(),
                shopId: shopId
            };

            console.log('ข้อมูลที่เตรียมสำหรับการร้องขอ API:', formData);

            try {
                const response = await axios.post('http://localhost:8081/selling/save-product-data', formData);
                if (response.status === 200) {
                    console.log(response.data.message);
                    // เมื่อบันทึกข้อมูลสำเร็จ นำทางไปยังหน้าถัดไป
                    this.$router.push('/');
                } else {
                    console.error('สถานะการตอบกลับที่ไม่คาดคิด:', response.status);
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
            }
        },
        resetForm() {
            this.images = [];
            this.nextImageId = 0;
            this.nameProduct = "";
            this.category = "";
            this.otherCategory = "";
            this.productDetails = "";
            this.productTypes = [
                {
                    productType1: "",
                    inputProductType1: "",
                    productType2: "",
                    inputProductType2: "",
                },
            ];
            this.price = "",
                this.numberProducts = "",
                this.formError = false;
            this.photoProductImagesError = false;
        },
    }
};
</script>

<style scoped>
#form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
}

@media (max-width: 768px) {
    #form-containert {
        width: 90%;
        /* Adjust width for smaller screens */
    }
}

.upload-container,
.category-name,
.input-container,
.details,
.price-number-container,
.example-images-container,
.name-product {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
    margin: 1% auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 70%;
}

textarea {
    border-radius: 8px;
    padding: 10px;
    font-size: 18px;
    width: 40%;
    resize: none;
    /* ปิดการปรับขนาด textarea โดยไม่จำเป็น */
}

.remove-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.remove-icon:hover {
    background: rgba(255, 72, 72, 0.5);
}

.upload-container span,
.details span,
.input-container span,
.category-name span,
.name-product span {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 20px;
    color: #000000;
}

.input-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
}

.input-group input {
    width: 140px;
}

.input-with-icon,
.input-price,
.number-products {
    display: flex;
    align-items: center;
    position: relative;
    min-width: 200px;
}

.product-type,
.input-product-type,
.price,
.number-products {
    font-size: 1rem;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    /* ปรับขนาด input ให้เต็มกว่า */
}

.add-set-icon {
    cursor: pointer;
    font-size: 30px;
    user-select: none;
    color: #d1bb9e;
    margin-top: 20px;
    /* เพิ่มระยะห่างด้านบน */
}

#delete-set {
    padding: 20px;
    cursor: pointer;
}

#delete-set:hover {
    color: red;
}

.add-set-icon:hover {
    color: #a79277;
}

#product-details,
#nameProduct {
    height: auto;
    box-sizing: border-box;
    width: 60%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow-wrap: auto;
}

#category,
#category option {
    width: 150px;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
}

.category-name label {
    font-size: 20px;
    margin-right: 10px;
}

#other-category {
    font-size: 18px;
    padding: 10px;
}

.btn-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    /* เพิ่มระยะห่างด้านบน */
    margin: 30px;
}

.btn-back,
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: none;
}

.btn-back {
    background-color: #dfdfdf;
    color: rgb(0, 0, 0);
    margin-right: 10px;
    /* ระยะห่างด้านขวาของปุ่ม .btn-back */
}

.btn {
    background-color: #e9caab;
    color: rgb(0, 0, 0);
    margin-left: 10px;
    /* ระยะห่างด้านซ้ายของปุ่ม .btn */
}

.btn-back:hover {
    color: #ffffff;
    background-color: #e88e97;
}

.btn:hover {
    color: #ffffff;
    background-color: #b99470;
}

.error-message {
    text-align: center;
    color: red;
    display: none;
}

/*photo */
.upload-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    position: relative;
}

.image-wrapper {
    position: relative;
    display: inline-block;
    margin: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-radius: 8px;
    width: 200px;
    /* Adjust the size as needed */
    height: 200px;
    /* Adjust the size as needed */
}

.upload-icon {
    font-size: 70px;
    /* Increased font size for the icon */
    color: #888;
    cursor: pointer;
    margin-bottom: 20px;
}

.upload-icon:hover {
    color: #555;
}

.image-upload {
    display: none;
}

.delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color: white;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 50%;
    font-size: 14px;
}

.images-container {
    display: flex;
    flex-wrap: wrap;
}

.uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.upload-icon {
    font-size: 50px;
    color: #ceb398;
    cursor: pointer;
    margin-bottom: 20px;
}

.upload-icon:hover {
    color: #776451;
}

.price-number-container span {
    font-size: 19px;
}

.price-number-container input {
    height: 30px;
    font-size: 15px;
}

.example-images-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.images-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    /* จัดกลางรูปภาพในแนวนอน */
    align-items: center;
    /* จัดกลางรูปภาพในแนวตั้ง */
    width: 100%;
}

.image-example-wrapper {
    position: relative;
    width: 250px;
    /* กำหนดความกว้างของรูปภาพ */
    height: 150px;
    /* กำหนดความสูงของรูปภาพ */
    overflow: hidden;
}

.uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* ปรับขนาดรูปภาพให้พอดีกับขนาดที่กำหนด */
}

.delete-example-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    padding: 5px;
}
</style>