import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

const app = createApp(App);

// Use Vuex store
app.use(store);

// Use Vue Router
app.use(router);

// Mount the app
app.mount('#app');
