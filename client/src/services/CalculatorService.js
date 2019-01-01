import api from '@/services/Api'

export default {
  fetchPosts() {
    return api.foodApi().get('/');
  },
  addFood(params) {
    return api.foodApi().post('food', params);
  },
  removeFood(params) {
    console.log(params);
    return api.foodApi().post('/food/remove', params);
  },
  login() {
    return api.userApi().get('/auth/google');
  },
  fetchUser() {
    return api.userApi().get('/user');
  },
}
