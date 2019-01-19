import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Food from '@/components/Food';
import Dishes from '@/components/Dishes';
import Calculator from '@/components/Calculator';
import MyProfile from '@/components/MyProfile';
import Charts from '@/components/Charts';
import Training from '@/components/Training';
import { loggedUser } from '../helper';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    }, {
      path: '/food',
      name: 'Food',
      component: Food,
    }, {
      path: '/dishes',
      name: 'Dishes',
      component: Dishes,
      meta: { needGuard: true },
    }, {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator,
      meta: { needGuard: true },
    }, {
      path: '/my-profile',
      name: 'MyProfile',
      component: MyProfile,
      meta: { needGuard: true },
    }, {
      path: '/charts',
      name: 'Charts',
      component: Charts,
      meta: { needGuard: true },
    }, {
      path: '/training',
      name: 'Training',
      component: Training,
      meta: { needGuard: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.needGuard)) {
    if (loggedUser.loggedUser) {
      next();
    } else {
      router.push('/');
    }
  } else {
    next();
  }
});

export default router;
