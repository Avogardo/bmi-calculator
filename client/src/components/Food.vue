<template>
  <div class="posts">
    <h1>Food</h1>
    <p>There is your food collection.</p>

    <div v-for="post in posts">
      <p>
        <span><b>{{ post.title }}</b></span><br />
        <span>{{ post.description }}</span>
      </p>
    </div>
    <md-button class="md-raised md-primary">Manage</md-button>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
  import CalculatorService from '@/services/CalculatorService'
  export default {
    name: 'Food',
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
