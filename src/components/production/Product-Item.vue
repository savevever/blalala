<template>
    <div id="container">
        <div id="containerProductItem">
            <div id="ProductItem">
                <div id="ProductItemHead">
                    <div id="ProductItemImg">
                        <img src="../../assets/2.png" id="Image">
                    </div>
                    <div id="ProductItemTxt">
                        <h2>[ซื้อ 4 แถม 2] Downy ดาวน์นี่ น้ำยาปรับผ้านุ่ม สูตรเข้มข้น ชนิดถุงเติม Concentrated Fabric
                            Softener Refill 1.2L-1.35L x</h2>
                        <div id="like">
                            <font-awesome-icon :icon="['fas', 'heart']" class="heart" :class="{ 'red': isPressedHeart }"
                                @click="toggleColor('heart')" />
                            <p>5คนที่ถูกใจ</p>
                            <p>108.8พันขายแล้ว</p>
                        </div>
                        <p class="price">฿679</p>
                        <div class="option">
                            <p>size</p>
                            <button v-for="(button, index) in buttons" :key="index" @click="toggleColor(index)"
                                :class="{ 'pink': selectedButton === index }">
                                {{ button }}
                            </button>
                        </div>
                        <div class="quantity">
                            <p>จำนวน</p>
                            <div id="quantitycount">
                                <button @click="decrement">-</button>
                                <span>{{ count }}</span>
                                <button @click="increment">+</button>
                            </div>
                            <p>มีสินค้าทั้งหมด:21</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ProductItemBottom">
                <div id="ProductItemImgSlice">
                    <curosurSlice></curosurSlice>
                </div>
                <div id="ProductItemButton">
                    <button>เพิ่มสินค้าลงในตระกร้า</button>
                    <button>ซื้อสินค้าเลย</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import curosurSlice from './curosurSlice.vue'
library.add(faHeart);
export default {
    data() {
        return {
            isPressedHeart: false,
            isPressedButton: false,
            count: 0,
            buttons: ['L', 'M', 'S'],
            selectedButton: null,
        };
    },
    components: {
        curosurSlice
    },
    methods: {
        toggleColor(component) {
            if (component === 'heart') {
                this.isPressedHeart = !this.isPressedHeart;
            } else if (component === 'button') {
                this.isPressedButton = !this.isPressedButton;
            }
        },

        increment() {
            this.count++;
        },
        decrement() {
            if (this.count > 0) {
                this.count--;
            }
        },
        // ลบฟังก์ชัน toggleColor ที่ซ้ำ
    },
};
</script>

<style scoped>
#Image {
    width: 500px;
    height: 500px;
}

#ProductItemHead {
    display: flex;
    gap: 40px;
}

#ProductItemTxt {
    width: 760px;
    height: 500px;
    padding: 25px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    gap: 30px;

}

.heart {
    width: 30px;
    height: 30px;
    color: rgb(18, 20, 18);
    position: relative;
    transition: background-color 0.5s;
}

.red {
    color: red;
}


#like {
    /* margin: 20px 0 20px 0; */
    display: flex;
    gap: 35px;
}

#like p {
    font-size: 18px;
}

.option {
    display: flex;
    align-items: center;
    /* margin: 20px 0 20px 0; */
}

.option p {
    font-size: 22px;

}

.option button {
    padding: 10px 20px 10px 20px;
    margin: 0 10px 0 10px;
}

#container {
    /* height: 580px; */
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    /* padding-right: 60px; */
}

.pink {
    background-color: #ffb6c1;
    /* สีชมพูอ่อน */
}

.price {
    font-size: 25px;
}

#containerProductItem {
    display: flex;
    width: 1300px;
    flex-direction: column;
    /* background-color: #8f8c8c; */
}

.quantity {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.quantity p {
    font-size: 20px;
}

#quantitycount {
    display: flex;
}

#quantitycount span {
    font-size: 22px;
    width: 55px;
    text-align: center;
    border-top: 1px solid #8f8c8c;
    border-bottom: 1px solid #8f8c8c;

}

#ProductItemBottom {
    display: flex;
    gap: 160px;
    margin: 20px 0 20px 0;
    align-items: center;
}

#ProductItemButton {
    display: flex;
    gap: 40px;

}

#ProductItemButton :first-child {
    width: 200px;
    height: 70px;
    border-radius: 15px;
    background: #FFD4D4;
    font-size: 18px;
    border: 0;
}

#ProductItemButton :nth-child(2) {
    width: 200px;
    height: 70px;
    border-radius: 15px;
    background: #FF9C9C;
    font-size: 18px;
    border: 0;
}

#quantitycount button {
    width: 30px;
    font-size: 20px;

}
</style>./curosurSlice.vue./curosurSlice.vue