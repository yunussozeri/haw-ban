<script lang="ts" setup>
import { format, differenceInDays, isPast } from "date-fns";

import type { Ticket } from "~/types";

const props = defineProps<{ ticket: Ticket }>();

const daysLeft = computed(() => {
  if (!props.ticket.deadline) return "N/A";

  const deadline = new Date(props.ticket.deadline);
  const today = new Date();
  const diffDays = differenceInDays(deadline, today);

  if (isPast(deadline)) {
    return "Overdue";
  } else if (diffDays > 21) {
    return `${diffDays} days left`;
  } else {
    return `${diffDays} days left`;
  }
});

const daysLeftColorClass = computed(() => {
  if (!props.ticket.deadline) return "";
  const deadline = new Date(props.ticket.deadline);
  const today = new Date();
  const diffDays = differenceInDays(deadline, today);

  if (isPast(deadline)) {
    return "badge-error"; // Red for overdue
  } else if (diffDays <= 7) {
    return "badge-warning"; // Yellow for 7 days or less
  } else {
    return "badge-success"; // Green for more than 7 days
  }
});
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
</script>

<template>
  <div
    class="mb-5 w-full cursor-move rounded-md border bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
    draggable="true"
    @dragstart="startDrag($event)"
  >
    <div class="p-4">
      <div class="flex items-start justify-between">
        <h2 class="text-lg font-semibold">{{ props.ticket.ticketName }}</h2>
        <div class="badge mb-2">
          {{ props.ticket.category }}
        </div>
      </div>

      <div v-if="props.ticket.comment" class="mt-4 border-t pt-4">
        <p class="mt-1 text-gray-600">
          {{ props.ticket.comment }}
        </p>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center">
          <Icon name="ic:round-calendar-today" class="mr-1 h-4 w-4" />
          <span class="text-xs text-gray-500">{{
            formatDate(props.ticket.deadline)
          }}</span>
        </div>
        <div class="badge" :class="daysLeftColorClass">
          <Icon name="heroicons:clock" class="mr-1 h-4 w-4" />
          {{ daysLeft }}
        </div>
      </div>
    </div>
  </div>
</template>
