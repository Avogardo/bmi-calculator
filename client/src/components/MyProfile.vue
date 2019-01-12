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
        <md-button @click="showDialog = true">Update</md-button>
        <a href="http://localhost:8081/auth/logout"><md-button>Log out</md-button></a>
      </md-card-actions>
    </md-card>

    <md-dialog :md-active.sync="showDialog">
      <UserSettings
        v-bind:showDialog="showDialog"
        v-bind:userSetting="userSetting"
        @closeAddDialog="closeAddDialog()"
        @onSave="onSave()"
      />
    </md-dialog>

    <md-snackbar
      md-position="left"
      :md-duration="3000"
      :md-active.sync="showAddSnackbar"
      md-persistent
    >
      <span>Preferences saved</span>
    </md-snackbar>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import CalculatorService from '@/services/CalculatorService';
  import UserSettings from '@/components/UserSettings';
  export default {
    name: 'MyProfile',
    components: {
      UserSettings: UserSettings,
    },
    data() {
      return {
        user: {},
        showDialog: false,
        showAddSnackbar: false,
        userSetting: {},
      }
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        this.user = user.data.user;
        const { gender, height, weight } = this.user;
        this.userSetting = {
          gender,
          height,
          weight,
        };
      },
      async onSave() {
        const userSetting = { ...this.userSetting };
        userSetting.userId = this.user._id;
        const response = await CalculatorService.updateUser(userSetting);

        if (response.data.success) {
          this.getUser();
          this.showAddSnackbar = true;
          this.closeAddDialog();
        }
      },
      closeAddDialog() {
        this.showDialog = false;
      },
    },
  }
</script>
