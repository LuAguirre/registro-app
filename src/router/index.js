import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "permanentes"
  },
  {
    path: "/permanentes",
    name: "permanentes",
    component: () => import("../views/UsuariosPermanentes.vue")
  },
  {
    path: "/temporales",
    name: "temporales",
    component: () => import("../views/UsuariosTemporales.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
