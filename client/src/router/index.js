import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Food from '@/components/Food';
import Dishes from '@/components/Dishes';

Vue.use(Router);

export default new Router({
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
    },
  ],
});
