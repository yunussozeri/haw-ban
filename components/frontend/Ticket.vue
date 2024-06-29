<script lang="ts" setup>
import { format } from "date-fns";
import type { Ticket } from "~/types";

const props = defineProps<{ ticket: Ticket }>();

const startDrag = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("ticketId", props.ticket.id?.toString() ?? ""); // Use 'ticketId'
    event.dataTransfer.setData(
      "originalStatus",
      props.ticket.currentColumn ?? "",
    );
  }
};

const formatDate = (date: Date | null | undefined) => {
  if (!date) return "N/A";
  return format(new Date(date), "yyyy-MM-dd");
};

const categoryColorClass = computed(() => {
  switch (props.ticket.category) {
    case "uni":
      return "badge-primary"; // Blue-500
    case "freizeit":
      return "badge-secondary"; // Blue-600
    case "hobby":
      return "badge-accent"; // Blue-700
    case "sport":
      return "badge-info"; // Blue-400
    default:
      return "badge-neutral"; // Gray-500
  }
});
</script>

<template>
  <div
    class="mb-5 w-full cursor-move"
    draggable="true"
    @dragstart="startDrag($event)"
  >
    <div class="card card-compact bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-primary">{{ props.ticket.ticketName }}</h2>
        <div class="badge mb-2" :class="categoryColorClass">
          {{ props.ticket.category }}
        </div>
        <div class="flex items-center justify-between text-sm">
          <p>
            <Icon name="ic:round-calendar-today" class="mr-1" /> Start:
            {{ formatDate(props.ticket.start) }}
          </p>
          <p>
            <Icon name="ic:round-calendar-today" class="mr-1" /> End:
            {{ formatDate(props.ticket.deadline) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
