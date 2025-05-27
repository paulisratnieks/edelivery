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
			<div class="section-container">
				<h2 class="section-title">Ongoing Deliveries</h2>

				<ion-card
					v-for="delivery in ongoingDeliveries"
					:key="delivery.id"
					class="delivery-card ongoing"
				>
					<ion-card-header>
						<ion-card-title>{{ delivery.destination }}</ion-card-title>
						<ion-card-subtitle>Order #{{ delivery.orderId }}</ion-card-subtitle>
					</ion-card-header>

					<ion-card-content>
						<div class="delivery-info">
							<div class="info-row">
								<ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
								<span class="info-text">{{ delivery.currentLocation }}</span>
							</div>

							<div class="info-row">
								<ion-icon :icon="timeOutline" class="info-icon"></ion-icon>
								<span class="info-text">ETA: {{ delivery.eta }}</span>
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
					v-for="delivery in previousDeliveries"
					:key="delivery.id"
					class="delivery-card previous"
				>
					<ion-card-header>
						<ion-card-title>{{ delivery.destination }}</ion-card-title>
						<ion-card-subtitle>Order #{{ delivery.orderId }}</ion-card-subtitle>
					</ion-card-header>

					<ion-card-content>
						<div class="delivery-info">
							<div class="info-row">
								<ion-icon :icon="locationOutline" class="info-icon"></ion-icon>
								<span class="info-text">{{ delivery.deliveredTo }}</span>
							</div>

							<div class="info-row">
								<ion-icon :icon="calendarOutline" class="info-icon"></ion-icon>
								<span class="info-text">Delivered: {{ delivery.deliveryDate }}</span>
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
import { locationOutline, timeOutline, calendarOutline } from 'ionicons/icons';
import { ref } from 'vue';

// Sample data for ongoing deliveries
const ongoingDeliveries = ref([
	{
		id: 1,
		orderId: 'D2024001',
		destination: '123 Main Street, New York',
		currentLocation: 'Distribution Center - Brooklyn',
		eta: '2:30 PM',
		status: 'In Transit'
	},
	{
		id: 2,
		orderId: 'D2024002',
		destination: '456 Oak Avenue, Manhattan',
		currentLocation: 'Out for Delivery',
		eta: '4:15 PM',
		status: 'Out for Delivery'
	},
	{
		id: 3,
		orderId: 'D2024003',
		destination: '789 Pine Road, Queens',
		currentLocation: 'Sorting Facility',
		eta: '6:00 PM',
		status: 'Processing'
	}
]);

// Sample data for previous deliveries
const previousDeliveries = ref([
	{
		id: 4,
		orderId: 'D2024004',
		destination: '321 Elm Street, Bronx',
		deliveredTo: '321 Elm Street, Bronx',
		deliveryDate: 'May 25, 2025',
		status: 'Delivered'
	},
	{
		id: 5,
		orderId: 'D2024005',
		destination: '654 Maple Drive, Staten Island',
		deliveredTo: '654 Maple Drive, Staten Island',
		deliveryDate: 'May 24, 2025',
		status: 'Delivered'
	},
	{
		id: 6,
		orderId: 'D2024006',
		destination: '987 Cedar Lane, Brooklyn',
		deliveredTo: '987 Cedar Lane, Brooklyn',
		deliveryDate: 'May 23, 2025',
		status: 'Delivered'
	}
]);

const getStatusColor = (status: string) => {
	switch (status) {
		case 'In Transit':
			return 'primary';
		case 'Out for Delivery':
			return 'warning';
		case 'Processing':
			return 'medium';
		default:
			return 'medium';
	}
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
	opacity: 0.8;
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
</style>