<script setup>
import { useCars } from "~/composibles/useCars";
import useFetchCar from "~/composibles/useFetchCar";

const route = useRoute();

const {data:car} = await useFetchCar(route.params.id);

useHead({
    title: route.params.name,
})
if(!car.value) {
    throw createError({
        statusCode: 404,
        statusMessage: `Car with ID ${route.params.id} not found.`,
    })
}   
definePageMeta({
    layout: 'custom',
})
</script>

<template>
    <div>
        <car-details-hero :car="car" />
        <car-details-attributes :features="car.features" />
        <car-details-description :description="car.description"/>
        <car-details-contacts />
    </div>
    
</template>