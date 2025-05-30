import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useChatStore = defineStore('chat-store', () => {
	const chats = ref([
		{
			id: 1,
			title: 'Jānis Bērziņš',
			author: 2,
			lastActivity: '2 days ago',
			isOnline: true,
			unreadCount: 1,
			messages: [
				{
					deliveredAt: '28/05/2025 11:30',
					message: 'Where are you?',
					author: 2,
				},
				{
					deliveredAt: '28/05/2025 11:13',
					message: 'I\'ll be there in 10',
					author: 1,
				},
				{
					deliveredAt: '28/05/2025 11:12',
					message: 'Hey I will be late because of traffic',
					author: 2,
				},
			]
		},
		{
			id: 2,
			title: 'Frīdrihs Canders',
			lastActivity: '3 days ago',
			isOnline: false,
			author: 3,
			unreadCount: 0,
			messages: [
				{
					deliveredAt: '27/05/2025 15:13',
					message: 'Hi! I will be late because of traffic',
					author: 3,
				},
			]
		}
	])

	return {chats};
});
