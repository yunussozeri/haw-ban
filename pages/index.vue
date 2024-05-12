<script lang="ts" setup>
async function logout() {
  const client = useSupabaseClient();

  client.auth.signOut();
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-4">
    <h1 class="text-4xl font-bold">Welcome to HAW-Ban</h1>
    <UButton size="xl">
      <NuxtLink to="/board/">Navigate to Kanban-Board</NuxtLink>
    </UButton>
    <UButton size="xl">
      <NuxtLink to="/register">Navigate to Register page</NuxtLink>
    </UButton>
    <UButton size="xl">
      <NuxtLink to="/login">Navigate to Login page</NuxtLink>
    </UButton>
    <UButton size="xl" @click="logout()"> log out </UButton>
  </div>
</template>
