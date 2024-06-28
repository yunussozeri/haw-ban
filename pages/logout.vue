<script lang="ts" setup>
definePageMeta({
  layout: false,
  //middleware: ["guest-only"],
});

const { signOut } = useAuth();
</script>

<template>
  <div class="flex bg-center">
    <UButton @click="signOut"> Log Out </UButton>
  </div>
</template>
