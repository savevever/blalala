<template>
    <div id="Purchase-history-left">
        <div class="user">
            <div class="user-title" @click="toggleVisibility">
                <h3>การซื้อ</h3>
                <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" />
            </div>
            <p v-show="isVisible"><router-link to="/users/PurchaseHistory" class="custom-link">ประวัติการซื้อ</router-link></p>
            <p v-show="isVisible"><router-link to="/users/cart" class="custom-link">ตะกร้าสินค้า</router-link></p>
            <p v-show="isVisible"><router-link to="/users/locationAdress" class="custom-link">ที่อยู่</router-link></p>
            <p v-show="isVisible"><router-link to="/users/setting" class="custom-link">ตั้งค่าการแจ้งเตือน</router-link>
            </p>

        </div>
        <div class="user">
            <div class="user-title" @click="toggleVisibility2">
                <h3>การซื้อ</h3>
                <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" />
            </div>
            <p v-show="isVisible"><router-link to="/users/Business" class="custom-link">ดูผลประกอบการ</router-link></p>
            <p v-show="isVisible"><router-link to="/users/Center" class="custom-link">ตะกร้าสินค้า</router-link></p>
            <p v-show="isVisible"><router-link to="/users/Center" class="custom-link">ที่อยู่</router-link></p>
            <p v-show="isVisible"><router-link to="/users/Center" class="custom-link">ตั้งค่าการแจ้งเตือน</router-link>
            </p>
        </div>
        <h2 @click="logout">ออกจากระบบ</h2>
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
    }, data() {
        return {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            isVisible: true,
            isVisible2: true,
        };
    }, methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        toggleVisibility2() {
            this.isVisible2 = !this.isVisible2;
        }, gotoPage(page) {
            this.currentPage = page;
        },
        checkbutton(checkboxName) {
            this[checkboxName] = !this[checkboxName];
        }, logout() {
            localStorage.removeItem('isLoggedIn');
            this.isLoggedIn = false;
            window.location.href = 'http://localhost:8080/';
        }
    }
}

</script>
<style scoped>
#Purchase-history-left {
    min-width: 205px;
    height: 100%;
    background-color: #ebe3d5;
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

.icon {
    font-size: 30px;
    color: #000000;
}

p,
h3,
h2 {
    cursor: pointer;
}

.custom-link {
    text-decoration: none;
    color: #000;
}
</style>