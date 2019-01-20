<template>
  <div class="posts" v-if="isContentLoaded">
    <md-card v-if="user.gender && user.height && user.weight && user.neededDailyCal">
      <md-card-header>
        <div class="md-subhead">Summary</div>
      </md-card-header>

      <md-card-content>
        Forecast assistance
        <line-chart :chart-data="lineDataCollection" :options="options" :height="100"></line-chart>
        <bar-chart :chart-data="barDataCollection" :options="options" :height="100"></bar-chart>
        <doughnut-chart :chart-data="doughnutDataCollection" :height="100"></doughnut-chart>
      </md-card-content>
    </md-card>

    <md-card v-if="!(user.gender && user.height && user.weight && user.neededDailyCal)">
      <md-empty-state
        md-icon="person"
        md-label="Update your profile first"
        md-description="Updating your profile, you'll be able to get access to forecast assistance and observing your stats like weight or daily caloric demand">
        <md-button @click="goToUserProfile()" class="md-primary md-raised">Go to my profile settings</md-button>
      </md-empty-state>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import CalculatorService from '@/services/CalculatorService';
  import router from '../router';
  import getCalculateNeededDailyCal, {
    getNextDate,
    getDailyCalories,
    getBurnedCalories,
  } from '../helper';
  import LineChart from '../charts/line-chart';
  import BarChart from '../charts/bar-chart';
  import DoughnutChart from '../charts/doughnut-chart';

  export default {
    name: 'Charts',
    components: { LineChart, BarChart, DoughnutChart },
    data: () => ({
      user: {
        age: 0,
        gender: '',
        height: 0,
        weight: 0,
        neededDailyCal: 0,
      },
      neededDailyCal: 0,
      lineDataCollection:  {},
      barDataCollection:  {},
      doughnutDataCollection:  {},
      isContentLoaded: false,
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          }],
        }},
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        const dishes = await CalculatorService.fetchDishes();
        const trainingsData = await CalculatorService.fetchTodayTrainings();

        const { trainings } = trainingsData.data;
        this.user = user.data.user;
        this.neededDailyCal = getCalculateNeededDailyCal(this.user);
        this.generateCharts(this.user, dishes.data.dishes, trainings);
        this.isContentLoaded = true;
      },
      generateCharts({ weight, neededDailyCal }, dishes, trainings) {
        const labels = [];
        const data = [];
        const multiplier = Math.floor((getCalculateNeededDailyCal(this.user) - neededDailyCal) / 500); // 1kg every 500kcal
        for (let i = 0; i < 6; i++) {
          labels.push(getNextDate(i * 7));
          data.push(weight - multiplier * i);
        }

        this.lineDataCollection = {
          labels,
          datasets: [{
            label: 'Weight',
            backgroundColor: '#fc7976',
            borderColor: '#fc6a68',
            data,
          }],
        };

        const barData = [
          getCalculateNeededDailyCal(this.user),
          neededDailyCal,
          getDailyCalories(dishes),
          getBurnedCalories(trainings),
        ];
        this.barDataCollection = {
          labels: ['Counted demand', 'Typed demand', 'Your dishes calories', 'Burned calories'],
          datasets: [{
            label: 'Daily caloric demand',
            backgroundColor: ['#ffCC6A', '#00d8ff', '#e11c01', '#6200ee'],
            borderColor: '#ffbe55',
            data: barData,
          }],
        };

        const doughnutData = [
          Math.round(weight / 1.5 * 10) / 10,
          Math.round(weight / 4 * 10) / 10,
          Math.round(weight / 1.25 * 10) / 10,
        ];
        this.doughnutDataCollection = {
          labels: ['Protein', 'Carbohydrates', 'Fats'],
          datasets: [{
            label: 'Daily nutritional values',
            backgroundColor: ['#35b982', '#00d8ff', '#e11c01'],
            data: doughnutData,
          }],
        };
      },
      goToUserProfile() {
        router.push('/my-profile');
      },
    },
  };
</script>
