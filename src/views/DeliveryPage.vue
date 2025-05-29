<template v-if="delivery">
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>Delivery Details</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<div class="detail-container">
				<ion-card class="delivery-detail-card"
				          :class="{previous: delivery.status === 'Delivered'}"
				>
					<ion-card-header>
						<ion-card-title class="destination-title">
							{{ delivery.destination }}
						</ion-card-title>
					</ion-card-header>

					<ion-card-content>
						<div class="detail-row">
							<ion-icon :icon="locationOutline" class="detail-icon" />
							<span class="detail-label">From:</span>
							<span class="detail-text">{{ delivery.fromLocation }}</span>
						</div>

						<div class="detail-row">
							<ion-icon :icon="locationOutline" class="detail-icon" />
							<span class="detail-label">To:</span>
							<span class="detail-text">{{ delivery.toLocation }}</span>
						</div>

						<div class="detail-row">
							<ion-icon :icon="personCircleOutline" class="detail-icon" />
							<span class="detail-label">Courier:</span>
							<span
								class="detail-text clickable-courier"
								v-if="delivery.courier && delivery.courierId"
								@click="onClickCourier(delivery.courierId)"
							>
								{{ delivery.courier }}
							</span>
							<span class="detail-text" v-else-if="delivery.courier">{{ delivery.courier }}</span>
							<span class="detail-text" v-else>TBD</span>
						</div>

						<div class="detail-row">
							<ion-icon :icon="cashOutline" class="detail-icon" />
							<span class="detail-label">Cost:</span>
							<span class="detail-text" v-if="delivery.cost">{{ delivery.cost }} €</span>
							<span class="detail-text" v-else>TBD</span>
						</div>

						<div class="detail-row">
							<template v-if="delivery.status !== 'Delivered'">
								<ion-icon :icon="timeOutline" class="detail-icon" />
								<span class="detail-label">ETA:</span>
								<span class="detail-text" v-if="delivery.eta">{{ delivery.eta }}</span>
								<span class="detail-text" v-else>TBD</span>
							</template>
							<template v-else>
								<ion-icon :icon="calendarOutline" class="detail-icon" />
								<span class="detail-label">Delivered:</span>
								<span class="detail-text">{{ delivery.date }}</span>
							</template>
						</div>

						<div class="status-row">
							<ion-badge :color="getStatusColor(delivery.status)" class="status-badge">
								{{ delivery.status }}
							</ion-badge>
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
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonBackButton,
	IonIcon,
	IonBadge
} from '@ionic/vue';
import {
	calendarOutline,
	cashOutline,
	locationOutline,
	personCircleOutline,
	timeOutline
} from 'ionicons/icons';
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useDeliveryStore} from '@/stores/delivery-store';

const route = useRoute();
const router = useRouter();
const deliveryStore = useDeliveryStore();

// Example delivery (in practice, this can be fetched or passed via props/route)
const delivery = computed(() => {
	return [
		...deliveryStore.ongoingDeliveries,
		...deliveryStore.previousDeliveries
	].find((delivery) => delivery.id === Number(route.params.id))!;
})

const getStatusColor = (status: string) => {
	switch (status) {
		case 'In Transit':
			return 'primary';
		case 'Processing':
			return 'medium';
		case 'Delivered':
			return 'success';
		default:
			return 'medium';
	}
};

const onClickCourier = (courierId: string | number) => {
	router.push(`/profile/${courierId}`);
};
</script>

<style scoped>
.delivery-detail-card.previous {
	border-left: 4px solid var(--ion-color-success);
}

.detail-container {
	padding: 16px;
}

.delivery-detail-card {
	padding: 12px;
	border-left: 6px solid var(--ion-color-primary);
}

.destination-title {
	font-size: 22px;
	font-weight: 700;
	color: var(--ion-color-dark);
	margin-bottom: 12px;
}

.detail-row {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	margin: 12px 0;
}

.detail-label {
	font-weight: 600;
	color: var(--ion-color-medium);
	font-size: 16px;
}

.detail-text {
	font-size: 16px;
	color: var(--ion-color-dark);
}

.clickable-courier {
	color: var(--ion-color-primary) !important;
	cursor: pointer;
	text-decoration: underline;
	transition: color 0.2s ease, opacity 0.2s ease;
}

.clickable-courier:hover {
	color: var(--ion-color-primary-shade) !important;
	opacity: 0.8;
}

.clickable-courier:active {
	opacity: 0.6;
}

.detail-icon {
	font-size: 24px;
	color: var(--ion-color-medium);
	min-width: 16px;
}

.status-row {
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
}

.status-badge {
	font-size: 14px;
	padding: 6px 12px;
}
</style>