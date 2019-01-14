<template>
  <div class="posts">
    <md-card>
      <md-card-header>
        <div class="md-subhead">Summary</div>
      </md-card-header>

      <md-card-content>
        Forecast assistance
        <line-chart :chart-data="dataCollection" :height="100"></line-chart>
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

  export default {
    name: 'Charts',
    components: { LineChart },
    data: () => ({
      user: {
        age: 0,
        gender: '',
        height: 0,
        weight: 0,
        neededDailyCal: 0,
      },
      neededDailyCal: 0,
      dataCollection:  {},
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

        this.dataCollection = {
          labels,
          datasets: [{
            label: "Test",
            backgroundColor: "#00CC6A",
            borderColor: "#00CC6A",
            data,
          }],
        };
      }
    },
  }
</script>
