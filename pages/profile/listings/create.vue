<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create Listing </h1>
    </div>
      <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
        <CarAdSelect title="Make*" :options="makes" name="make" @changeInput="onChangeInput"/>

        <CarAdInput v-for="input in inputs" :key="input.id" :title="input.title" :placeholder="input.placeholder" :name="input.name" @changeInput="onChangeInput"/>

        <CarAdTextarea title="Description*" placeholder="Enter Description" name="description" @changeInput="onChangeInput"/>
        
        <CarAdImage @changeImage="onChangeInput"/>
        <button 
        class="bg-blue-400 text-white rounded py-2 px-7 mt-3" 
        :disabled="isButtonDisabled"
        @click="handleSubmit"
        >Submit</button>
        <p v-if="errorMessage" class="text-red-500 mt-3">{{errorMessage}}</p>
        
      </div>
  </div>
</template>

<script setup>
import { useCars } from '~/composibles/useCars';

const makes = useCars();

const user = useSupabaseUser();
const supabase = useSupabaseClient();

definePageMeta({
    layout: 'custom',
    title: 'Create Listing',
    middleware:['auth']
})
const info = useState('addInfo', () => {
  return{
    make:'',
    model:'',
    year:'',
    price:'',
    mileage:'',
    city:'',
    seats:'',
    features: '',
    description:'',
    image: 'null'

  }
})
const inputs = [
    {
      id: 1,
      title: 'Model*',
      name: 'model',
      placeholder: 'Enter Model',
    },
    {
      id: 2,
      title: 'Year*',
      name: 'year',
      placeholder: 'Enter Year',
    },
    {
      id: 3,
      title: 'Price*',
      name: 'price',
      placeholder: 'Enter Price',
    },
    {
      id: 4,
      title: 'Mileage*',
      name: 'mileage',
      placeholder: 'Enter Mileage',
    },
    {
      id: 5,
      title: 'City*',
      name: 'city',
      placeholder: 'Enter City',
    },
    {
      id: 6,
      title: 'Seats*',
      name: 'seats',
      placeholder: 'Enter number of Seats',
    },
    {
      id: 7,
      title: 'Features*',
      name: 'features',
      placeholder: 'Add Features',
    }
  ]

const onChangeInput = (value, name) => {
  info.value[name] = value;
}
const isButtonDisabled = computed(() => {
  for(let key in info.value){
    if(info.value[key] === ''){
      return true
    }
  }
  return false;
});

const errorMessage = ref('');

const handleSubmit = async () => {
  // Handle image upload
  // const fileName = Math.floor(Math.random() * 1000000000000000000);
  // const {data, error} = await supabase.storage.from('images').upload(`public/${fileName}`, info.value.image);

  const fileName = Math.floor(Math.random() * 1000000000000000000);
  const file = info.value.image;
  const {data, error} = await supabase.storage.from('images').upload(`public/${fileName}`, file, {
    contentType: file.type,});
  if (error) {
    errorMessage.value = error.message + ' ' + error.details;
    return;
  }


  const body = {
    ...info.value,
    features: info.value.features.split(','),
    numberOfSeats: parseInt(info.value.seats),
    price: parseInt(info.value.price),
    year: parseInt(info.value.year),
    mileage: parseInt(info.value.mileage),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path
  };
  delete body.seats;

  try {
    const {data, error} = await $fetch('/api/car/listings', {
      method: 'POST',
      body
    });
    navigateTo('/profile/listings');
   
  } catch (error) {
    errorMessage.value = error.statusMessage;
    await supabase.storage.from('images').remove(data.path);
  }

}
</script>

<style>

</style>