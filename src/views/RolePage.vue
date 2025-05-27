<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Select Role</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<div class="button-container">
				<p class="description-text">
					What is your role?
				</p>

				<ion-button
					expand="block"
					size="large"
					@click="onClickCustomerButton"
				>
					Customer
				</ion-button>

				<ion-button
					expand="block"
					size="large"
					@click="onClickCourierPlatform"
				>
					Courier
				</ion-button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonButtons,
	IonBackButton
} from '@ionic/vue';
import router from '@/router';

const onClickCustomerButton = () => {
	router.push({path: '/customer/'});
};

const onClickCourierPlatform = () => {
	router.push({path: '/courier/'});
};
</script>

<style scoped>

.description-text {
	font-size: 18px;
	text-align: center;
	margin-bottom: 30px;
	color: var(--ion-color-medium);
	font-weight: 500;
}

.button-container {
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
}

ion-button {
	--border-radius: 8px;
	height: 50px;
}
</style>