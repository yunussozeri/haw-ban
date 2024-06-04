<template>
    <div class="h-screen">
    <!-- Hintergrund oben mit anderer Farbe -->
    <div class="bg-blue-900 text-white p-5 relative">
    <img src="https://raw.githubusercontent.com/wdm373/MyKanbanBoard-Logo/main/Board_Seite-PNG.png"
    alt="My-KanbanBoard"
    class="absolute top-0 left-0 w-[200px] h-[180px] mt-[-50px] ml-0">
    <!-- Flexbox-Container für die Icons oben rechts -->
    <div class="flex justify-end">
    <!-- MDI-Icon für den Account -->
    <UIcon name="i-heroicons-user-solid"
    class="text-xl cursor-pointer mr-2" @click="handleAccountClick">
    </UIcon>
    <!-- MDI-Icon für den Logout -->
    <UIcon name="i-heroicons-arrow-right-start-on-rectangle-20-solid"
    class="text-xl cursor-pointer mr-2" @click="handleLogoutClick">
    </UIcon>
    </div>
    </div>
    <!-- Flexbox-Container für die Anordnung -->
    <div class="flex h-full">
    <!-- Seitenleiste -->
    <div
    class="w-[200px] bg-blue-900 p-5 flex flex-col h-full">
    <!-- Inhalte der Seitenleiste -->
    <UIcon name="i-heroicons-list-bullet-20-solid"
    class="text-2xl mb-2 text-white cursor-pointer;" @click="handleListClick"></UIcon>
    <!--Icons -->
    <dic class="flex items-center mb-10 text-white cursor-pointer text-xl" @click="handelEditClick">
    <UIcon name="i-heroicons-table-cells-solid" class="text-2xl mr-4 text-white" ></UIcon>
    <span>Board</span>
    </dic>
    <div class="flex items-center mb-10 text-white cursor-pointer text-xl" @click="handelEditClick">
    <UIcon name="i-heroicons-plus-circle-20-solid" class="text-2xl mr-4 text-white" ></UIcon>
    <span>Add Ticket</span>
    </div>
    <div class="flex items-center mb-10 text-white cursor-pointer text-xl" @click="handelEditClick">
    <UIcon name="i-heroicons-chat-bubble-left-right-solid" class="text 3xl text-white mr-4"></UIcon>
    <span>Discussion</span>
    </div>
    <div class="flex items-center mb-10 text-white cursor-pointer text-xl" @click="handelEditClick">
    <UIcon name="i-heroicons-clock-solid" class="text-3xl text-white mr-4"></UIcon>
    <span>Pomodoro Timer</span>
    </div>
    <div class="flex items-center mb-10 text-white cursor-pointer text-xl" @click="handleEditClick">
    <UIcon name="i-heroicons-adjustments-horizontal" class=" text-3xl text-white  mr-4"></UIcon>
    <span>Filter</span>
    </div>
    </div>
    <table class="flex-1 w-full">
    <!-- Überschrift -->
    <thead>
    <tr class="h-10">
    <th colspan="4" class="p-5 bg-blue-800 text-white text-center">
    Kanban Board
    </th>
    </tr>
    <!-- Spaltenüberschriften -->
    <tr class="bg-blue-300 h-10">
    <th class="flex-1 text-white p-5 rounded">Backlog</th>
    <th class="flex-1 text-white p-5 rounded">To Do</th>
    <th class="flex-1 text-white p-5 rounded">In Progress</th>
    <th class="flex-1 text-white p-5 rounded">Done</th>
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