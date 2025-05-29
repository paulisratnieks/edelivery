<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
		<ion-tab-button tab="chat" href="/chats">
          <ion-icon aria-hidden="true" :icon="chatboxOutline" />
          <ion-label>Chat</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="deliveries" href="/customer/deliveries">
          <ion-icon aria-hidden="true" :icon="cubeOutline" />
          <ion-label>Deliveries</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" @click="onClickProfile">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {ellipse, person, cubeOutline, chatbox, chatboxOutline, personOutline} from 'ionicons/icons';
import {useAuthStore} from '@/stores/auth-store';
import router from '@/router';

const authStore = useAuthStore();

const onClickProfile = () => {
	router.push({path: '/profile/' + authStore.user.id});
};
</script>
