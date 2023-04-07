<template>
    <div class="h-full">
        <h1 class="uppercase text-sm font-bold">{{ props.mode }} Posts</h1>
        <div class="overflow-x-auto relative mt-6 w-[90vw] xsm:w-[85vw] sm:w-[95vw] md:w-full">
            <table v-if="getPosts?.length > 0" class="min-w-[739px] w-full text-sm text-left text-gray-500">
                <thead class="text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-white">
                    <tr>
                        <th class="px-4 py-3">Post</th>
                        <th class="text-center px-4 py-3">Author</th>
                        <th class="text-center px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="group bg-white dark:bg-[#2e2e2e] dark:even:bg-[#333] dark:text-white dark:hover:text-blue-500 cursor-pointer hover:bg-blue-50 hover:text-blue-500 even:bg-gray-50"
                        v-for="post in getPosts" :key="post.slug">
                        <td class="px-4 py-3 flex items-center">
                            <div class="w-24 h-14 bg-gray-200">
                                <img class="block w-full h-full object-cover" :src="post.image_link" alt />
                            </div>
                            <p class="px-4 py-3 text-center">{{ fixTitle(post.title) }}</p>
                        </td>
                        <td class="px-4 py-3 text-center text-sm">
                            <router-link class="hover:underline hover:text-blue-500" to="#">{{ post.author.first_name + ' ' +
                                post.author.last_name }}</router-link>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <div class="flex justify-center gap-4">
                                <button v-if="post.status != 'published'" @click="handleEdit(post.slug)" title="edit"
                                    class="bg-gray-400 hover:bg-gray-500 dark:bg-[#333] dark:hover:bg-[#444] w-8 h-8 rounded p-2 flex justify-center items-center">
                                    <svg class="h-3 w-3" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M7.54818 0.435362C7.67973 0.299158 7.83709 0.190517 8.01107 0.115778C8.18506 0.041039 8.37219 0.00169926 8.56154 5.38436e-05C8.75089 -0.00159158 8.93868 0.0344904 9.11393 0.106194C9.28919 0.177898 9.44842 0.283788 9.58231 0.417686C9.71621 0.551583 9.8221 0.710806 9.8938 0.886065C9.96551 1.06132 10.0016 1.24911 9.99995 1.43846C9.9983 1.62781 9.95896 1.81494 9.88422 1.98893C9.80948 2.16291 9.70084 2.32027 9.56464 2.45182L8.9992 3.01726L6.98274 1.0008L7.54818 0.435362V0.435362ZM5.97451 2.00903L0 7.98354V10H2.01646L7.99168 4.02549L5.9738 2.00903H5.97451Z"
                                            fill="white" />
                                    </svg>
                                </button>
                                <button title="view" @click="router.push(`/posts/view/${post.slug}`)"
                                    class="bg-gray-400 hover:bg-gray-500 dark:bg-[#333] dark:hover:bg-[#444] w-8 h-8 rounded p-2 flex justify-center items-center">
                                    <svg class="h-4 w-4" viewBox="0 0 16 11" fill="none">
                                        <path
                                            d="M8.00102 7.07108C8.44573 7.07108 8.87223 6.90552 9.18669 6.61082C9.50115 6.31612 9.67781 5.91642 9.67781 5.49965C9.67781 5.08288 9.50115 4.68318 9.18669 4.38848C8.87223 4.09378 8.44573 3.92822 8.00102 3.92822C7.5563 3.92822 7.1298 4.09378 6.81534 4.38848C6.50088 4.68318 6.32422 5.08288 6.32422 5.49965C6.32422 5.91642 6.50088 6.31612 6.81534 6.61082C7.1298 6.90552 7.5563 7.07108 8.00102 7.07108Z"
                                            fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M0 5.5C1.06812 2.31236 4.24565 0 8 0C11.7543 0 14.9319 2.31236 16 5.5C14.9319 8.68764 11.7543 11 8 11C4.24565 11 1.06812 8.68764 0 5.5ZM11.3536 5.5C11.3536 6.33354 11.0003 7.13294 10.3713 7.72234C9.74243 8.31174 8.88943 8.64286 8 8.64286C7.11057 8.64286 6.25757 8.31174 5.62865 7.72234C4.99973 7.13294 4.64641 6.33354 4.64641 5.5C4.64641 4.66646 4.99973 3.86706 5.62865 3.27766C6.25757 2.68826 7.11057 2.35714 8 2.35714C8.88943 2.35714 9.74243 2.68826 10.3713 3.27766C11.0003 3.86706 11.3536 4.66646 11.3536 5.5Z"
                                            fill="white" />
                                    </svg>
                                </button>
                                <button v-if="user.role != 'user' || (user.role == 'user' && props.mode == 'published')" @click="handlePostStatus(post)"
                                    :title="props.mode == 'published' ? 'unpublish' : 'publish'"
                                    class="bg-gray-400 hover:bg-gray-500 dark:bg-[#333] dark:hover:bg-[#444] w-8 h-8 rounded p-2 flex justify-center items-center">
                                    <svg class="h-3 w-3" :class="{ 'rotate-180': props.mode != 'published' }"
                                        viewBox="0 0 12 12" fill="none">
                                        <path
                                            d="M5.32972 11.586C5.39207 11.7105 5.48781 11.8151 5.60623 11.8882C5.72464 11.9613 5.86106 12 6.00022 12C6.13938 12 6.2758 11.9613 6.39421 11.8882C6.51263 11.8151 6.60837 11.7105 6.67072 11.586L11.9207 1.08564C11.9859 0.955447 12.0117 0.809105 11.9951 0.664472C11.9785 0.519838 11.9202 0.383164 11.8272 0.271121C11.7343 0.159078 11.6107 0.0765124 11.4716 0.033493C11.3325 -0.00952632 11.184 -0.0111387 11.044 0.0288534L7.29397 1.10064C7.13724 1.14547 6.99938 1.24015 6.90127 1.37034C6.80315 1.50053 6.75013 1.65915 6.75022 1.82217V5.25055C6.75022 5.44947 6.6712 5.64024 6.53055 5.7809C6.3899 5.92156 6.19913 6.00058 6.00022 6.00058C5.80131 6.00058 5.61054 5.92156 5.46989 5.7809C5.32924 5.64024 5.25022 5.44947 5.25022 5.25055V1.82217C5.25031 1.65915 5.19728 1.50053 5.09917 1.37034C5.00106 1.24015 4.8632 1.14547 4.70647 1.10064L0.956465 0.029603C0.816531 -0.0104684 0.667961 -0.00895244 0.528873 0.0339651C0.389786 0.0768827 0.266191 0.159347 0.173163 0.271302C0.0801359 0.383257 0.0216962 0.519864 0.0049696 0.664463C-0.011757 0.809062 0.0139526 0.955405 0.0789642 1.08564L5.32897 11.586H5.32972Z"
                                            fill="white" />
                                    </svg>
                                </button>
                                <button v-if="post.status != 'published'" @click="handleDelete(post)" title="delete"
                                    class="bg-gray-400 hover:bg-gray-500 dark:bg-[#333] dark:hover:bg-[#444] w-8 h-8 rounded p-2 flex justify-center items-center">
                                    <svg class="h-4 w-4" viewBox="0 0 14 16" fill="none">
                                        <path
                                            d="M1 4.11111H13M12.25 4.11111L11.5997 13.5549C11.5728 13.9473 11.4035 14.3146 11.1258 14.5828C10.8482 14.8509 10.4829 15 10.1035 15H3.8965C3.5171 15 3.1518 14.8509 2.87416 14.5828C2.59653 14.3146 2.42719 13.9473 2.40025 13.5549L1.75 4.11111H12.25ZM5.5 7.22222V11.8889V7.22222ZM8.5 7.22222V11.8889V7.22222ZM9.25 4.11111V1.77778C9.25 1.5715 9.17098 1.37367 9.03033 1.22781C8.88968 1.08194 8.69891 1 8.5 1H5.5C5.30109 1 5.11032 1.08194 4.96967 1.22781C4.82902 1.37367 4.75 1.5715 4.75 1.77778V4.11111H9.25Z"
                                            stroke="white" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="mt-32 flex flex-col items-center justify-center">
                <NoRecords message="No Posts Here" />
            </div>
        </div>

        <div v-if="getPosts?.length > 0" class="flex justify-center lg:justify-end mt-12 ">
            <ThePagination :total="getPagination.totalCount" :current="getPagination.currentPage" :perPage="getPagination.perPage" @updatePage="updatePage" />
        </div>

        <TheModalContainer v-if="getModalData.show">
            <TheModal v-if="getModalData.name == 'modify-post'" :mode="getModalData.mode" :action="getModalData.action" :msg="getModalData.message" @next="handleNext"  />
         </TheModalContainer>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { usePagination } from '../../utils/pagination';
import { usePostsStore } from '../../stores/posts.store';
import { useModal } from '../../utils/modal';
import { useNotification } from '../../utils/notification';
import { useAuthStore } from '../../stores/auth.store';

// props & emits
const props = defineProps({
    mode: {
        type: String,
        required: true,
        validator(val) {
            return ['published', 'unpublished', 'draft'].includes(val);
        }
    }
});

// variables
const router = useRouter();
const pagination = usePagination({
    currentPage: 1,
    perPage: 6,
    totalCount: 1
});
const modal = useModal();
const postsStore = usePostsStore();
const notification = useNotification();
const authStore = useAuthStore();

// computed & watchers
const getPagination = computed(() => pagination.getData());
const getModalData = computed(() => modal.getData());
const user = computed(()=> authStore.getUser);
const getPosts = computed(()=>{
    let arr = [];
    let data = [];
    if(props.mode == 'published'){
        data = postsStore.getPublishedPosts;
    }else if(props.mode == 'unpublished'){
        data = postsStore.getUnpublishedPosts;
    }else{
        data = postsStore.getDraftPosts;
    }

    // set count
    pagination.setCount(data.length)
    
    // actual pagination logic
    let start = ((getPagination.value.currentPage - 1) * (getPagination.value.perPage))
    let end = start + (getPagination.value.perPage)
    arr = data.slice(start, end)

    return arr;
});

// functions
function updatePage(page) {
    pagination.setCurrentPage(page)
}

function handleEdit(id) {
    if (props.mode == 'published') {
        return;
    }
    router.push(`/posts/edit/${id}`)
}

function handleDelete(post) {
    if(props.mode == 'published') return;

    modal.setModalData({
        name: 'modify-post',
        action: 'DELETE POST',
        message: 'Are you sure to delete this post ?',
        show: true,
        mode: 'confirmation',
        next: 'proceed',
        data:{
            slug: post.slug,
            status: "deleted"
        }
    });
}

async function handleNext(val){
    let data = getModalData.value.data;
    let res = { success: false }
    if(val == 'proceed'){
        if(data.status == 'deleted'){
            res = await postsStore.deletePostBySlug(data.slug);
        }else if(['published', 'unpublished'].includes(data.status)){
            res = await postsStore.updatePostStatusBySlug(data.slug, { status: data.status });
        }
        notification.notify({
            type: res.success ? "success" : "error",
            message: res.data?.message
        })
        if(res.success){
            postsStore.movePostBySlug(data.slug, props.mode, data.status);
        }
    }
    modal.setModalData({ show: false });
}

function handlePostStatus(post) {
    if (props.mode == 'published') {
        modal.setModalData({
            name: 'modify-post',
            action: 'UNPUBLISH POST',
            message: 'Are you sure to unpublish this post ?',
            show: true,
            mode: 'confirmation',
            data:{
                slug: post.slug,
                status: "unpublished"
            }
        });
        console.log("unpublish", post.slug);
    }
    if (props.mode == 'unpublished') {
        modal.setModalData({
            name: 'modify-post',
            action: 'REPUBLISH POST',
            message: 'Are you sure to republish this post ?',
            show: true,
            mode: 'confirmation',
            data:{
                slug: post.slug,
                status: "published"
            }
        });
        console.log("republish", post.slug);
    }
    if (props.mode == 'draft') {
        modal.setModalData({
            name: 'modify-post',
            action: 'PUBLISH POST',
            message: 'Are you sure to publish this post ?',
            show: true,
            mode: 'confirmation',
            data:{
                slug: post.slug,
                status: "published"
            }
        });
        console.log("publish", post.slug);
    }
}

function fixTitle(title) {
    if (title.length <= 40) {
        return title;
    }
    let newTitle = title.slice(0, 37);
    newTitle += '...';
    return newTitle;
}

</script>

<style lang="postcss" scoped></style>
