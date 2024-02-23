/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { createHead } from "@unhead/vue"; //head meta manager module

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
const head = createHead(); //head meta manager instance
// app.use(head);

registerPlugins(app);

// app.mount("#app");

// import { createApp } from 'vue';
// import './style.css';
// import DefaultApp from './App.vue';

// const app = createApp(DefaultApp);

app.mount("#app");
