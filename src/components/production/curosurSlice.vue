<template>
    <div class="swiper-container">         
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="image in imageList" :key="image.id">
                <img :src="image.src" alt="">
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';

export default {
    data() {
        return {
            imageList: [] // ใช้เพื่อเก็บภาพจาก API
        };
    },
    methods: {
        async fetchProductDetails(productId) {
            try {
                const response = await axios.get(`http://localhost:8081/selling/productss`);
                if (response.data && response.data.length > 0) {
                    const product = response.data.find(product => product.id == productId);
                    if (product) {
                        this.imageList = product.imageList;
                        console.log(this.imageList);
                    } else {
                        console.log('ไม่พบข้อมูลสินค้าที่มี ID นี้');
                    }
                } else {
                    console.log('ไม่พบข้อมูลสินค้า');
                }
            } catch (error) {
                console.error('ข้อผิดพลาดในการดึงข้อมูล:', error);
            }
        }
    },
    async mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            await this.fetchProductDetails(productId);
        }
        // Initialize Swiper after images are loaded
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            direction: getDirection(),
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                resize: function () {
                    swiper.changeDirection(getDirection());
                },
            },
        });

        function getDirection() {
            var windowWidth = window.innerWidth;
            var direction = windowWidth <= 760 ? 'vertical' : 'horizontal';

            return direction;
        }
    }
};
</script>


<style>
.swiper-container {
    width: 450px;
    height: 100px;
    overflow: hidden;
}

.swiper-wrapper img {
    height: 90px;
    width: 130px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.swiper-button-next {
    position: absolute;
    top: 110%;
    right: 60.5%;
    color: rgb(255, 255, 255);
    border: 2px solid #000000;
}

.swiper-button-prev {
    position: absolute;
    top: 110%;
    left: 16.8%;
    color: rgb(255, 255, 255);
    border: 2px solid #000000;
}
</style>