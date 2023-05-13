import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { Router } from "./utils/routes";
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';
import 'quasar/dist/quasar.css';
import App from './App.vue';
import { createPinia } from 'pinia';
const myApp = createApp(App);
myApp.use(Quasar, {
    plugins: {},
}).use(Router()).use(createPinia());
myApp.mount('#app');
