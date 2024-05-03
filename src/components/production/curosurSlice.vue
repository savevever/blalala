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
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
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
    width: 500px;
    height: 100px;
    overflow: hidden;
}

.swiper-wrapper img {
    height: 150px;
    width: 160px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #3d4380;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.swiper-button-next {
    top: 105%;
    right: 62%;
    color: aquamarine;

}

.swiper-button-prev {
    top: 105%;
    left: 9%;
    color: aquamarine;
}
</style>