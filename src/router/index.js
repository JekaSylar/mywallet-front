import { createRouter, createWebHistory } from 'vue-router'
import {useAuth} from '@/stores/auth.js'
const LoginView = () => import( '@/views/auth/LoginView.vue');
const RegisterView = () => import( '@/views/auth/RegisterView.vue');
const HomeView = () => import('@/views/HomeView.vue');
const ForgotPasswordView = import('@/views/auth/ForgotPasswordView.vue');
const ResetPasswordView = import('@/views/auth/ResetPasswordView.vue')
const AccountsView = import('@/views/accounts/AccountsView.vue')
const CategoriesView = import('@/views/categories/CategoriesView.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/login",
      name: "login",
      meta: { layout: "auth", auth: false, title: 'Вхід' },
      component: LoginView,
    },

    {
      path: "/register",
      name: "register",
      meta: { layout: "auth", auth: false, title: 'Реєстрація' },
      component: RegisterView,
    },

    {
      path: "/reset-password",
      name: "reset-password",
      meta: { layout: "auth", auth: false, title: 'Відновлення паролю' },
      component: ForgotPasswordView,
    },

    {
      path: "/reset-password/:token",
      name: "enter-code-forgot-password",
      meta: { layout: "auth", auth: false, title: 'Відновлення паролю' },
      component: ResetPasswordView,
    },

    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true, title: 'Головна' },
      component: HomeView,
    },

    {
      path: "/accounts",
      name: "accounts",
      meta: { layout: "main", auth: true, title: 'Рахунки' },
      component: AccountsView,
    },
    {
      path: "/categories",
      name: "categories",
      meta: { layout: "main", auth: true, title: 'Категорії' },
      component: CategoriesView,
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - MyWallet';
  next();
});

export default router;
