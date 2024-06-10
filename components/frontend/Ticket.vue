<script lang="ts" setup>
import type { Ticket } from "~/types";

const props = defineProps<{ ticket: Ticket }>();
</script>

<template>
  <div class="w-full">
    <UCard :ui="{ body: { base: 'flex flex-col' } }">
      <span>Name : {{ props.ticket.ticketName }} </span>
      <span>start : {{ props.ticket.start }} </span>
      <span>end : {{ props.ticket.deadline }} </span>
      <span>category : {{ props.ticket.category }} </span>
    </UCard>
  </div>
</template>
