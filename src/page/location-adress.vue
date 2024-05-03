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
            <div id="location-right">
                <h1>ที่อยู่</h1>
                <div id="form">
                    <form action="">
                        <div class="row">
                            <div class="row-item">
                                <label for="">ชื่อ-นามสกุล</label>
                                <input type="text">
                            </div>
                            <div class="row-item">
                                <label for="">เขต/อำเภอ</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="row-item">
                                <label for="">รหัสไปรษณย์</label>
                                <input type="text">
                            </div>
                            <div class="row-item">
                                <label for="">จังหวัด</label>
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="row-item">
                                <label for="">บ้านเลขที่,ซอย,หมู่,
                                    ถนน,แขวง/ตำบล</label>
                                <input type="text">
                            </div>
                        </div>
                    </form>

                </div>
                <mapAdress></mapAdress>
                <div id="location-button">
                    <button>บันทึก</button>
                    <button>เเก้ไข</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import mapAdress from '../components/map-adress.vue';
library.add(fas);

export default {
    components: {
        FontAwesomeIcon,
        mapAdress
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

#location-button button {
    padding: 7px 10px 7px 10px;
    font-size: 17px;
}

#Purchase-history-left {
    width: 250px;
    height: 700px;
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
    font-size: 30px;

}

#location-right {
    padding: 20px;
    width: 1000px;
    height: 700px;
    display: flex;
    flex-direction: column;
}
</style>