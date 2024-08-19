<template>
    <ul id="menu-form">
        <li class="form1">ข้อมูลร้านค้า</li>
        <li class="form2">ยืนยันตัวตน</li>
        <li class="form3">ข้อมูลเพิ่มเติม</li>
        <li class="form4">ส่งแบบฟอร์ม</li>
    </ul>

    <div id="form4">
        <div class="formbox">
            <label class="section">ยืนยันสำเร็จแล้ว</label>
        </div>
        <div class="formbox">
            <label class="start">เริ่มต้นขายของกันเลย</label>
        </div>
        <router-link to="/selling/StartSelling">
            <button type="button" class="btn" @click="redirectToSellingPage">
                เริ่มเลย
            </button>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {

    },
    methods: {
        redirectToSellingPage() {
            this.$router.push("/selling/StartSelling");
        },
    }
}
</script>

<style scoped>
#menu-form {
    padding: 15px;
    list-style-type: none;
    overflow: hidden;
    justify-content: space-around;
    display: flex;
    color: #a9a9a9;
}

.form1,
.form2,
.form3,
.form4 {
    color: red;
}

/* .red-text {
    color: red;
} */

#form4 {
    margin: auto;
    width: 80%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}

.formbox {
    margin: 2% auto;
}

.section {
    padding-right: 10px;
    margin: 0.5% auto;
}

.btn {
    padding: 7px;
    width: 100px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0.2, 0.3);
    cursor: pointer;
    border: none;
    background-color: #b99470;
    color: white;
    margin: 1.5% auto;
}

.btn:hover {
    background-color: #eccbaa;
    color: black;
}

.section {
    font-family: "Times New Roman", Times, serif;
    font-size: 15px;
    margin-bottom: 10px;
}

.start {
    font-size: 15px;
}
</style>

