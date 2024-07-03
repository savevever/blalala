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
    width: 1300px;
    flex-direction: column;
    align-items: center;
}

#storeContainer {
    width: 1285px;
    height: 114px;
    border-radius: 35px;
    background: #FFF;
    margin: 20px 0 20px 0;
    display: flex;
    padding: 10px;
}

#storeRight {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
}

#storeLeft {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
}

#storeRight p {
    font-size: 18px;
}

#storeLeftIMG img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-right: 15px;
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
    gap: 0.3rem; 
}

#storeLeftTXT button {
    display: flex;
    align-items: center;
    justify-content: center;
}
#storeLeftTXT p{
   margin: 0;
}

#storeLeftButton {
    display: flex;
    gap: 0.5rem;
}


#storeLeftButton button:first-child {
    background-color: #73FF67;
    border: 0.5px solid #398b32;
}

#storeLeftButton button:nth-child(2) {
    background-color: #67F6FF;
    border: 0.5px solid #33898f;
}

#storeLeftButton button:nth-child(3) {
    background-color: #FF9E67;
    border: 0.5px solid #7e492a;
    width: 80px;
}

.font-awesome {
    width: 13px;
    height: 18px;
    margin-right: 5px;
}
</style>