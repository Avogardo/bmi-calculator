<template>
  <div>
    <md-dialog-title>Preferences</md-dialog-title>

    <md-field>
      <label>Type your {{ Object.keys(dish)[0] }}...</label>
      <md-input v-model="dish[Object.keys(dish)[0]]"></md-input>
    </md-field>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeAddDialog')">Close</md-button>
      <md-button class="md-primary" @click="$emit('onAdd')">Save</md-button>
    </md-dialog-actions>
  </div>
</template>

<script>
  export default {
    name: "AddDish",
    props: ['dish', 'showDialog', 'closeAddDialog'],
  }
</script>
