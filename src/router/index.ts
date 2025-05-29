import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import RolePage from '@/views/RolePage.vue';
import ChatListPage from '@/views/ChatListPage.vue';
import ChatPage from '@/views/ChatPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/roles'
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: 'roles',
        component: RolePage,
      },
      {
        path: 'chats',
        component: ChatListPage,
      },
      {
        path: 'chats/:id',
        component: ChatPage,
      },
      {
        path: 'profile/:id',
        component: ProfilePage,
      },
      {
        path: 'customer',
        redirect: '/customer/deliveries'
      },
      {
        path: 'customer/deliveries',
        component: () => import('@/views/DeliveryListPage.vue')
      },
      {
        path: 'customer/deliveries/:id',
        component: () => import('@/views/DeliveryPage.vue')
      },
      {
        path: 'customer/deliveries/create',
        component: () => import('@/views/DeliveryCreatePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router