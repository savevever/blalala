require('dotenv').config();
const crypto = require('crypto');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/dev');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    ConfirmPassword: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
    gender: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.STRING, allowNull: true },
    image: {
        type: DataTypes.JSONB, allowNull: true
    },
    isConfirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
});

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true }, name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    totalSales: { type: DataTypes.FLOAT, allowNull: false },
    numberOfOrders: { type: DataTypes.INTEGER, allowNull: false },
    itemsSold: { type: DataTypes.INTEGER, allowNull: false },
    cogs: { type: DataTypes.FLOAT, allowNull: false },
    shippingCosts: { type: DataTypes.FLOAT, allowNull: false },
    day: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false }
});

const Selling = sequelize.define('Selling', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    shopName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING, allowNull: true, validate: { len: [10, 10] } },
    sellerType: { type: DataTypes.STRING, allowNull: true },
    prefix: { type: DataTypes.ENUM('individual', 'corporate'), allowNull: true },
    otherPrefix: { type: DataTypes.STRING, allowNull: true },
    firstname: { type: DataTypes.STRING, allowNull: true },
    lastname: { type: DataTypes.STRING, allowNull: true },
    idCardNumber: { type: DataTypes.STRING, allowNull: true },
    birthday: { type: DataTypes.DATEONLY, allowNull: true },
    province: { type: DataTypes.STRING, allowNull: true },
    amphoe: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    zipcode: { type: DataTypes.STRING, allowNull: true },
    addressDetails: { type: DataTypes.STRING, allowNull: true },
    idCardImages: { type: DataTypes.STRING, allowNull: true },
    pairIdCardImages: { type: DataTypes.STRING, allowNull: true },
    corporateType: { type: DataTypes.STRING, allowNull: true },
    corporateName: { type: DataTypes.STRING, allowNull: true },
    corporateRegistrationNumber: { type: DataTypes.STRING, allowNull: true },
    provinceCorporate: { type: DataTypes.STRING, allowNull: true },
    amphoeCorporate: { type: DataTypes.STRING, allowNull: true },
    districtCorporate: { type: DataTypes.STRING, allowNull: true },
    zipcodeCorporate: { type: DataTypes.STRING, allowNull: true },
    detailsCorporate: { type: DataTypes.STRING, allowNull: true },
    companyCertificateImages: { type: DataTypes.STRING, allowNull: true },
    directorIdCardImages: { type: DataTypes.STRING, allowNull: true },
});
const Shop = sequelize.define('Shop', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    image: { type: DataTypes.JSONB, allowNull: true },
    shopName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    shopId: { type: DataTypes.STRING, allowNull: false, unique: true },
    like: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    follow: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    followedBy: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] }
});
const ProductTest = sequelize.define('ProductTest', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => crypto.randomUUID()
    },
    images: {
        type: DataTypes.JSONB, allowNull: false
    },
    nameProduct: {
        type: DataTypes.STRING, allowNull: false
    },
    category: {
        type: DataTypes.STRING, allowNull: true
    },
    otherCategory: {
        type: DataTypes.STRING, allowNull: true
    },
    productDetails: {
        type: DataTypes.TEXT, allowNull: true
    },
    productTypes: {
        type: DataTypes.JSONB, allowNull: true
    },
    price: {
        type: DataTypes.FLOAT, allowNull: true
    },
    numberProducts: {
        type: DataTypes.INTEGER, allowNull: true
    },
    imageList: {
        type: DataTypes.JSONB,
        allowNull: false,
    }, shopId: {
        type: DataTypes.STRING,
        references: {
            model: Shop,
            key: 'shopId'
        },
        allowNull: false
    },
    totalSell: {
        type: DataTypes.INTEGER, allowNull: true
    }, totalPrice: {
        type: DataTypes.FLOAT, allowNull: true
    },
    likes: { type: DataTypes.INTEGER, default: 0 }
},

);

const history = sequelize.define('history', {
    Historyid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => crypto.randomUUID()
    },
    productId: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
    nameProduct: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    shopId: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    productTypes: { type: DataTypes.STRING, allowNull: true },
});

const cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
    nameProduct: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    shopId: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    productTypes: { type: DataTypes.STRING, allowNull: true },
});
const Payment = sequelize.define('Payment', {
    accountNo: { type: DataTypes.STRING, allowNull: true }, // ตัวเลขบัญชี
    customerToken: { type: DataTypes.STRING, allowNull: true }, // Token ลูกค้า
    customerTokenExpiry: { type: DataTypes.DATE, allowNull: true }, // วันหมดอายุของ Token
    loyaltyPoints: { type: DataTypes.INTEGER, allowNull: true }, // คะแนนสะสม
    uniqueAccountReference: { type: DataTypes.STRING, allowNull: true }, // รหัสบัญชีเฉพาะ
    childMerchantID: { type: DataTypes.STRING, allowNull: true }, // รหัสร้านย่อย
    processBy: { type: DataTypes.STRING, allowNull: false }, // ประมวลผลโดย
    paymentID: { type: DataTypes.STRING, allowNull: false, primaryKey: true }, // รหัสการชำระเงิน (Primary Key)
    schemePaymentID: { type: DataTypes.STRING, allowNull: true }, // รหัสการชำระเงินในระบบของบัตร
    merchantID: { type: DataTypes.STRING, allowNull: false }, // รหัสร้านค้า
    invoiceNo: { type: DataTypes.STRING, allowNull: false }, // หมายเลขใบแจ้งหนี้
    amount: { type: DataTypes.FLOAT, allowNull: false }, // จำนวนเงิน
    monthlyPayment: { type: DataTypes.FLOAT, allowNull: true }, // การชำระเงินรายเดือน
    userDefined1: { type: DataTypes.STRING, allowNull: true }, // ข้อมูลที่กำหนดโดยผู้ใช้ 1
    userDefined2: { type: DataTypes.STRING, allowNull: true }, // ข้อมูลที่กำหนดโดยผู้ใช้ 2
    userDefined3: { type: DataTypes.STRING, allowNull: true }, // ข้อมูลที่กำหนดโดยผู้ใช้ 3
    userDefined4: { type: DataTypes.STRING, allowNull: true }, // ข้อมูลที่กำหนดโดยผู้ใช้ 4
    userDefined5: { type: DataTypes.STRING, allowNull: true }, // ข้อมูลที่กำหนดโดยผู้ใช้ 5
    currencyCode: { type: DataTypes.STRING, allowNull: false }, // รหัสสกุลเงิน
    recurringUniqueID: { type: DataTypes.STRING, allowNull: true }, // รหัสเฉพาะสำหรับการชำระเงินรายเดือน
    tranRef: { type: DataTypes.STRING, allowNull: false }, // รหัสอ้างอิงการทำธุรกรรม
    referenceNo: { type: DataTypes.STRING, allowNull: true }, // หมายเลขอ้างอิง
    approvalCode: { type: DataTypes.STRING, allowNull: true }, // รหัสอนุมัติ
    eci: { type: DataTypes.STRING, allowNull: true }, // รหัสการทำธุรกรรมผ่านอินเทอร์เน็ต
    transactionDateTime: { type: DataTypes.STRING, allowNull: false }, // วันที่และเวลาทำธุรกรรม
    agentCode: { type: DataTypes.STRING, allowNull: true }, // รหัสตัวแทน
    channelCode: { type: DataTypes.STRING, allowNull: true }, // รหัสช่องทาง
    issuerCountry: { type: DataTypes.STRING, allowNull: true }, // ประเทศของผู้ออกบัตร
    issuerBank: { type: DataTypes.STRING, allowNull: true }, // ธนาคารผู้ออกบัตร
    installmentMerchantAbsorbRate: { type: DataTypes.FLOAT, allowNull: true }, // อัตราค่าผ่อนชำระที่ร้านค้ารับผิดชอบ
    cardType: { type: DataTypes.STRING, allowNull: true }, // ประเภทบัตร (เครดิต/เดบิต)
    idempotencyID: { type: DataTypes.STRING, allowNull: true }, // รหัสสำหรับป้องกันการทำธุรกรรมซ้ำ
    paymentScheme: { type: DataTypes.STRING, allowNull: true }, // รูปแบบการชำระเงิน
    displayProcessingAmount: { type: DataTypes.BOOLEAN, allowNull: true }, // การแสดงจำนวนเงินที่ถูกประมวลผล
    respCode: { type: DataTypes.STRING, allowNull: false }, // รหัสตอบกลับ
    respDesc: { type: DataTypes.STRING, allowNull: true } // คำอธิบายรหัสตอบกลับ
}, {});
const seller = sequelize.define('seller', {
    sellerType: {
        type: DataTypes.STRING, // ประเภทผู้ขาย เช่น บุคคลธรรมดา หรือ นิติบุคคล
        allowNull: true
    },
    title: {
        type: DataTypes.STRING, // คำนำหน้า เช่น นาย, นาง, นางสาว
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING, // ชื่อ
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING, // นามสกุล
        allowNull: true
    },
    idCardNumber: {
        type: DataTypes.STRING, // หมายเลขบัตรประชาชน
        allowNull: true,
    },
    birthDate: {
        type: DataTypes.DATEONLY, // วันเดือนปีเกิด
        allowNull: true
    },
    province: {
        type: DataTypes.STRING, // จังหวัด
        allowNull: true
    },
    district: {
        type: DataTypes.STRING, // อำเภอ
        allowNull: true
    },
    subDistrict: {
        type: DataTypes.STRING, // ตำบล
        allowNull: true
    },
    postalCode: {
        type: DataTypes.STRING, // รหัสไปรษณีย์
        allowNull: true
    },
    addressDetail: {
        type: DataTypes.TEXT, // รายละเอียดที่อยู่
        allowNull: true
    },
    idCardFrontImage: {
        type: DataTypes.TEXT, // รูปถ่ายด้านหน้าบัตรประชาชน (เก็บ URL ของรูปภาพ)
        allowNull: true
    },
    idCardWithOwnerImage: {
        type: DataTypes.TEXT, // รูปถ่ายคู่กับบัตรประชาชน (เก็บ URL ของรูปภาพ)
        allowNull: true
    },
    vatRegistration: {
        type: DataTypes.BOOLEAN, // การจดทะเบียนภาษีมูลค่าเพิ่ม (true: จดทะเบียน, true: ไม่จดทะเบียน)
        allowNull: true
    },
    companyOffice: {
        type: DataTypes.STRING, // สำนักงานของบริษัท
        allowNull: true
    },
    vatRegistrationDocument: {
        type: DataTypes.TEXT, // รูปถ่ายใบทะเบียนภาษีมูลค่าเพิ่ม (เก็บ URL ของรูปภาพ)
        allowNull: true
    },
    sellerEmail: {
        type: DataTypes.STRING, // อีเมลผู้ขาย
        allowNull: true,
    }
});
const location = sequelize.define('location', {
    name: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    postalCode: { type: DataTypes.STRING, allowNull: true },
    province: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
});
const account = sequelize.define('account', {
    name: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    postalCode: { type: DataTypes.STRING, allowNull: true },
    province: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
});
const comment = sequelize.define('comment', {
    nameProduct: { type: DataTypes.STRING, allowNull: true },
    imageProduct: { type: DataTypes.JSONB, allowNull: true },
    price: { type: DataTypes.STRING, allowNull: true },
    detail: { type: DataTypes.TEXT, allowNull: true },
    imageComment: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    star: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    productId: { type: DataTypes.STRING, allowNull: false, },
    AcImg: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    AcName: { type: DataTypes.STRING, allowNull: true },
});
Shop.hasMany(ProductTest, { foreignKey: 'shopId', sourceKey: 'shopId' });
ProductTest.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'shopId' });
module.exports = { sequelize, User, Product, Shop, Selling, ProductTest, history, cart, Payment, seller, location, account, comment };
