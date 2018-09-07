import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Work from './views/Work.vue'
import Project from './views/Project.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'

Vue.use(Router)

let siteTitle = 'Ramkumar Shankar'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
      meta: {title: siteTitle + ' - Home'}
    },
    {
      path: '/work',
      name: 'work',
      component: Work,
      meta: {title: siteTitle + ' - Work'}
    },
    {
      path: '/work/:slug',
      name: 'project',
      component: Project
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {title: siteTitle + ' - About'}
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {title: siteTitle + ' - Contact'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
