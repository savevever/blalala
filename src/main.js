import { createApp } from 'vue';
import App from './App.vue';
// import router from '../src/routers/router';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import headerCompornet from '../src/components/Header-component.vue';
import CategoryComponent from './components/homepage/Category-component.vue';
import footerComponent from '../src/components/Footer-component.vue';
import JwPagination from 'jw-vue-pagination';

library.add(fas, faGoogle);
const app = createApp(App).use(router);
// app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component("headerCompornet", headerCompornet);
app.component('CategoryComponent', CategoryComponent);
app.component('footerComponent', footerComponent);
app.component('JwPagination', JwPagination);
app.use(router);
app.mount('#app');
