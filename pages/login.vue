<template>
  <div>
     <h1 class="text-5xl font-bold mb-7">Login</h1>
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="login">Login with Google</button>
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'custom',
    title: 'Login',
})

const supabase = useSupabaseClient();

const login = async () => {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error('Error logging in:', error.message);
  }
}

</script>

<style>

</style>