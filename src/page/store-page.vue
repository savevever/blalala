<template>
    <div class="container">
        <div id="storeContainer">
            <div id="storeLeft">
                <div id="storeLeftIMG">
                    <router-link to="/users/storepage">
                        <img src="../assets/1.png" alt="">
                    </router-link>
                </div>
                <div id="storeLeftTXT">
                    <p id="namestore">Magic Babe</p>
                    <p>Active 4 นาที ที่ผ่านมา</p>
                    <div id="storeLeftButton">
                        <button @click="handleToggleFollow">
                            <font-awesome-icon :icon="['fas', 'plus']" class="font-awesome" />
                            <p>{{ isFollowed ? 'ติดตามแล้ว' : 'ติดตาม' }}</p>
                        </button>
                        <button>
                            <font-awesome-icon :icon="['fas', 'comment']" class="font-awesome" />
                            <p>เเชด</p>
                        </button>
                        <button>
                            <font-awesome-icon :icon="['fas', 'house']" class="font-awesome" />
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
                <p>ผู้ติดตาม: <span>{{ followerCount }}</span> คน</p>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faComment, faHouse } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faComment, faHouse);

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            followedShops: reactive(JSON.parse(localStorage.getItem('followedShops')) || {}),
            shopId: 1,
            followerCounts: reactive(JSON.parse(localStorage.getItem('followerCounts')) || { 1: 0 })
        };
    },
    computed: {
        isFollowed() {
            return !!this.followedShops[this.shopId];
        },
        followerCount() {
            return this.followerCounts[this.shopId] || 0;
        }
    },
    methods: {
        handleToggleFollow() {
            if (this.followedShops[this.shopId]) {
                delete this.followedShops[this.shopId];
                this.followerCounts[this.shopId] = Math.max(0, this.followerCounts[this.shopId] - 1);
            } else {
                this.followedShops[this.shopId] = true;
                this.followerCounts[this.shopId] = (this.followerCounts[this.shopId] || 0) + 1;
            }
            localStorage.setItem('followedShops', JSON.stringify(this.followedShops));
            localStorage.setItem('followerCounts', JSON.stringify(this.followerCounts));
        }
    }
};
</script>
<style scoped>
.container {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}

#storeContainer {
    width: 100vw;
    height: 250px;
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -70px
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
    margin-right: 5%;
}

#storeRight p {
    font-size: 21px;
}

#storeLeftIMG img {
    width: 130px;
    height: 130px;
    border-radius: 70px;
    margin-right: 15px;
}

#line {
    width: 3px;
    height: 200px;
    background-color: rgb(116, 111, 111);
    margin-right: 40px;
}

#namestore {
    font-size: 39px;
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

#storeLeftTXT p {
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
    width: 16px;
    height: 21px;
    margin-right: 5px;
}
.detailStore{
    width: 1300px;
    height: 500px;
    background-color: #ffffff;
    
}
.detailStore p{
    margin: 50px;
    font-size: 20px;
}
.detailStore h2{
    margin:50px 0 0 50px ;
}
textarea {
    margin: 50px;
    width: 93%;
    height: 330px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    resize: vertical; 
    border: none;
}
</style>