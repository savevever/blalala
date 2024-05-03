<template>
    <div class="container">
        <CategoryComponent></CategoryComponent>
        <productsrecommend></productsrecommend>
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import productsrecommend from "../components/homepage/Product-reccomment.vue";
export default {
    name: "App",
    components: {
        productsrecommend,
    },
};
</script>
<style></style>