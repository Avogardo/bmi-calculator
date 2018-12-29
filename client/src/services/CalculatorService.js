import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('/');
  },
  addFood (params) {
    return Api().post('food', params)
  },
  login () {
    return Api().get('/auth/google');
  },
  fetchUser () {
    return Api().get('/user');
  },
}
