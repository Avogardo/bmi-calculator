<template>
  <div>
    <md-dialog-title>Preferences</md-dialog-title>

    <md-field
      v-for="(property, index) in Object.keys(userSetting)"
      v-bind:key="Object.keys(userSetting)[index]"
    >
      <label>Type your {{ property }}...</label>
      <md-input v-model="userSetting[property]" :type="typeof property"></md-input>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeAddDialog')">Close</md-button>
      <md-button class="md-primary" @click="$emit('onSave')">Save</md-button>
    </md-dialog-actions>
  </div>
</template>

<script>
  export default {
    name: "UserSettings",
    props: ['userSetting'],
  }
</script>
