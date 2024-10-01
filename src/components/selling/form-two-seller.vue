<template>
    <div>
        <ul id="menu-form">
            <li class="form1">ข้อมูลร้านค้า</li>
            <li class="form2">ยืนยันตัวตน</li>
            <li class="form3">ข้อมูลเพิ่มเติม</li>
            <li class="form4">ส่งแบบฟอร์ม</li>
        </ul>
        <div id="form2">
            <div class="formbox">
                <label class="section">ประเภทผู้ขาย :</label>
                <input type="radio" id="individual-option" class="seller-type" name="seller-type" value="individual"
                    v-model="sellerType" @click="showSellerType('individual')" />
                <label for="individual-option" class="section">บุคคลธรรมดา</label>
                <input type="radio" id="corporate-option" class="seller-type" name="seller-type" value="corporate"
                    v-model="sellerType" @click="showSellerType('corporate')" />
                <label for="corporate-option" class="section">นิติบุคคล</label>
                <p id="error-sellertype" v-if="sellerTypeError" style="color: red">กรุณาเลือกประเภทผู้ขาย</p>
            </div>
            <!-- บุคคลธรรมดา -->
            <div id="individual-container" v-show="sellerType === 'individual'">
                <div class="formbox">
                    <label class="section">คำนำหน้า :</label>
                    <input type="radio" id="prefix-option1" name="prefix" class="prefix" value="Ms" v-model="prefix"
                        @click="showOtherPrefixInput(false)" />
                    <label for="prefix-option1" class="section">นางสาว</label>
                    <input type="radio" id="prefix-option2" name="prefix" class="prefix" value="Mr" v-model="prefix"
                        @click="showOtherPrefixInput(false)" />
                    <label for="prefix-option2" class="section">นาย</label>
                    <input type="radio" id="prefix-option3" name="prefix" class="prefix" value="Mrs" v-model="prefix"
                        @click="showOtherPrefixInput(false)" />
                    <label for="prefix-option3" class="section">นาง</label>
                    <input type="radio" id="prefix-option4" name="prefix" class="prefix" value="Other" v-model="prefix"
                        @click="showOtherPrefixInput(true)" />
                    <label for="prefix-option4" class="section">อื่นๆ โปรดระบุ</label>
                    <div id="other-prefix-container" v-show="prefix === 'Other'">
                        <input type="text" name="other-prefix" id="other-prefix" ref="otherPrefix" class="input-form"
                            placeholder="Other..." v-model="otherPrefix" @input="handleInput()" />
                        <p id="error-prefix-other" v-if="prefixErrorOther" style="color: red">กรุณากรอกคำนำหน้า</p>
                    </div>
                    <p id="error-prefix" v-if="prefixError" style="color: red">กรุณาเลือกคำนำหน้า</p>
                </div>
                <div class="formbox">
                    <label class="section">ชื่อ :</label>
                    <input type="text" name="firstname" ref="firstname" id="firstname" class="input-form"
                        placeholder="First Name" v-model="firstname" @input="handleInput()" />
                </div>
                <div class="formbox">
                    <label class="section">นามสกุล :</label>
                    <input type="text" name="lastname" ref="lastname" id="lastname" class="input-form"
                        placeholder="Last Name" v-model="lastname" @input="handleInput()" />
                </div>
                <div class="formbox">
                    <label class="section">หมายเลขบัตรประชาชน :</label>
                    <input type="text" name="id-card-number" id="id-card-number" class="input-form"
                        placeholder="ID Card Number" minlength="13" ref="idCardNumber" maxlength="13"
                        v-model="idCardNumber" @input="validateIDCardNumber()" />
                    <p id="id-card-error" v-if="idCardError" style="color: red">
                        หมายเลขบัตรประชาชนต้องมี 13 หลักและเป็นตัวเลขเท่านั้น
                    </p>
                </div>
                <div class="formbox">
                    <label class="section">วันเดือนปีเกิด :</label>
                    <input type="date" name="birthday" ref="birthday" id="birthday" class="input-form"
                        placeholder="Birthday" v-model="birthday" @input="handleInput()" />
                    <p id="error-message" v-if="ageError" style="color: red">คุณต้องมีอายุเกิน 20 ปีขึ้นไป</p>
                </div>
                <div class="formbox">
                    <label class="section">ที่อยู่ :</label>
                    <div class="formbox">
                        <textarea name="address-details" ref="addressDetails" id="address-details" class="input-form"
                            placeholder="รายละเอียดที่อยู่ ระบุตามที่อยู่ตามบัตรประชาชน" v-model="addressDetails"
                            @input="handleInput()"></textarea>
                    </div>
                    <div class="formbox">
                        <label class="section">จังหวัด :</label>
                        <input type="text" id="province" ref="province" name="province" class="input-form"
                            placeholder="จังหวัด" v-model="province" @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <label class="section">อำเภอ :</label>
                        <input type="text" id="amphoe" ref="amphoe" name="amphoe" class="input-form" placeholder="อำเภอ"
                            v-model="amphoe" @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <label class="section">ตำบล :</label>
                        <input type="text" id="district" ref="district" name="district" class="input-form"
                            placeholder="ตำบล" v-model="district" @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <label class="section">รหัสไปรษณีย์ :</label>
                        <input type="text" id="zipcode" ref="zipcode" name="zipcode" class="input-form"
                            placeholder="รหัสไปรษณีย์" v-model="zipcode" @input="handleInput()" />
                    </div>
                    
                </div>
                <div class="formbox">
                    <label class="section">รูปถ่ายด้านหน้าบัตรประชาชน :</label>
                    <div class="upload-container">
                        <div class="images-container" id="container-photo-IDcard">
                            <div v-for="(image, index) in idCardImages" :key="index" class="image-wrapper">
                                <img :src="image" alt="ID Card" class="uploaded-image" />
                                <span class="delete-icon" @click="removeImage(index, 'idCardImages')">x</span>
                            </div>
                        </div>
                        <font-awesome-icon v-if="idCardImages.length === 0" :icon="['fas', 'image']"
                            @click="triggerFileInput('photo-IDcard')" class="upload-icon" />
                        <input type="file" name="image" ref="photoIDcardInput" class="image-upload" accept="image/*"
                            @change="previewImage($event, 'idCardImages')" />
                        <p id="photo-IDcard-error" v-if="photoIdCardError" style="color: red">
                            กรุณาอัพโหลดรูปภาพ
                        </p>
                    </div>
                </div>
                <div class="formbox">
                    <label class="section">รูปถ่ายคู่กับบัตรประชาชน :</label>
                    <div class="upload-container">
                        <div class="images-container" id="container-photo-pair-IDCard">
                            <div v-for="(image, index) in pairIdCardImages" :key="index" class="image-wrapper">
                                <img :src="image" alt="Pair with ID Card" class="uploaded-image" />
                                <span class="delete-icon" @click="removeImage(index, 'pairIdCardImages')">x</span>
                            </div>
                        </div>
                        <font-awesome-icon v-if="pairIdCardImages.length === 0" :icon="['fas', 'image']"
                            @click="triggerFileInput('photo-pair-IDCard')" class="upload-icon" />
                        <input type="file" name="image" ref="photoPairIDcardInput" class="image-upload" accept="image/*"
                            @change="previewImage($event, 'pairIdCardImages')" />
                    </div>
                    <p id="photo-pair-IDcard-error" v-if="photoPairIdCardError" style="color: red">
                        กรุณาอัพโหลดรูปภาพ
                    </p>
                </div>
            </div>
            <!-- นิติบุคคล -->
            <div id="corporate-container" v-show="sellerType === 'corporate'">
                <div class="formbox">
                    <label class="section">ประเภทนิติบุคคล :</label>
                    <input type="radio" id="corporate-option1" class="corporateType" v-model="corporateType"
                        value="Limited" @click="handleInput()" />
                    <label for="corporate-option1" class="section">บริษัทจำกัด</label>
                    <input type="radio" id="corporate-option2" class="corporateType" v-model="corporateType"
                        value="PublicLimited" @click="handleInput()" />
                    <label for="corporate-option2" class="section">บริษัทจำกัดมหาชน</label>
                    <input type="radio" id="corporate-option3" class="corporateType" v-model="corporateType"
                        value="Partnership" @click="handleInput()" />
                    <label for="corporate-option3" class="section">ห้างหุ้นส่วนสามัญนิติบุคคล</label>
                    <input type="radio" id="corporate-option4" class="corporateType" v-model="corporateType"
                        value="LimitedPartnership" @click="handleInput()" />
                    <label for="corporate-option4" class="section">ห้างหุ้นส่วนจำกัด</label>
                    <input type="radio" id="corporate-option5" class="corporateType" v-model="corporateType"
                        value="Foundation" @click="handleInput()" />
                    <label for="corporate-option5" class="section">มูลนิธิ</label>
                    <input type="radio" id="corporate-option6" class="corporateType" v-model="corporateType"
                        value="Association" @click="handleInput()" />
                    <label for="corporate-option6" class="section">สมาคม</label>
                    <p id="error-corporate" v-if="corporateTypeError" style="color: red">กรุณาเลือกคำนำหน้า</p>
                </div>
                <div class="formbox">
                    <label class="section">ชื่อบริษัท :</label>
                    <input type="text" ref="corporateName" v-model="corporateName" class="input-form"
                        placeholder="Corporate Name" @input="handleInput()" />
                </div>
                <div class="formbox">
                    <label class="section">เลขจดทะเบียนนิติบุคคล :</label>
                    <input type="text" ref="corporateRegistrationNumber" v-model="corporateRegistrationNumber"
                        class="input-form" placeholder="Corporate Registration Number" minlength="13" maxlength="13"
                        @input="validateCorporateRegistrationNumber()" />
                    <p v-if="idCardErrorCorporate" v-show="corporateRegistrationNumberError" style="color: red">
                        หมายเลขเลขจดทะเบียนนิติบุคคล 13 หลักและเป็นตัวเลขเท่านั้น
                    </p>
                </div>
                <div class="formbox">
                    <label class="section">ที่อยู่จดทะเบียนบริษัท :</label>
                    <div class="formbox">
                        <label class="section">จังหวัด :</label>
                        <input type="text" id="provinceCorporate" name="provinceCorporate" ref="provinceCorporate"
                            v-model="provinceCorporate" class="input-form" placeholder="จังหวัด"
                            @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <label class="section">อำเภอ :</label>
                        <input type="text" id="amphoeCorporate" name="amphoeCorporate" ref="amphoeCorporate"
                            v-model="amphoeCorporate" class="input-form" placeholder="อำเภอ" @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <label class="section">ตำบล :</label>
                        <input type="text" id="districtCorporate" name="districtCorporate" ref="districtCorporate"
                            v-model="districtCorporate" class="input-form" placeholder="ตำบล" @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <label class="section">รหัสไปรษณีย์ :</label>
                        <input type="text" id="zipcodeCorporate" name="zipcodeCorporate" ref="zipcodeCorporate"
                            v-model="zipcodeCorporate" class="input-form" placeholder="รหัสไปรษณีย์"
                            @input="handleInput()" />
                    </div>
                    <div class="formbox">
                        <textarea name="details-corporate" ref="detailsCorporate" id="details-corporate"
                            v-model="detailsCorporate" class="input-form"
                            placeholder="ที่อยู่จดทะเบียนบริษัท กรอกที่อยู่ตามหนังสือรับรอง/ภ.พ.20 ฉบับล่าสุด"
                            @input="handleInput()"></textarea>
                    </div>
                </div>
                <div class="formbox">
                    <label class="section">หนังสือรับรองบริษัท :</label>
                    <div class="upload-container">
                        <div class="images-container" id="container-company-certificate">
                            <div v-for="(image, index) in companyCertificateImages" :key="index" class="image-wrapper">
                                <img :src="image" alt="Company Certificate" class="uploaded-image" />
                                <span class="delete-icon"
                                    @click="removeImage(index, 'companyCertificateImages')">x</span>
                            </div>
                        </div>
                        <font-awesome-icon v-if="companyCertificateImages.length === 0" :icon="['fas', 'image']"
                            @click="triggerFileInput('company-certificate')" class="upload-icon" />
                        <input type="file" name="image" ref="companyCertificateInput" class="image-upload"
                            accept="image/*" @change="previewImage($event, 'companyCertificateImages')" />
                        <p id="photo-certificate-error" v-if="photoCertificateError" style="color: red">
                            กรุณาอัพโหลดรูปภาพ
                        </p>
                    </div>
                </div>
                <div class="formbox">
                    <label class="section">สำเนาบัตรประชาชนกรรมการผู้ลงนาม :</label>
                    <div class="upload-container">
                        <div class="images-container" id="container-director-id-card">
                            <div v-for="(image, index) in directorIdCardImages" :key="index" class="image-wrapper">
                                <img :src="image" alt="Director's ID Card" class="uploaded-image" />
                                <span class="delete-icon" @click="removeImage(index, 'directorIdCardImages')">x</span>
                            </div>
                        </div>
                        <font-awesome-icon v-if="directorIdCardImages.length === 0" :icon="['fas', 'image']"
                            @click="triggerFileInput('director-id-card')" class="upload-icon" />
                        <input type="file" name="image" ref="directorIdCardInput" class="image-upload" accept="image/*"
                            @change="previewImage($event, 'directorIdCardImages')" />
                        <p id="photo-director-IdCard-error" v-if="photoDirectorIdCardError" style="color: red">
                            กรุณาอัพโหลดรูปภาพ
                        </p>
                    </div>
                </div>
                <p id="form2-error" ref="formError" class="error-message" v-if="form2Error">
                    กรุณากรอกข้อมูลให้ครบถ้วน
                </p>
            </div>
            <router-link to="/users/FormOneSeller">
                <button type="button" class="btn-back" @click="redirectToFormOneSeller">
                    ย้อนกลับ
                </button>
            </router-link>
            <button type="button" class="btn" @click="redirectToFormThreeSeller">
                ถัดไป
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
// import Compress from 'compress.js';
// const compress = new Compress();

// import sellerData from '/seller.json';
library.add(faImage)


export default {
    data() {
        return {
            title: '',
            subDistrict: '',
            shopName: '',
            postalCode: '',
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
            companyOffice: '',
            amphoe: '',
            sellerEmail: '',
            vatRegistrationDocument: '',
            vatRegistration: false,
            district: '',
            idCardWithOwnerImage: '',
            zipcode: '',
            idCardFrontImage: '',
            addressDetail: '',
            provinceCorporate: '',
            amphoeCorporate: '',
            districtCorporate: '',
            zipcodeCorporate: '',
            detailsCorporate: '',
            corporateType: '',
            corporateName: '',
            corporateRegistrationNumber: '',
            photoIDcard: null,
            photoRairIDCard: null,
            sellerTypeError: false,
            prefixError: false,
            prefixErrorOther: false,
            corporateTypeError: false,
            idCardError: false,
            idCardErrorCorporate: false,
            photoIdCardError: false,
            photoPairIdCardError: false,
            photoCertificateError: false,
            photoDirectorIdCardError: false,
            ageError: false,
            corporateRegistrationNumberError: false,
            form2Error: false,
            idCardImages: [],
            pairIdCardImages: [],
            companyCertificateImages: [],
            directorIdCardImages: [],
            shopData: {},
        };
    },
    components: {
        FontAwesomeIcon,
    },
    async mounted() {
        try {
            const response = await fetch('http://localhost:8081/selling/view-data'); // เปลี่ยน URL ให้ตรงกับ API ของคุณ
            const seller = await response.json();
            this.shopName = seller.shopName;
            this.email = seller.email;
            this.phoneNumber = seller.phoneNumber;
        } catch (error) {
            console.error('Error fetching seller data:', error);
        }
    },
    methods: {
        validateIDCardNumber() {
            // const idCardPattern = /^\d{13}$/;

            // if (idCardPattern.test(this.idCardNumber.trim())) {
            //     this.idCardError = false;
            //     this.$refs.idCardNumber.style.border = "";
            //     return true;
            // } else {
            //     this.idCardError = true;
            //     this.$refs.idCardNumber.style.border = "1px solid red";
            //     return false;
            // }
        },
        validateCorporateRegistrationNumber() {
            // const idCardPattern = /^\d{13}$/;

            // if (idCardPattern.test(this.corporateRegistrationNumber.trim())) {
            //     this.idCardErrorCorporate = false;
            //     this.$refs.corporateRegistrationNumber.style.border = "";
            //     return true;
            // } else {
            //     this.idCardErrorCorporate = true;
            //     this.$refs.corporateRegistrationNumber.style.border = "1px solid red";
            //     return false;
            // }
        },
        validateForm2() {
            // let isValid = true;
            // this.form2Error = false;
            // this.sellerTypeError = false;
            // this.corporateTypeError = false;
            return true
            // // ตรวจสอบประเภทผู้ขาย
            // if (!this.sellerType) {
            //     isValid = false;
            //     this.sellerTypeError = true;
            // } else {
            //     this.sellerTypeError = false;
            // }

            // // ตรวจสอบข้อมูลสำหรับบุคคลธรรมดา
            // if (this.sellerType === "individual") {
            //     if (!this.prefix) {
            //         isValid = false;
            //         this.prefixError = true;
            //     } else {
            //         this.prefixError = false;
            //         if (this.prefix === "Other" && !this.otherPrefix) {
            //             isValid = false;
            //             this.$refs.otherPrefix.style.border = "1px solid red";
            //             this.prefixErrorOther = true;
            //         } else {
            //             this.prefixErrorOther = false;
            //         }
            //     }

            //     const individualFields = [
            //         "firstname",
            //         "lastname",
            //         "idCardNumber",
            //         "birthday",
            //         "province",
            //         "amphoe",
            //         "district",
            //         "zipcode",
            //         "addressDetails"
            //     ];
            //     individualFields.forEach((field) => {
            //         if (!this[field]) {
            //             isValid = false;
            //             this[field + 'Error'] = true;
            //             if (this.$refs[field]) {
            //                 this.$refs[field].style.border = '1px solid red';
            //             }
            //         } else {
            //             this[field + 'Error'] = false;
            //             if (this.$refs[field]) {
            //                 this.$refs[field].style.border = '';
            //                 //console.log('bb');
            //             }
            //         }
            //     });

            //     if (this.idCardImages.length === 0) {
            //         isValid = false;
            //         this.photoIdCardError = true;
            //     } else {
            //         this.photoIdCardError = false;
            //     }

            //     if (this.pairIdCardImages.length === 0) {
            //         isValid = false;
            //         this.photoPairIdCardError = true;
            //     } else {
            //         this.photoPairIdCardError = false;
            //     }

            //     if (!this.validateIDCardNumber()) {
            //         isValid = false;
            //         this.idCardNumberError = true;
            //     } else {
            //         this.idCardNumberError = false;
            //     }

            //     if (!this.birthday || new Date().getFullYear() - new Date(this.birthday).getFullYear() < 20) {
            //         isValid = false;
            //         this.ageError = true;
            //         this.$refs.birthday.style.border = "1px solid red";
            //     } else {
            //         this.ageError = false;
            //     }
            // }

            // // ตรวจสอบข้อมูลสำหรับนิติบุคคล
            // if (this.sellerType === "corporate") {
            //     if (!this.corporateType) {
            //         isValid = false;
            //         this.corporateTypeError = true;
            //     } else {
            //         this.corporateTypeError = false;
            //     }

            //     const corporateFields = [
            //         "corporateName",
            //         "corporateRegistrationNumber",
            //         "provinceCorporate",
            //         "amphoeCorporate",
            //         "districtCorporate",
            //         "zipcodeCorporate",
            //         "detailsCorporate"
            //     ];
            //     corporateFields.forEach((field) => {
            //         if (!this[field]) {
            //             isValid = false;
            //             this[field + 'Error'] = true;
            //             if (this.$refs[field]) {
            //                 this.$refs[field].style.border = '1px solid red';
            //             }
            //         } else {
            //             this[field + 'Error'] = false;
            //             if (this.$refs[field]) {
            //                 this.$refs[field].style.border = '';
            //             }
            //         }
            //     });

            //     if (!this.validateCorporateRegistrationNumber()) {
            //         isValid = false;
            //         this.corporateRegistrationNumberError = true;
            //     } else {
            //         this.corporateRegistrationNumberError = false;
            //     }

            //     if (this.companyCertificateImages.length === 0) {
            //         isValid = false;
            //         this.photoCertificateError = true;
            //     } else {
            //         this.photoCertificateError = false;
            //     }

            //     if (this.directorIdCardImages.length === 0) {
            //         isValid = false;
            //         this.photoDirectorIdCardError = true;
            //     } else {
            //         this.photoDirectorIdCardError = false;
            //     }
            // }

            // // แสดงข้อความแจ้งเตือนหากข้อมูลไม่ครบถ้วน
            // if (!isValid) {
            //     this.form2Error = true;
            // }
            // return isValid;
        },
        showSellerType(type) {
            this.sellerTypeError = true;
            if (type === "individual") {
                this.sellerTypeError = false;
                this.showIndividualContainer = true;
                this.showCorporateContainer = false;
            } else if (type === "corporate") {
                this.sellerTypeError = false;
                this.showIndividualContainer = false;
                this.showCorporateContainer = true;
            }
        },
        showOtherPrefixInput(show) {
            this.prefixError = false;
            this.showOtherPrefix = show;
        },
        showVAToffice(show) {
            this.showVATOffice = show;
        },
        redirectToFormOneSeller() {
            this.$router.push("/selling/FormOneSeller");
        },
        async redirectToFormThreeSeller() {
            try {
                // ข้อมูลที่ต้องการส่งไปใน request
                const sellerData = {
                    sellerType: this.sellerType,
                    title: this.title,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    idCardNumber: this.idCardNumber,
                    birthDate: this.birthDate,
                    province: this.province,
                    district: this.district,
                    subDistrict: this.subDistrict,
                    postalCode: this.postalCode,
                    addressDetail: this.addressDetail,
                    idCardFrontImage: this.idCardFrontImage,
                    idCardWithOwnerImage: this.idCardWithOwnerImage,
                    vatRegistration: this.vatRegistration,
                    companyOffice: this.companyOffice,
                    vatRegistrationDocument: this.vatRegistrationDocument,
                    sellerEmail: this.sellerEmail
                };

                // เรียกใช้ API POST
                const response = await axios.post('http://localhost:8081/selling/createSeller', sellerData);

                if (response.status === 201) {
                    console.log('Seller created successfully:', response.data);
                    // ถ้า success, redirect ไปยังหน้าอื่น
                    this.$router.push('/selling/FormThreeSeller');
                }
            } catch (error) {
                console.error('Error creating seller:', error);
            }
        },
        handleInput() {
            const refs = [
                'idCardNumber', 'otherPrefix', 'firstname', 'lastname', 'province', 'amphoe',
                'district', 'addressDetails', 'zipcode', 'corporateName', 'corporateRegistrationNumber',
                'provinceCorporate', 'amphoeCorporate', 'districtCorporate', 'zipcodeCorporate',
                'detailsCorporate'
            ];

            refs.forEach(ref => {
                if (this.$refs[ref] != null) {
                    this.$refs[ref].style.border = '';
                }
            });
            if (this.ageError != null) {
                this.ageError = false;
                if (this.$refs.birthday != null) {
                    this.$refs.birthday.style.border = '';
                }
            }
            this.photoIdCardError = false;
            this.photoPairIdCardError = false;
            this.photoCertificateError = false;
            this.photoDirectorIdCardError = false;
            this.prefixErrorOther = false;
            this.corporateTypeError = false;
        },
        // photo
        triggerFileInput(inputName) {
            const refMap = {
                'photo-IDcard': 'photoIDcardInput',
                'photo-pair-IDCard': 'photoPairIDcardInput',
                'company-certificate': 'companyCertificateInput',
                'director-id-card': 'directorIdCardInput'
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
        // previewImage(event, imageList) {
        //     const file = event.target.files[0];
        //     if (file) {
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             this[imageList].push(e.target.result);
        //         };
        //         reader.readAsDataURL(file);
        //     }
        // },
        previewImage(event, imageArray) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const max_width = 800; // กำหนดความกว้างสูงสุด
                        const max_height = 600; // กำหนดความสูงสูงสุด
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
                        // console.log('Resized Image Data URL:', dataUrl);
                        this.idCardImages.push(dataUrl);
                        // เพิ่มรูปภาพลงในอาร์เรย์ที่ระบุ

                        this[imageArray].push(dataUrl);

                    };
                };
                reader.readAsDataURL(file);
            }
        },

        removeImage(index, imageList) {
            this[imageList].splice(index, 1);
        },
        saveData() {
            if (this.sellerType === "individual") {
                const data1 = {
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
                    pairIdCardImages: this.pairIdCardImages
                };
                axios.post('http://localhost:8081/selling/save-data', data1)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error saving data:', error);
                    });
            }
            if (this.sellerType === "corporate") {
                const data2 = {
                    shopName: this.shopName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    sellerType: this.sellerType,
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
                    directorIdCardImages: this.directorIdCardImages
                };
                axios.post('http://localhost:8081/selling/save-data', data2)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error saving data:', error);
                    });
            }
        },
    }
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

.seller-type,
.prefix,
#birthday,
.corporateType {
    cursor: pointer;
}

.form1,
.form2 {
    color: red;
}

.red-text {
    color: red;
}

#form2 {
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
    background-color: #e69099;
}

#address-details,
#details-corporate {
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
    display: none;
}

.error-border {
    border: 1px solid red;
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