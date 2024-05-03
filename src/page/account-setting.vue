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
                <h2>ออกจากระบบ</h2>
            </div>
            <div id="Purchase-history-right">
                <h1>ตั้งค่าการเเจ้งเตือน</h1>
                <div id="account-setting-items">
                    <div class="account-setting-item">
                        <h2>แจ้งเตือนทาง Email</h2>
                        <input type="checkbox" checked="checked">
                    </div>
                    <div class="account-setting-item">
                        <h2>แจ้งเตือนทาง SMS</h2>
                        <input type="checkbox" checked="checked">
                    </div>
                    <div class="account-setting-item">
                        <div>
                            <h2>อัพเดทสินค้าที่ลงขาย</h2>
                            <p>แจ้งเตือนเมื่อสินค้าของฉันขายหมด ถูกลบ หรือถูกระงับ</p>
                        </div>
                        <input type="checkbox" checked="checked">
                    </div>
                    <div class="account-setting-item">
                        <div>
                            <h2>อัพเดทคำสั่งซื้อ</h2>
                            <p>แจ้งเตือนเมื่อมีอัพเดทเกี่ยวกับคำสั่งซื้อและการชำระเงินถูกลบหรือถูกระงับ</p>
                        </div>
                        <input type="checkbox" checked="checked">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false
        };
    },
    methods: {
        checkbutton(checkboxName) {
            this[checkboxName] = !this[checkboxName];
        }
    }
};
</script>
<style scoped>
#Purchase-history-container {
    width: 1200px;
    height: 680px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    display: flex;
}

#Purchase-history-right {
    padding: 20px;
    height: 650px;
    /* width: 600px; */
    background-color: #ffffff;
}

#container {
    margin-top: 50px;
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.user-title {
    display: flex;
    gap: 5rem;
    align-items: center;
}

.user {
    display: flex;
    flex-direction: column;
    /* gap: 0.2rem; */
}

#Purchase-history-left {
    width: 250px;
    height: 650px;
    background-color: #D4D3D3;
    padding: 15px 25px 15px 25px;
    display: flex;
    flex-direction: column;
}

#Purchase-history-left h2 {
    margin-top: 4rem;
    color: #b61f1f;
}

#Purchase-history-left p {
    margin: 10px;
}

#item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}


.icon {
    font-size: 30px;
    color: #000000;
}

/* ****************************************** */
#account-setting-items {
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    gap: 2rem;
    width: 700px;
}

.checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

/* input:checked~.checkmark:after {
    display: block;
} */


/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

input {
    width: 30px;
    height: 30px;
}

input:checked {
    background-color: #ee4d2d;
}

.account-setting-item {
    display: flex;
    justify-content: space-between;
}

.account-setting-item button {
    width: 30px;
    height: 30px;
}

.account-setting-item p {
    color: #897F7F;
}
</style>