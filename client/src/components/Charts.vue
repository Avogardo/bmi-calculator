<template>
  <div class="posts">
    <md-card>
      <md-card-header>
        <div class="md-subhead">Summary</div>
      </md-card-header>

      <md-card-content>
        Forecast assistance
      </md-card-content>

    </md-card>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import CalculatorService from '@/services/CalculatorService';

  export default {
    name: 'Charts',
    data() {
      return {
        user: {
          age: 0,
          gender: '',
          height: 0,
          weight: 0,
          neededDailyCal: 0,
        },
      };
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        this.user = user.data.user;
        console.log(this.user);
      },
    },
  }
</script>
