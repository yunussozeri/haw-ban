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
      <!--<form @submit.prevent="login" class="ml-24">
        <div class="mb-6 flex flex-col">
          <label for="username" class="text-xl font-semibold"
            ><span class="font-sans text-sm text-gray-600"></span
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            class="mb-12 w-80 rounded-full border-2 border-gray-300 p-2 text-lg"
          />
        </div>
        <div class="mb-2 flex flex-col">
          <label for="password" class="text-xl font-semibold"
            ><span class="font-sans text-sm text-gray-600"></span
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="mb-4 w-80 rounded-full border-2 border-gray-300 p-2 text-lg"
          />
        </div>
        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            v-model="rememberMe"
            class="mr-2"
          />
          <label for="rememberMe" class="text-xs text-gray-600"
            >Remember Me</label
          >
          <a href="#" class="ml-32 text-xs text-gray-600">Forgot Password?</a>
        </div>
        <button type="submit" class="mb-4 ml-24 mt-8 text-lg text-gray-600">
          New User? Sign Up
        </button>
      </form>
      -->
      <div class="flex w-full justify-center">
        <UButton size="xl" icon="i-mdi-github" @click="signIn()">Login</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

async function signIn() {
  const client = useSupabaseClient();

  client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "localhost:3000/",
    },
  });
}
</script>
