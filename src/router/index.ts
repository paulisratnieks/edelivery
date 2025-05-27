import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import RolePage from '@/views/RolePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/roles'
  },
  {
    path: '/roles',
    component: RolePage,
  },
  {
    path: '/customer/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/customer/deliveries'
      },
      {
        path: 'deliveries',
        component: () => import('@/views/DeliveryListPage.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
