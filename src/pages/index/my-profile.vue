<template>
	<div class="dark:bg-[#222]">
		<div class="">
			<div class="mb-6 text-center">
				<div class="mx-auto w-32 h-32 mb-4 border dark:border-gray-700 rounded-full relative shadow-inset">
					<img id="image" class="object-cover w-full h-32 rounded-full" :src="getAvatar" />
				</div>

				<label for="fileInput" type="button"
					class="cursor-pointer inine-flex justify-between items-center focus:outline-none border dark:border-gray-700 py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 dark:text-gray-400 bg-white hover:bg-gray-100 dark:hover:bg-[#3f3f3f] dark:bg-[#333] font-medium">
					<svg class="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" stroke-width="2"
						stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
						<path
							d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
						<circle cx="12" cy="13" r="3" />
					</svg>
					Browse Photo
				</label>

				<input name="photo" id="fileInput" accept="image/*" class="hidden" type="file" @change="setImage" />
			</div>

			<div class="mb-6 flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
				<div class="md:w-[49%] relative">
					<label for="first_name" class="font-bold mb-1 block">First Name *</label>
					<input type="text"
						class="w-full dark:bg-[#1c1c1c] dark:border-gray-800 dark:outline-none dark:focus:outline-blue-800 border px-4 py-3 rounded font-medium"
						v-model="data.first_name" placeholder="John" :class="{
							'border !border-red-500 dark:bg-[#332929] bg-red-50':
								v$.first_name.$error,
						}" />
					<p v-if="v$.first_name.$error" class="text-sm absolute -bottom-6 text-red-400 lowercase">
						{{ v$.first_name.$errors[0].$message }}
					</p>
				</div>
				<div class="md:w-[49%] relative">
					<label for="first_name" class="font-bold mb-1 block">Last Name *</label>
					<input type="text"
						class="w-full dark:bg-[#1c1c1c] dark:border-gray-800 dark:outline-none dark:focus:outline-blue-800 border px-4 py-3 rounded font-medium"
						v-model="data.last_name" placeholder="Doe" :class="{
							'border !border-red-500 dark:bg-[#332929] bg-red-50':
								v$.last_name.$error,
						}" />
					<p v-if="v$.last_name.$error" class="text-sm absolute -bottom-6 text-red-400 lowercase">
						{{ v$.last_name.$errors[0].$message }}
					</p>
				</div>
			</div>

			<div class="mb-6 relative">
				<label for="email" class="font-bold mb-1 block">Email *</label>
				<input type="email"
					class="w-full dark:bg-[#1c1c1c] dark:border-gray-800 dark:outline-none dark:focus:outline-blue-800 border px-4 py-3 rounded font-medium"
					v-model="data.email" placeholder="john@doe.com" :class="{
						'border !border-red-500 dark:bg-[#332929] bg-red-50':
							v$.email.$error,
					}" />
				<p v-if="v$.email.$error" class="text-sm absolute -bottom-6 text-red-400 lowercase">
					{{ v$.email.$errors[0].$message }}
				</p>
			</div>

			<div class="mb-6">
				<label for="bio" class="font-bold mb-1 block">Bio</label>
				<textarea v-model="data.bio" cols="30" rows="5"
					class="w-full dark:bg-[#1c1c1c] dark:border-gray-800 dark:outline-none dark:focus:outline-blue-800 border px-4 py-3 rounded font-medium"
					placeholder="Maana apne jep se hum fakir hain, firvi yaron dil ke hum ameer hain "></textarea>
			</div>
			<button @click="updateProfile"
				class="mt-4 py-4 rounded bg-blue-700 hover:bg-blue-500 text-white w-full flex justify-center items-center"
				:disabled="loading" :class="{
					' !bg-gray-400 dark:!bg-gray-700 hover:bg-none cursor-wait': loading,
				}">
				<svg v-if="loading" role="status"
					class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black dark:fill-white"
					viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor" />
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill" />
				</svg>
				<span v-else> Update </span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth.store";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { ref, computed, reactive, onMounted } from "vue";
import { useNotification } from "../../utils/notification";

// props & emits

// variables
const loading = ref(false);
const authStore = useAuthStore();
const newImage = ref(null);
const notification = useNotification();
const data = reactive({
	first_name: "",
	last_name: "",
	email: "",
	bio: "",
	avatar: null,
});
const rules = {
	first_name: { required },
	last_name: { required },
	email: { required, email },
};
const v$ = useVuelidate(rules, data);

// computed & watchers
const user = computed(() => authStore.getUser);
const getAvatar = computed(() => {
	if (newImage.value) {
		return newImage.value;
	}
	return user.value.avatar;
});

// functions
function setImage(e) {
	newImage.value = URL.createObjectURL(e.target.files[0]);
	data.avatar = e.target.files[0];
}

function generateFormData(data) {
	const formData = new FormData();
	Object.keys(data).forEach((key) => {
		if (data[key]) {
			formData.append(key, data[key]);
		}
	});
	return formData;
}

async function updateProfile() {
	const valid = await v$.value.$validate();
	if (valid) {
		loading.value = true;
		const formData = generateFormData(data);
		let res = await authStore.updateProfile(formData);
		notification.notify({
			type: res.success ? "success" : "error",
			message: res.data.message,
		});
		loading.value = false;
	}
}

// lifecycles
onMounted(() => {
	if (user.value) {
		data.first_name = user.value.first_name;
		data.last_name = user.value.last_name;
		data.email = user.value.email;
		data.bio = user.value.bio;
	}
});
</script>

<style lang="postcss" scoped></style>
