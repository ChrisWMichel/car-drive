<template>
  <div>
    <div class="mr-10 mr-5 border-b pd-5">
      <div class="flex text-lg mt-2" v-for="(car, index) in features" :key="index">
        <p class="rounded text-lime-800 mr-3" >
          <img width="25" src="/assets/images/download.png"></p>
        <p>{{car}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  features: {
    type: Array,
    required: true
  }
})

</script>

<style>

</style>