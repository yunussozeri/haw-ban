<template>
  <div class="flex bg-gray-100">
    <FrontendStatusColumn
      status="Backlog"
      :tickets="userTickets.backlog"
      @ticketMoved="onTicketMoved"
      :refresh="refresh"
    />
    <FrontendStatusColumn
      status="To Do"
      :tickets="userTickets.todo"
      @ticketMoved="onTicketMoved"
      :refresh="refresh"
    />
    <FrontendStatusColumn
      status="Doing"
      :tickets="userTickets.progress"
      @ticketMoved="onTicketMoved"
      :refresh="refresh"
    />
    <FrontendStatusColumn
      status="Done"
      :tickets="userTickets.done"
      @ticketMoved="onTicketMoved"
      :refresh="refresh"
    />
  </div>
</template>

<script setup lang="ts">
const onTicketMoved = (ticketId: number, newStatus: string) => {
  refresh();
};

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
          return ticket;
        }),
      todo: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "todo")
        .map((value) => {
          const ticket = value.tickets;
          return ticket;
        }),
      progress: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "progress")
        .map((value) => {
          const ticket = value.tickets;
          return ticket;
        }),
      done: userTickets
        .filter((ticket) => ticket.tickets.currentColumn === "done")
        .map((value) => {
          const ticket = value.tickets;
          return ticket;
        }),
    };

    return osuruk;
  },
  // Additional options (e.g., method: 'GET', etc.)
});

watchEffect(() => {
  console.log(userTickets.value);
});

// Computed property for courses
</script>

<style scoped>
/* Board Styles */
</style>
