import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// hardcode a global variable ( required for complex widgets )
import * as webix from "@xbs/webix-pro";
window.webix = webix;

webix.CustomScroll.init();

const app = createApp(App);
app.use(router);
app.mount("#app");
