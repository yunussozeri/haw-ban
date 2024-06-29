<template>
  <div
    class="columntransition mr-1 min-h-full flex-grow"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <h2
      class="columntransition__header mb-2 flex items-center justify-center rounded p-3 text-xl font-semibold"
      :style="{ backgroundColor: headerColor, color: headerTextColor }"
    >
      {{ status }}
    </h2>
    <div
      class="columntransition__content min-h-[300px] rounded-b-md bg-gray-100 p-4"
    >
      <template v-for="ticket in props.tickets" :key="ticket.id">
        <FrontendTicket :ticket />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from "~/types";

const props = defineProps<{ status: string; tickets: Ticket[] }>();
const emit = defineEmits<{
  (e: "ticketMoved", ticketId: number, newStatus: string): void;
}>(); // Emit event

const onDrop = async (event: DragEvent) => {
  console.log("onDrop called");
  const ticketIdString = event.dataTransfer?.getData("ticketId");
  const originalStatus = event.dataTransfer?.getData(
    "originalStatus",
  ) as Ticket["currentColumn"]; // Type assertion here

  // Convert ticketIdString to a number if it exists
  const ticketId = ticketIdString ? parseInt(ticketIdString, 10) : undefined;

  const ticketIndex = props.tickets.findIndex(
    (ticket) => ticket.id === ticketId,
  ); // Calculate once

  const updatedStatus =
    props.status === "Doing" ?
      "progress"
    : props.status.toLowerCase().replace(/\s+/g, "");

  // Remove the ticket from the current column
  props.tickets.splice(ticketIndex, 1);
  console.log("before fetch");
  try {
    await $fetch("/api/ticket/dragpdropNew", {
      method: "POST",
      body: {
        ticketId,
        newStatus: updatedStatus,
        from: originalStatus.toLowerCase().replace(/\s+/g, ""),
        to: updatedStatus,
      },
    });

    // Emit event to notify the parent component
  } catch (error) {
    console.error("Error updating ticket status:", error);
    // Handle the error (e.g., show a notification)

    // Add the ticket back to the original position if the API call fails
    props.tickets.splice(ticketIndex, 0, {
      ...props.tickets.find((t) => t.id === ticketId),
      currentColumn: originalStatus,
    });
  } finally {
    // Add a finally block
    emit("ticketMoved", ticketId, updatedStatus);
  }
};

// Computed properties for header color and text color based on status
const headerColor = computed(() => {
  switch (props.status) {
    case "Backlog":
      return "#6366f1"; // Indigo-600
    case "To Do":
      return "#6366f1"; // Sky-500
    case "Doing":
      return "#6366f1"; // Yellow-400
    case "Done":
      return "#6366f1"; // Green-500
    default:
      return "#6366f1"; // Slate-500
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
