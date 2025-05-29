<template v-if="person">
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>Profile Details</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content v-if="person !== undefined">
			<div class="detail-container">
				<ion-card class="profile-detail-card" :class="{active: person?.status === 'Active'}">
					<ion-card-header>
						<div class="profile-header">
							<ion-avatar class="profile-avatar">
								<img v-if="person.avatar" :src="person.avatar" :alt="person.name" />
								<ion-icon v-else :icon="personCircleOutline" class="default-avatar-icon" />
							</ion-avatar>
							<ion-card-title class="person-name">
								{{ person.name }}
							</ion-card-title>
						</div>
					</ion-card-header>
					<ion-card-content>
						<div class="detail-row">
							<ion-icon :icon="mailOutline" class="detail-icon" />
							<span class="detail-label">Email:</span>
							<span class="detail-text">{{ person.email }}</span>
						</div>
						<div class="detail-row">
							<ion-icon :icon="callOutline" class="detail-icon" />
							<span class="detail-label">Phone:</span>
							<span class="detail-text">{{ person.phone }}</span>
						</div>
						<div class="detail-row">
							<ion-icon :icon="calendarOutline" class="detail-icon" />
							<span class="detail-label">Joined:</span>
							<span class="detail-text">{{ person.joinedAt }}</span>
						</div>
						<div class="status-row">
							<ion-badge :color="getStatusColor(person.status)" class="status-badge">
								{{ person.status }}
							</ion-badge>
						</div>
						<ion-button v-if="Number(route.params.id) !== authStore.user.id"
							expand="block"
							size="large"
							@click="onClickChat"
						>
							Chat
						</ion-button>
					</ion-card-content>
				</ion-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {computed} from 'vue';
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
	IonCardContent,
	IonIcon,
	IonBadge,
	IonAvatar, IonButton
} from '@ionic/vue';
import {
	mailOutline,
	callOutline,
	calendarOutline,
	personCircleOutline
} from 'ionicons/icons';
import {usePersonStore} from "@/stores/person-store.ts";
import {useRoute} from "vue-router";
import {useChatStore} from "@/stores/chat-store.ts";
import router from "@/router/index.ts";
import {useAuthStore} from "@/stores/auth-store.ts";

// Reactive data
const usersStore = usePersonStore();
const route = useRoute();
const chatStore = useChatStore();
const authStore = useAuthStore();

const person = computed(() => {
	return usersStore.users.find((user) => user.id === Number(route.params.id));
})

const chatId = computed(() => {
	return chatStore.chats.find(c => c.author === Number(route.params.id)).id;
});

const onClickChat = () => {
	router.push({path: '/chats/' + chatId.value})
};

// Methods
const getStatusColor = (status) => {
	switch (status) {
		case 'Active':
			return 'success';
		case 'Inactive':
			return 'medium';
		case 'Pending':
			return 'warning';
		case 'Suspended':
			return 'danger';
		default:
			return 'medium';
	}
};
</script>

<style scoped>
.detail-container {
	padding: 16px;
}

.profile-detail-card {
	margin: 0;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-detail-card.active {
	border-left: 4px solid var(--ion-color-success);
}

.profile-header {
	display: flex;
	align-items: center;
	gap: 16px;
}

.profile-avatar {
	width: 60px;
	height: 60px;
}

.person-name {
	color: var(--ion-color-dark);
	font-size: 1.4rem;
	font-weight: 600;
	margin: 0;
}

.detail-row {
	display: flex;
	align-items: center;
	margin-bottom: 12px;
	gap: 12px;
}

.detail-icon {
	color: var(--ion-color-medium);
	font-size: 20px;
	min-width: 20px;
}

.detail-label {
	font-weight: 500;
	color: var(--ion-color-medium-shade);
	min-width: 80px;
}

.detail-text {
	color: var(--ion-color-dark);
	flex: 1;
}

.status-row {
	margin-top: 16px;
	display: flex;
	justify-content: flex-end;
}

.status-badge {
	font-size: 0.85rem;
	font-weight: 500;
	padding: 6px 12px;
}
.default-avatar-icon {
	font-size: 40px;
	color: var(--ion-color-medium);
	width: 100%;
	height: 100%;
}
</style>