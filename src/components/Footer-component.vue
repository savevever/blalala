<template>
  <div id="container">
    <div id="footer">
      <h1>balala shop</h1>
      <p>
        เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นโครงการจบสำหรับนิสิตปริญญาตรีเพื่อที่จะสนับสนุนชุมชนในการขายสินค้าหรือซื้อสินค้าของชุมชนออนไลน์
      </p>
      <div id="footer-icon">
        <font-awesome-icon class="icongoogle" :icon="['fab', 'google']" />
        <font-awesome-icon class="iconfacebook" :icon="['fab', 'facebook']" />
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

library.add(faGoogle, faFacebook);

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
#container {
  height: 180px;
  display: flex;
  width: 100vw;
  background-color: #ebe3d5;
  flex-direction: column;
  align-items: center;
  /* padding-bottom: 40px; */
  margin-top: 70px;
}

#footer {
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #ebe3d5;
  padding-bottom: 1.2rem;
}

#footer-icon {
  display: flex;
  gap: 20px;
}

.icongoogle {
  width: 35px;
  height: 35px;
  color: rgb(233, 18, 18);
}

.iconfacebook {
  width: 35px;
  height: 35px;
  color: rgb(28, 53, 165);
}
</style>