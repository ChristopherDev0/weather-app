<script setup>
import PrimaryButton from './PrimaryButton.vue';

const emit = defineEmits(['button-clicked']);

const handleClick = () => {
  emit('button-clicked');
};
</script>

<template>
    <div class="flex gap-16 md:gap-5 justify-between flex-col md:flex-row min-h-[400px] pt-36 pb-20  px-4 md:px-10 lg:px-0 md:max-w-6xl mx-auto">
        <div class="flex-1 animate-fade-up">
            <h2 class="uppercase text-white text-4xl md:text-5xl font-bold">weather platform <span class="block">of the future!</span></h2>
            <p class="mt-10 text-gray-300 font-semibold text-lg md:text-xl">A new climate instrument based on a smart <span class="md:block">data collection block</span> </p>
            <PrimaryButton @click="handleClick" class="mt-10 w-40 md:w-60">
                <span>Try now</span>
            </PrimaryButton>
            <div class="flex gap-2 mt-3">
                <p class="inline text-sm text-gray-400">Get country information</p>
                <img class="w-5" src="../assets/cloud-01.png" alt="cloud photo">
            </div>
           
        </div>
        <div class="flex-1 items-center justify-center animate-fade-up">
            <img class="w-[500px] mx-auto" src="../../public/weather-img4.svg" alt="photo weather">
        </div>
    </div>
</template>



