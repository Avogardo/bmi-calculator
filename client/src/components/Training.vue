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
        trainings: 0,
        showAddSnackbar: false,
      };
    },
    mounted() {
      this.getTrainings();
    },
    methods: {
      async getTrainings() {
        const response = await CalculatorService.fetchTrainings();
        this.trainings = response.data.trainings;
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
