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

    <md-dialog :md-active.sync="showDialog">
      <AddFood
        v-bind:showDialog="showDialog"
        v-bind:foods="foods"
        @closeAddDialog="closeAddDialog()"
        @onAdd="onAdd()"
      />
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">
      Show Dialog
    </md-button>
  </div>
</template>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }

  .md-dialog {
    max-width: 768px;
  }
</style>

<script>
  import CalculatorService from '@/services/CalculatorService'
  import AddFood from '@/components/AddFood';
  export default {
    name: 'Food',
    components: {
      'AddFood': AddFood,
    },
    data () {
      return {
        selected: [],
        posts: [],
        showDialog: false,
        foods: {
          name: '',
          description: '',
        },
      }
    },
    mounted () {
      this.getPosts();
    },
    methods: {
      async getPosts() {
        const response = await CalculatorService.fetchPosts();
        this.posts = response.data;
      },
      onSelect(items) {
        this.selected = items;
      },
      getAlternateLabel(count) {
        let plural = '';
        if (count > 1) {
          plural = 's';
        }
        return `${count} user${plural} selected`;
      },
      closeAddDialog() {
        this.showDialog = false;
      },
      async onAdd() {
        this.closeAddDialog();
        console.log(this.foods);
        const response = await CalculatorService.addFood(this.foods);
        console.log(response);
      },
    },
  }
</script>
