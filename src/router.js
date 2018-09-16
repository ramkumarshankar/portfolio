import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Work from './views/Work.vue'
import Project from './views/Project.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/work',
      name: 'work',
      component: Work
    },
    {
      path: '/work/:slug',
      name: 'project',
      component: Project
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})

export default router
