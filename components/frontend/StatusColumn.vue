<template>
  <div class="columntransition flex-grow">
    <h2
      class="columntransition__header mb-2 flex items-center justify-center rounded-t-md p-3 text-xl font-semibold text-white"
      :style="{ backgroundColor: headerColor }"
    >
      {{ status }}
    </h2>
    <ul
      ref="col"
      class="columntransition__content min-h-[300px] rounded-b-md bg-gray-100 p-4"
    >
      <li v-for="ticket in tickets" :key="ticket.id">
        <FrontendTicket :ticket />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import type { Ticket } from "~/types";
const props = defineProps<{ status: string; tickets: Ticket[] }>();

// watchEffect(() => {
//   console.log("hello ", props.tickets);
// });

const [col, tickets] = useDragAndDrop(props.tickets, { group: "Board" });

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
</script>

<style scoped>
.columntransition {
  transition: background-color 0.3s ease;
}
</style>
