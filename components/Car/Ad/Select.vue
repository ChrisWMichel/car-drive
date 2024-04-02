<template>
  <div class="flex flex-col w-[48%]">
    <label for="carmake" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <select 
    v-model="state" 
    name="carmake" 
    id="carmake" 
    class="p-2 border rounded w-100"
    @change="onChange"
    >
      <option 
      v-for="option in options" 
      :key="option" 
      :value="option"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script setup>

const props = defineProps({
  title: String,
  options: Array,
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