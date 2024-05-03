<template>
    <div class="container">
        <div id="storeContainer">
            <div id="storeLeft">
                <div id="storeLeftIMG">
                    <img src="../../assets/1.png" alt="">
                </div>
                <div id="storeLeftTXT">
                    <p id="namestore">Magic Babe</p>
                    <p>Active 4 นาที ที่ผ่านมา</p>
                    <div id="storeLeftButton">
                        <button><font-awesome-icon :icon="['fas', 'plus']" class="font-awesome" />
                            <p>ติดตาม</p>
                        </button>
                        <button><font-awesome-icon :icon="['fas', 'comment']" class="font-awesome" />
                            <p>เเชด</p>
                        </button>
                        <button><font-awesome-icon :icon="['fas', 'house']" class="font-awesome" />
                            <p>หน้าร้าน</p>
                        </button>
                    </div>

                </div>
            </div>
            <div id="line"></div>
            <div id="storeRight">
                <p>คะแนน: 51.9พัน</p>
                <p>รายการสินค้า: 199</p>
                <p>เวลาในการตอบกลับ: ภายในไม่กี่ชั่วโมง</p>
                <p>เข้าร่วมเมื่อ: 24เดือนที่ผ่านมา</p>
                <p>ผู้ติดตาม: 37.1พันคน</p>
            </div>
        </div>
    </div>

</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faComment, faHouse } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faComment, faHouse);
export default {
    components: {
        FontAwesomeIcon,
    },
};
</script>
<style>
.container {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}

#storeContainer {
    width: 1300px;
    height: 164px;
    border-radius: 35px;
    background: #FFF;
    margin: 0 0 20px 0;
    display: flex;
    padding: 10px;
}

#storeRight {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
}

#storeLeft {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
}

#storeRight p {
    font-size: 20px;
}

#storeLeftIMG img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-right: 20px;
}

#line {
    width: 3px;
    height: 100px;
    background-color: rgb(116, 111, 111);
    margin-right: 40px;
}

#namestore {
    font-size: 29px;
}

#storeLeftTXT {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#storeLeftTXT button {
    display: flex;
    align-items: center;
    justify-content: center;
}

#storeLeftButton {
    display: flex;
    gap: 10px;
}

#storeLeftButton button {
    padding: 3px;
}

#storeLeftButton button:first-child {
    background-color: #73FF67;
}

#storeLeftButton button:nth-child(2) {
    background-color: #67F6FF;
}

#storeLeftButton button:nth-child(3) {
    background-color: #FF9E67;
}

.font-awesome {
    width: 15px;
    height: 20px;
}
</style>