<template>
  <div class="dishes" v-if="isContentLoaded">
    <div v-if="dishes.length">
      <h1>My dishes</h1>

      <md-table v-model="dishes" md-card @md-selected="onSelect">
        <md-table-toolbar>
          <h2 class="md-title">There is your dishes collection, sum of kcal: {{ dailyCalories }}kcal</h2>
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
          <md-table-cell md-label="OwnerName" md-sort-by="userName">
            {{ item.ownerName }}
          </md-table-cell>
          <md-table-cell md-label="Foods" md-sort-by="foods">
            <md-list>
              <md-list-item v-for="food in item.foods" :key="food._id">
                <div class="md-list-item-text">
                  <span>{{ food.name }}</span>
                  <span>{{ food.kCalories }}kcal</span>
                </div>
              </md-list-item>
            </md-list>
          </md-table-cell>
        </md-table-row>
      </md-table>

      <md-button class="md-primary md-raised" @click="showDialog = true">
        Add dish
      </md-button>
    </div>

    <md-empty-state
      v-if="!dishes.length"
      md-icon="restaurant"
      md-label="Create your first dish"
      md-description="Creating dishes, you'll be able to control your daily caloric portions, and get more precision information in calculator page."
    >
      <md-button @click="showDialog = true" class="md-primary md-raised">Create first dish</md-button>
    </md-empty-state>

    <md-dialog :md-active.sync="showDialog">
      <AddDish
        v-bind:showDialog="showDialog"
        v-bind:dish="dish"
        @closeAddDialog="closeAddDialog()"
        @onAdd="onAdd()"
      />
    </md-dialog>

    <md-snackbar
      md-position="left"
      :md-duration="3000"
      :md-active.sync="showAddSnackbar"
      md-persistent
    >
      <span>Dish added</span>
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

  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    background-color: transparent;
  }
</style>

<script>
  import CalculatorService from '@/services/CalculatorService'
  import AddDish from '@/components/AddDish';
  import { getDailyCalories } from '../helper';

  export default {
    name: 'Dishes',
    components: {
      'AddDish': AddDish,
    },
    data () {
      return {
        selected: [],
        dishes: [],
        showDialog: false,
        showAddSnackbar: false,
        dish: {
          name: '',
          foodIds: [],
        },
        dailyCalories: 0,
        isContentLoaded: false,
      };
    },
    mounted () {
      this.getDishes();
    },
    methods: {
      async getDishes() {
        const response = await CalculatorService.fetchDishes();
        this.dishes = response.data.dishes;
        this.dailyCalories = getDailyCalories(this.dishes);
        this.isContentLoaded = true;
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
      async getUser() {
        return await CalculatorService.fetchUser();
      },
      async onAdd() {
        const user = await this.getUser();
        this.dish.ownerId = user.data.user._id;
        this.closeAddDialog();

        const response = await CalculatorService.addDishes(this.dish);
        if (response.data.success) {
          this.showAddSnackbar = true;
          await this.getDishes();
        }
      },
      async onRemove() {
        const foodIds = {
          foodIds: this.selected.map(food => food._id),
        };

        this.selected = [];
        const response = await CalculatorService.removeDishes(foodIds);
        if (response.data.success) {
          this.showAddSnackbar = true;
          await this.getDishes();
        }
      },
    },
  };
</script>
