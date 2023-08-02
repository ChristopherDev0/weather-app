<script setup>
import { ref } from 'vue';
import HeaderVue from './components/Header.vue';
import FormVue from './components/Form.vue';
import WeatherResponse from './components/WeatherResponse.vue';
import CountryRespose from './components/CountryRespose.vue';
import About from './components/About.vue';
import Footer from './components/Footer.vue';
import useClima from './composables/UseClima.js';

const {getWeather, dataCountry,showWeather, nameObjectCountry, weatherCity, error, load} = useClima();
const mySection = ref(null);

const scrollToSection = () => {
  mySection.value.scrollIntoView({ behavior: 'smooth' });
};

</script>

<template>
  <HeaderVue></HeaderVue>

  <section class="bg-slate-950 ">
    <About @button-clicked="scrollToSection"></About>
  </section>

  <svg id="eO6VJcdCvtp1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M0,0h1920L960,130.320384Z" transform="matrix(1 0 0 2.302019 0 0)" fill="#020617"/></svg>

  <div ref="mySection" style="scroll-margin-top: 10ex;">
    <section class="md:hidden px-4 mt-16">
      <div>
        <FormVue v-on:get-weather="getWeather"></FormVue><!-- v-on evento personalizado -->
      </div>
      <div class="mt-16">
        <CountryRespose v-bind:load="load" v-bind:nameObjectCountry="nameObjectCountry" v-bind:dataCountry="dataCountry"></CountryRespose>
      </div>
    </section>

    <section class="hidden md:block">
      <div class="md:max-w-6xl mx-auto mt-5 md:mt-16 lg:mt-[-280px]">
        <div class="flex flex-col lg:flex-row items-start justify-center lg:gap-16 overflow-hidden">
          <div class="md:w-[600px] lg:w-[500px] mx-auto md:h-[500px]" style="background: url(/weather-form01.png); background-position: center center; background-size: contain; background-repeat: no-repeat;">
            <div class="md:w-[500px] mx-auto md:min-h-[300px] md:mt-16 lg:mt-[85px]">
              <div class="md:mx-8 lg:mx-14"> 
                <FormVue v-on:get-weather="getWeather"></FormVue><!-- v-on evento personalizado -->
              </div>
            </div>
          </div> 
          <div class="md:w-[600px] lg:w-[500px] mx-auto md:h-[500px]" style="background: url(/weather-form02.png); background-position: center center; background-size: contain; background-repeat: no-repeat;">
            <div class="md:w-[500px] mx-auto md:min-h-[300px] md:mt-16 lg:mt-[85px]">
              <div class="md:mx-8 lg:mx-14"> 
                <CountryRespose v-bind:load="load" v-bind:nameObjectCountry="nameObjectCountry" v-bind:dataCountry="dataCountry"></CountryRespose>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
</div>


  <main class="px-4 mt-16 md:mt-0 lg:px-0 md:max-w-6xl mx-auto">
      <div class=" text-white rounded-lg min-h-[300px]">
        <WeatherResponse v-bind:load="load" v-bind:error="error" v-bind:nameObjectCountry="nameObjectCountry" v-bind:dataCountry="dataCountry" v-bind:showWeather="showWeather" v-bind:weatherCity="weatherCity"></WeatherResponse>
      </div>
  </main>

  <section class="mt-24 md:mt-32">
    <Footer></Footer>
  </section>

  
</template>

<style scoped>

</style>
