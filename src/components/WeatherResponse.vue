<script setup>
import { ref } from 'vue';
import useClima from '../composables/UseClima.js';
import Spinner from './Spinner.vue';

const {formatTemperature, formatVisibility} = useClima();

defineProps({
    nameObjectCountry: {
        type: String,
        required: true
    },
    dataCountry: {
        type: Object,
        required: true
    },
    showWeather: {
        type: Boolean,
        required: true
    },
    load: {
        type: Boolean,
        required: true
    },
    weatherCity: {
        type: Object,
        required: true
    },
    error: {
        type: String,
        required: true
    }
})

/* nameObjectCountry.value = Object.keys(resultCountry)[0] */

const todayDate = ref('');

const currentDate = () => {
    const today = new Date(); // Obtiene la fecha y hora actual
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    todayDate.value = formattedDate;
}

currentDate()

</script>

<template>
    <div>
       <div class="text-center mb-10">
            <p class="font-bold text-3xl md:text-4xl">Current weather of <span class="md:font-light">your search</span></p>
       </div>
       <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-5 mt-10">
            <div class="flex items-center justify-center md:w-1/3 overflow-hidden shadow-lg h-[200px] rounded-lg" style="background: url(../../public/rain01.webp); background-position: center center; background-size: cover; background-repeat: no-repeat;">
              <div>
                <h2 class="font-bold text-3xl text-center">current weather</h2>
                <p class="text-center">{{ todayDate }}</p>
              </div>
            </div>
            <div class="md:w-2/3 bg-gray-100 bg-opacity-10 p-5 rounded-md shadow-lg min-h-[200px]">
                <div class="flex flex-col md:flex-row md:gap-3 items-center justify-center">
                    <p class="text-base md:text-lg font-semibold">Current city weather</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-7" viewBox="0 0 24 24"><path d="M19.511 9.722a7.833 7.833 0 0 0-2.359-3.804l-.035.035.005-.042A7.81 7.81 0 0 0 4.418 9.722c.031-.013.066-.013.099-.023a5.643 5.643 0 0 0-.306 9.166l.006-.006-.006.024a5.612 5.612 0 0 0 3.407 1.134h4.321l.024.024h4.341a5.644 5.644 0 0 0 3.207-10.319zm-3.206 6.845h-4.341l-.006.006v-.031h-4.34c-.308 0-.611-.066-.892-.193l.002-.001a2.17 2.17 0 1 1 2.87-2.871l2.518-2.518a5.634 5.634 0 0 0-3.396-2.1c.018-.009.035-.024.05-.021a4.334 4.334 0 0 1 5.931-.451h.046a4.334 4.334 0 0 1 1.558 3.407v.433a2.17 2.17 0 1 1 0 4.34z"></path></svg>
                    </div>
                </div>
                <div v-if="load" class="flex items-center justify-center mt-12">
                    <Spinner></Spinner>
                </div>
                <div v-if="error" class="flex flex-col md:flex-row items-center justify-center gap-3 mt-5 md:mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-12 text-red-500" viewBox="0 0 24 24"><path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path><path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path></svg>
                    <p class="font-bold text-2xl text-center">{{ error }}</p>
                </div>
               
                <div v-if="showWeather" class="mt-3 text-center flex flex-col items-center justify-center">
                    <p class="text-8xl font-bold">{{ formatTemperature(weatherCity.main.temp) }}&deg;C</p>
                    <p class="mt-4 font-semibold text-lg">{{ weatherCity.name }}</p>
                    <div class="flex items-center gap-10 mt-5 mb-1">
                        <p>Minimum: <span class="text-blue-300">{{ formatTemperature(weatherCity.main.temp_min) }}&deg;C</span></p>
                        <p>Maximum: <span class="text-yellow-300"> {{ formatTemperature(weatherCity.main.temp_max) }}&deg;C</span></p>
                    </div>
                </div>
            </div>
       </div>
       <div class="mt-7 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div class="min-h-[60px] bg-gray-100 bg-opacity-10 px-2 py-3 rounded-md shadow-lg w-full">
                <div class="flex items-center justify-center gap-2">
                    <p class="font-semibold">Sky</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 text-pink-300" viewBox="0 0 24 24"><path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM18 17H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2z"></path></svg>
                </div>
                <p v-if="showWeather" class="text-center text-sm md:text-base mt-2">{{ weatherCity.weather[0].main }}</p>
            </div>
            <div class="min-h-[60px] bg-gray-100 bg-opacity-10 px-2 py-3 rounded-md shadow-lg w-full">
                <div class="flex items-center justify-center gap-2">
                    <p class="font-semibold">Visibility</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 text-green-400" width="24" height="24" viewBox="0 0 24 24"><path d="m21.88 2.15-1.2.4a13.84 13.84 0 0 1-6.41.64 11.87 11.87 0 0 0-6.68.9A7.23 7.23 0 0 0 3.3 9.5a8.65 8.65 0 0 0 1.47 6.6c-.06.21-.12.42-.17.63A22.6 22.6 0 0 0 4 22h2a30.69 30.69 0 0 1 .59-4.32 9.25 9.25 0 0 0 4.52 1.11 11 11 0 0 0 4.28-.87C23 14.67 22 3.86 22 3.41zm-7.27 13.93c-2.61 1.11-5.73.92-7.48-.45a13.79 13.79 0 0 1 1.21-2.84A10.17 10.17 0 0 1 9.73 11a9 9 0 0 1 1.81-1.42A12 12 0 0 1 16 8V7a11.43 11.43 0 0 0-5.26 1.08 10.28 10.28 0 0 0-4.12 3.65 15.07 15.07 0 0 0-1 1.87 7 7 0 0 1-.38-3.73 5.24 5.24 0 0 1 3.14-4 8.93 8.93 0 0 1 3.82-.84c.62 0 1.23.06 1.87.11a16.2 16.2 0 0 0 6-.35C20 7.55 19.5 14 14.61 16.08z"></path></svg>
                </div>
                <p v-if="showWeather" class="text-center text-sm md:text-base mt-2">{{ formatVisibility(weatherCity.visibility) }}</p>
            </div>
            <div class="min-h-[60px] bg-gray-100 bg-opacity-10 px-2 py-3 rounded-md shadow-lg w-full">
                <div class="flex items-center justify-center gap-2">
                    <p class="font-semibold">Humidity</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 text-purple-500" viewBox="0 0 24 24"><path d="M5.996 9c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707C11.83 8.253 12.577 9 13.991 9c1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 8.253 20.585 9 22 9V7c-.563 0-.804-.217-1.295-.707C20.159 5.747 19.411 5 17.996 5s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 5.747 11.407 5 9.993 5s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 5.747 3.413 5 2 5v2c.561 0 .801.217 1.291.707C3.836 8.253 4.583 9 5.996 9zm0 5c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707c.545.546 1.292 1.293 2.706 1.293 1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 13.253 20.585 14 22 14v-2c-.563 0-.804-.217-1.295-.707-.546-.546-1.294-1.293-2.709-1.293s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 10.747 11.407 10 9.993 10s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 10.747 3.413 10 2 10v2c.561 0 .801.217 1.291.707C3.836 13.253 4.583 14 5.996 14zm0 5c1.413 0 2.16-.747 2.705-1.293.49-.49.731-.707 1.292-.707s.802.217 1.292.707c.545.546 1.292 1.293 2.706 1.293 1.415 0 2.163-.747 2.71-1.293.491-.49.732-.707 1.295-.707s.804.217 1.295.707C19.837 18.253 20.585 19 22 19v-2c-.563 0-.804-.217-1.295-.707-.546-.546-1.294-1.293-2.709-1.293s-2.162.747-2.709 1.292c-.491.491-.731.708-1.296.708-.562 0-.802-.217-1.292-.707C12.154 15.747 11.407 15 9.993 15s-2.161.747-2.706 1.293c-.49.49-.73.707-1.291.707s-.801-.217-1.291-.707C4.16 15.747 3.413 15 2 15v2c.561 0 .801.217 1.291.707C3.836 18.253 4.583 19 5.996 19z"></path></svg>
                </div>
                <p v-if="showWeather" class="text-center text-sm md:text-base mt-2">{{ weatherCity.main.humidity }} %</p>
            </div>
            <div class="min-h-[60px] bg-gray-100 bg-opacity-10 px-2 py-3 rounded-md shadow-lg w-full">
                <div class="flex items-center justify-center gap-2">
                    <p class="font-semibold">Description</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 text-yellow-300" viewBox="0 0 24 24"><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path></svg>
                </div>
                <p v-if="showWeather" class="text-center text-sm md:text-base mt-2">{{ weatherCity.weather[0].description }}</p>
            </div>
       </div>
    </div>
</template>



