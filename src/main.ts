import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';
import SortingAlgorithms from './pages/sorting-algorithms.vue';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/sorting-algorithms',
      name: 'sorting-algorithms',
      component: SortingAlgorithms,
    },
  ],
});

app.use(router);

app.mount('#app');
