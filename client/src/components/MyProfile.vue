<template>
  <div class="posts">
    <h1>Login</h1>
    My profile

    <md-button class="md-raised md-primary" @click="onClick">Primary</md-button>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import CalculatorService from '@/services/CalculatorService'
  export default {
    name: 'MyProfile',
    methods: {
      async onClick () {
        const user = await CalculatorService.fetchUser();
        console.log(user.data);
      },
    },
  }
</script>
