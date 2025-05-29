<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>Create Delivery</ion-title>
				<ion-buttons slot="end">
					<ion-button
						@click="saveDelivery"
						:disabled="!isFormValid"
						fill="clear"
					>
						Save
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<div class="form-container">
				<ion-card class="delivery-form-card">
					<ion-card-header>
						<ion-card-title class="form-title">
							Delivery Information
						</ion-card-title>
					</ion-card-header>
					<ion-card-content>
						<div class="form-group">
							<ion-item>
								<ion-icon :icon="locationOutline" slot="start" class="form-icon" />
								<ion-input
									v-model="delivery.fromLocation"
									label="From Location"
									label-placement="stacked"
									placeholder="Enter pickup location"
									:class="{ 'ion-invalid': !delivery.fromLocation && showErrors }"
								/>
							</ion-item>
						</div>

						<!-- To Location -->
						<div class="form-group">
							<ion-item>
								<ion-icon :icon="locationOutline" slot="start" class="form-icon" />
								<ion-input
									v-model="delivery.toLocation"
									label="To Location"
									label-placement="stacked"
									placeholder="Enter delivery location"
									:class="{ 'ion-invalid': !delivery.toLocation && showErrors }"
								/>
							</ion-item>
						</div>

						<!-- Package Type -->
						<div class="form-group">
							<ion-item lines="none">
								<ion-icon :icon="cubeOutline" slot="start" class="form-icon" />
								<ion-label>
									<h3>Package Type</h3>
								</ion-label>
							</ion-item>

							<ion-radio-group v-model="delivery.type" class="package-type-group">
								<div class="radio-options">
									<ion-item
										v-for="packageType in packageTypes"
										:key="packageType.value"
										class="radio-item"
									>
										<ion-radio
											:value="packageType.value"
											slot="start"
											:class="{ 'radio-invalid': !delivery.type && showErrors }"
										/>
										<ion-label class="radio-label">
											<div class="package-option">
												<ion-icon :icon="packageType.icon" class="package-icon" />
												<div class="package-info">
													<h4>{{ packageType.label }}</h4>
													<p>{{ packageType.description }}</p>
												</div>
											</div>
										</ion-label>
									</ion-item>
								</div>
							</ion-radio-group>
						</div>

						<!-- ETA -->
						<div class="form-group">
							<ion-item lines="none">
								<ion-icon :icon="timeOutline" slot="start" class="form-icon" />
								<ion-label>
									<h3>Delivery Time</h3>
								</ion-label>
							</ion-item>

							<div class="eta-options">
								<ion-segment v-model="etaOption" @ion-change="handleEtaOptionChange">
									<ion-segment-button value="asap">
										<ion-label>ASAP</ion-label>
									</ion-segment-button>
									<ion-segment-button value="scheduled">
										<ion-label>Schedule</ion-label>
									</ion-segment-button>
								</ion-segment>
							</div>

							<div v-if="etaOption === 'asap'" class="asap-info">
								<ion-item lines="none">
									<ion-icon :icon="flashOutline" slot="start" class="asap-icon" />
									<ion-label>
										<p>Delivery will be dispatched immediately</p>
										<p class="eta-display">Estimated: <span>{{ asapEtaDisplay }}</span></p>
									</ion-label>
								</ion-item>
							</div>

							<div v-if="etaOption === 'scheduled'" class="scheduled-time">
								<ion-item>
									<ion-datetime-button datetime="eta-datetime">
										<ion-label>Select Date & Time</ion-label>
									</ion-datetime-button>
								</ion-item>
								<ion-modal :keep-contents-mounted="true">
									<ion-datetime
										id="eta-datetime"
										v-model="delivery.eta"
										presentation="date-time"
										:min="minDateTime"
									/>
								</ion-modal>
							</div>
						</div>
					</ion-card-content>
				</ion-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonButton,
	IonTitle,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonInput,
	IonDatetime,
	IonDatetimeButton,
	IonModal,
	IonLabel,
	IonIcon,
	IonSegment,
	IonSegmentButton,
	IonRadioGroup,
	IonRadio,
	alertController
} from '@ionic/vue';
import {
	locationOutline,
	timeOutline,
	flashOutline,
	cubeOutline,
	fastFoodOutline,
	medicalOutline,
	bedOutline
} from 'ionicons/icons';
import router from "@/router/index.ts";
import {useDeliveryStore} from "@/stores/delivery-store.ts";

// Package types configuration
const packageTypes = [
	{
		value: 'parcel',
		label: 'Small Parcel',
		description: 'Books, accessories, small items',
		icon: cubeOutline
	},
	{
		value: 'food',
		label: 'Food & Beverages',
		description: 'Restaurant orders, groceries',
		icon: fastFoodOutline
	},
	{
		value: 'flowers',
		label: 'Flowers',
		description: 'Flowers, bouquets',
		icon: medicalOutline
	},
	{
		value: 'other',
		label: 'Other',
		description: 'Larger packages, furniture',
		icon: bedOutline
	},
];

// Reactive data
const delivery = ref({
	id: '',
	destination: '',
	fromLocation: '',
	toLocation: '',
	type: '',
	courier: '',
	cost: null,
	eta: new Date().toISOString(),
	status: 'Processing',
});

const showErrors = ref(false);
const etaOption = ref('asap');

// Computed properties
const isFormValid = computed(() => {
	return delivery.value.fromLocation &&
		delivery.value.toLocation &&
		delivery.value.type;
});

const minDateTime = computed(() => {
	return new Date().toISOString();
});

const asapEtaDisplay = computed(() => {
	const asapTime = new Date();
	asapTime.setMinutes(asapTime.getMinutes() + 30); // 30 minutes from now
	return asapTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

// Methods

const saveDelivery = async () => {
	if (!isFormValid.value) {
		showErrors.value = true;
		const alert = await alertController.create({
			header: 'Missing Information',
			message: 'Please fill in all required fields including package type.',
			buttons: ['OK']
		});
		await alert.present();
		return;
	}

	try {
		// Here you would typically send the data to your API
		delivery.value.id = ([
			...useDeliveryStore().ongoingDeliveries,
			...useDeliveryStore().previousDeliveries
		].sort((a, b) => a.id - b.id).reverse().at(0).id) + 1;
		delivery.value.destination = delivery.value.type.charAt(0).toUpperCase()
			+ delivery.value.type.slice(1) + ' to ' + delivery.value.toLocation;

		const date = new Date(delivery.value.eta);
		console.log(delivery.value.eta)
		delivery.value.eta = date.toLocaleString('en-GB', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
		const alert = await alertController.create({
			header: 'Success',
			message: 'Delivery created successfully!',
			buttons: ['OK']
		});
		await alert.present();
		useDeliveryStore().ongoingDeliveries.push(delivery.value);

		router.replace({path: '/customer/deliveries/' + delivery.value.id})

		// Reset form or navigate back
		// router.back() or emit event to parent

	} catch (error) {
		console.error('Error saving delivery:', error);
		const alert = await alertController.create({
			header: 'Error',
			message: 'Failed to create delivery. Please try again.',
			buttons: ['OK']
		});
		await alert.present();
	}
};

// Format ETA for display

const handleEtaOptionChange = (event) => {
	const selectedOption = event.detail.value;
	console.log(selectedOption);
	if (selectedOption === 'asap') {
		// Set ETA to 30 minutes from now for ASAP delivery
		const asapTime = new Date();
		asapTime.setMinutes(asapTime.getMinutes() + 30);
		delivery.value.eta = asapTime.toISOString();
	} else {
		// Set ETA to 2 hours from now for scheduled delivery
		const scheduledTime = new Date();
		scheduledTime.setHours(scheduledTime.getHours() + 2);
		delivery.value.eta = scheduledTime.toISOString();
	}
};


onMounted(() => {
	// Set default ETA to 2 hours from now
	const asapTime = new Date();
	asapTime.setMinutes(asapTime.getMinutes() + 30);
	delivery.value.eta = asapTime.toISOString();
});
</script>

<style scoped>
.form-container {
	padding: 16px;
}

.delivery-form-card {
	margin: 0;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
	color: var(--ion-color-dark);
	font-size: 1.4rem;
	font-weight: 600;
	margin: 0;
}

.form-group {
	margin-bottom: 16px;
}

.form-group:last-of-type {
	margin-bottom: 0;
}

.form-icon {
	color: var(--ion-color-medium);
	font-size: 20px;
	margin-right: 8px;
}

ion-item {
	--background: transparent;
	--border-color: var(--ion-color-light-shade);
	--border-style: solid;
	--border-width: 0 0 1px 0;
	--padding-start: 0;
	--inner-padding-end: 0;
}

ion-input,
ion-select {
	--padding-start: 8px;
}

ion-input.ion-invalid,
ion-select.ion-invalid {
	--border-color: var(--ion-color-danger);
}

.status-preview {
	margin-top: 16px;
	display: flex;
	justify-content: flex-end;
}

.status-badge {
	font-size: 0.85rem;
	font-weight: 500;
	padding: 6px 12px;
}

.eta-options {
	margin: 12px 16px;
}

.asap-info {
	margin: 8px 0;
}

.asap-icon {
	font-size: 20px;
}

.eta-display span {
	font-weight: 700;
}

.scheduled-time {
	margin: 8px 0;
}

ion-segment {
	--background: var(--ion-color-light);
}

ion-segment-button {
	--color: var(--ion-color-medium);
	--color-checked: var(--ion-color-primary);
	--indicator-color: var(--ion-color-primary);
}

/* Package Type Styles */
.package-type-group {
	margin: 8px 0;
}

.radio-options {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 0 16px;
}

.radio-item {
	--background: var(--ion-color-light);
	--border-radius: 8px;
	--padding-start: 12px;
	--padding-end: 12px;
	--min-height: 60px;
	margin: 0;
	border-radius: 8px;
	transition: all 0.2s ease;
}

.radio-item:hover {
	--background: var(--ion-color-light-tint);
}

.package-option {
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
}

.package-icon {
	font-size: 24px;
	color: var(--ion-color-primary);
	min-width: 24px;
}

.package-info {
	flex: 1;
}

.package-info h4 {
	margin: 0 0 4px 0;
	font-size: 1rem;
	font-weight: 600;
	color: var(--ion-color-dark);
}

.package-info p {
	margin: 0;
	font-size: 0.85rem;
	color: var(--ion-color-medium);
	line-height: 1.3;
}

.radio-label {
	margin: 0;
	width: 100%;
}

ion-radio {
	--color: var(--ion-color-primary);
	--color-checked: var(--ion-color-primary);
	margin-right: 8px;
}

.radio-invalid {
	--color: var(--ion-color-danger);
	--color-checked: var(--ion-color-danger);
}
</style>