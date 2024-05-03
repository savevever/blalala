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
                <h1>ประวัติการซื้อ</h1>
                <div id="item-container">
                    <div class="item">
                        <div class="line"></div>
                        <div class="items">
                            <img src="../assets/1.png" alt="" style="width: 100px; height: 100px;">
                            <div class="item-1">

                                <p>ตะกร้าจักรสานจากใบมะพร้าว</p>
                                <p>ตัวเลือกสิ้นค้า:สีน้ำตาล</p>
                            </div>
                            <div class="item-2">
                                <p>114บาท</p>
                                <p>จำนวน:1</p>
                                <p>สถานะ:จัดส่งเเล้ว</p>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="item-button">
                            <button>สั่งซื้ออีกครั้ง</button>
                            <button>ยกเลิกคำสั่งซื้อ</button>
                            <button>ดูรายละเอียดสินค้า</button>
                        </div>
                    </div>
                    <div class="item">
                        <div class="line"></div>
                        <div class="items">
                            <img src="../assets/1.png" alt="" style="width: 100px; height: 100px;">
                            <div class="item-1">

                                <p>ตะกร้าจักรสานจากใบมะพร้าว</p>
                                <p>ตัวเลือกสิ้นค้า:สีน้ำตาล</p>
                            </div>
                            <div class="item-2">
                                <p>114บาท</p>
                                <p>จำนวน:1</p>
                                <p>สถานะ:จัดส่งเเล้ว</p>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="item-button">
                            <button>สั่งซื้ออีกครั้ง</button>
                            <button>ยกเลิกคำสั่งซื้อ</button>
                            <button>ดูรายละเอียดสินค้า</button>
                        </div>

                    </div>
                </div>
                <div id="Purchase-history-pagination">
                    <button>กลับหน้าเเรก</button>
                    <button>1</button>
                    <button>2</button>
                    <button>ไปหน้าสุดท้าย</button>
                </div>
            </div>
        </div>
    </div>

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
    margin-top: 80px;
    gap: 5px;
    width: 900px;
    justify-content: flex-end;
}

#Purchase-history-pagination button {
    width: auto;
    padding: 0px 10px 5px 10px;
    height: 20px;


}

.icon {
    font-size: 30px;

}
</style>