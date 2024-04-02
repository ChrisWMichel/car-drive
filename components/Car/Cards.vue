<template>
  <div>
    <ClientOnly >
      <div class="w-full" >
        <CarDetailsCard v-for="(car, index) in cars" 
        :key="index" 
        :car="car" 
        @favor="toggleFavorite"
        :favored = "car.id in favorite"
        />           
     </div>      
    </ClientOnly>
      
  </div>
</template>

<script setup>
import { useCars } from '@/composibles/useCars'
//const [cars] = useCars();

const props = defineProps({
  cars: Array
});

const favorite = useLocalStorage('favorite', {});

const toggleFavorite = (id) => {
  
  if(id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true
    };
  }
}
</script>

<style scope>

</style>