<template>
  <div class="h-screen">

  <!-- Flexbox-Container für die Anordnung -->
  <div class="flex h-full">
  
  <table class="flex-1 w-full">
  <!-- Überschrift -->
  <thead>
  <tr class="h-10">
  <th colspan="4" class="p-5 bg-blue-800 text-white text-center">
  Kanban Board
  </th>
  </tr>
  <tr class="h-10">
    <th colspan="4" class="p-5 bg-blue-800 text-white text-center">
    <div class="flex space-x-2 justify-center">
        <div class="flex rounded-md overflow-hidden">
          <input type="text" class="w-96 p-1 text-sm rounded-l-md" />
          <button class="bg-blue-900 text-white px-3.5 py-1 text-sm rounded-r-md">Go</button>
        </div>
        <button class="bg-white text-blue-800 px-2 py-1 text-sm rounded-md">Clear</button>
        
<button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox" class="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown checkbox <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<!-- Dropdown menu -->
<div id="dropdownDefaultCheckbox" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
    <ul class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
      <li>
        <div class="flex items-center">
          <input id="checkbox-item-1" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="checkbox-item-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Group</label>
        </div>
      </li>
      <li>
        <div class="flex items-center">
            <input checked id="checkbox-item-2" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="checkbox-item-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private</label>
          </div>
      </li>
    </ul>
</div>
    </div>
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

  <script lang="ts" setup>  
definePageMeta({
  layout: 'navbar',
});

</script>