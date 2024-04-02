<template>
  <div class="col-md-5 offset-md-1 mt-2 w-full">
    <label for="image" class="text-cyan-500 mb-1 text-sm"></label>
    
    <form @submit.prevent="onSubmit">
      <div class="form-group mt-2">
        <div class="relative">
          <input type="file" accept="image/*" class="hidden absolute cursor-pointer" id="image" @change="onImageUpload" ref="fileInput"/>
          <span class="bg-cyan-500 text-white p-2 rounded cursor-pointer" @click="onFileInput" >Upload Image</span>
        </div>
        <div class="border p-2 mt-3 w-56" v-if="image.preview">
          <img :src="image.preview" class="w-full img-fluid" alt="preview"/>
        </div>
      </div>
    </form>
    
  </div>
</template>

<script setup>
const image = useState('carImage', () => {
  return {
    preview: null,
    image: null
  }
});

const emits = defineEmits(['changeImage']);

const onImageUpload = (e) => {
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    }
    image.value.image = URL.createObjectURL(file);
    reader.readAsDataURL(file);
    emits('changeImage', image.value.image, "image");
    
  }
};
const fileInput = ref(null);

const onFileInput = () => {
  fileInput.value.click();
};
</script>

<style>

</style>