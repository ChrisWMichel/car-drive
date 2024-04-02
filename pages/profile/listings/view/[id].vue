<template>
  <div class="rounded shadow mt-20">
    <!-- <div class="p-4 bg-blue-500 "> -->
      <h1 class="text-2xl font-bold">Messages</h1>
     <CarMessageCard v-for="message in data" :key="message.id" :message="message" />
    </div>
  <!-- </div> -->
</template>

<script setup>
definePageMeta({
    layout: 'custom',
    title: 'Message',
    middleware:['auth']
})
const route = useRoute();

  const  data  = await $fetch(`/api/car/listings/${route.params.id}/message`);

 
</script>

<style>

</style>