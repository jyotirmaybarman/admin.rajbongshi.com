<template>
    <div class="w-full  rounded-lg">
        <div class="flex relative max-h-[85vh] overflow-y-auto py-16 bg-white mx-auto rounded-md flex-col items-center gap-4 h-full w-[95%] lg:w-[70%]">
            <button class="btn absolute top-3 right-3" @click="emits('next','close')">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>   
            </button>
            <div class="left flex flex-col items-center w-full xl:w-[35%] ">
                <div v-if="!getImgSrc" class="w-[150px] h-[150px] rounded-full flex items-center justify-center text-white bg-black">
                    Image
                </div>
                <img v-else class="block w-[150px] h-[150px] rounded-full object-cover" :src="getImgSrc" alt="user image">
                <label v-if="props.mode != 'view'" class="inline-flex justify-center flex-col items-center w-[150px] border p-3 cursor-pointer mt-4 xl:mt-8">
                    <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">{{ 'upload' }}</span>
                    <input @change="updateFile" type='file' class="hidden" />
                </label>

            </div>


            <div class="right mt-8 xl:mt-0 w-full xl:w-[65%] xl:border p-8 rounded-lg relative">
                <form @submit.prevent>
                    <div class="flex flex-col relative">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="fname">First Name</label>
                        <div v-if="props.mode != 'view'">
                            <input v-model="data.first_name" type="text" name="firstname" id="fname" class="p-3 inline-block w-full border rounded-lg mt-2"
                            :class="{ 'border border-red-300 bg-red-100': v$.first_name.$error }"
                            >
                            <p v-if="v$.first_name.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.first_name.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.first_name }}</p>
                    </div>

                    <div class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="lname">Last Name</label>
                        <div v-if="props.mode != 'view'">
                            <input v-model="data.last_name" type="text" name="lastname" id="lname" class="p-3 inline-block w-full border rounded-lg mt-2"
                            :class="{ 'border border-red-300 bg-red-100': v$.last_name.$error }"
                            >
                            <p v-if="v$.last_name.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.last_name.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.last_name }}</p>
                    </div>

                    <div class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="email">Email</label>
                        <div v-if="props.mode != 'view'">
                            <input v-model="data.email" type="email" name="email" id="email" class="p-3 inline-block w-full border rounded-lg mt-2"
                            :class="{ 'border border-red-300 bg-red-100': v$.email.$error }"
                            >
                            <p v-if="v$.email.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.email.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.email }}</p>
                    </div>


                    <div class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="email">Role</label>
                        <div v-if="props.mode != 'view'">
                            <CustomSelect :options="roles" v-model="data.role" class="inline-block w-full border rounded-lg mt-2" />
                            <p v-if="v$.role.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.role.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.role }}</p>
                    </div>

                    <div class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="email">Status</label>
                        <div v-if="props.mode != 'view'">
                            <CustomSelect :options="status" v-model="data.status" class="inline-block w-full border rounded-lg mt-2" />
                            <p v-if="v$.status.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.status.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.status }}</p>
                    </div>


                    <div class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="email">Verified</label>
                        <div v-if="props.mode != 'view'">
                            <CustomSelect :options="[{ label: 'Yes', value: true }, { label: 'No', value: false }]" v-model="data.verified" class="inline-block w-full border rounded-lg mt-2" />
                            <p v-if="v$.verified.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.verified.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.verified }}</p>
                    </div>

                    <div class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="bio">Bio</label>
                        <div v-if="props.mode != 'view'">
                            <textarea rows="5" v-model="data.bio" name="bio" id="bio" class="p-3 inline-block w-full border rounded-lg mt-2"
                            :class="{ 'border border-red-300 bg-red-100': v$.bio.$error }"
                            ></textarea>
                            <p v-if="v$.bio.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.bio.$errors[0].$message }}</p>
                        </div>
                        <p v-else>{{ data.bio }}</p>
                    </div>


                    <div v-if="props.mode != 'view'" class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="password">password</label>
                        <div>
                            <div class="relative">
                                <input v-model="data.password" :type="showPassword ? 'text' : 'password'" name="password" id="password" class="p-3 inline-block w-full border rounded-lg mt-2"
                                :class="{ 'border border-red-300 bg-red-100': v$.password.$error }"
                                >
                                <ShowHidePassword class="absolute top-5 right-3" :visible="showPassword" v-model="showPassword" />
                            </div>
                            <p v-if="v$.password.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.password.$errors[0].$message }}</p>
                        </div>
                        <!-- <p v-else>{{ data.password }}</p> -->
                    </div>


                    <div v-if="props.mode != 'view'" class="flex flex-col relative mt-6">
                        <label class="text-black uppercase text-xs mb-1 font-bold" for="password_confirmation">password confirmation</label>
                        <div>
                            <div class="relative">
                                <input v-model="data.password_confirmation" :type="showPasswordConfirmation ? 'text' : 'password'" name="password_confirmation" id="password_confirmation" class="p-3 inline-block w-full border rounded-lg mt-2"
                                :class="{ 'border border-red-300 bg-red-100': v$.password_confirmation.$error }"
                                >
                                <ShowHidePassword class="absolute top-5 right-3" :visible="showPasswordConfirmation" v-model="showPasswordConfirmation" />
                            </div>
                            <p v-if="v$.password_confirmation.$error" class="absolute top-0 right-0 text-red-500 uppercase text-xs">{{ v$.password_confirmation.$errors[0].$message }}</p>
                        </div>
                        <!-- <p v-else>{{ data.password_confirmation }}</p> -->
                    </div>

                    <button v-if="props.mode != 'view'" :disabled="loading" @click.prevent="action" class="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-red-500 disabled:text-white disabled:cursor-not-allowed mt-8 w-full p-3 rounded-lg flex justify-center gap-4 items-center">
                        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ props.mode == 'create' ? 'create' : 'update' }}
                    </button>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
import { useMeta } from 'vue-meta';
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import { useUsersStore } from '../../stores/users.store'; 
import { useNotification } from '../../utils/notification';


// props & emits
const props = defineProps({
    data:{
        type: Object,
        default:{}
    },
    mode:{
        type:String,
        default:"create",
        validator(val){
            return ['create','view','edit'].includes(val)
        }
    }
});
const emits = defineEmits(['next']);

// variables

const { t } = useI18n();
const loading = ref(false);
const newImageSrc = ref(null);
const newImage = ref(null);
const usersStore = useUsersStore();
const notification = useNotification();
const roles = [
    {
        label: "User",
        value: "user"
    },
    {
        label: "Admin",
        value: "admin"
    },
    {
        label: "Editor",
        value: "editor"
    }
];
const status = [
    {
        label: "active",
        value: "active"
    },
    {
        label: "inactive",
        value: "inactive"
    },
   
];
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)


const data = reactive({
    first_name:"",
    last_name:"",
    email:"",
    password: "",
    password_confirmation:"",
    role:"user",
    status: "inactive",
    bio:"",
    verified: false,
    avatar:null
});

const rules = computed(()=>{
    let obj = {
        first_name:{
            required: helpers.withMessage("First name is required", required),
        },
        last_name:{
            required: helpers.withMessage("Last name is required", required),
        },
        email:{
            required: helpers.withMessage("Email is required", required),
            email,
        },
        role:{
            required: helpers.withMessage("Role is required", required),
        },
        status:{
            required: helpers.withMessage("status is required", required),
        },
        verified:{
            required: helpers.withMessage("Verified status is required", required),
        },
        bio: {
            allow_empty:()=> true,
        },
        password: {
            required: helpers.withMessage("Password is required", required),
            uppercase: helpers.withMessage(
            "Password must consist an uppercase",
            helpers.regex(/[A-Z]/)
            ),
            lowercase: helpers.withMessage(
            "Password must consist an lowercase",
            helpers.regex(/[a-z]/)
            ),
            digit: helpers.withMessage("Password must consist a digit",
            helpers.regex(/[0-9]/)
            ),
            special: helpers.withMessage(
            "Password must consist a special character",
            helpers.regex(/\W|_/)
            ),
            mineight: helpers.withMessage(
            "Password must be atleast 8 chars long",
            helpers.regex(/.{8,}/)
            ),
        },
        password_confirmation: {
            required,
            sameAs: helpers.withMessage(
            "it must match password",
            sameAs(computed(() => data.password))
            ),
        },
    }

    if(props.mode == 'edit'){
        Object.keys(obj).forEach(key=>{
            delete obj[key].required
        })
    }

    console.log(obj);

    return obj
})

const v$ = useVuelidate(rules, data);


// computed & watchers

const getImgSrc = computed(()=>{
    if(newImageSrc.value && props.mode != 'view'){
        return newImageSrc.value;
    }
    if(data.avatar && data.avatar != ''){
        return data.avatar;
    }
    return null;
})


// functions

const updateFile = (e)=>{
    newImageSrc.value = URL.createObjectURL(e.target.files[0]);
	newImage.value = e.target.files[0];
}

async function action(){
    await v$.value.$validate()
    if(!v$.value.$invalid){
        loading.value = true;
        const formData = generateFormData(data)
        if(newImage.value) formData.append('avatar', newImage.value)
        let res = { success: false };
        if(props.mode == 'create'){
            res = await usersStore.addNewUser(formData);
        }
        if(props.mode == 'edit'){
            res = await usersStore.updateUser(props.data.id, formData);
        }
        notification.notify({
            type: res.success ? 'success' : 'error',
            message: res.data.message,
        });
        if(res.success){
            emits('next', 'close');
        }
        loading.value = false;
    }
}

function generateFormData(obj){
    const formData = new FormData();
    const excludedFields =  ['avatar'];
    Object.keys(obj).forEach(key=>{
        if(excludedFields.includes(key)) return;
        if(typeof obj[key] == 'boolean'){
            formData.append(key, obj[key]);
        }else if(obj[key]) {
            formData.append(key, obj[key]);
        }
    });
    
    return formData;
}

// lifecycles

onMounted(()=>{
    if(props.data){
        Object.keys(data).forEach(key =>{
            data[key] = props.data[key]
        })
    }
})

// metadata

useMeta({
    title:"My profile",
    description:"User profile description"
})
</script>

<style lang="postcss" scoped>

</style>