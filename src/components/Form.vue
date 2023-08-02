<script setup>
import { ref } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import Error from './Error.vue';
import WeatherResponse from './WeatherResponse.vue';

const emit = defineEmits(['get-weather'])

const countries = [
    { codigo: 'US', nombre: 'United States' },
    { codigo: 'MX', nombre: 'Mexico' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'ES', nombre: 'Spain' },
    { codigo: 'PE', nombre: 'Peru' }
]

const error = ref(false);

const consultData = ref({
    code: '',
    country: '',
    city: '',
})

const initialState = {
    code: '',
    country: '',
    city: '',
}

const sendConsult = () => {
    if(Object.values(consultData.value).includes('')){
        error.value = true;
        setTimeout(() => {
            error.value = false;
        }, 5000);
        return
    }
    emit('get-weather', consultData.value);
    Object.assign(consultData.value, initialState)
}

const updateConsultData = (e) => {
    const selectedCountryCode = e.target.value; //tomamos el codigo del pais
    const selectCountry = countries.find(country => country.codigo === selectedCountryCode); //encontamos el objeto al que pertenece el codigo
    consultData.value.country = selectCountry.nombre; //asignamos el nombre del pais al nuevo array de consulta
}

</script>

<template>
    
    <div class="px-5 md:px-5 py-10 bg-white rounded-sm shadow-md">
        <form @submit.prevent="sendConsult">
            <div class="rounded-lg border border-gray-200 shadow-md px-2 pb-1 pt-[2px] w-full">
                <label class="text-sm text-gray-400">Cuntry</label>
                <select v-model="consultData.code" @change="updateConsultData" id="select" class="p-1 w-full border-none focus:outline-none">
                    <option value=""></option>
                    <option v-for="country in countries" :key="country.id" :value="country.codigo">{{ country.nombre }}</option>
                </select>
            </div>
            <div class="rounded-lg border border-gray-200 shadow-md px-2 pb-1 pt-[2px] w-full mt-5">
                <label class="text-sm text-gray-400">State</label>
                <input v-model="consultData.city" type="text" class="p-1 w-full border-none focus:outline-none">
            </div>
            <div class="mt-5" v-if="error">
                <Error>
                    <p>All fields are required</p>
                </Error>
            </div>
            <div class="mt-5">
                <PrimaryButton type="submit" class="w-full">
                  <p>Get the weather</p>
                </PrimaryButton>
            </div>
      
        </form>
    </div>
</template>



