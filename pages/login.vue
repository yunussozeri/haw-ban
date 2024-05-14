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
<template>
  <div class="flex h-screen w-screen">
    <div class="flex w-1/2 items-center justify-center">
      <!-- Set a fixed size for the image container -->
      <div
        class="flex h-96 w-96 items-center justify-center overflow-hidden rounded-full"
      >
        <!-- Image fills the container and is clipped to the boundary -->
        <NuxtImg
          class="h-full w-full object-cover"
          src="../public/images/loginphoto.svg"
          alt="Startpic"
        />
      </div>
    </div>

    <div class="flex h-full flex-1 flex-col items-center justify-center gap-8">
      <NuxtLink to="/">
        <h1 class="font-comic-sans-ms text-4xl font-bold">MY KANBAN BOARD</h1>
      </NuxtLink>
      <UButton size="xl" icon="i-mdi-github" @click="signIn()">Login</UButton>
    </div>
  </div>
</template>
