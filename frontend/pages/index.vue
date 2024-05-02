<script lang="ts" setup>
async function start() {
  console.log(3131);
  await navigateTo("/register");
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to HAW-Ban</h1>
    <UButton size="xl" @click="start"> Test </UButton>
  </div>
</template>
