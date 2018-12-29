<template>
  <div class="posts">
    <h1>Food</h1>

    <md-table v-model="posts" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h2 class="md-title">There is your food collection.</h2>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell md-label="Name" md-sort-by="name">
          {{ item.title }}
        </md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">
          {{ item.description }}
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-raised md-primary">Add</md-button>
  </div>
</template>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
</style>

<script>
  import CalculatorService from '@/services/CalculatorService'
  export default {
    name: 'Food',
    data () {
      return {
        selected: [],
        posts: [],
      }
    },
    mounted () {
      this.getPosts();
    },
    methods: {
      async getPosts () {
        const response = await CalculatorService.fetchPosts();
        this.posts = response.data;
      },
      async onClick () {
        const user = await CalculatorService.fetchUser();
        console.log(user.data);
      },
      onSelect (items) {
        this.selected = items;
      },
      getAlternateLabel (count) {
        let plural = '';

        if (count > 1) {
          plural = 's';
        }
        return `${count} user${plural} selected`;
      },
    },
  }
</script>
