<template>
  <div class="posts">
    <md-card>
      <md-card-header>
        <div class="md-subhead">Summary</div>
      </md-card-header>

      <md-card-content>
        Forecast assistance
        <line-chart :chart-data="lineDataCollection" :options="options" :height="100"></line-chart>
        <bar-chart :chart-data="barDataCollection" :options="options" :height="100"></bar-chart>
      </md-card-content>

    </md-card>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  import CalculatorService from '@/services/CalculatorService';
  import getCalculateNeededDailyCal, { getNextDate } from '../helper';
  import LineChart from '../charts/line-chart';
  import BarChart from '../charts/bar-chart';

  export default {
    name: 'Charts',
    components: { LineChart, BarChart },
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
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }}
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const user = await CalculatorService.fetchUser();
        this.user = user.data.user;
        this.neededDailyCal = getCalculateNeededDailyCal(this.user);
        console.log(this.user);
        this.generateCharts(this.user);
      },
      generateCharts({ weight, neededDailyCal }) {
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
            label: "Weight",
            backgroundColor: "#00CC6A",
            borderColor: "#00CC6A",
            data,
          }],
        };

        const barData = [getCalculateNeededDailyCal(this.user), neededDailyCal];
        this.barDataCollection = {
          labels: ['Counted demand', 'Typed demand'],
          datasets: [{
            label: "Daily caloric demand",
            backgroundColor: "#ffCC6A",
            borderColor: "#ddCC6A",
            data: barData,
          }],
        };
      }
    },
  }
</script>
