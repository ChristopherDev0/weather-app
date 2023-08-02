<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ref, onMounted, watch } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import Error from './Error.vue'

const userName = ref('');
const error = ref(false);
const deleteName = ref(false);

onMounted(() => {
    if(localStorage.getItem('message')){
        userName.value = localStorage.getItem('message');
        deleteName.value = localStorage.getItem('deleteName');
    }
});

watch(userName, () => {
    if(userName.value === ''){
        deleteName.value = false;
    }
})

const keepName = () => {
    if(userName.value.trim() === ''){
        error.value = true;
        setTimeout(() => {
            error.value = false
        }, 5000);
        return
    }
    deleteName.value = true;
    localStorage.setItem('message', userName.value)
    localStorage.setItem('deleteName', deleteName.value)
}

</script>

<template>
    <div>
    <Popover class="relative">
      <PopoverButton :class="deleteName ? '' : ' animate-pulse'" class="border-none focus:outline-none">
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 bg-white flex items-center justify-center rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 text-cyan-500" viewBox="0 0 24 24" ><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
          </div>
            <div class="font-semibold">
                <p class="text-sm">{{ userName ? userName : 'User name' }}</p>
                <p class="text-xs text-gray-400">Welcome</p>
            </div>
        </div>
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="absolute z-10 mt-3 left-[-120px] md:left-[-80px]">
          <div class="overflow-hidden rounded-lg shadow-lg bg-white text-gray-500 px-3 py-5  w-60 ">
            <form @submit.prevent="keepName">
                <input 
                type="text"
                maxlength="13"
                v-model="userName" 
                placeholder="Enter your name"
                class="mb-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                >
                <div v-if="error">
                    <Error>
                        <p>Required field</p>
                    </Error>
                </div>
                <PrimaryButton type="submit" class="mt-2 w-full">{{ deleteName ? 'Save changes' : 'Save name' }}</PrimaryButton>
            </form>
          
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>

</template>
