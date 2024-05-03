<template>
  <div id="container">
    <nav>
      <div class="routers">
        <router-link to="/" class="router-link"><span>หน้าหลัก</span></router-link>
        <router-link to="/startSell" class="router-link"><span>เริ่มขายของ</span></router-link>
        <router-link to="/Setting" class="router-link"><span>การตั้งค่า</span></router-link>
        <router-link to="/login" class="router-link"><span>เข้าสู่ระบบ</span></router-link>
        <router-link to="/register" class="router-link"><span>สมัครลงทะเบียน</span></router-link>
      </div>

    </nav>
    <div id="header">
      <div id="menu">
        <router-link to="/" class="router-link">
          <h1>balala Shop</h1>
        </router-link>
      </div>
      <div id="serach">
        <input type="text" /> <!-- ช่องใส่ข้อความ -->
        <div class="Searchbutton">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" id="SearchIcon" /><!-- ไอคอน  -->
        </div>
        <font-awesome-icon :icon="['fas', 'cart-shopping']" id="cartIcon" />
      </div>
    </div>
    <router-view />
  </div>

</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCartShopping);

export default {
  components: {
    FontAwesomeIcon,
  },

};
</script>

<style scoped>
#header {
  background-image: linear-gradient(#ee4d2d, #ff7337);
  width: 100vw;
  height: 50px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-end;
  padding: 23px 30rem 23px 60px;
  /* top right botton left */
}

#menu {
  display: flex;
  overflow: hidden;
}

nav {
  background-color: #ee4d2d;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-right: 26rem;
}

.routers {
  display: flex;
  /* margin-right: 12rem; */
  gap: 3rem;
}

.router-link {
  color: #ffffff;
  text-decoration: none;
}

router-view {
  width: 1300px;
}

.Searchbutton {
  width: 38px;
  height: 37px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

#SearchIcon {
  color: #ffffff;
}

#menu router-view {
  width: 144px;
  height: 45px;
  color: #fff;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-right: 2.2rem;
}

#menu h1 {
  width: 360px;
  height: 68px;
  color: #fff;
  font-family: Holtwood One SC;
  font-size: 45px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}

#serach {
  display: flex;
}

#serach input {
  width: 570px;
  height: 31px;
}

#cartIcon {
  width: 38px;
  height: 37px;
  margin-left: 20px;
  color: #ffffff;
}

/* ----------------------container---------------- */
/* ------------------------------------------ */
#container {
  width: 100vw;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>