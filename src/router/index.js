import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EditUser from '@/components/Edit.vue';
import AddUser from '@/components/AddUser.vue';

// import UserDetails from './components/UserDetails.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { 
    path: '/edit/:id', 
    name: 'edit-user',
    component: EditUser, 
  },
  { 
    path: '/add/:id', 
    name: 'add-user',
    component: AddUser, 
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
