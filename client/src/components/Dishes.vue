<template>
  <div class="posts">
    <h1>My dishes</h1>

    <md-table v-model="posts" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h2 class="md-title">There is your dishes collection.</h2>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button @click="onRemove()" class="md-icon-button">
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
          {{ item.name }}
        </md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">
          {{ item.description }}
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog :md-active.sync="showDialog">
      <AddDish
        v-bind:showDialog="showDialog"
        v-bind:dish="dish"
        @closeAddDialog="closeAddDialog()"
        @onAdd="onAdd()"
      />
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">
      Show Dialog
    </md-button>

    <md-snackbar
      md-position="left"
      :md-duration="3000"
      :md-active.sync="showAddSnackbar"
      md-persistent
    >
      <span>Food added</span>
    </md-snackbar>
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
  import AddDish from '@/components/AddDish';
  export default {
    name: 'Dishes',
    components: {
      'AddDish': AddDish,
    },
    data () {
      return {
        selected: [],
        posts: [],
        showDialog: false,
        showAddSnackbar: false,
        dish: {
          name: '',
          dishesIds: [],
        },
      }
    },
    mounted () {
      this.getPosts();
    },
    methods: {
      async getPosts() {
        const response = await CalculatorService.fetchDishes();
        this.posts = response.data.posts;
      },
      onSelect(items) {
        this.selected = items;
      },
      getAlternateLabel(count) {
        return `${count} food${count > 1 ? 's' : ''} selected`;
      },
      closeAddDialog() {
        this.showDialog = false;
      },
      async onAdd() {
        // this.closeAddDialog();
        // const response = await CalculatorService.addDishes(this.foods);
        // console.log(response.data);
        // if (response.data.success) {
        //   this.showAddSnackbar = true;
        //   await this.getPosts();
        // }
      },
      async onRemove() {
        const foodIds = {
          foodIds: this.selected.map(food => food._id),
        };

        this.selected = [];
        const response = await CalculatorService.removeDishes(foodIds);
        if (response.data.success) {
          this.showAddSnackbar = true;
          await this.getPosts();
        }
      },
    },
  }
</script>