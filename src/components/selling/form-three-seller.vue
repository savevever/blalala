<template>
    <div>
        <ul id="menu-form">
            <li class="form1">ข้อมูลร้านค้า</li>
            <li class="form2">ยืนยันตัวตน</li>
            <li class="form3">ข้อมูลเพิ่มเติม</li>
            <li class="form4">ส่งแบบฟอร์ม</li>
        </ul>

        <div id="form3">
            <div class="formbox">
                <label class="section">จดทะเบียนภาษีมูลค่าเพิ่ม :</label>
                <input type="radio" id="VAT-option1" name="VAT" class="VAT" value="VAT-No" v-model="VAT"
                    @click="showVAToffice(false)" />
                <label for="VAT-option1" class="section">ไม่</label>
                <input type="radio" id="VAT-option2" name="VAT" class="VAT" value="VAT-Yes" v-model="VAT"
                    @click="showVAToffice(true)" />
                <label for="VAT-option2" class="section">ใช่</label>
                <p id="error-VAT" v-if="VATError" style="color: red">กรุณาเลือกการจดทะเบียนภาษีมูลค่าเพิ่ม</p>

                <div id="VAT-office" ref="VATOffice" v-show="isVATOfficeVisible">
                    <label class="section">สำนักงานของบริษัท :</label>
                    <input type="radio" id="office" name="office" value="office" v-model="office"
                        @click="handleInput()" />
                    <label for="office" class="section">สำนักงานใหญ่</label>
                    <p id="error-section" v-if="sectionError" style="color: red">กรุณาคลิก</p>
                    <p v-show="officeError" style="color: red"></p>
                    <div class="formbox">
                        <label class="section">ใบทะเบียนภาษีมูลค่าเพิ่ม(ภ.พ.20) :</label>
                        <div class="upload-container">
                            <div class="images-container" id="container-VAT">
                                <div v-for="(image, index) in VATImages" :key="index" class="image-wrapper">
                                    <img :src="image" alt="VAT ID Card" class="uploaded-image" />
                                    <span class="delete-icon" @click="removeImage(index, 'VATImages')">x</span>
                                </div>
                            </div>
                            <font-awesome-icon v-if="VATImages.length === 0" :icon="['fas', 'image']"
                                @click="triggerFileInput('VAT-certificate')" class="upload-icon" />
                            <input type="file" name="image" ref="VATInput" class="image-upload" accept="image/*"
                                @change="previewImage($event, 'VATImages')" />
                            <p id="photo-VAT-error" v-if="photoVATError" style="color: red">
                                กรุณาอัพโหลดรูปภาพ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="formbox">
                <input type="checkbox" id="checkbox" v-model="acceptedTerms" @click="handleInput()" />
                <label for="checkbox"> ฉันยอมรับ เงื่อนไขการใช้บริการ และ นโยบายความเป็นส่วนตัว</label>
                <p v-show="checkboxError" style="color: red"></p>
                <p id="error-checkbox" v-if="checkboxError" style="color: red">กรุณากดยอมรับเงื่อนไข</p>
            </div>
            <p v-if="form3Error" class="error-message" style="color: red">กรุณากรอกข้อมูลให้ครบถ้วน</p>

            <router-link to="/users/FormTwoSeller">
                <button type="button" class="btn-back" @click="redirectToFormTwoSeller">
                    ย้อนกลับ
                </button>
            </router-link>
            <button type="button" class="btn" @click="redirectToSellingPage()">
                ยืนยัน
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
// import sellerData from '/seller.json';

export default {
    data() {
        return {
            currentForm: 3,
            VAT: '',
            isVATOfficeVisible: false,
            office: '',
            VATImages: [],
            acceptTerms: false,
            VATError: false,
            sectionError: false,
            officeError: false,
            photoVATError: false,
            checkboxError: false,
            form3Error: false,

            shopName: '',
            email: '',
            phoneNumber: '',
            sellerType: '',
            prefix: '',
            otherPrefix: '',
            firstname: '',
            lastname: '',
            idCardNumber: '',
            birthday: '',
            province: '',
            amphoe: '',
            district: '',
            zipcode: '',
            addressDetails: '',
            idCardImages: '',
            pairIdCardImages: '',

            corporateType: '',
            corporateName: '',
            corporateRegistrationNumber: '',
            provinceCorporate: '',
            amphoeCorporate: '',
            districtCorporate: '',
            zipcodeCorporate: '',
            detailsCorporate: '',
            companyCertificateImages: '',
            directorIdCardImages: '',
        };
    },
    async mounted() {
        try {
            const response = await fetch('http://localhost:8081/selling/view-data'); // เปลี่ยน URL ให้ตรงกับ API ของคุณ
            const seller = await response.json();
            this.shopName = seller.shopName;
            this.email = seller.email;
            this.phoneNumber = seller.phoneNumber;
            this.sellerType = seller.sellerType
            this.prefix = seller.prefix
            this.otherPrefix = seller.otherPrefix
            this.firstname = seller.firstname
            this.lastname = seller.lastname
            this.idCardNumber = seller.idCardNumber
            this.birthday = seller.birthday
            this.province = seller.province
            this.amphoe = seller.amphoe
            this.district = seller.district
            this.zipcode = seller.zipcode
            this.addressDetails = seller.addressDetails
            this.idCardImages = seller.idCardImages
            this.pairIdCardImages = seller.pairIdCardImages
            this.corporateType = seller.corporateType
            this.corporateName = seller.corporateName
            this.corporateRegistrationNumber = seller.corporateRegistrationNumber
            this.provinceCorporate = seller.provinceCorporate
            this.amphoeCorporate = seller.amphoeCorporate
            this.districtCorporate = seller.districtCorporate
            this.zipcodeCorporate = seller.zipcodeCorporate
            this.detailsCorporate = seller.detailsCorporate
            this.companyCertificateImages = seller.companyCertificateImages
            this.directorIdCardImages = seller.directorIdCardImages
        } catch (error) {
            console.error('Error fetching seller data:', error);
        }
    },
    methods: {
        validateForm3() {
            // let isValid = true;
            // this.VATError = false;
            // this.checkboxError = false;
            // this.sectionError = false;
            // this.photoVATError = false;
            // this.form3Error = false;
            // // ตรวจสอบว่ามีค่า VAT ที่ถูกเลือกหรือไม่
            // if (!this.VAT) {
            //     this.VATError = true;
            //     isValid = false;
            // }
            // // ตรวจสอบว่า checkbox ได้ถูกติ๊กหรือไม่
            // if (!this.acceptedTerms) {
            //     this.checkboxError = true;
            //     isValid = false;
            // }

            // if (this.VAT === 'VAT-Yes') {
            //     // ตรวจสอบว่าเลือกสำนักงานหรือไม่
            //     if (!this.office) {
            //         this.sectionError = true;
            //         isValid = false;
            //     }

            //     // เช็คการอัพรูป
            //     if (this.VATImages.length === 0) {
            //         this.photoVATError = true;
            //         isValid = false;
            //     }
            // }

            // // แสดงข้อความแจ้งเตือนหากข้อมูลไม่ครบถ้วน
            // if (!isValid) {
            //     this.form3Error = true;
            // }

            return true;
        },
        showVAToffice(isVAT) {
            if (isVAT == true) {
                this.$refs.VATOffice.style.display = 'block';
                this.handleInput();
            } else {
                this.$refs.VATOffice.style.display = 'none';
                this.handleInput();
            }
        },
        handleInput() {
            if (this.photoVATError != null) {
                this.photoVATError = false;
            }

            if (this.VATError != null) {
                this.VATError = false;
            }

            if (this.checkboxError != null) {
                this.checkboxError = false;
            }

            if (this.form3Error != null) {
                this.form3Error = false;
            }

            if (this.officeError != null) {
                this.officeError = false;
            }

            if (this.sectionError != null) {
                this.sectionError = false;
            }
        },
        // photo
        triggerFileInput(inputName) {
            const refMap = {
                'VAT-certificate': 'VATInput',
            };
            const refName = refMap[inputName];
            const input = this.$refs[refName];
            if (input) {
                input.click();
                this.handleInput();
            } else {
                console.error('File input not found');
            }
        },
        previewImage(event, imageList) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this[imageList].push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },
        removeImage(index, imageList) {
            this[imageList].splice(index, 1);
        },
        redirectToSellingPage() {
            if (this.validateForm3()) {
                this.saveData();
                this.currentForm = 4;
                this.$router.push("/selling/FormFourSeller");
            } else {
                this.form3Error = true;
            }
        },
        saveData() {
            const data = {
                shopName: this.shopName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                sellerType: this.sellerType,
                prefix: this.prefix,
                otherPrefix: this.otherPrefix,
                firstname: this.firstname,
                lastname: this.lastname,
                idCardNumber: this.idCardNumber,
                birthday: this.birthday,
                province: this.province,
                amphoe: this.amphoe,
                district: this.district,
                zipcode: this.zipcode,
                addressDetails: this.addressDetails,
                idCardImages: this.idCardImages,
                pairIdCardImages: this.pairIdCardImages,
                corporateType: this.corporateType,
                corporateName: this.corporateName,
                corporateRegistrationNumber: this.corporateRegistrationNumber,
                provinceCorporate: this.provinceCorporate,
                amphoeCorporate: this.amphoeCorporate,
                districtCorporate: this.districtCorporate,
                zipcodeCorporate: this.zipcodeCorporate,
                detailsCorporate: this.detailsCorporate,
                companyCertificateImages: this.companyCertificateImages,
                directorIdCardImages: this.directorIdCardImages,
                VAT: this.VAT,
                office: this.office,
                VATImages: this.VATImages,
                acceptedTerms: this.acceptedTerms,
            }
            axios.post('http://localhost:8081/selling/save-data', data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
        },
        redirectToFormTwoSeller() {
            this.$router.push("/selling/FormTwoSeller");
        },
    },
};
</script>

<style scoped>
#menu-form {
    padding: 15px;
    list-style-type: none;
    overflow: hidden;
    justify-content: space-around;
    display: flex;
    color: #a9a9a9;
}

.form1,
.form2,
.form3 {
    color: red;
}

.red-text {
    color: red;
}

#form3,
#form4 {
    margin: auto;
    width: 80%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}

#email {
    font-size: 20px;
}

.formbox {
    margin: 2% auto;
}

.input-form {
    width: 180px;
    height: 30px;
    padding: 5px;
    color: #383838;
}

input[type="radio"] {
    width: 15px;
    height: 15px;
}

input[type="checkbox"] {
    padding-right: 10px;
    margin: 0.5% auto;
}

.section {
    padding-right: 10px;
    margin: 0.5% auto;
}

.VAT,
#office,
#checkbox {
    cursor: pointer;
}

.btn {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0.2, 0.3);
    cursor: pointer;
    border: none;
    background-color: #ac8b6b;
    color: white;
    margin: 1.5% auto;
    margin-left: 20px;
}

.btn:hover {
    background-color: #e9caab;
    color: black;
}

.btn-back {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0.2, 0.3);
    cursor: pointer;
    border: none;
    background-color: #dfdfdf;
    color: rgb(0, 0, 0);
    margin: 1.5% auto;
}

.btn-back:hover {
    color: #ffffff;
    background-color: #eda4ab;
}

#address-details,
#address-details1 {
    height: 100px;
    box-sizing: border-box;
    width: 60%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow-wrap: auto;
}

.section {
    font-family: "Times New Roman", Times, serif;
    font-size: 15px;
    margin-bottom: 10px;
}

.start {
    font-size: 15px;
}

.error-message {
    color: red;
}

/*---up photo-----*/
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
    color: #888;
    cursor: pointer;
    margin-bottom: 20px;
}

.upload-icon:hover {
    color: #555;
}
</style>