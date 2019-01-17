import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Food from '@/components/Food';
import Dishes from '@/components/Dishes';
import Calculator from '@/components/Calculator';
import MyProfile from '@/components/MyProfile';
import Charts from '@/components/Charts';
import Training from '@/components/Training';

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
    }, {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator,
    }, {
      path: '/my-profile',
      name: 'MyProfile',
      component: MyProfile,
    }, {
      path: '/charts',
      name: 'Charts',
      component: Charts,
    }, {
      path: '/training',
      name: 'Training',
      component: Training,
    },
  ],
});
Training
