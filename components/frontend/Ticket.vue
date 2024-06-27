<script lang="ts" setup>
import { format } from "date-fns";
import type { Ticket } from "~/types";

const props = defineProps<{ ticket: Ticket }>();

const startDrag = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('ticketId', props.ticket.id?.toString() ?? ''); // Use 'ticketId'
    event.dataTransfer.setData('originalStatus', props.ticket.currentColumn ?? '');
  }
};

const formatDate = (date: Date | null | undefined) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'yyyy-MM-dd');
};


</script>

<template>
  <div class="w-full mb-5 cursor-move" draggable="true" @dragstart="startDrag($event)">
    <div class="card card-compact bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-primary">{{ props.ticket.ticketName }}</h2>
        <div class="badge badge-secondary mb-2">{{ props.ticket.category }}</div>
        <div class="flex justify-between items-center text-sm">
          <p>
            <Icon name="ic:round-calendar-today" /> Start: {{ formatDate(props.ticket.start) }}
          </p>
          <p>
            <Icon name="ic:round-calendar-today" /> End: {{ formatDate(props.ticket.deadline) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
