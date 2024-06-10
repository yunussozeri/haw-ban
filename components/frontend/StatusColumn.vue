<template>
  <div class="columntransition min-h-full flex-grow border-r border-white">
    <h2
      class="columntransition__header mb-2 flex items-center justify-center rounded-t-md p-3 text-xl font-semibold"
      :style="{ backgroundColor: headerColor, color: headerTextColor }"
    >
      {{ status }}
    </h2>
    <div
      class="columntransition__content min-h-[300px] rounded-b-md bg-gray-100 p-4"
    >
      <template v-for="ticket in props.tickets" :key="ticket.id"
        ><FrontendTicket :ticket />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from "~/types";
const props = defineProps<{ status: string; tickets: Ticket[] }>();

watchEffect(() => {
  console.log("hello ", props.tickets);
});

// Computed properties for header color and text color based on status
const headerColor = computed(() => {
  switch (props.status) {
    case "Backlog":
      return "#6366f1"; // Indigo-600
    case "To Do":
      return "#0ea5e9"; // Sky-500
    case "Doing":
      return "#facc15"; // Yellow-400
    case "Done":
      return "#22c55e"; // Green-500
    default:
      return "#64748b"; // Slate-500
  }
});

const headerTextColor = computed(() => {
  return "#ffffff";
});
</script>

<style scoped>
.columntransition {
  transition: background-color 0.3s ease;
}
</style>
