<template>
    <div id="container">

        <div id="Purchase-history-container">
            <div id="Purchase-history-left">
                <div class="user">
                    <div class="user-title">
                        <h3>การซื้อ</h3>
                        <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" />
                    </div>
                    <p>ประวัติการซื้อ</p>
                    <p>ตะกร้าสินค้า</p>
                    <p>ที่อยุ่</p>
                    <p>ตั้งค่าาการเเจ้งเตือน</p>
                </div>
                <div class="user">
                    <div class="user-title">
                        <h3>การซื้อ</h3>
                        <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" />
                    </div>
                    <p>ประวัติการซื้อ</p>
                    <p>ตะกร้าสินค้า</p>
                    <p>ที่อยุ่</p>
                    <p>ตั้งค่าาการเเจ้งเตือน</p>
                </div>
                <h3>ออกจากระบบ</h3>
            </div>
            <div id="Purchase-history-right">

                <h1>ตะกร้าสินค้า</h1>
                <div id="item-container">
                    <div v-for="(product, index) in data" :key="index" class="item">
                        <div class="line"></div>
                        <div class="items">
                            <button class="checkbox" :class="{ 'green-background': product.checkbox }"
                                @click="checkbutton(product)"></button>
                            <img src="../assets/1.png" alt="" style="width: 100px; height: 100px;">
                            <div class="item-1">
                                <p>ตะกร้าจักรสานจากใบมะพร้าว</p>
                                <p>ตัวเลือกสิ้นค้า:สีน้ำตาล</p>
                            </div>
                            <div class="item-2">
                                <p>{{ product.price.toFixed(2) + ' บาท' }}</p>
                                <div class="quantitycount">
                                    <input type="number" v-model="product.quantity" min="1">
                                </div>
                                <div class="product-line-price">{{ calculateLinePrice(product).toFixed(2) + ' บาท' }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-button">
                        <button>สั่งซื้ออีกครั้ง</button>
                        <button @click="selectAllbutton(data)">เลือกสินค้าทั้งหมด</button>
                        <button>ลบรายการสินค้า</button>
                    </div>
                </div>

                <div id="Purchase-history-pagination">
                    <button @click="backPage">prev</button>
                    <button v-for="item in Math.ceil(paginatedData / perPage)" :key="item"
                        @click="() => goToPage(item)">
                        {{ item }}
                    </button>
                    <button @click="nextPage">next</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { ref, computed, reactive } from "vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
const products = reactive([
    {
        id: 1,
        title: 'ตะกร้าจักรสานจากใบมะพร้าว',
        description: 'ตัวเลือกสิ้นค้า:สีน้ำตาล',
        checkbox: false,
        price: 12.99,
        quantity: 1,
        image: 'https://s.cdpn.io/3/dingo-dog-bones.jpg',
    },
    {
        id: 2,
        title: 'ตะกร้าจักรสานจากใบมะพร้าว',
        description: 'ตัวเลือกสิ้นค้า:สีน้ำตาล',
        checkbox: false,
        price: 45.99,
        quantity: 1,
        image: 'https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png',
    },
    {
        id: 3,
        title: 'ตะกร้าจักรสานจากใบมะพร้าว',
        description: 'ตัวเลือกสิ้นค้า:สีน้ำตาล',
        checkbox: false,
        price: 46.99,
        quantity: 1,
        image: 'https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png',
    },
    {
        id: 4,
        title: 'ตะกร้าจักรสานจากใบมะพร้าว',
        description: 'ตัวเลือกสิ้นค้า:สีน้ำตาล',
        checkbox: false,
        price: 17.99,
        quantity: 1,
        image: 'https://s.cdpn.io/3/dingo-dog-bones.jpg',
    },
    {
        id: 5,
        title: 'ตะกร้าจักรสานจากใบมะพร้าว',
        description: 'ตัวเลือกสิ้นค้า:สีน้ำตาล',
        checkbox: false,
        price: 48.99,
        quantity: 1,
        image: 'https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png',
    },
    {
        id: 6,
        title: 'ตะกร้าจักรสานจากใบมะพร้าว',
        description: 'ตัวเลือกสิ้นค้า:สีน้ำตาล',
        checkbox: false,
        price: 35.99,
        quantity: 1,
        image: 'https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png',
    },
]);
export default {

    setup() {
        let page = ref(1);

        const perPage = 3;

        const data = computed(() => {
            const slicedData = products.slice((page.value - 1) * perPage, page.value * perPage);
            // console.log(slicedData); // เพิ่มบรรทัดนี้
            return slicedData;
        });
        // const data = Array.from(Array(24).keys()).map((item) => {
        //     return { index: item, value: `this_${item}` };
        // });

        const paginatedData = computed(() => {
            const nemberpage = products.length;
            return nemberpage;
        }
        );
        // console.log(data);
        const nextPage = () => {
            if (page.value !== Math.ceil(products.length / perPage)) {
                page.value += 1;
            }
        };

        const backPage = () => {
            if (page.value !== 1) {
                page.value -= 1;
            }
        };

        // const goToPage = (numPage) => {
        //     page.value = numPage;
        // };
        const goToPage = (numPage) => {
            page.value = numPage;
        };

        return { data, perPage, paginatedData, page, nextPage, backPage, goToPage };
    },
    components: {
        FontAwesomeIcon,
    }, data() {
        return {

        };
    }, methods: {
        calculateLinePrice(product) {
            return product.price * product.quantity;
        },
        // checkbutton(product) {
        //     product.checkbox = !product.checkbox
        //     console.log(product)
        // }
        checkbutton(product) {
            product.checkbox = !product.checkbox;
            console.log(product);
        }, selectAllbutton(Allbutton) {
            Allbutton.forEach(product => {
                product.checkbox = !product.checkbox;
            });
        }
    },

};

</script>
<style scoped>
#Purchase-history-container {
    width: 1200px;
    height: 600px;
    background-color: rgb(255, 255, 255);
    display: flex;
}



#Purchase-history-right {
    padding: 20px;
}

.items {
    display: flex;
    gap: 10px;

}

.item-2 {
    display: flex;
    gap: 70px;
    margin-left: 70px;
}

.checkbox {
    width: 30px;
    height: 30px;
}

.line {
    width: 900px;
    height: 2px;
    background-color: rgb(179, 172, 172);
    margin: 20px 0 10px 0;
}

.item-button {
    display: flex;
    width: 900px;
    justify-content: flex-end;
}

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.user-title {
    display: flex;
    gap: 20px;
}

.user {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

#Purchase-history-left {
    width: 250px;
    height: 600px;
    background-color: #D4D3D3;
    padding: 15px 25px 15px 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item-button :first-child {
    width: 122px;
    height: 41px;
    background: #FF9C9C;
    border-width: 1px;
    border-color: #ca7474;
}

.item-button :nth-child(2) {
    width: 140px;
    height: 41px;
    background: #CEC3C3;
    border-width: 1px;
    border-color: #9e9292;
}

.item-button :nth-child(3) {
    width: 152px;
    height: 41px;
    background: #CEC3C3;
    border-width: 1px;
    border-color: #9e9292;
}

#Purchase-history-pagination {
    display: flex;
    margin-top: 40px;
    gap: 5px;
    width: 900px;
    justify-content: flex-end;
}

#Purchase-history-pagination button {
    width: auto;
    padding: 0px 10px 5px 10px;
    height: 20px;


}

.quantitycount {
    display: flex;

}

.quantitycount input {
    font-size: 22px;
    height: 30px;
    width: 55px;
    text-align: center;

}

.green-background {
    background-color: green;
    /* สีพื้นหลังที่คุณต้องการเมื่อ isActive เป็น true */
}

.quantitycount button {
    width: 30px;
    font-size: 20px;
    height: 30px;
}

.icon {
    font-size: 30px;

}
</style>