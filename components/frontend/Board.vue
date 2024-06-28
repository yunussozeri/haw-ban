<template>
  <!-- <div v-if="userTickets" class="flex">
    <FrontendBoardHelper v-bind="userTickets" />
    
  </div> -->
  <div v-if="userTickets" class="flex">
    <FrontendStatusColumn status="Backlog" :tickets="userTickets.backlog" />
    <FrontendStatusColumn status="To Do" :tickets="userTickets.todo" />
    <FrontendStatusColumn status="Doing" :tickets="userTickets.progress" />
    <FrontendStatusColumn status="Done" :tickets="userTickets.done" />
  </div>
</template>

<script setup lang="ts">
const {
  data: userTickets,
  pending,
  error,
  refresh,
} = await useFetch("/api/ticket/", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
  transform: (userTickets) => {
    const osuruk = {
      backlog: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "backlog")
        .map((value) => {
          const ticket = value.tickets;
          return {
            ...ticket,
            deadline: new Date(ticket.deadline!),
            start: new Date(ticket.start),
          };
        }),
      todo: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "todo")
        .map((value) => {
          const ticket = value.tickets;

          return {
            ...ticket,
            deadline: new Date(ticket.deadline!),
            start: new Date(ticket.start),
          };
        }),
      progress: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "progress")
        .map((value) => {
          const ticket = value.tickets;

          return {
            ...ticket,
            deadline: new Date(ticket.deadline!),
            start: new Date(ticket.start),
          };
        }),
      done: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "done")
        .map((value) => {
          const ticket = value.tickets;
          return {
            ...ticket,
            deadline: new Date(ticket.deadline!),
            start: new Date(ticket.start),
          };
        }),
    };

    return osuruk;
  },
});
</script>
