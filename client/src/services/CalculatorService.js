import api from '@/services/Api'

export default {
  fetchPosts () {
    return api.foodApi().get('/');
  },
  addFood (params) {
    return api.foodApi().post('food', params)
  },
  login () {
    return api.userApi().get('/auth/google');
  },
  fetchUser () {
    return api.userApi().get('/user');
  },
}
