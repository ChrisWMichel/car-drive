<template>
  <div>
    <!-- <div class="mt-5"> -->
        <div class="flex justify-between mb-4 shadow rounded border-b-2 border-gray-200 ">
          <div class="flex">
            <img :src="`https://edbhdhnophywfhwdqplc.supabase.co/storage/v1/object/public/images/${listing.image}`" class="w-80 mr-3 h-44"/>
            {{ listing.image }}
            <div class="p-3">
              <h1 class="text-2xl">{{ listing.name }}</h1>
            <div class="w-1/4 text-blue-400">${{ listing.price }}</div>
            </div>           
          </div>
          <div class="p-3 flex">
            <nuxt-link :to="`/profile/listings/view/${listing.id}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 h-fit mt-auto">View</nuxt-link>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-fit mt-auto" @click="emits('deleteListing', listing.id)">Delete</button>
          </div>  
        </div>
        
    <!-- </div> -->
  </div>
</template>

<script setup>


const props = defineProps({
  listing: Object
})

const emits = defineEmits(['deleteListing']);

const listing = ref(props.listing);
</script>

<style>

</style>