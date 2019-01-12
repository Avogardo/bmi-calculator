import api from '@/services/Api'

export default {
  fetchPosts() {
    return api.foodApi().get('/');
  },
  addFood(params) {
    return api.foodApi().post('food', params);
  },
  removeFood(params) {
    return api.foodApi().post('/food/remove', params);
  },
  fetchDishes() {
    return api.userApi().get('dishes');
  },
  addDishes(params) {
    return api.foodApi().post('dishes', params);
  },
  removeDishes(params) {
    return api.foodApi().put('/dishes/remove', params);
  },
  login() {
    return api.userApi().get('/auth/google');
  },
  fetchUser() {
    return api.userApi().get('/user');
  },
  updateUser(params) {
    return api.foodApi().put('/user', params);
  },
}
