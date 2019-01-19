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
    return api.foodApi().post('/dishes/remove', params);
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
  fetchTrainings() {
    return api.foodApi().get('/trainings');
  },
  addTraining(params) {
    return api.foodApi().post('trainings/create', params);
  },
  removeTraining(params) {
    return api.foodApi().delete('/trainings/remove', params);
  },
}
