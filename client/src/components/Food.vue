<template>
  <div class="posts">
    <h1 v-if="!isAddDishMode">Food</h1>

    <md-table v-model="posts" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h2 class="md-title">{{
          isAddDishMode ?
            'Select foods for the dish to add'
            :
            'There is your food collection.'
        }}</h2>
      </md-table-toolbar>

      <md-table-toolbar
        v-if="!isAddDishMode"
        slot="md-table-alternate-header"
        slot-scope="{ count }"
      >
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
        <md-table-cell md-label="Calories" md-sort-by="Calories">
          {{ item.kCalories }}kcal
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

    <md-button v-if="!isAddDishMode" class="md-primary md-raised" @click="showDialog = true">
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
  import CalculatorService from '@/services/CalculatorService';
  import AddFood from '@/components/AddFood';
  export default {
    name: 'Food',
    props: ['isAddDishMode', 'dish'],
    components: {
      'AddFood': AddFood,
    },
    data() {
      return {
        selected: [],
        posts: [],
        showDialog: false,
        showAddSnackbar: false,
        foods: {
          name: '',
          kCalories: 0,
        },
      }
    },
    mounted() {
      this.getPosts();
    },
    methods: {
      async getPosts() {
        const response = await CalculatorService.fetchPosts();
        this.posts = response.data.posts;
      },
      onSelect(items) {
        this.selected = items;
        if (this.dish && this.dish.foodIds) {
          this.dish.foodIds = items.map(item => item._id);
        }
      },
      getAlternateLabel(count) {
        return `${count} food${count > 1 ? 's' : ''} selected`;
      },
      closeAddDialog() {
        this.showDialog = false;
      },
      async onAdd() {
        this.closeAddDialog();
        const response = await CalculatorService.addFood(this.foods);
        if (response.data.success) {
          this.showAddSnackbar = true;
          await this.getPosts();
        }
      },
      async onRemove() {
        const foodIds = {
          foodIds: this.selected.map(food => food._id),
        };

        this.selected = [];
        const response = await CalculatorService.removeFood(foodIds);
        if (response.data.success) {
          this.showAddSnackbar = true;
          await this.getPosts();
        }
      },
    },
  }
</script>
