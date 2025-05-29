import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ProfilePage from '../views/ProfilePage.vue';
import DeliveryCreatePage from '../views/DeliveryCreatePage.vue';
import TabsPage from '../views/TabsPage.vue'
import RolePage from '../views/RolePage.vue';
import ChatListPage from '../views/ChatListPage.vue';
import ChatPage from '../views/ChatPage.vue';
import DeliveryListPage from '@/views/DeliveryListPage.vue';
import DeliveryPage from '@/views/DeliveryPage.vue';

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
        component: DeliveryListPage,
      },
      {
        path: 'customer/deliveries/create',
        component: DeliveryCreatePage,
      },
      {
        path: 'customer/deliveries/:id',
        component: DeliveryPage,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router