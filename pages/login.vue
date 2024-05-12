<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="flex h-screen w-screen">
    <div class="flex h-full flex-1 items-center justify-center">
      <NuxtImg
        class="w-full"
        src="https://cataas.com/cat"
        alt="Startpic"
        fit="inside"
      />
    </div>
    <div class="flex h-full flex-1 flex-col items-center justify-center gap-8">
      <NuxtLink to="/">
        <h1 class="font-comic-sans-ms text-4xl font-bold">MY KANBAN BOARD</h1>
      </NuxtLink>
      <UButton size="xl" icon="i-mdi-github">Login</UButton>
    </div>
  </div>
</template>
