<template>
  <div class="flex">
    <div class="flex-1">
      <img src="../public/images/loginphoto.svg" alt="Login Image" />
    </div>
    <div class="flex flex-1 flex-col items-start p-8">
      <h1 class="mb-4 ml-24 mt-8 text-8xl font-bold">
        <span class="font-sans text-4xl">login</span>
      </h1>
      <h2 class="mb-4 ml-40 mt-[-35px] text-2xl font-bold">
        <span class="font-comic text-xl">MY KANBAN BOARD</span>
      </h2>
      <h3 class="mb-12 ml-24 mt-[-4px] text-2xl font-normal text-gray-600">
        <span class="font-sans text-lg"
          >Welcome back! Please login to your account.</span
        >
      </h3>
      <div class="flex w-full justify-center">
        <UButton size="xl" icon="i-mdi-github" @click="signIn('github')"
          >Login</UButton
        >
        <UButton size="xl" icon="i-mdi-github" @click="signIn('google')"
          >Login</UButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const { signIn } = useAuth();
</script>
