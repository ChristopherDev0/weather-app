<script setup>
import Spinner from './Spinner.vue';

defineProps({
    nameObjectCountry: {
        type: String,
        required: true
    },
    dataCountry: {
        type: Object,
        required: true
    },
    load: {
        type: Boolean,
        required: true
    },
})
</script>

<template>
    <div class="px-5 py-10 min-h-[295px] bg-white rounded-sm shadow-md">
        <div class="p-3 rounded-lg shadow-md border border-gray-200">
            <p class="uppercase font-bold text-center text-xl">country <span class="font-light">data</span></p>
        </div>
        <div v-if="load" class="flex items-center justify-center mt-16">
            <Spinner></Spinner>
        </div>
        <section v-else>
        <div v-if="nameObjectCountry" class="px-2 mt-5">
            <div class="flex items-center justify-between">
                <p class="font-semibold">Country name:</p>
                <p>{{ dataCountry.name }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="font-semibold">Capital name:</p>
                <p> {{ dataCountry.capital }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="font-semibold">Cuntry pupulation:</p>
                <p> {{ dataCountry.population }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="font-semibold">Offical name:</p>
                <p> {{ dataCountry.official_name }}</p>
            </div>
            <div class="w-24 h-24 rounded-full shadow-lg mt-5 flex items-center justify-center mx-auto border border-gray-300">
                <img class="w-14" :src="dataCountry.flag.medium" alt="photo cuntry">
            </div>
       </div>
    </section>
    </div>
</template>




