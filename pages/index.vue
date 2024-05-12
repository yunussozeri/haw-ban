<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">Welcome to HAW-Ban</h1>
    <UButton size="xl" class="mb-4 text-white">
      <NuxtLink to="/board/">Navigate to Kanban-Board</NuxtLink>
    </UButton>
    <UButton size="xl" class="mb-4 text-white">
      <NuxtLink to="/register">Navigate to Register page</NuxtLink>
    </UButton>
    <UButton size="xl" class="text-white">
      <NuxtLink to="/login">Navigate to Login page</NuxtLink>
    </UButton>
  </div>
</template>
