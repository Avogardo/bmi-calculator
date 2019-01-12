<template>
  <div class="posts">
    <md-card>
      <md-card-header>
        <md-avatar>
          <img :src="user.imageUrl" alt="Avatar">
        </md-avatar>

        <div class="md-title">{{ user.userName }}</div>
        <div class="md-subhead">Google user</div>
      </md-card-header>

      <md-card-content>
        {{user.gender && user.height && user.weight ?
            'Everything configured'
            :
            'Update your profile please'
        }}
      </md-card-content>

      <md-card-actions>
        <md-button>Update</md-button>
        <a href="http://localhost:8081/auth/logout"><md-button>Log out</md-button></a>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import CalculatorService from '@/services/CalculatorService'
  export default {
    name: 'MyProfile',
    data() {
      return {
        user: {},
      }
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        this.user = user.data.user;
        console.log(user.data.user);
      },
    },
  }
</script>
