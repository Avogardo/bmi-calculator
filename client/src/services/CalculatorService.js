import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('/');
  },
  login () {
    return Api().get('/auth/google');
  },
  fetchUser () {
    return Api().get('/user');
  },
}
