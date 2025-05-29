<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Messages</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<!-- Active Chats Section -->
			<div class="section-container">
				<ion-card
					v-for="chat in activeChats"
					:key="chat.id"
					class="chat-card active"
					@click="onClickChat(chat.id)"
				>
					<ion-card-header class="card-headerino">
						<div class="chat-header">
							<ion-avatar class="chat-avatar">
								<ion-icon @click.stop="onClickUser(chat.authorId)" :icon="personCircleOutline" class="default-avatar-icon" />
							</ion-avatar>
							<div class="chat-info">
								<ion-card-title>{{ chat.name }}</ion-card-title>
								<ion-card-subtitle>{{ chat.authorType }}</ion-card-subtitle>
							</div>
							<div class="chat-meta">
								<span class="last-message-time">{{ chat.lastMessageTime }}</span>
								<ion-badge
									v-if="chat.unreadCount > 0"
									color="danger"
									class="unread-badge"
								>
									{{ chat.unreadCount }}
								</ion-badge>
							</div>
						</div>
					</ion-card-header>
					<ion-card-content>
						<div class="chat-details">
							<div class="info-row">
								<ion-icon :icon="chatbubbleOutline" class="info-icon"></ion-icon>
								<span class="info-text last-message">{{ chat.lastMessage }}</span>
							</div>
							<div class="status-container">
								<ion-badge
									v-if="chat.isOnline"
									color="success"
									class="online-badge"
								>
									Online
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
import {computed, ref} from 'vue';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonIcon,
	IonBadge,
	IonAvatar
} from '@ionic/vue';
import {
	chatbubbleOutline,
	locationOutline,
	calendarOutline,
	timeOutline, personCircleOutline
} from 'ionicons/icons';
import router from '@/router';
import {usePersonStore} from '@/stores/person-store';
import {useChatStore} from '@/stores/chat-store';

const personStore = usePersonStore();
const chatStore = useChatStore();

const activeChats = computed(() => {
	return chatStore.chats.map((chat) => {
		const user = personStore.users.find((user) => user.id === chat.author)!;

		return {
			id: chat.id,
			name: user.name,
			isOnline: chat.isOnline,
			authorId: chat.author,
			lastMessageTime: chat.lastActivity,
			lastMessage: chat.messages[0].message,
			authorType: user.type,
			unreadCount: chat.unreadCount,
		};
	});
});

// // Sample data for active chats
// const activeChats = ref<Chat[]>([
// 	{
// 		id: '1',
// 		name: 'Sarah Johnson',
// 		role: 'Customer',
// 		avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
// 		lastMessage: 'Thanks! I\'ll be waiting downstairs.',
// 		lastMessageTime: '2 min ago',
// 		unreadCount: 2,
// 		orderId: 'ORD-12345',
// 		deliveryLocation: '123 Main St, Downtown',
// 		deliveryStatus: 'En Route',
// 		isOnline: true
// 	},
// 	{
// 		id: '2',
// 		name: 'Mike Chen',
// 		role: 'Courier',
// 		avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
// 		lastMessage: 'Package delivered successfully!',
// 		lastMessageTime: '15 min ago',
// 		unreadCount: 0,
// 		orderId: 'ORD-12346',
// 		deliveryLocation: '456 Oak Ave, Midtown',
// 		deliveryStatus: 'Delivered',
// 		isOnline: true
// 	},
// ]);

const onClickChat = (chatId: string) => {
	router.push(`/chats/${chatId}`);
};
const onClickUser = (chatId: number) => {
	router.push(`/profile/${chatId}`);
};
</script>

<style scoped>
.section-container {
	padding: 16px;
}

.section-title {
	color: var(--ion-color-dark);
	font-size: 1.2rem;
	font-weight: 600;
	margin: 0 0 12px 0;
	padding-left: 4px;
}

.chat-card {
	margin-bottom: 12px;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chat-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.chat-card.active {
	border-left: 4px solid var(--ion-color-primary);
}

.chat-card.recent {
	opacity: 0.8;
}

.chat-header {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 0;
}

.chat-avatar {
	width: 48px;
	height: 48px;
	flex-shrink: 0;
}

.chat-info {
	flex: 1;
	min-width: 0;
}

.chat-info ion-card-title {
	font-size: 1rem;
	font-weight: 600;
	margin: 0;
	color: var(--ion-color-dark);
}

.chat-info ion-card-subtitle {
	font-size: 0.85rem;
	color: var(--ion-color-medium);
	margin: 2px 0 0 0;
}

.chat-meta {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 4px;
}

.last-message-time {
	font-size: 0.75rem;
	color: var(--ion-color-medium);
}

.unread-badge {
	font-size: 0.7rem;
	min-width: 18px;
	height: 18px;
	border-radius: 9px;
}

.chat-details {
	margin-top: 8px;
}

.info-row {
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	gap: 8px;
}

.info-icon {
	color: var(--ion-color-medium);
	font-size: 1rem;
	flex-shrink: 0;
}

.info-text {
	font-size: 0.9rem;
	color: var(--ion-color-dark);
	flex: 1;
}

.last-message {
	color: var(--ion-color-medium-shade);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.status-container {
	display: flex;
	gap: 8px;
	margin-top: 8px;
	flex-wrap: wrap;
}

.status-badge {
	font-size: 0.75rem;
	padding: 4px 8px;
}

.online-badge {
	font-size: 0.7rem;
	padding: 2px 6px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.chat-header {
	}

	.chat-avatar {
		width: 40px;
		height: 40px;
	}

	.info-text {
		font-size: bold;
	}
}

.default-avatar-icon {
	font-size: 40px;
	color: var(--ion-color-medium);
	width: 100%;
	height: 100%;
}
.card-headerino {
	padding-bottom: 8px;
}
</style>