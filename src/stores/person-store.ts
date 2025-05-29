import { defineStore } from 'pinia';
import {ref} from 'vue';

export const usePersonStore = defineStore('users-store', () => {
	const users = ref([
		{
			id: 1,
			type: 'Customer',
			name: 'Paulis Ratnieks',
			email: 'paulisratnieks@edelivery.com',
			phone: '+37112341234',
			joinedAt: '25.05.2025',
		},
		{
			id: 2,
			name: 'Jānis Bērziņš',
			type: 'Courier',
			email: 'janisberzins11@gmail.com',
			phone: '+37112345678',
			joinedAt: '26.05.2025',
		},
		{
			id: 3,
			name: 'Frīdrihs Canders',
			type: 'Courier',
			email: 'fridrihs.canders@edelivery.com',
			phone: '+37112345678',
			joinedAt: '27.05.2025',
		}
	]);

	return {users};
});
