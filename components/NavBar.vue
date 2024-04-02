<template>
    <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
      <NuxtLink to="/" class="text-3xl font-mono">Car Dealer</NuxtLink>
      <div class="flex flex-row">
        <NuxtLink to="/login" v-if="!user" class="text-2xl text-blue-500 hover:text-blue-700">Login</NuxtLink>
        <NuxtLink to="/profile/listings" v-if="user" class="text-2xl mx-3 text-blue-500 hover:text-blue-700">Profile</NuxtLink>
        <!-- <NuxtLink to="/" v-if="user" class="text-2xl ml-2 text-blue-500 hover:text-blue-700">Logout</NuxtLink> -->
        <p v-if="user" class="cursor-pointer text-2xl text-blue-500 hover:text-blue-700" @click="logout">Logout</p>
      </div>
    </header>   
  </template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    user.value = null;
    navigateTo('/');
    if (error) {
      console.error('Error logging out:', error.message);
    }
  }
 

</script>