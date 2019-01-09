<template>
  <div class="page-container">
    <md-app class="app-wrapper">
      <md-app-toolbar class="md-primary">
        <span class="md-title">BMI calculator</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <router-link v-bind:to="{ name: 'Login' }">
            <md-list-item>
              <md-icon>move_to_inbox</md-icon>
              <span class="md-list-item-text">Login</span>
            </md-list-item>
          </router-link>

          <router-link v-bind:to="{ name: 'Food' }">
            <md-list-item>
              <md-icon>send</md-icon>
                <span class="md-list-item-text">Food</span>
            </md-list-item>
          </router-link>

          <router-link v-bind:to="{ name: 'Dishes' }">
            <md-list-item>
              <md-icon>send</md-icon>
              <span class="md-list-item-text">My dishes</span>
            </md-list-item>
          </router-link>

          <router-link v-bind:to="{ name: 'Calculator' }">
            <md-list-item>
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Calculator</span>
            </md-list-item>
          </router-link>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Charts</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .app-wrapper {
    height: 100vh;
  }
</style>

<script>
  export default {
    name: 'MainLayout',
  }
</script>
