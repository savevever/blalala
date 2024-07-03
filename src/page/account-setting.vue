<template>
    <div id="container">
        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
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


export default {

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
    /* margin-bottom: 30px; */
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