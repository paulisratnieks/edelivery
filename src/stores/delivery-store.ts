import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useDeliveryStore = defineStore('delivery-store', () => {
	const ongoingDeliveries = ref([
		{
			id: 1,
			orderId: 'D2024001',
			destination: 'Food to Brīvības 102',
			fromLocation: 'Riga, Inženieru 12',
			toLocation: 'Riga, Brīvības 102',
			eta: 'in 15 mins',
			cost: 9.23,
			courier: 'Jānis Bērziņš',
			courierId: 2,
			status: 'In Transit'
		},
		{
			id: 2,
			orderId: 'D2024003',
			destination: 'Parcel to Inženieru 1',
			fromLocation: 'Riga, Marijas 12',
			toLocation: 'Riga, Inženieru 1',
			eta: '30/05/2025 11:21',
			cost: 15.2,
			courierId: 2,
			status: 'Processing'
		}
	]);

	const previousDeliveries = ref([
		{
			id: 3,
			orderId: 'D2024003',
			destination: 'Parcel to Marijas 12',
			fromLocation: 'Riga, Inženieru 41',
			toLocation: 'Riga, Marijas 12',
			eta: '14:23',
			courier: 'Frīdrihs Canders',
			cost: 16.81,
			date: '2025.12.03',
			status: 'Delivered',
			courierId: 3,
		}
	]);

	return {ongoingDeliveries, previousDeliveries};
});
