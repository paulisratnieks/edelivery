import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useAuthStore = defineStore('auth-store', () => {
	const user = ref(
		{
			id: 1,
			name: 'Paulis Ratnieks',
			email: 'paulisratnieks@edelivery.com',
			phone: '+37112341234',
		}
	);

	return {user};
});
