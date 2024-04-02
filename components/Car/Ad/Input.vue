<template>
  <div class="flex flex-col w-[48%]">
    <label for="carmake" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <input type="text" class="p-2 border w-100 rounded" 
    :placeholder="placeholder" 
    v-model="state" 
    :name="name"
    @input="onChange"
    >
  </div>
</template>

<script setup>

const props = defineProps({
  title: String,
  placeholder: String,
  name: String,
})
const state = ref('');
const emits = defineEmits(['changeInput']);

const onChange = () => {
  emits('changeInput', state.value, props.name);
}

</script>

<style>

</style>