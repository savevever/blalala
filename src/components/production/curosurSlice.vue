<template>
    <div class="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(${-currentSlide * 100}%)` }">
            <div class="carousel-item" v-for="(group, index) in groupedImages" :key="index">
                <img v-for="image in group" :key="image.id" :src="image.src" :alt="`Image ${image.id}`" />
            </div>

        </div>
        <button @click="prevSlide" class="carousel-control prev">Prev</button>
        <button @click="nextSlide" class="carousel-control next">Next</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentSlide: 0,
            imageList: [],  
        };
    },
    computed: {
        groupedImages() {
            return this.chunkArray(this.imageList, 3);
        }
    },
    methods: {
        async fetchProductDetails(productId) {
            try {
                const response = await axios.get(`http://localhost:8081/selling/productss`);
                if (response.data && response.data.length > 0) {
                    const product = response.data.find(product => product.id == productId);
                    if (product) {
                        this.imageList = product.imageList;  // อัปเดต imageList
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
        },
        chunkArray(arr, size) {
            let result = [];
            for (let i = 0; i < arr.length; i += size) {
                result.push(arr.slice(i, i + size));
            }
            return result;
        },
        nextSlide() {
            if (this.currentSlide < this.groupedImages.length - 1) {
                this.currentSlide++;
            }
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        }
    },
    async mounted() {
        const productId = new URLSearchParams(window.location.search).get('productId');
        if (productId) {
            await this.fetchProductDetails(productId);
        }
    }
};
</script>

<style>
.carousel {
    width: 450px;
    overflow: hidden;
    position: relative;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    width: 100%;
}

.carousel-item img {
    width: 130px;
    height: 90px;
    object-fit: cover;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}
</style>
