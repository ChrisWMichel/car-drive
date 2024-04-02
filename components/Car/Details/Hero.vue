<template>
  <div>
      <div class="mt-10">
        <NuxtImg :src="car.image" alt="car" class=" h-full w-full object-contain"/>
        <h1 class="mt-10 text-4xl sm:text-center md:text-left">
          {{ car.name }}
        </h1>
        <div class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between">
          <div class="flex">
            <p class="mr-2">{{ car.numberOfSeats }}</p>
            <p class="mr-2">|</p>
            <p class="mr-2">{{car.mileage}} miles</p>
          </div>
          <div>
            <p class="font-bold text-2xl">${{car.price}}</p>
          </div>
        </div>   
      </div>
    </div>
</template>

<script setup>  

const props = defineProps({
  car: {
    type: Object,
    required: true
  }
})
const car = ref(props.car);
</script>