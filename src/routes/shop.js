const express = require('express');
const router = express.Router();
const { Shop } = require('../configs/database');
const crypto = require('crypto');

// POST /register-shop
router.post('/register-shop', async (req, res) => {
    try {
        const { userId, shopName, email, phoneNumber } = req.body;
        const shopId = crypto.createHash('sha256').update(userId + shopName).digest('hex');

        const newShop = await Shop.create({
            shopId,
            userId,
            shopName,
            email,
            phoneNumber
        });
        
        res.status(201).json({ message: 'Shop created successfully', data: {
            shopId: newShop.shopId, 
            userId: newShop.userId,
            shopName: newShop.shopName,
            email: newShop.email,
            phoneNumber: newShop.phoneNumber
        } });
    } catch (error) {
        console.error('Error registering shop:', error);
        res.status(500).json({ message: 'Failed to register shop' });
    }
});
// shop.js
// ตรวจสอบ endpoint การอัปเดตการติดตาม
// shop.js
router.post('/follow', async (req, res) => {
    try {
        const { email, shopId, followChange } = req.body;
        const shop = await Shop.findOne({ where: { shopId } });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        let followedBy = shop.followedBy || [];
        let followCount = shop.follow || 0;

        if (followChange === 1) {
            if (!followedBy.includes(email)) {
                followedBy.push(email);
                followCount += 1;
            }
        } else if (followChange === -1) {
            if (followedBy.includes(email)) {
                followedBy = followedBy.filter(followedEmail => followedEmail !== email);
                followCount -= 1;
            }
        }

        // Update the shop with the new followedBy list and follow count
        await shop.update({ followedBy, follow: followCount });

        res.status(200).json({ followCount });
    } catch (error) {
        console.error('Error managing follow status:', error);
        res.status(500).json({ message: 'Failed to update follow status' });
    }
});



router.get('/follow', async (req, res) => {
    try {
        const shops = await Shop.findAll();
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.get('/shopsFollow', async (req, res) => {
    try {
        const { email } = req.query; // รับ email จากพารามิเตอร์คำขอ
        const shops = await Shop.findAll();

        for (const shop of shops) {
            // นับจำนวนการติดตามสำหรับร้านค้า
            shop.follow = shop.followedBy.length;
            
            // ตรวจสอบว่าผู้ใช้ปัจจุบันติดตามร้านค้านี้หรือไม่
            shop.isFollowing = shop.followedBy.includes(email);
        }

        res.status(200).json({ message: 'ดึงข้อมูลร้านค้าเรียบร้อยแล้ว', data: shops });
    } catch (error) {
        console.error('ข้อผิดพลาดในการดึงข้อมูลร้านค้า:', error);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลร้านค้าได้' });
    }
});

router.get('/shops', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากฐานข้อมูล
        const shops = await Shop.findAll();

        // ส่งข้อมูลกลับไปที่ client
        res.status(200).json({ message: 'Shops retrieved successfully', data: shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Failed to retrieve shops' });
    }
});
router.delete('/shops', async (req, res) => {
    try {
        // ลบข้อมูลทั้งหมดจากฐานข้อมูล
        await Shop.destroy({
            where: {},
            truncate: true
        });

        // ส่ง response กลับไปที่ client
        res.status(200).json({ message: 'All shops deleted successfully' });
    } catch (error) {
        console.error('Error deleting shops:', error);
        res.status(500).json({ message: 'Failed to delete shops' });
    }
});

module.exports = router;
