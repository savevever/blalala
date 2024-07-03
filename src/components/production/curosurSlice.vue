<template>
    <div class="swiper-container">         
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="../../assets/1.png" alt=""></div>
            <div class="swiper-slide"><img src="../../assets/1.png" alt=""></div>
            <div class="swiper-slide"><img src="../../assets/1.png" alt=""></div>
            <div class="swiper-slide"><img src="../../assets/1.png" alt=""></div>
            <div class="swiper-slide"><img src="../../assets/1.png" alt=""></div>
            <div class="swiper-slide"><img src="../../assets/1.png" alt=""></div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle';
// import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default {
    mounted() {
        // สร้าง Swiper instance เมื่อ Vue component ถูกติดตั้ง
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
    },
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