<template>
  <div class="posts">
    <h1>Login</h1>
    This is a home page.

    <button @click="onClick">show user</button>
    <a href="http://localhost:8081/auth/logout">Log out</a>
    <a href="http://localhost:8081/auth/google">Google+</a>

    <h2>Example response from server:</h2>
    <md-button class="md-raised md-primary">Primary</md-button>
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
    name: 'Login',
    methods: {
      async onClick () {
        const user = await CalculatorService.fetchUser();
        console.log(user.data);
      }
    },
  }
</script>
