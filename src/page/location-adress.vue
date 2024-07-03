<template>
    <div id="container">

        <div id="Purchase-history-container">
            <menuComponent></menuComponent>
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
                <div id="map-container">
                    <mapAdress></mapAdress>
                </div>
                <div id="location-button">
                    <button>บันทึก</button>
                    <button>เเก้ไข</button>
                </div>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</template>
<script>

import mapAdress from '../components/map-adress.vue';

export default {
    components: {
        mapAdress
    },
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

#container {
    height: auto;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 30px; */
}



#location-button{
    margin-top: 1.5rem;
    width:900px;
    display: flex;
    gap: 1rem;
    /* justify-content: flex-end; */
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
    height: 28px;
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
    align-items: flex-start;
}
#map-container {
    width: 700px;
    display: flex;
    justify-content: flex-start;
}
</style>