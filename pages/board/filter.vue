<script setup lang="ts">
definePageMeta({
  layout: "navbar",
  middleware: ["auth"],
});
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
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

const backLogItems = userTickets.value?.backlog;
const doneItems = userTickets.value?.done;
const inProgressItems = userTickets.value?.progress;
const toDoItems = userTickets.value?.todo;

const [backlog, backlogs] = useDragAndDrop(backLogItems, { group: "Board" });
const [done, dones] = useDragAndDrop(doneItems, { group: "Board" });
const [inProgress, ips] = useDragAndDrop(inProgressItems, { group: "Board" });
const [todo, todos] = useDragAndDrop(toDoItems, { group: "Board" });
</script>

<template>
  <div class="flex columns-4">
    <div>
      <ul ref="backlog" class="columns-1">
        <li v-for="bl in backlogs" :key="bl" class=""><{{ bl }}></li>
      </ul>
    </div>
    <div>
      <ul ref="todo" class="kanban-column">
        <li v-for="td in todos" :key="td" class="">
          {{ td }}
        </li>
      </ul>
    </div>
    <div>
      <ul ref="inProgress" class="kanban-column">
        <li v-for="td in ips" :key="td" class="">
          {{ td }}
        </li>
      </ul>
    </div>
    <div>
      <ul ref="done" class="kanban-column">
        <li v-for="td in dones" :key="td" class="">
          {{ td }}
        </li>
      </ul>
    </div>
  </div>
</template>
