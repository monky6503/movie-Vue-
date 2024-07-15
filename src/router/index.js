import { createRouter, createWebHistory } from 'vue-router'
import Movies from '../views/MoviesSearch.vue'
import FavoriteList from '../views/FavoriteList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: Movies,
    },
    {
      path: '/favoritelist',
      name: 'favoritelist',
      component: FavoriteList,
    },
  ],
})

export default router
