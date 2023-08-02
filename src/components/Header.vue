<script setup>
import UserName from './UserName.vue';
</script>

<template>
    <div class="fixed top-0 left-0 right-0 z-10">
        <nav class="h-[70px] bg-slate-950 text-white border-b border-b-gray-700  bg-opacity-90 backdrop-filter backdrop-blur-sm flex items-center justify-between">
            <div class="flex items-center gap-10">
                <div class="w-[70px] h-[70px] flex justify-center bg-gradient-to-tr from-cyan-600 to-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white w-9" viewBox="0 0 24 24"><path d="M13.507 2.138a1 1 0 0 0-1.155.102L4.196 9.197c-2.924 2.924-2.924 7.682 0 10.606a7.472 7.472 0 0 0 5.3 2.192c1.924 0 3.85-.734 5.317-2.202l6.903-7.096A1 1 0 0 0 21 11h-3.301l4.175-7.514a1.001 1.001 0 0 0-1.359-1.36l-7.11 3.95.576-2.879a1.002 1.002 0 0 0-.474-1.059zM14 14.5a4.5 4.5 0 0 1-9 0c0-1.57.807-2.949 2.025-3.754-.01.084-.025.167-.025.254a2 2 0 1 0 3.845-.772C12.669 10.802 14 12.486 14 14.5z"></path></svg>
                </div>
                <h2 class="uppercase font-semibold hidden md:block">weather app</h2>
            </div>
            <div class="h-[70px] px-4 md:px-20 flex items-center gap-16">
                <div class="hidden md:block">
                    <div class="flex items-center gap-5">
                        <img class="w-8" src="../assets/cloud-01.png" alt="cloud photo">
                        <img class="w-8" src="../assets/cloud-02.png" alt="cloud photo">
                        <img class="w-8" src="../assets/cloud-03.png" alt="cloud photo">
                    </div>
                </div>
                <UserName></UserName>
            </div>
        </nav>
    </div>  
</template>


