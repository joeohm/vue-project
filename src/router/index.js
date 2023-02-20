import { createRouter, createWebHistory } from "vue-router";
import ListView from "../views/ListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/page/:page",
      alias: "/",
      name: "view",
      component: ListView,
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("../views/PostView.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateView.vue"),
    },
    {
      path: "/:id/edit",
      name: "edit",
      component: () => import("../views/EditView.vue"),
      props: true,
    },
  ],
});

export default router;
