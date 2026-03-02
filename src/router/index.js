import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GanttView from "../views/GanttView.vue";
import SpreadsheetView from "../views/SpreadsheetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/gantt",
      name: "gantt",
      component: GanttView,
    },
    {
      path: "/spreadsheet",
      name: "spreadsheet",
      component: SpreadsheetView,
    },
  ],
})

export default router;
