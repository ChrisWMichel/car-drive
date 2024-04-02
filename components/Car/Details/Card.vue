
<template>
    <div>
      <div class="relative shadow border w-full pb-2 mb-5 cursor-pointer h-[200px] overflow-hidden">
        
      <img 
      class="absolute w-7 md:right-4 top-2 z-20 sm:right-0" 
      :src="favored ? heartFilled : heartOutline" 
      alt="heart" 
      @click="emit('favor', car.id)" />
            <div class="flex h-full"  @click="navigateTo(`/car/${car.name}-${car.id}`)">
              <img :src="car.image" class="md:w-[600px] md:h-full sm:w-[300px] sm:h-[100px]"/>
              <div class="p-4 ">
                  <h1 class="text-2xl text-blue-700 sm:text-xl sm:font-bold">
                    {{ car.name }} 
                  </h1>
                  <p class="text-gray-700">{{ car.description }}</p>
                  <h1 class="mt-auto text-xl">${{ car.price }}</h1>                
              </div>
              
            </div>
          </div>
    </div>
    
  </template>
  
  <script setup>
  import heartFilled from '@/assets/images/heartFilled.png';
  import heartOutline from '@/assets/images/heartOutline.png';
  
  const router = useRouter();
  const navigateTo = (route) => {
  router.push(route);
};
  const props = defineProps({
    car: Object,
    favored: Boolean
    })
    
   const emit = defineEmits(['favor']);
  </script>
  
  <style>
  
  </style>