<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Deliveries</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<!-- Ongoing Deliveries Section -->
			<ion-button class="new-delivery" @click="onClickNewDelivery">
				<ion-icon slot="start" :icon="add"></ion-icon>
				New Delivery
			</ion-button>
			<div class="section-container">
				<h2 class="section-title">Ongoing Deliveries</h2>

				<ion-card
					v-for="delivery in ongoing"
					:key="delivery.id"
					class="delivery-card ongoing"
					@click="onClickCard(delivery.id)"
				>
					<ion-card-header>
						<ion-card-title>{{ delivery.destination }}</ion-card-title>
					</ion-card-header>

					<ion-card-content>
						<div class="delivery-info">
							<div class="info-row">
								<ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
								<span class="info-text">{{ delivery.toLocation }}</span>
							</div>

							<div class="info-row">
								<ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
								<span class="info-text">{{ delivery.eta }}</span>
							</div>

							<div class="status-container">
								<ion-badge :color="getStatusColor(delivery.status)" class="status-badge">
									{{ delivery.status }}
								</ion-badge>
							</div>
						</div>
					</ion-card-content>
				</ion-card>
			</div>

			<!-- Previous Deliveries Section -->
			<div class="section-container">
				<h2 class="section-title">Previous Deliveries</h2>

				<ion-card
					v-for="delivery in previous"
					:key="delivery.id"
					class="delivery-card previous"
					@click="onClickCard(delivery.id)"
				>
					<ion-card-header>
						<ion-card-title>{{ delivery.destination }}</ion-card-title>
						<ion-card-subtitle>Order #{{ delivery.orderId }}</ion-card-subtitle>
					</ion-card-header>

					<ion-card-content>
						<div class="delivery-info">
							<div class="info-row">
								<ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
								<span class="info-text">{{ delivery.toLocation }}</span>
							</div>

							<div class="info-row">
								<ion-icon :icon="calendarOutline" class="info-icon"></ion-icon>
								<span class="info-text">Delivered: {{ delivery.date }}</span>
							</div>

							<div class="status-container">
								<ion-badge color="success" class="status-badge">
									Delivered
								</ion-badge>
							</div>
						</div>
					</ion-card-content>
				</ion-card>
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
	IonButtons,
	IonBackButton,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonIcon,
	IonBadge
} from '@ionic/vue';
import { locationOutline, timeOutline, calendarOutline, add } from 'ionicons/icons';
import {useDeliveryStore} from '@/stores/delivery-store';
import router from '@/router';
import {computed} from 'vue';

const deliveryStore = useDeliveryStore();

const ongoing = computed(() => {
	return deliveryStore.ongoingDeliveries.toSorted((a, b) => a.id - b.id).reverse()
})

const previous = computed(() => {
	return deliveryStore.previousDeliveries.toSorted((a, b) => a.id - b.id).reverse()
})

const getStatusColor = (status: string) => {
	switch (status) {
		case 'In Transit':
			return 'primary';
		case 'Processing':
			return 'medium';
		default:
			return 'medium';
	}
};

const onClickCard = (id: number) => {
	router.push({path: '/customer/deliveries/' + id});
};

const onClickNewDelivery = () => {
	router.push({path: '/customer/deliveries/create'});
};

</script>

<style scoped>
.section-container {
	padding: 16px;
}

.section-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 16px;
	color: var(--ion-color-dark);
}

.delivery-card {
	margin-bottom: 12px;
}

.delivery-card.ongoing {
	border-left: 4px solid var(--ion-color-primary);
}

.delivery-card.previous {
	border-left: 4px solid var(--ion-color-success);
}

.delivery-info {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.info-row {
	display: flex;
	align-items: center;
	gap: 8px;
}

.info-icon {
	font-size: 16px;
	color: var(--ion-color-medium);
	min-width: 16px;
}

.info-text {
	font-size: 14px;
	color: var(--ion-color-dark);
}

.status-container {
	margin-top: 8px;
	display: flex;
	justify-content: flex-end;
}

.status-badge {
	font-size: 12px;
	padding: 4px 8px;
}

ion-card-title {
	font-size: 16px;
	font-weight: 600;
}

ion-card-subtitle {
	font-size: 14px;
	color: var(--ion-color-medium);
}
.new-delivery {
	margin: 16px 0 0 16px;
}
</style>