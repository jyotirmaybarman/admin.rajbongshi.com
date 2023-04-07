<template>
    <div class="h-full">

      <div class="flex justify-between">
        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg" @click="openModal('add-new-user-modal')">
          Add new user
        </button>
        <div ref="filterOptions" class="flex relative lg:min-w-[200px] bg-gray-100 rounded">
          <button class="flex w-full gap-4 p-3 justify-center items-center" @click="filterOpen = !filterOpen">
            <span>Filter</span>
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
          </button>       
          <ul v-if="filterOpen" class="absolute right-0 top-12 flex flex-col gap-4 z-50 rounded w-max border bg-white p-3">
            <li class="flex items-center gap-4">
              <CustomCheckbox v-model="onlyActiveFilter" id="only-active-filter" class="h-5 w-5"/>
              <label for="only-active-filter" class="cursor-pointer">Only Active Users</label>
            </li>
            <li class="flex items-center gap-4">
              <CustomCheckbox v-model="onlyInactiveFilter" id="only-inactive-filter" class="h-5 w-5"/>
              <label for="only-inactive-filter" class="cursor-pointer">Only Inactive Users</label>
            </li>
            <li class="flex items-center gap-4">
              <CustomCheckbox v-model="onlyReviewNeeded" id="only-review-needed-filter" class="h-5 w-5"/>
              <label for="only-review-needed-filter" class="cursor-pointer">Only Review Needed</label>
            </li>
            <li class="flex items-center gap-4">
              <CustomCheckbox v-model="onlyAdminFilter" id="only-admin-filter" class="h-5 w-5"/>
              <label for="only-admin-filter" class="cursor-pointer">Only Admin Users</label>
            </li>
          </ul>   
        </div>
      </div>


      <div class="overflow-x-auto relative mt-6 w-[90vw] xsm:w-[85vw] sm:w-[95vw] md:w-full">
        <table v-if="users && users.length > 0" class="min-w-[739px] w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-white">
              <tr>
                  <th class="px-4 py-3">user</th>
                  <th class="text-center px-4 py-3">email</th>
                  <th class="text-center px-4 py-3">role</th>
                  <th class="text-center px-4 py-3">actions</th>
              </tr>
          </thead>
          <tbody>
              <tr class="group bg-white dark:bg-[#2e2e2e] dark:even:bg-[#333] dark:text-white dark:hover:text-blue-500 cursor-pointer hover:bg-blue-50 hover:text-blue-500 even:bg-gray-50" v-for="user in users" :key="user.id">
                <td class="py-3 group-hover:underline px-6 text-center capitalize">
                  <div class="flex items-center text-sm">
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <img
                        class="object-cover w-full h-full rounded-full"
                        :src="user.avatar"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        class="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <p class="font-semibold dark:text-white">{{ user.first_name }} {{ user.last_name }}</p>
                  </div>
                </td>
                <td class="text-center px-4 py-3 text-sm">{{ user.email }}</td>
                <td class="text-center text-xs">
                  <span
                    class="px-2 py-1 capitalize text-green-700 bg-green-100 rounded-full"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="text-center px-4 py-3 text-sm">
                  <div class="flex justify-center gap-4">
                    <button @click="openModal('edit-user', user)" class="bg-gray-400 dark:bg-[#222] dark:hover:bg-black hover:bg-gray-500 w-8 h-8 rounded p-2 flex justify-center items-center">
                      <svg class="h-3 w-3" viewBox="0 0 10 10" fill="none">
                        <path d="M7.54818 0.435362C7.67973 0.299158 7.83709 0.190517 8.01107 0.115778C8.18506 0.041039 8.37219 0.00169926 8.56154 5.38436e-05C8.75089 -0.00159158 8.93868 0.0344904 9.11393 0.106194C9.28919 0.177898 9.44842 0.283788 9.58231 0.417686C9.71621 0.551583 9.8221 0.710806 9.8938 0.886065C9.96551 1.06132 10.0016 1.24911 9.99995 1.43846C9.9983 1.62781 9.95896 1.81494 9.88422 1.98893C9.80948 2.16291 9.70084 2.32027 9.56464 2.45182L8.9992 3.01726L6.98274 1.0008L7.54818 0.435362V0.435362ZM5.97451 2.00903L0 7.98354V10H2.01646L7.99168 4.02549L5.9738 2.00903H5.97451Z" fill="white"></path>
                      </svg>
                    </button>
                    
                    <button @click="openModal('view-user', user)" title="view" class="bg-gray-400 dark:bg-[#222] dark:hover:bg-black hover:bg-gray-500 w-8 h-8 rounded p-2 flex justify-center items-center">
                      <svg class="h-4 w-4" viewBox="0 0 16 11" fill="none">
                        <path d="M8.00102 7.07108C8.44573 7.07108 8.87223 6.90552 9.18669 6.61082C9.50115 6.31612 9.67781 5.91642 9.67781 5.49965C9.67781 5.08288 9.50115 4.68318 9.18669 4.38848C8.87223 4.09378 8.44573 3.92822 8.00102 3.92822C7.5563 3.92822 7.1298 4.09378 6.81534 4.38848C6.50088 4.68318 6.32422 5.08288 6.32422 5.49965C6.32422 5.91642 6.50088 6.31612 6.81534 6.61082C7.1298 6.90552 7.5563 7.07108 8.00102 7.07108Z" fill="white"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.5C1.06812 2.31236 4.24565 0 8 0C11.7543 0 14.9319 2.31236 16 5.5C14.9319 8.68764 11.7543 11 8 11C4.24565 11 1.06812 8.68764 0 5.5ZM11.3536 5.5C11.3536 6.33354 11.0003 7.13294 10.3713 7.72234C9.74243 8.31174 8.88943 8.64286 8 8.64286C7.11057 8.64286 6.25757 8.31174 5.62865 7.72234C4.99973 7.13294 4.64641 6.33354 4.64641 5.5C4.64641 4.66646 4.99973 3.86706 5.62865 3.27766C6.25757 2.68826 7.11057 2.35714 8 2.35714C8.88943 2.35714 9.74243 2.68826 10.3713 3.27766C11.0003 3.86706 11.3536 4.66646 11.3536 5.5Z" fill="white"></path>
                      </svg>
                    </button>
                    
                    <button @click="openModal('delete-user', user)" title="delete" class="bg-gray-400 dark:bg-[#222] dark:hover:bg-black hover:bg-gray-500 w-8 h-8 rounded p-2 flex justify-center items-center">
                      <svg class="h-4 w-4" viewBox="0 0 14 16" fill="none">
                        <path d="M1 4.11111H13M12.25 4.11111L11.5997 13.5549C11.5728 13.9473 11.4035 14.3146 11.1258 14.5828C10.8482 14.8509 10.4829 15 10.1035 15H3.8965C3.5171 15 3.1518 14.8509 2.87416 14.5828C2.59653 14.3146 2.42719 13.9473 2.40025 13.5549L1.75 4.11111H12.25ZM5.5 7.22222V11.8889V7.22222ZM8.5 7.22222V11.8889V7.22222ZM9.25 4.11111V1.77778C9.25 1.5715 9.17098 1.37367 9.03033 1.22781C8.88968 1.08194 8.69891 1 8.5 1H5.5C5.30109 1 5.11032 1.08194 4.96967 1.22781C4.82902 1.37367 4.75 1.5715 4.75 1.77778V4.11111H9.25Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
        <div v-else class="flex flex-col justify-center items-center h-[90%] dark:bg-[#222]">
          <NoRecords class="mt-[6.2rem]" message="No Users" />
        </div>
      </div>
    
    
      <div class="flex justify-center lg:justify-end mt-12 ">
        <ThePagination :total="getPagination.totalCount" :current="getPagination.currentPage" :perPage="getPagination.perPage" @updatePage="updatePage" />
    </div>

    <TheModalContainer v-if="modalData.open">
       <TheModal v-if="modalData.modalName == 'delete-user'" mode="confirmation" action="DELETE USER ?" msg="Are you sure, you want to delete the user ?" @next="handleNext"  />
       <EditUserModal v-else @next="handleNext" :data="modalData.data" :mode="modalData.mode" />
    </TheModalContainer>
    </div>
  </template>
  
  <script setup>
    import { ref, computed } from 'vue';
    import { useUsersStore } from '../../stores/users.store';
    import { onMounted } from '@vue/runtime-core';
    import { usePagination } from '../../utils/pagination';
    import { reactive } from '@vue/reactivity';
    import { useNotification } from '../../utils/notification';
    import { onClickOutside } from '@vueuse/core';

    //variables
    const filterOpen = ref(false)
    const onlyActiveFilter = ref(false)
    const onlyInactiveFilter = ref(false)
    const onlyAdminFilter = ref(false)
    const onlyReviewNeeded = ref(false)
    const filterOptions = ref()
    const usersStore = useUsersStore();
    const pagination = usePagination();
    const notification = useNotification();
    const modalData = reactive({
      modalName:"",
      mode: "create",
      data: null,
      open: false
    })
    
    //computed/watchers
    const users = computed(() => {
      let arr = usersStore.getUsers
      if(onlyActiveFilter.value){
        arr = arr.filter(user => user.status == 'active')
      }
      if(onlyInactiveFilter.value){
        arr = arr.filter(user => user.status == 'inactive')
      }
      if(onlyAdminFilter.value){
        arr = arr.filter(user => user.role == 'admin')
      }
      if(onlyReviewNeeded.value){
        arr = arr.filter(user => user.status == null)
      }

      // set count
      pagination.setCount(arr.length)
      
      // actual pagination logic
      let start = ((getPagination.value.currentPage - 1) * (getPagination.value.perPage))
      let end = start + (getPagination.value.perPage)
      arr = arr.slice(start, end)

      return arr;
    });
    const usersCount = computed(() => usersStore.getUsersCount);
    const getPagination = computed(() => pagination.getData());
    onClickOutside(filterOptions, () => {
      filterOpen.value = false
    })

    // functions
    function updatePage(page) {
      pagination.setData(page)
      usersStore.fetchAllUsers(`page=${page}`)
    }

    function openModal(modalName, data = null){
      modalData.data = data
      modalData.modalName = modalName
      modalData.mode = modalName == 'view-user' ? 'view' : modalName == 'edit-user' ? 'edit' : 'create'
      modalData.open = true
    }

    async function handleNext(val){
      if(val == 'close' || val == 'cancel'){
        console.log(val);
      }
      if(val == 'proceed'){
        if(modalData.modalName == 'delete-user'){
          console.log("delete user");
          let res = await usersStore.deleteUser(modalData.data.id)
          notification.notify({
            type: res.success ? "success":"error",
            message: res.data.message
          })
          if(res.success){
            usersStore.fetchAllUsers(`page=${getPagination.value.currentPage}`)
          }
        }
      }
      modalData.open = false
    }

    //lifecycles
    onMounted(async () => {
      if(!users.value){
        await usersStore.fetchAllUsers()
      }
      pagination.setCount(usersCount.value);
    })

  </script>

  <route lang="yml">
    meta:
      roles: [ admin, editor ]
  </route>
  