import { createRouter, createWebHistory } from 'vue-router'
import {useAuth} from '@/stores/auth.js'
const LoginView = () => import( '@/views/auth/LoginView.vue');
const RegisterView = () => import( '@/views/auth/RegisterView.vue');
const HomeView = () => import('@/views/HomeView.vue');
const ForgotPasswordView = import('@/views/auth/ForgotPasswordView.vue');
const ResetPasswordView = import('@/views/auth/ResetPasswordView.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/login",
      name: "login",
      meta: { layout: "auth", auth: false },
      component: LoginView,
    },

    {
      path: "/register",
      name: "register",
      meta: { layout: "auth", auth: false },
      component: RegisterView,
    },

    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
      component: HomeView,
    },

    {
      path: "/reset-password",
      name: "reset-password",
      meta: { layout: "auth", auth: false },
      component: ForgotPasswordView,
    },

    {
      path: "/reset-password/:token",
      name: "enter-code-forgot-password",
      meta: { layout: "auth", auth: false },
      component: ResetPasswordView,
    },

  ],
})

router.beforeEach((to, from, next) => {
  const store = useAuth();

  if (!to.meta.auth && store.isAuthenticated) {
    next({ path: "/" });
  }

  if (to.meta.auth && !store.isAuthenticated) {
    next({ path: "/login", query: { message: "auth" } });
  } else {
    next();
  }
});

export default router;
