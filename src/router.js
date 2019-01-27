import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true
    },
    {
      path: "/work",
      name: "work",
      component: () => import(/* webpackChunkName: "work" */ "./views/Work.vue")
    },
    {
      path: "/work/:slug",
      name: "project",
      component: () =>
        import(/* webpackChunkName: "project" */ "./views/Project.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () =>
        import(/* webpackChunkName: "contact" */ "./views/Contact.vue")
    },
    {
      path: "/preview",
      name: "preview",
      component: () =>
        import(/* webpackChunkName: "preview" */ "./views/Preview.vue")
    }
  ]
});

export default router;
