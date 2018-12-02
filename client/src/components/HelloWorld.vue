<template>
  <div class="posts">
    <h1>BMI calculator</h1>
    This is a home page.

    <button @click="onClick">show user</button>
    <a href="http://localhost:8081/auth/logout">Log out</a>
    <a href="http://localhost:8081/auth/google">Google+</a>

    <h2>Example response from server:</h2>
    <div v-for="post in posts">
      <p>
        <span><b>{{ post.title }}</b></span><br />
        <span>{{ post.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import CalculatorService from '@/services/CalculatorService'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        posts: [],
      }
    },
    mounted () {
      this.getPosts();
    },
    methods: {
      async getPosts () {
        const response = await CalculatorService.fetchPosts();
        this.posts = response.data;
      },
      async onClick () {
        const user = await CalculatorService.fetchUser();
        console.log(user.data);
      }
    },
  }
</script>
