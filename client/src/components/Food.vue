<template>
  <div class="posts">
    <div v-if="isContentLoaded">
      <md-card :class="{'small-width': isAddDishMode}">
        <md-card-header v-if="!isAddDishMode">
          <div class="md-title">Foods</div>
        </md-card-header>

        <md-list class="food-header">
          <md-list-item>
            <div>Name</div>
            <div>Calories</div>
            <div>Select</div>
          </md-list-item>
        </md-list>

        <virtual-list :size="58" :remain="8" wtag="md-list">
          <md-list-item v-for="item in posts" :key="item._id">
            <div>{{ item.name }}</div>
            <div>{{ item.kCalories }}kcal</div>
            <div><md-checkbox v-model="selected" :value="item" @change="onSelect"></md-checkbox></div>
          </md-list-item>
        </virtual-list>
      </md-card>

      <md-button v-if="!isAddDishMode" class="md-primary md-raised" @click="showDialog = true">
        Add food
      </md-button>
      <md-button v-if="selected.length && !isAddDishMode" @click="onRemove()" class="md-accent">Remove</md-button>
      <md-button @click="send()">Change color</md-button>
      <md-button @click="send('blue')">blue</md-button>
      <md-button @click="send('red')">red</md-button>
    </div>

    <md-progress-spinner v-if="!isContentLoaded" md-mode="indeterminate"></md-progress-spinner>

    <md-dialog :md-active.sync="showDialog">
      <AddFood
        v-bind:showDialog="showDialog"
        v-bind:foods="foods"
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
    padding: 20px;
  }

  .md-list-item-content {
    div:first-child {
      width: 60%;
    }
  }

  .food-header {
    padding-right: 17px;
    padding-bottom: 0;
  }

  .md-list-item {
    border-bottom: 1px solid gainsboro;
  }

  .small-width {
    width: 600px;
  }
</style>

<script>
  import CalculatorService from '@/services/CalculatorService';
  import AddFood from '@/components/AddFood';
  import virtualList from 'vue-virtual-scroll-list';
  import socketIOClient from 'socket.io-client';

  export default {
    name: 'Food',
    props: ['isAddDishMode', 'dish'],
    components: {
      'AddFood': AddFood,
      'virtual-list': virtualList,
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
        isContentLoaded: false,
        endpoint: "http://localhost:8082",
        color: 'white',
      };
    },
    mounted() {
      this.getPosts();

      const socket = socketIOClient(this.endpoint);
      socket.on('change color', (color) => {
        console.log(123)
        document.querySelector('.md-toolbar').style.backgroundColor = color;
      });
    },
    methods: {
      async getPosts() {
        const response = await CalculatorService.fetchPosts();
        this.posts = response.data.posts;
        this.isContentLoaded = true;
      },
      onSelect() {
        if (this.dish && this.dish.foodIds) {
          this.dish.foodIds = this.selected.map(item => item._id);
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
      send(color = 'white') {
        const socket = socketIOClient(this.endpoint);
        socket.emit('change color', color);
      },
      setColor(color) {
        this.color = color;
      }
    },
  };
</script>
