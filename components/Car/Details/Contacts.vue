<template>
  <div>
    <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-5 rounded">
        <h2 class="text-2xl">Message Status</h2>
        <p v-if="!errorMessage">Your message has been sent to the seller</p>
        <p v-else>{{ errorMessage }}</p>
        <button @click="modalOpen = false" class="bg-blue-400 text-white py-2 px-4 rounded mt-4">Close</button>
      </div>
    </div>
    <!-- Modal -->
    <div class="mt-10">
      <div class="flex w-[600px] justify-between">
        <input v-model="message.name" type="text" placeholder="Name" class="border p-1">
        <input v-model="message.email" type="text" placeholder="Email" class="border p-1">
        <input  :value="formattedPhoneNumber" @input="rawPhoneNumber = $event.target.value" type="text" placeholder="Phone" class="border p-1">
      </div>
        <div class="flex mt-4 w-[600px]">
          <textarea v-model="message.message" class="border p-1 w-full" placeholder="Message"></textarea>
        </div>
        <button @click="onSubmit" :disabled="disableButton" class="bg-blue-400 text-white py-3 px-10 rounded mt-4">Contact Seller</button>
        <p v-if="errorMessage" class="text-red-500 mt-3">{{errorMessage}}</p>
      
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const modalOpen = ref(false);
const errorMessage = ref('');
const message = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const disableButton = computed(() => {
  for (let key in message) {
    if (!message[key]) return true; 
  }
  return false;
})

const onSubmit = async ()  => {
  try {
    await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: 'POST',
      body: JSON.stringify(message)
    });
   
  } catch (error) {
    errorMessage.value = error.statusMessage;
  }
  

  for (let key in message) {
    message[key] = '';
  }
  rawPhoneNumber.value = ''; 
  modalOpen.value = true; 
}
/** Add hyphens to the phone number */
const rawPhoneNumber = ref('');
const formattedPhoneNumber = computed(() => {
  let numbers = rawPhoneNumber.value.replace(/\D/g, '');
  let char = {0: '(', 3: ') ', 6: '-'};
  numbers = numbers.slice(0, 10);
  let phoneNumber = '';
  for (let i = 0; i < numbers.length; i++) {
    phoneNumber += (char[i] || '') + numbers[i];
  }
  return phoneNumber;
});

watchEffect(() => {
  message.phone = formattedPhoneNumber.value;
});
</script>

<style>

</style>