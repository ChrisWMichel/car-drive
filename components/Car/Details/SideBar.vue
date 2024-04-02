<template>
    <div>
      <div class="shadow border w-60 mr-10 z-30 h-[190px]">
        <!-- Location Start -->
          <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Location</h3>
            <h3 @click="updateModal('location')" class="text-blue-400 capitalize">{{ route.params.city }}</h3>
            <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white z-40">
              <input v-model="city" type="text" class="w-40 border p-1 rounded" placeholder="Search Location">
              <button @click="onChangeLocation" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>
            </div>          
          </div>
          <!-- Location End -->
          <!-- Make Start -->
          <div class="p-5 flex justify-between relative cursor-pointer border-b">
              <h3>Make</h3>
              <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
                {{ route.params.make ? route.params.make : 'Any' }}
              </h3>
              <div 
              class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white w-[600px] flex justify-between flex-wrap bg-white z-40" v-if="modal.make">
              <h3 v-for="make in makes" :key="make" class="w-1/3" @click="onChangeMake(make)">
                {{ make }}
              </h3>
              <!-- 
              <button class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button> -->
            </div> 
           </div>
          <!-- Make End -->
          <!-- Price Start -->
           <div class="p-5 flex justify-between relative cursor-pointer border-b" >
              <h3>Price</h3>
              <h3 class="text-blue-400 capitalize" @click="updateModal('price')" >{{ priceRangeText }}</h3>
              <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white z-40" v-if="modal.price">
                <input type="number" class="w-40 border p-1 rounded" placeholder="Min" v-model="priceRange.min"/>
                <input type="number" class="w-40 border p-1 rounded" placeholder="Max" v-model="priceRange.max"/>
                <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="onPriceChange">{{ priceRangeText }}</button>
              </div>
           </div>

          <!-- Price End -->
        </div>
    </div>
  </template>
  
  <script setup>
 import { useCars } from "~/composibles/useCars";

    const [cars, makes] = useCars();
    const priceRange = ref({
      min: '',
      max: '',
    });

    const route = useRoute();
    const router = useRouter();
    const city = ref('');

    const priceRangeText = computed(() => {      
        const minPrice = route.query.minPrice;
        const maxPrice = route.query.maxPrice;
        if(!minPrice && !maxPrice) return 'Any';
        else if(!minPrice && maxPrice) return `< ${maxPrice}`;
        else if(minPrice && !maxPrice) return `> ${minPrice}`;
        else return `$${minPrice} - $${maxPrice}`;
    });
    const onPriceChange = () => {
      updateModal('price');
      if(priceRange.value.max && priceRange.value.min) {
       if(priceRange.value.min > priceRange.value.max) return;
        router.push({
          query: {
            minPrice: priceRange.value.min,
            maxPrice: priceRange.value.max,
          }
        })
      }
    }
    const modal = ref({
      make: false,
      location: false,
      price: false,
    });
    const updateModal = (key) => {
      modal.value[key] = !modal.value[key];
    }
    const onChangeLocation = (e) => {     
      if(!city.value) return;
      if(!isNaN(parseInt(city.value))) {
        city.value = '';
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid city name',
        })
      };
      updateModal('location');
      console.log(`/city/${city.value}/car/${route.params.make}`)
      router.push(`/city/${city.value}/car/${route.params.make}`)
      city.value = '';
    }
    const onChangeMake = (make) => {
      updateModal('make');
      router.push(`/city/${route.params.city}/car/${make}`)
    }
  </script>
  
  <style>
  
  </style>