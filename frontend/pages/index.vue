<template>
  <NuxtPage />
  <div class="w-full h-full flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to HAW-Ban</h1>
    <UButton size="xl" class="mb-4 bg-blue-500 text-white hover:bg-blue-600">
      <NuxtLink to="/board/"> Navigate to Kanban-Board</NuxtLink>
    </UButton>
    <UButton size="xl" class="mb-4 bg-blue-500 text-white hover:bg-blue-600">
      <NuxtLink to="/register"> Navigate to Register page</NuxtLink>
    </UButton>
    <UButton size="xl" class="bg-blue-500 text-white hover:bg-blue-600">
      <NuxtLink to="/login"> Navigate to Login page</NuxtLink>
    </UButton>
  </div>
</template>
