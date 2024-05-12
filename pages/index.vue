<template>
  <NuxtPage />
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">Welcome to HAW-Ban</h1>
    <UButton size="xl" class="mb-4 bg-blue-500 text-white hover:bg-blue-600">
      <NuxtLink to="/board/">Navigate to Kanban-Board</NuxtLink>
    </UButton>
    <UButton size="xl" class="mb-4 bg-blue-500 text-white hover:bg-blue-600">
      <NuxtLink to="/register">Navigate to Register page</NuxtLink>
    </UButton>
    <UButton size="xl" class="bg-blue-500 text-white hover:bg-blue-600">
      <NuxtLink to="/login">Navigate to Login page</NuxtLink>
    </UButton>
  </div>
</template>
