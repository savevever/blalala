<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
            <div id="Purchase-history-right">
                <h1>ดูผลประกอบการ</h1>
                <div class="result">
                    <div class="items">
                        <div class="text">
                            <h3>ผลสรุปทั้งหมด</h3>
                            <p>เป็นผลสรุปที่อัปเดตทุกวันเวลาเที่ยงคืน</p>
                        </div>
                        <div class="graph-items">
                            <div class="item profit">
                                <font-awesome-icon :icon="['fas', 'coins']" class="icon"/>
                                <h4 class="card-title">ยอดขายทั้งหมด</h4>
                                <div class="card-value"><span>227,065.00</span>บาท</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                            <div class="item totallsel">
                                <font-awesome-icon :icon="['fas', 'truck-fast']" class="icon"/>
                                <h4 class="card-title">จำนวนสินค้าที่ขาย</h4>
                                <div class="card-value"><span>227,065.00</span>จำนวน</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                            <div class="item product">
                                <font-awesome-icon :icon="['fas', 'book']" class="icon"/>
                                <h4 class="card-title">จำนวนสินค้า</h4>
                                <div class="card-value"><span>227.00</span>จำนวน</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                            <div class="item comment">
                                <font-awesome-icon icon="fa-regular fa-comments" class="icon"/>
                                <h4 class="card-title">จำนวนความคิดเห็น</h4>
                                <div class="card-value"><span>227,065.00</span>จำนวน</div>
                                <!-- <a href="#" class="more-info">More info</a> -->
                            </div>
                        </div>


                    </div>
                    <div class="buttons">
                        <button class="btn" :class="{ active: activeComponent === 'top5mostSell' }"
                            @click="activeComponent = 'top5mostSell'">5สิ้นค้าขายดี</button>
                        <button class="btn" :class="{ active: activeComponent === 'proFit' }"
                            @click="activeComponent = 'proFit'">ยอดขาย</button>
                        <button class="btn" :class="{ active: activeComponent === 'totallSell' }"
                            @click="activeComponent = 'totallSell'">ยอดขาย</button>
                    </div>
                    <div class="graph">
                        <top5mostSell v-if="activeComponent === 'top5mostSell'"></top5mostSell>
                        <proFit v-if="activeComponent === 'proFit'"></proFit>
                        <totallSell v-if="activeComponent === 'totallSell'"></totallSell>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>
<script>
import proFit from '../components/graph/proFit.vue';
import top5mostSell from '../components/graph/top5mostSell.vue';
import totallSell from '../components/graph/totallSell.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins, faTruckFast, faBook, faComments } from "@fortawesome/free-solid-svg-icons";
import { faComments as faCommentsRegular } from "@fortawesome/free-regular-svg-icons";

// Add icons to the library
library.add(faCoins, faTruckFast, faBook, faComments, faCommentsRegular);
export default {

    name: "App",
    data() {
        return {
            isVisible: false,
            isVisible2: false,
            activeComponent: 'top5mostSell'
        };
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        toggleVisibility2() {
            this.isVisible2 = !this.isVisible2;
        }

    },
    components: {
        top5mostSell, totallSell, proFit,FontAwesomeIcon
    },
};
</script>
<style scoped>
#Purchase-history-container {
    width: 1200px;
    height: 700px;
    background-color: rgb(255, 255, 255);
    display: flex;
}

.item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    background-color: #ffffff;
    gap: 0.2rem;
    padding: 0.7rem;
    width: 150px;
    height: 80px;
}

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 30px; */
}

.result {
    overflow: hidden;
    display: flex;
    widows: 600px;
    flex-direction: column;
    gap: 1.3rem;
    /* background-color: #ffffff; */
}

.items {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
}

.graph-items {

    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    padding: 1rem;
}

.user-title {
    display: flex;
    gap: 20px;
    display: flex;
    align-items: center;
}

.user {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

#location-button button {
    padding: 7px 10px 7px 10px;
    font-size: 17px;
}


#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
}

.row {
    display: flex;
    gap: 40px;
    /* justify-content: flex-end; */
}

.row-item {
    display: flex;
    flex-direction: column;
}

.row-item label {
    font-size: 18px;
}

.row-item input {
    width: 360px;
    height: 30px;
}

.icon {
    font-size: 20px;

}

#Purchase-history-right {
    padding: 20px;
    width: 1000px;
    height: 690px;
    background-color: #F4F4F5;
    display: flex;
    flex-direction: column;
}

/* *********************************************************** */
.profit {
    background-color: #FFE2E6;
}

.totallsel {
    background-color: #FFF4DE;
}

.product {
    background-color: #DCFCE7;
}

.comment {
    background-color: #F4E8FF;
}

.result {
    width: 95%;
    padding: 1rem 1.3rem 1rem 1.3rem;
    height: 90%;
    display: flex;
}

/* **************** */
.graph {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
}

h4 {
    margin: 0;
}

/* **************** */
.buttons {
    display: flex;
    gap: 0.5rem;
}

.btn {
    padding: 0.4rem 0.3rem 0.4rem 0.3rem;
    cursor: pointer;
}

.buttons :first-child {
    background-color: #f7c8ce;
    border: 2px solid #f895a2;
}

.buttons :nth-child(2) {
    background-color: #f8e6c5;
    border: 2px solid #fac65d;
}

.buttons :nth-child(3) {
    background-color: #c7f3d6;
    border: 2px solid #32a55a;
}
.text{
    width: 50%;
    margin-left: 2.3rem;
}
.text h3{
    margin-bottom: 0;
}

.text p {
    color: #9c9b9b;
    margin-top: 0.3rem;
}
/* ********************** */

</style>
