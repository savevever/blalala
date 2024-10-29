const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { Selling, ProductTest, seller } = require('../configs/database');
router.post('/users/FormOneSeller', (req, res) => {
    res.json({ message: 'Form One Seller Page' });
});
router.post('/createSeller', async (req, res) => {
    try {
        const {
            sellerType, title, firstName, lastName, idCardNumber, birthDate, province, district,
            subDistrict, postalCode, addressDetail, idCardFrontImage, idCardWithOwnerImage,
            vatRegistration, companyOffice, vatRegistrationDocument, sellerEmail
        } = req.body;

        const newSeller = await seller.create({
            sellerType, title, firstName, lastName, idCardNumber, birthDate, province,
            district, subDistrict, postalCode, addressDetail, idCardFrontImage,
            idCardWithOwnerImage, vatRegistration, companyOffice, vatRegistrationDocument, sellerEmail
        });

        res.status(201).json({ message: 'Seller created successfully', seller: newSeller });
    } catch (error) {
        console.error('Error creating seller:', error);
        res.status(500).json({ message: 'Error creating seller', error: error.message });
    }
});
router.post('/save-data', async (req, res) => {
    try {
        // ดึงข้อมูลจาก request body
        const { shopName, email, phoneNumber } = req.body;
        // บันทึกข้อมูลลงในฐานข้อมูล PostgreSQL โดยใช้โมเดล Selling
        const newSelling = await Selling.create({
            shopName, email, phoneNumber

        });
        // ส่ง response กลับไปที่ client พร้อมข้อมูลที่ถูกบันทึก
        res.status(200).json({ message: 'Data saved successfully', data: newSelling });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data' });
    }
});
router.get('/view-data', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const allSellings = await Selling.findAll();

        // ส่งข้อมูลไปยัง client
        res.status(200).json({ message: 'Data retrieved successfully', data: allSellings });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});


const multer = require('multer');
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 * 1024 } });
router.post('/save-product-data', upload.any(), async (req, res) => {// ************
    console.log('Received request body:', req.body); 
    try {
        const productData = {
            ...req.body,
            images: JSON.parse(req.body.images),
            productTypes: JSON.parse(req.body.productTypes),
            imageList: JSON.parse(req.body.imageList),
        };

        console.log('Product data to be saved:', productData);
        if (!productData.id) {
            productData.id = crypto.randomUUID();
        }
        await ProductTest.create(productData);

        res.status(200).json({ message: 'บันทึกข้อมูลลง PostgreSQL สำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการบันทึกข้อมูลลง PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถบันทึกข้อมูลได้' });
    }
});
router.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params;
    const { totalSell, totalPrice } = req.body;

    if (isNaN(totalSell) || isNaN(totalPrice)) {
        return res.status(400).json({ error: 'Invalid input: totalSell or totalPrice is not a number' });
    }

    try {
        const product = await ProductTest.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedTotalSell = (product.totalSell || 0) + parseInt(totalSell);
        const updatedTotalPrice = (product.totalPrice || 0) + parseFloat(totalPrice);
        
        product.totalSell = updatedTotalSell;
        product.totalPrice = updatedTotalPrice;
        product.numberProducts -= parseInt(totalSell);
        await product.save();

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

router.get('/productss', async (req, res) => {
    try {
        const products = await ProductTest.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});
router.get('/product/latest', async (req, res) => {
    try {
        // ดึงข้อมูลผลิตภัณฑ์ที่มี id สูงสุด (หรือข้อมูลล่าสุด)
        const latestProduct = await ProductTest.findOne({
            order: [['id', 'DESC']], // สั่งให้ค้นหา id ที่มีค่ามากที่สุด
        });
        if (latestProduct) {
            res.status(200).json(latestProduct);
        } else {
            res.status(404).json({ message: 'ไม่พบผลิตภัณฑ์' });
        }
    } catch (err) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});
router.delete('/Delateproducts', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดจากตาราง ProductTest
        await ProductTest.destroy({
            where: {}, // ไม่มีเงื่อนไข where หมายถึงลบข้อมูลทั้งหมด
            truncate: true // ใช้ truncate เพื่อลบข้อมูลทั้งหมดและรีเซ็ตการนับ ID
        });

        res.status(200).json({ message: 'ลบข้อมูลทั้งหมดสำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการลบข้อมูลทั้งหมดจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถลบข้อมูลทั้งหมดได้' });
    }
});
router.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('Product ID ที่ได้รับ:', productId);
        const product = await ProductTest.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณต้องการลบ' });
        }

        await product.destroy();
        res.status(200).json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (err) {
        console.error('ข้อผิดพลาดในการลบข้อมูลจาก PostgreSQL:', err);
        res.status(500).json({ message: 'ไม่สามารถลบข้อมูลได้' });
    }
});
router.post('/users/salesPage', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const products = await Selling.findAll();

        // ส่งข้อมูลไปยังหน้า sales-page
        res.json({ message: 'Sales Page Data', products });
    } catch (err) {
        console.error('Error retrieving data from PostgreSQL:', err);
        return res.status(500).send('Error retrieving data');
    }
});
router.post('/users/FormTwoSeller', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง Selling
        const data = await Selling.findAll();

        // ส่งข้อมูลไปยังหน้า form-two-seller
        res.json({ message: 'Form Two Seller Data', products: data });
    } catch (err) {
        console.error('Error retrieving data from PostgreSQL:', err);
        return res.status(500).send('Error retrieving data');
    }
});
router.post('/users/FormThreeSeller', (req, res) => {
    res.json({ message: 'Form Three Seller Page' });
});

router.post('/users/FormFourSeller', (req, res) => {
    res.json({ message: 'Form Four Seller Page' });
});
router.get('/selling-login', async (req, res) => {
    res.json({ message: 'Selling Login Page' });
});

router.get('/start-selling', (req, res) => {
    // fs.readFile('seller.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading file', err);
    //         return res.status(500).send('Internal Server Error');
    //     }

    //     const formData = JSON.parse(data);
    //     const username = req.user ? req.user.name : '';
    // });
    res.json({ message: 'Start Selling Page' });
});
router.post('/api/saveProductData', async (req, res) => {
    const data = req.body;

    try {
        if (data.id) {
            await Selling.update(data, {
                where: { id: data.id }
            });
        } else {
            // Create new entry
            await Selling.create(data);
        }

        console.log('Data saved successfully');
        res.json({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data to PostgreSQL', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});
router.put('/product/:id/toggleLike', async (req, res) => {
    try {
        const productId = req.params.id;
        const likeChange = req.body.likeChange;
        const product = await ProductTest.findByPk(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        if (likeChange === 1) {
            product.likes += 1;
        } else if(likeChange === -1) {
            product.likes -= 1;
        }
        await product.save();
        res.status(200).send({
            message: 'Product like status changed',
            likes: product.likes
        });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).send({
            message: 'Error toggling like',
            error: error.message
        });
    }
});
router.put('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const { nameProduct, price, numberProducts, images } = req.body; // รับ `images` 

        const product = await ProductTest.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updateData = {};
        if (nameProduct !== undefined) updateData.nameProduct = nameProduct;
        if (price !== undefined) updateData.price = price;
        if (numberProducts !== undefined) updateData.numberProducts = numberProducts;

        // หากมี `images` ใหม่ จะทำการแทนที่ภาพเก่า
        if (images !== undefined) {
            updateData.images = images; // แทนที่ภาพทั้งหมดด้วยภาพใหม่
        }

        await product.update(updateData);
        res.json({ message: 'Product updated successfully', product }); // ส่งข้อมูลสินค้าที่อัปเดตแล้วกลับไป
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product details' });
    }
});








module.exports = router;