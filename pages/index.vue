<template>
  <div class="hero min-h-screen" data-theme="winter">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img
        src="../public/images/loginphoto.svg"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <h1 class="text-5xl font-bold">HAW-Ban</h1>
        <p class="py-6">Welcome to HAW-Ban! Please login to your account.</p>
        <UButton
          class="btn btn-primary"
          size="xl"
          icon="i-mdi-github"
          @click="signIn()"
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

async function signIn() {
  const client = useSupabaseClient();

  client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/board",
    },
  });
}
</script>
