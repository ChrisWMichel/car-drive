<template>
    <div>
        <div class="shadow rounded p-3 mt-5">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl">My Listings</h2>
                <nuxt-link to="/profile/listings/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</nuxt-link>
            </div>                     
        </div>
        <div class="shadow rounded p-3 mt-5">
            <CarListingCard 
            v-for="listing in listings" 
            :key="listing.id" 
            :listing="listing" 
            @deleteListing="deleteListing"
            />
        </div>  
    </div>
</template>

<script setup>

const user = useSupabaseUser();
 const {data:listings} = await useFetch(`/api/car/listings/user/${user.value.id}`)

definePageMeta({
    layout: 'custom',
    title: 'My Listings',
    description: 'My Listings',
    middleware:['auth']
})

const deleteListing = async (id) => {
    await $fetch(`/api/car/listings/${id}`, {
        method: 'DELETE'
    })
    const index = listings.value.findIndex(listing => listing.id === id);
    listings.value.splice(index, 1);
    
}
</script>