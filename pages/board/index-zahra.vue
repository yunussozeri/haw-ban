<template>
  <div class="h-screen">
    <!-- Hintergrund oben mit anderer Farbe -->
    <div class="relative bg-blue-900 p-5 text-white">
      <img
        src="https://raw.githubusercontent.com/wdm373/MyKanbanBoard-Logo/main/Board_Seite-PNG.png"
        alt="My-KanbanBoard"
        class="absolute left-0 top-0 ml-0 mt-[-50px] h-[180px] w-[200px]"
      />
      <!-- Flexbox-Container für die Icons oben rechts -->
      <div class="flex justify-end">
        <!-- MDI-Icon für den Account -->
        <UIcon
          name="i-heroicons-user-solid"
          class="mr-2 cursor-pointer text-xl"
          @click="handleAccountClick"
        >
        </UIcon>
        <!-- MDI-Icon für den Logout -->
        <UIcon
          name="i-heroicons-arrow-right-start-on-rectangle-20-solid"
          class="mr-2 cursor-pointer text-xl"
          @click="handleLogoutClick"
        >
        </UIcon>
      </div>
    </div>
    <!-- Flexbox-Container für die Anordnung -->
    <div class="flex h-full">
      <!-- Seitenleiste -->
      <div class="flex h-full w-[200px] flex-col bg-blue-900 p-5">
        <!-- Inhalte der Seitenleiste -->
        <UIcon
          name="i-heroicons-list-bullet-20-solid"
          class="cursor-pointer; mb-2 text-2xl text-white"
          @click="handleListClick"
        ></UIcon>
        <!--Icons -->
        <dic
          class="mb-10 flex cursor-pointer items-center text-xl text-white"
          @click="handelEditClick"
        >
          <UIcon
            name="i-heroicons-table-cells-solid"
            class="mr-4 text-2xl text-white"
          ></UIcon>
          <span>Board</span>
        </dic>
        <div
          class="mb-10 flex cursor-pointer items-center text-xl text-white"
          @click="handelEditClick"
        >
          <UIcon
            name="i-heroicons-plus-circle-20-solid"
            class="mr-4 text-2xl text-white"
          ></UIcon>
          <span>Add Ticket</span>
        </div>
        <div
          class="mb-10 flex cursor-pointer items-center text-xl text-white"
          @click="handelEditClick"
        >
          <UIcon
            name="i-heroicons-chat-bubble-left-right-solid"
            class="text 3xl mr-4 text-white"
          ></UIcon>
          <span>Discussion</span>
        </div>
        <div
          class="mb-10 flex cursor-pointer items-center text-xl text-white"
          @click="handelEditClick"
        >
          <UIcon
            name="i-heroicons-clock-solid"
            class="mr-4 text-3xl text-white"
          ></UIcon>
          <span>Pomodoro Timer</span>
        </div>
        <div
          class="mb-10 flex cursor-pointer items-center text-xl text-white"
          @click="handleEditClick"
        >
          <UIcon
            name="i-heroicons-adjustments-horizontal"
            class="mr-4 text-3xl text-white"
          ></UIcon>
          <span>Filter</span>
        </div>
      </div>
      <table class="w-full flex-1">
        <!-- Überschrift -->
        <thead>
          <tr class="h-10">
            <th colspan="4" class="bg-blue-800 p-5 text-center text-white">
              Kanban Board
            </th>
          </tr>
          <!-- Spaltenüberschriften -->
          <tr class="h-10 bg-blue-300">
            <th class="flex-1 rounded p-5 text-white">Backlog</th>
            <th class="flex-1 rounded p-5 text-white">To Do</th>
            <th class="flex-1 rounded p-5 text-white">In Progress</th>
            <th class="flex-1 rounded p-5 text-white">Done</th>
          </tr>
          <!-- Leere Spalten -->
          <tr>
            <td class="p-5"></td>
            <td class="p-5"></td>
            <td class="p-5"></td>
            <td class="p-5"></td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

