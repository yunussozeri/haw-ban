<script lang="ts" setup>
import type { Ticket } from "~/types";

const props = defineProps<{ ticket: Ticket }>();

const startDrag = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'; 
    event.dataTransfer.setData('ticketId', props.ticket.id?.toString() ?? ''); // Use 'ticketId'
    event.dataTransfer.setData('originalStatus', props.ticket.currentColumn ?? ''); 
  }
};




</script>

<template>
    <div class="w-full" draggable="true" @dragstart="startDrag($event)">
      <UCard :ui="{ body: { base: 'flex flex-col' } }">
        <span>Name : {{ props.ticket.ticketName }} </span>
        <span>start : {{ props.ticket.start }} </span>
        <span>end : {{ props.ticket.deadline }} </span>
        <span>category : {{ props.ticket.category }} </span>
      </UCard>
    </div>
</template>
