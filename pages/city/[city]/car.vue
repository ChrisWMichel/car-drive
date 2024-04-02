<script setup>
import { useUtils } from '~/composibles/useUtils';
const route = useRoute();
const {toTitleCase} = useUtils();
useHead({
    title: `${route.params.make ? toTitleCase(route.params.make) : 'Cars'} in ${toTitleCase(route.params.city)}`,
    
})
definePageMeta({
    layout: 'custom',
})
const goBack = () => {
    window.history.back()
    // clearError({
    //     redirect: "/"
    // });
}
</script>

<template>
  <div>
    <div class="mt-32 flex">
        <NuxtErrorBoundary>
            <car-details-side-bar />
            <NuxtPage />    
            <template #error="{error}">
                <div class="text-center mx-auto flex flex-col">
                    <h1 class="text-2xl font-bold"> {{ error }}</h1>
                     <p class="text-lg">{{ error.statusMessage }}</p> 
                    <button @click="goBack" class="bg-blue-400 text-white p-2 rounded mt-5">Go Back</button>
                </div>
            </template>
        </NuxtErrorBoundary>    
    </div>
    </div>
</template>

<style>

</style>