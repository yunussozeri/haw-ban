<template>
  <div class="flex h-screen flex-col" data-theme="winter">
    <div class="flex-grow overflow-auto bg-gray-100 p-4">
      <FrontendBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "navbar",
  middleware: ["auth"],
});
</script>
