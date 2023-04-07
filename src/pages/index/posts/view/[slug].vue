<template>
  <div class="view h-full">
    <div v-if="post" class="mx-auto">
      <SideActions @action="handleAction" :post="post" class="xl:hidden mb-6" />
      <h1 class="title text-4xl font-bold dark:text-white">
        {{ post.title }}
      </h1>
      <div class="dark:text-white mt-2">
        By {{ post.author.first_name }} {{ post.author.last_name }} on
        {{ post.created_at }}
      </div>

      <main class="flex gap-12 mt-6">
        <section class="w-full lg:w-[80%]">
          <figure class="relative">
            <div class="relative block w-full mx-auto my-0">
              <div class="block" style="padding-bottom: 53%"></div>
              <div
                class="bg-gray-100 absolute inset-0 w-full h-full m-auto overflow-hidden"
              >
                <img
                  class="block object-cover w-full h-full m-auto border dark:border-[#333]"
                  :src="post.image_link"
                />
              </div>
            </div>
          </figure>
          
          <!-- Content -->
          <div v-html="post.content" class="prose max-w-none mt-6 dark:prose-invert text-justify"></div>
          <!-- Content END -->

          <div class="flex items-end gap-4 mt-6 lg:mt-16">
            <div
              class="border-0 border-b w-full border-b-gray-200 dark:border-b-gray-500"
            ></div>
            <p class="relative">
              <span
                class="absolute text-[12px] uppercase -top-[0.6rem] -left-3 text-gray-500 dark:text-gray-400"
                >end</span
              >
            </p>
            <div
              class="border-0 border-b w-full border-b-gray-200 dark:border-b-gray-500"
            ></div>
          </div>
        </section>
        <aside class="hidden xl:block">
          <div class="flex flex-col w-full md:w-[200px] md:order-2 h-max sticky top-7 rounded-md">
            <SideActions @action="handleAction" :post="post" />
          </div>
        </aside>
      </main>

      <TheModalContainer v-if="getModalData.show">
        <TheModal v-if="getModalData.name == 'modify-post'" :mode="getModalData.mode" :action="getModalData.action" :msg="getModalData.message" @next="handleNext"  />
     </TheModalContainer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { usePostsStore } from '../../../../stores/posts.store'
import { useRoute, useRouter } from 'vue-router';
import { useModal } from '../../../../utils/modal';
import { useNotification } from '../../../../utils/notification';

// variables
const postsStore = usePostsStore()
const route = useRoute()
const router = useRouter()
const post = ref(null)
const modal = useModal();
const notification = useNotification();

// computed & watchers
const getModalData = computed(() => modal.getData())
const getUpdatedPost = computed(()=> postsStore.getUpdatedPostWithSlug )
watch(getUpdatedPost, (nv) =>{
  if(nv){
    post.value = nv
    postsStore.clearUpdatedPostWithSlug()
  }
})

// functions
function handleAction(val) {
  if(val =='edit') {
    return router.push(`/posts/edit/${post.value.slug}`)
  }
  let action, message, data = { status: null };

  if(val == 'delete'){
    action = 'DELETE POST'
    message = "Are you sure you want to delete this post?"
    data.status = "deleted"
  }
  if(val == 'publish'){
    action = 'PUBLISH POST'
    message = "Are you sure you want to publish this post?"
    data.status = "published"
  }
  if(val == 'unpublish'){
    action = 'UNPUBLISH POST'
    message = "Are you sure you want to unpublish this post?"
    data.status = "unpublished"
  }
  if(val == 'republish'){
    action = 'REPUBLISH POST'
    message = "Are you sure you want to republish this post?"
    data.status = "published"
  }
  

  modal.setModalData({
    show: true,
    name: 'modify-post',
    mode: "confirmation",
    action,
    message,
    data
  })
}

async function handleNext(val){
  let postStatus = post.value.status
  if(val == 'proceed'){
    const data = getModalData.value.data;
    let res = { success: false, message: null };
  
    if(data.status == 'deleted'){
      res = await postsStore.deletePostBySlug(post.value.slug)
    }
    if(data.status == 'published'){
      res = await postsStore.updatePostStatusBySlug(post.value.slug, { status: data.status })
    }
    if(data.status == 'unpublished'){
      res = await postsStore.updatePostStatusBySlug(post.value.slug, { status: data.status })
    }
    if(data.status == 'published'){
      res = await postsStore.updatePostStatusBySlug(post.value.slug, { status: data.status })
    }
    if(res.success){
      postsStore.movePostBySlug(post.value.slug, post.value.status, data.status);
      post.value.status = data.status
    }
  
    notification.notify({
      type: res.success ? 'success' : 'error',
      message: res.data.message
    });

    if(data.status == 'deleted') {
      let r = postStatus == 'draft' ? 'drafts' : postStatus
      router.push(`/posts/${r}`)
    }
  }

  modal.setModalData({ show: false })
}




onMounted(async() =>{
  const slug = route.params.slug;
  const res = await postsStore.fetchOnePostBySlug(slug)
  if(res.success){
    post.value = res.data.data;
  }
})
</script>

<style lang="postcss" scoped></style>
