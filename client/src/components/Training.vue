<template>
  <div>
    <md-card v-if="isContentLoaded">
      <md-card-header>
        <div class="md-title">Trainings</div>
      </md-card-header>

      <md-card-content>
        Here you can add your today burned calories from training
      </md-card-content>

      <md-card-content v-if="!trainings.length">
        <md-empty-state
          md-icon="fitness_center"
          md-label="Create your first training"
          md-description="Creating trainings, you'll be able to see your stats and more precise forecasts of your weight."
        >
          <md-field>
            <label>Calories</label>
            <md-input v-model="trainingsCalories" type="number"></md-input>
          </md-field>
          <md-button @click="onAdd()" class="md-primary md-raised">Create first training</md-button>
        </md-empty-state>
      </md-card-content>
      <md-card-content v-if="trainings.length">
         training
      </md-card-content>

      <md-card-actions v-if="trainings.length">
        <md-field>
          <label>Calories</label>
          <md-input v-model="trainingsCalories" type="number"></md-input>
        </md-field>
        <md-button @click="onAdd()">Save</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar
      md-position="left"
      :md-duration="3000"
      :md-active.sync="showAddSnackbar"
      md-persistent
    >
      <span>Training added</span>
    </md-snackbar>
  </div>
</template>

<script>
  import CalculatorService from '@/services/CalculatorService';

  export default {
    name: "Training",
    data() {
      return {
        trainingsCalories: 0,
        trainings: [],
        showAddSnackbar: false,
        isContentLoaded: false,
      };
    },
    mounted() {
      this.getTrainings();
    },
    methods: {
      async getTrainings() {
        const response = await CalculatorService.fetchTrainings();
        this.trainings = response.data.trainings;
        this.isContentLoaded = true;
      },
      async onAdd() {
        const user = await CalculatorService.fetchUser();
        const userId = user.data.user._id;
        const newTraining = {
          trainingsCalories: this.trainingsCalories,
          userId,
        };

        const response = await CalculatorService.addTraining(newTraining);
        if (response.data.success) {
          this.showAddSnackbar = true;
          await this.getTrainings();
        }
      },
    },
  };
</script>
