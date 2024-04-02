<template>
    <div>
      <div class="flex justify-center text-xl items-center font-serif
      overflow-hidden drop-shadow-2xl mx-auto">
        <input  
        v-model="city" 
        type="text" 
        class="focus:outline-none w-full py-3 px-5 rounded-l-full text-2xl" 
        :class="cityError ? 'border-2 border-red-500' : ''"
        placeholder="Search for cars">
        <button class="bg-sky-500 text-white py-3 px-5 rounded-r-full text-2xl" @click="handleSearch">Search</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const city = ref('');
  //const router = useRouter();
  const cityError = ref(false);
  
  const handleSearch = () => {
    //router.push(`/city/${city.value}/car`);
    if(city.value === '') return cityError.value = true;
    navigateTo(`/city/${city.value}/car`);
  }
  </script>
  
  <style>
  
  </style>