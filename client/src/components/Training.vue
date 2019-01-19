<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">Trainings</div>
      </md-card-header>

      <md-card-content>
        Here you can add your today burned calories from training
      </md-card-content>

      <md-card-actions>
        <md-field>
          <label>Calories</label>
          <md-input v-model="trainingsCalories" type="number"></md-input>
        </md-field>
        <md-button>Save</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: "Training",
    data() {
      return {
        trainingsCalories: 0,
      };
    },
  }
</script>
