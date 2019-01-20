<template>
  <div class="posts">
    <h1>Login</h1>
    <h2>Systemy telemedyczne - projekt (prow. Karol Puchała)</h2>
    <p><b>Temat:</b> Aplikacja webowa ułatwiająca zdrowe odżywianie</p>
    <p>Dominika Pałka 219292</p>
    <p>Jakub Wolny 219293</p>


    <a href="http://localhost:8081/auth/logout" v-if="loggedUser">
      <md-button class="md-raised">Log out</md-button>
    </a>
    <a href="http://localhost:8081/auth/google" v-if="!loggedUser">
      <md-button class="md-raised md-primary">Continue with google</md-button>
    </a>
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
  import CalculatorService from '@/services/CalculatorService';
  import { loggedUser } from '../helper';

  export default {
    name: 'Login',
    data() {
      return {
        loggedUser,
      };
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        this.loggedUser = user.data.user;
      },
    },
  };
</script>
