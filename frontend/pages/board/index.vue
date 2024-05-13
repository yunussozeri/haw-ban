<template>

  <div style="height: 100vh;">

    <!-- Hintergrund oben mit anderer Farbe -->

    <div style="background-color: #132A94; color: #fff; padding: 20px;">

      <img src="https://raw.githubusercontent.com/wdm373/MyKanbanBoard-Logo/main/Board_Seite-PNG.png" alt="My-KanbanBoard" style="position: absolute; top: 0; left: 0; width: 175px; height: 150px; margin-top: 10px; margin-left: 0px;">

      <!-- Flexbox-Container für die Icons oben rechts -->

      <div style="display: flex; justify-content: flex-end;">

        <!-- MDI-Icon für den Account -->

        <UIcon name="i-heroicons-user-solid" style="font-size: 24px; cursor: pointer;" @click="handleAccountClick"></UIcon>

        <!-- MDI-Icon für den Logout -->

        <UIcon name="i-heroicons-arrow-right-start-on-rectangle-20-solid" style="font-size: 24px; margin-left: 10px; cursor: pointer;" @click="handleLogoutClick"></UIcon>

      </div>

    </div>

 

    <!-- Flexbox-Container für die Anordnung -->

    <div style="display: flex; height: 100%;">

      <!-- Seitenleiste -->

      <div style="width: 200px; background-color: #132A94; padding: 20px; height: 100%; display: flex; flex-direction: column;">

        <!-- Inhalte der Seitenleiste -->

        <UIcon name="i-heroicons-list-bullet-20-solid" style="font-size: 25px; margin-bottom: 10px; color: #fff; cursor: pointer;" @click="handleListClick"></UIcon>

 

        <div style="display: flex; align-items: center; margin-bottom: 10px; color: #fff; cursor: pointer;" @click="handleEditClick">

        <UIcon name="i-heroicons-table-cells-solid" style="font-size: 25px; margin-right: 10px; color: #fff;"></UIcon>

        <span>Board</span>

        </div>

 

        <div style="display: flex; align-items: center; margin-bottom: 10px; color: #fff; cursor: pointer;" @click="handleEditClick">

        <UIcon name="i-heroicons-plus-circle-20-solid" style="font-size: 25px; margin-right: 10px; color: #fff;"></UIcon>

        <span>Add Ticket</span>

        </div>

 

        <div style="display: flex; align-items: center; margin-bottom: 10px; color: #fff; cursor: pointer;" @click="handleEditClick">

        <UIcon name="i-heroicons-chat-bubble-left-right-solid" style="font-size: 25px; margin-right: 10px; color: #fff;"></UIcon>

        <span>Discussion</span>

        </div>

 

        <div style="display: flex; align-items: center; margin-bottom: 10px; color: #fff; cursor: pointer;" @click="handleEditClick">

        <UIcon name="i-heroicons-clock-solid" style="font-size: 25px; margin-right: 10px; color: #fff;"></UIcon>

        <span>Pomodoro Timer</span>

        </div>

 

        <div style="display: flex; align-items: center; margin-bottom: 10px; color: #fff; cursor: pointer;" @click="handleEditClick">

        <UIcon name="i-heroicons-adjustments-horizontal" style="font-size: 25px; margin-right: 10px; color: #fff;"></UIcon>

        <span>Filter</span>

        </div>

      </div>

 

      <table style="flex: 1;">

  <!-- Überschrift -->

  <thead>

    <tr style="height: 40px;">

      <th colspan="4" style="padding: 20px; background-color: #3C4685; color: #fff; text-align: center;">

        Kanban Board

      </th>

    </tr>

    <!-- Spaltenüberschriften -->

    <tr style="background-color: #A7B4CF; height: 40px;">

      <th style="flex: 1; color: #fff; padding: 20px; border-radius: 5px;">Backlog</th>

      <th style="flex: 1; color: #fff; padding: 20px; border-radius: 5px;">To Do</th>

      <th style="flex: 1; color: #fff; padding: 20px; border-radius: 5px;">In Progress</th>

      <th style="flex: 1; color: #fff; padding: 20px; border-radius: 5px;">Done</th>

    </tr>

    <!-- Leere Spalten -->

    <tr>

      <td style="padding: 20px;"></td>

      <td style="padding: 20px;"></td>

      <td style="padding: 20px;"></td>

      <td style="padding: 20px;"></td>

    </tr>

  </thead>

</table>

 

 

    </div>

  </div>

</template>

