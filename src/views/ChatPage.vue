<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/chats"></ion-back-button>
				</ion-buttons>
				<div class="chat-header-info">
					<ion-title>{{ chat?.title || 'Chat' }}</ion-title>
					<div class="online-status" v-if="chat">
						<ion-badge
							:color="chat.isOnline ? 'success' : 'medium'"
							class="status-indicator"
						>
							{{ chat.isOnline ? 'Online' : 'Offline' }}
						</ion-badge>
						<span class="last-activity">Last seen: {{ chat.lastActivity }}</span>
					</div>
				</div>
			</ion-toolbar>
		</ion-header>

		<ion-content ref="contentRef" class="chat-content">
			<div class="messages-container" v-if="chat">
				<div
					v-for="(message, index) in chat.messages.toReversed()"
					:key="index"
					class="message-wrapper"
					:class="{ 'own-message': message.author === currentUserId }"
				>
					<div class="message-bubble">
						<div class="message-text">{{ message.message }}</div>
						<div class="message-time">{{ formatTime(message.deliveredAt) }}</div>
					</div>
				</div>
			</div>

			<!-- Empty state -->
			<div v-else class="empty-state">
				<ion-icon :icon="chatbubbleOutline" class="empty-icon"></ion-icon>
				<p>Chat not found</p>
			</div>
		</ion-content>

		<ion-footer class="message-input-footer">
			<ion-toolbar>
				<div class="message-input-container">
					<ion-item class="message-input-item">
						<ion-textarea
							v-model="newMessage"
							placeholder="Type a message..."
							:rows="1"
							:auto-grow="true"
							:maxlength="500"
							@keydown.enter.prevent="handleEnterKey"
							class="message-textarea"
						></ion-textarea>
						<ion-button
							slot="end"
							fill="clear"
							@click="sendMessage"
							:disabled="!newMessage.trim()"
							class="send-button"
						>
							<ion-icon :icon="sendOutline"></ion-icon>
						</ion-button>
					</ion-item>
				</div>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonFooter,
	IonItem,
	IonTextarea,
	IonButton,
	IonIcon,
	IonBadge
} from '@ionic/vue';
import {
	chatbubbleOutline,
	sendOutline
} from 'ionicons/icons';
import { useChatStore } from '@/stores/chat-store'; // Adjust import path as needed

const route = useRoute();
const chatStore = useChatStore();
const contentRef = ref();
const newMessage = ref('');

// Get current user ID (you might get this from auth store or props)
const currentUserId = ref(1); // Assuming current user has ID 1

// Get chat ID from route params
const chatId = computed(() => parseInt(route.params.id as string));

// Find the specific chat
const chat = computed(() =>
	chatStore.chats.find(c => c.id === chatId.value)
);

// Format time display
const formatTime = (dateTimeString: string): string => {
	const [datePart, timePart] = dateTimeString.split(' ');
	const [day, month, year] = datePart.split('/');
	const [hours, minutes] = timePart.split(':');

	const messageDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());

	const diffTime = today.getTime() - messageDay.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		// Today - show time only
		return `${hours}:${minutes}`;
	} else if (diffDays === 1) {
		// Yesterday
		return `Yesterday ${hours}:${minutes}`;
	} else if (diffDays <= 7) {
		// This week - show day and time
		const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return `${dayNames[messageDate.getDay()]} ${hours}:${minutes}`;
	} else {
		// Older - show date and time
		return `${day}/${month} ${hours}:${minutes}`;
	}
};

// Send message function
const sendMessage = async () => {
	if (!newMessage.value.trim() || !chat.value) return;

	const now = new Date();
	const formattedDateTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

	// Add message to the chat
	chat.value.messages.unshift({
		deliveredAt: formattedDateTime,
		message: newMessage.value.trim(),
		author: currentUserId.value
	});

	// Update last activity
	chat.value.lastActivity = 'now';

	// Clear input
	newMessage.value = '';

	// Scroll to bottom
	await nextTick();
	scrollToBottom();
};

// Handle enter key in textarea
const handleEnterKey = (event: KeyboardEvent) => {
	if (!event.shiftKey) {
		sendMessage();
	}
};

// Scroll to bottom of messages
const scrollToBottom = () => {
	if (contentRef.value) {
		contentRef.value.$el.scrollToBottom(300);
	}
};

// Watch for new messages and scroll to bottom
watch(() => chat.value?.messages.length, () => {
	nextTick(() => {
		scrollToBottom();
	});
});

// Scroll to bottom on mount
onMounted(() => {
	nextTick(() => {
		scrollToBottom();
	});
	if (chat.value) {
		chat.value.unreadCount = 0;
	}
});
</script>

<style scoped>
.chat-header-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;
}

.chat-header-info ion-title {
	padding: 0;
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
}

.online-status {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 2px;
}

.status-indicator {
	font-size: 0.7rem;
	padding: 2px 6px;
	height: auto;
}

.last-activity {
	font-size: 0.75rem;
	color: var(--ion-color-medium);
}

.chat-content {
	background-color: var(--ion-color-light);
}

.messages-container {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	min-height: 100%;
}

.message-wrapper {
	display: flex;
	justify-content: flex-start;
}

.message-wrapper.own-message {
	justify-content: flex-end;
}

.message-bubble {
	max-width: 75%;
	background-color: var(--ion-color-light-shade);
	border-radius: 18px;
	padding: 12px 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	position: relative;
}

.own-message .message-bubble {
	background-color: var(--ion-color-primary);
	color: white;
}

.message-text {
	font-size: 0.95rem;
	line-height: 1.4;
	margin-bottom: 4px;
	word-wrap: break-word;
}

.message-time {
	font-size: 0.75rem;
	opacity: 0.7;
	text-align: right;
}

.own-message .message-time {
	color: rgba(255, 255, 255, 0.8);
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--ion-color-medium);
}

.empty-icon {
	font-size: 4rem;
	margin-bottom: 16px;
}

.message-input-footer {
	box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.message-input-container {
	width: 100%;
	padding: 8px 12px;
}

.message-input-item {
	--background: var(--ion-color-light);
	--border-radius: 24px;
	--padding-start: 16px;
	--padding-end: 8px;
	--inner-padding-end: 0;
	margin: 0;
}

.message-textarea {
	--padding-start: 0;
	--padding-end: 8px;
	font-size: 0.95rem;
}

.send-button {
	--color: var(--ion-color-primary);
	--padding-start: 8px;
	--padding-end: 8px;
	margin: 0;
	height: 40px;
	width: 40px;
	border-radius: 50%;
}

.send-button:not([disabled]) {
	--background: var(--ion-color-primary);
	--color: white;
}

.send-button[disabled] {
	--color: var(--ion-color-medium);
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.message-bubble {
		max-width: 85%;
	}

	.messages-container {
		padding: 12px;
		gap: 8px;
	}
}

/* Custom scrollbar for webkit browsers */
.chat-content::-webkit-scrollbar {
	width: 4px;
}

.chat-content::-webkit-scrollbar-track {
	background: transparent;
}

.chat-content::-webkit-scrollbar-thumb {
	background: var(--ion-color-medium);
	border-radius: 2px;
}
</style>