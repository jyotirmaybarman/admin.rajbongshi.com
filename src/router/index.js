import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import NotFound from '../components/NotFound.vue'
import { useAuthStore } from '../stores/auth.store'
import { useErrorStore } from '../stores/error.store'

let routes = setupLayouts(generatedRoutes)

routes = [...routes, { path: '/:pathMatch(.*)*', component: NotFound }];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, _from, savedPosition)=> {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      window.scrollTo(0, 0);
    }
  }
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  let user = authStore.getUser;
  if(!user) {
    await authStore.refreshAccessToken();
    await authStore.getLoggedInUser();
    user = authStore.getUser;
  }

  if(to.meta.auth && !user) {
    next('/auth/login')
  }else if(to.meta.auth === false && user) {
    next('/')
  }else{
    if(to.meta.roles && !to.meta.roles.includes(user.role)) {
      next()
      useErrorStore().handle({
        response:{
          status: 403
        },
      });
    }else{
      next()
    }
  }
})


export default router
