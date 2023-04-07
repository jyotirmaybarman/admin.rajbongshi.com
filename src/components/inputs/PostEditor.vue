<template>
    <div class="dark:md:bg-[#222] dark:text-white">
        <div class="">
            <div class="">
                <div class="form-group relative flex flex-col gap-2">
                    <label class="uppercase" for="title">Title</label>
                    <input placeholder="Give your post a title" v-model="data.title" type="text" class="w-full dark:bg-[#2d2d2d] dark:border-gray-600 dark:outline-none border px-4 py-3 rounded font-medium" id="title"
                    :class="{'border !border-red-500 dark:bg-[#332929] bg-red-50':v$.title.$error}" />
                    <p v-if="v$.title.$error" class="text-sm absolute right-0 top-0 text-red-400 lowercase">{{ v$.title.$errors[0].$message }}</p>
                </div>

                <div v-if="props.mode == 'edit'" class="form-group relative flex items-center gap-2 mt-12">
                    <custom-checkbox id="update_slug" v-model="data.update_slug" />
                    <label class="uppercase cursor-pointer" for="update_slug">Update Slug</label>
                    <p v-if="v$.update_slug.$error" class="text-sm absolute right-0 top-0 text-red-400 lowercase">{{ v$.update_slug.$errors[0].$message }}</p>
                </div>
                
                <div class="form-group flex flex-col gap-2 mt-12">
                    <label class="uppercase" for="image">Image</label>
                    <input ref="fileInput" accept="image/*" class="hidden" type="file" @change="setImage">
                    <div class="group aspect-[20/10] relative border bg-white dark:bg-[#2d2d2d] dark:border-gray-600"
                    :class="{'border !border-red-500 dark:bg-[#332929] bg-red-50':v$.image.$error}">
                        <img v-if="getImgSrc" class="block aspect-[20/10] w-full object-cover" :src="getImgSrc" alt="">
                        <button @click.prevent="$refs.fileInput.click()" class="flex justify-center items-center gap-2 absolute top-0 w-full h-full hover:bg-[#181818] hover:text-white">
                            <svg :class="{'hidden group-hover:block': getImgSrc}" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p :class="{'hidden group-hover:block': getImgSrc}">{{ getImgSrc ? 'Change' : 'Add' }} Image</p>
                        </button>
                        <p v-if="v$.image.$error" class="text-sm absolute right-0 -top-7 text-red-400 lowercase">{{ v$.image.$errors[0].$message }}</p>
                    </div>
                </div>
                <div class="form-group flex relative flex-col gap-2 mt-12">
                    <label class="uppercase" for="tags">Tags</label>
                    <div :class="{'mt-10' : data.tags.length > 0}" >
                        <input placeholder="Enter tags here" v-model="tag" @keyup.enter="addTag" type="text" :disabled="data.tags.length > 2" class="w-full dark:bg-[#2d2d2d] dark:border-gray-600 dark:outline-none border px-4 py-3 rounded font-medium" id="tags"
                        :class="{'border !border-red-500 dark:bg-[#332929] bg-red-50':v$.tags.$error}" />
                        <p v-if="v$.tags.$error" class="text-sm absolute right-0 top-0 text-red-400 lowercase">{{ v$.tags.$errors[0].$message }}</p>
                        <div class="absolute flex gap-2 top-7 left-0">
                            <div v-for="(t, i) in data.tags" :key="t" class="tag rounded text-sm flex items-center gap-2 bg-black py-1 px-2 text-white">
                                <span class="lowercase">{{ t }}</span>
                                <button @click="removeTag(i)">
                                    <svg class="h-6 w-4 hover:stroke-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mt-12 relative flex flex-col gap-2">
                    <label class="uppercase" for="title">meta</label>
                    <input placeholder="Give meta for your post" v-model="data.meta" type="text" class="w-full dark:bg-[#2d2d2d] dark:border-gray-600 dark:outline-none border px-4 py-3 rounded font-medium" id="meta"
                    :class="{'border !border-red-500 dark:bg-[#332929] bg-red-50':v$.meta.$error}" />
                    <p v-if="v$.meta.$error" class="text-sm absolute right-0 top-0 text-red-400 lowercase">{{ v$.meta.$errors[0].$message }}</p>
                </div>
                <div class="form-group relative flex flex-col gap-2 mt-12">
                    <label class="uppercase" for="content">Content</label>
                    <TiptapEditor @change="handleChange" v-model="data.content" class="h-[300px]" :error="v$.content.$error" />
                    <p v-if="v$.content.$error" class="text-sm absolute right-0 top-0 text-red-400 lowercase">{{ v$.content.$errors[0].$message }}</p>
                </div>
                <button @click="submit" class="my-12 py-4 rounded bg-blue-700 hover:bg-blue-500 text-white w-full flex justify-center items-center"
                :disabled="loading"
                :class="{' !bg-gray-400 dark:!bg-gray-700 hover:bg-none cursor-wait': loading}">
                    <svg v-if="loading" role="status" class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-black dark:fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span v-else>
                        {{ props.mode == 'create' ? 'Create New Post' : 'Update Blogpost' }}
                    </span>    
                </button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { helpers } from '@vuelidate/validators'
import { ref, reactive, computed, onMounted } from 'vue';
import { usePostsStore } from '../../stores/posts.store';
import { useRoute, useRouter } from 'vue-router';
import { useNotification } from '../../utils/notification';

// props & emits
const props = defineProps({
    mode: {
        type: String,
        default: 'create',
        validator(val){
            return ['edit', 'create'].includes(val);
        }
    }
});


// variables
const loading = ref(false);
const post = ref(null);
const tag = ref('');
let data = reactive({
    title: '',
    image: null,
    tags: [],
    meta:'',
    content:'',
    update_slug: false
});
const newImageSrc = ref(null);
const newImage = ref(null);
const postsStore = usePostsStore();
const route = useRoute();
const router = useRouter();
const notification = useNotification();

const rules = computed(() => {
    let obj = {
        title:{ required, minLength: minLength(20), maxLength: maxLength(70) },
        image:{ validImage: helpers.withMessage('An image is required', (val) => val != null) },
        tags:{ required },
        meta:{ required },
        content: { required },
        update_slug: { required }
    }
    if(props.mode == 'edit'){
        obj.image = {}
    }


    return obj;
})
const v$ = useVuelidate(rules, data);



// computed & watchers

const getImgSrc = computed(() => {
    if(newImageSrc.value){
        return newImageSrc.value;
    }
    if(data.image_link){
        return data.image_link;
    }
    return null;
});

if(props.data){
    watch(props.data, (newValue) =>{
        Object.keys(data).forEach(k => {
            data[k] = newValue[k]
        });
    });
}


// functions
function handleChange(val){
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(val, 'text/html');
    if(!htmlDoc.body.childNodes[0].innerText.trim()){
        data.content = '';
    }
}

function addTag(){
    if(tag.value.trim() != ''){
        data.tags.push(tag.value.trim());
        tag.value = '';
    }
}

function removeTag(index){
    data.tags.splice(index, 1);
}

function setImage(e){
	newImageSrc.value = URL.createObjectURL(e.target.files[0]);
	newImage.value = e.target.files[0];
	data.image = e.target.files[0];
}



async function submit(){
    loading.value = true;
	const valid = await v$.value.$validate();
    console.log(v$.value);
	if(valid){
        let formData = generateFormData(data);
        let res = { success: false }
        if(props.mode == 'create'){
            console.log("create");
            res = await postsStore.createNewPost(formData);
        }else{
            console.log("update");
            res = await postsStore.updatePostBySlug(route.params.slug, formData);
        }
        loading.value = false

        notification.notify({
            type: res.success ? "success" : "error",
            message: res.data.message
        });
        
        if(res.success){
            router.push(`/posts/view/${res.data.data.slug}`);
        }
	}

    loading.value = false
}

function generateFormData(data){
    const whitelistedFields = ['title', 'tags', 'meta', 'content',];
    if(props.mode == 'edit'){
        whitelistedFields.push('update_slug')
    }
	const formData = new FormData();
	Object.keys(data).forEach(key => {
        if(whitelistedFields.includes(key)){
            if(key == 'tags'){
                data[key].forEach(tag => {
                    formData.append("tags[]", tag);
                })
            }else{
                formData.append(key, data[key]);
            }
        }
	})
    if(newImage.value){
        formData.append('image', newImage.value);
    }
	return formData;
}

// lifecycles
onMounted(async()=>{
    if(props.mode == 'edit'){
        const res = await postsStore.fetchOnePostBySlug(route.params.slug);
        if(res.success){
            post.value = res.data.data;
            Object.keys(post.value).forEach(k => {
                data[k] = post.value[k];
            })
        }
    }
})

</script>

<style lang="postcss" scoped>

</style>