<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
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
          <md-button class="md-raised md-primary">Primary</md-button>
        </div>
      </md-app-content>
    </md-app>
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
    name: 'MainLayout',
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
