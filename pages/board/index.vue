<template>
  <div class="h-screen flex flex-col">
    <div class="bg-blue-800 p-4 flex items-center justify-between text-white">
      <h1 class="text-2xl font-bold">Kanban Board</h1>
      </div>

    <div class="flex-grow overflow-auto p-4">
      <kanbanBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
import kanbanBoard from "../../frontend/components/board.vue";
definePageMeta({
  layout: 'navbar',
});
</script>
