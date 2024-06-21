<template>
  <div class="flex h-screen flex-col">
    <div class="flex items-center justify-between bg-darkblue p-4 text-white">
      <h1 class="text-2xl font-bold">Kanban Board</h1>
    </div>

    <div class="flex-grow overflow-auto p-4">
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
