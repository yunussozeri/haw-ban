<template>
    <div class="flex">
      <div class="flex-1">
        <img src="https://raw.githubusercontent.com/wdm373/MyKanbanBoard-Logo/6ac26beea3482351aa356ea9bf0b216a3a694f3b/Login-Seite.png" alt="Login Image">
      </div>
      <div class="flex-1 flex flex-col items-start p-8">
        <h1 class="text-8xl font-bold mb-4 ml-24 mt-8"><span class="font-sans text-4xl">login</span></h1>
        <h2 class="text-2xl font-bold mb-4 ml-40 mt-[-35px]"><span class="font-comic text-xl">MY KANBAN BOARD</span></h2>
        <h3 class="text-2xl font-normal mb-12 ml-24 mt-[-4px] text-gray-600"><span class="font-sans text-lg">Welcome back! Please login to your account.</span></h3>
        <form @submit.prevent="login" class="ml-24">
  
          <div class="flex flex-col mb-6">
            <label for="username" class="text-xl font-semibold"><span class="font-sans text-sm text-gray-600"></span>Username</label>
            <input type="text" id="username" v-model="username" placeholder="Enter your username" class="text-lg mb-12 border-2 border-gray-300 p-2 rounded-full w-80">
          </div>
          <div class="flex flex-col mb-2">
            <label for="password" class="text-xl font-semibold"><span class="font-sans text-sm text-gray-600"></span>Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password" class="text-lg mb-4 border-2 border-gray-300 p-2 rounded-full w-80">
          </div>
          <div class="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" v-model="rememberMe" class="mr-2">
            <label for="rememberMe" class="text-xs text-gray-600">Remember Me</label>
            <a href="#" class="text-xs text-gray-600 ml-32">Forgot Password?</a>
          </div>
          <button type="submit" class="text-lg mt-8 mb-4 ml-24 text-gray-600">New User? Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script
  lang="ts" setup>
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
/*
  export default {
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false
      };
    },
    methods: {
      login() {
        
      }
    }
  } */
  </script>
  
  