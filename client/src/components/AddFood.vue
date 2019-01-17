<template>
  <div>
    <md-dialog-title>Preferences</md-dialog-title>

    <md-field
      v-for="(food, index) in Object.keys(foods)"
      v-bind:key="Object.keys(foods)[index]"
    >
      <label>Type your {{ food }}...</label>
      <md-input v-model="foods[food]" :type="typeof foods[food]"></md-input>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeAddDialog')">Close</md-button>
      <md-button class="md-primary" @click="$emit('onAdd')">Save</md-button>
    </md-dialog-actions>
  </div>
</template>

<script>
  export default {
    name: "AddFood",
    props: ['foods'],
  }
</script>
