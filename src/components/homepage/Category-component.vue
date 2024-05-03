<template>
  <div class="container">
    <div id="Category">
      <div id="Category-container">
        <div class="Category-title">
          <button @click="showCommunityButtons">
            ชุมชน
          </button>
          <button @click="showCategoryButtons">
            หมวดหมู่
          </button>
        </div>
        <div class="line"></div>
        <div id="Category-item">
          <div v-if="showButtons">
            <a v-for="button in buttons" :key="button.id">
              {{ button.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      showButtons: false,
      buttons: [],
    };
  },
  methods: {
    showCommunityButtons() {
      this.showButtons = true;
      this.buttons = [
        { id: 1, name: "ชุมชน 1" },
        { id: 2, name: "ชุมชน 2" },
        { id: 3, name: "ชุมชน 3" },
        { id: 4, name: "ชุมชน 4" },
        { id: 5, name: "ชุมชน 5" },
      ];
    },
    showCategoryButtons() {
      this.showButtons = true;
      this.buttons = [
        { id: 1, name: "หมวดหมู่ 1" },
        { id: 2, name: "หมวดหมู่ 2" },
        { id: 3, name: "หมวดหมู่ 3" },
        { id: 4, name: "หมวดหมู่ 4" },
        { id: 5, name: "หมวดหมู่ 5" },
      ];
    },
  },
  created() {
    // เริ่มต้นแสดง "ชุมชน" เมื่อคอมโพเนนต์ถูกสร้าง
    this.showCommunityButtons();
  },
};
</script>
<style scoped>
/* ------------------------------------------ */
/* ----------------------Category---------------- */
#Category {
  width: 1300px;
  margin: 50px 0 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 0 20px 0;
}

.container {
  display: flex;
  width: 100vw;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
}

.line {
  width: 1300px;
  height: 3px;
  background-color: #f5f5f5;
  margin-top: 20px;
}

.Category-title button {
  color: rgba(0, 0, 0, .54);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 40px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

#Category-item {
  margin-left: 30px;
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
}

#Category-item a {
  /* border-radius: 125.5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
  /* width: 121px;
  height: 36px; */
  margin-right: 20px;
  font-size: 17px;
  /* margin-top: 10px; */
  /* border: 0px; */
}
</style>