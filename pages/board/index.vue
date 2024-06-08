<template>
  <div class="h-screen">
    <!-- Flexbox-Container für die Anordnung -->
    <div class="flex h-full">
      <table class="w-full flex-1">
        <!-- Überschrift -->
        <thead>
          <tr class="h-10">
            <th colspan="4" class="bg-blue-800 p-5 text-center text-white">
              Kanban Board
            </th>
          </tr>
          <tr class="h-10">
            <th colspan="4" class="bg-blue-800 p-5 text-center text-white">
              <div class="flex justify-center space-x-2">
                <div class="flex overflow-hidden rounded-md">
                  <input type="text" class="w-96 rounded-l-md p-1 text-sm" />
                  <button
                    class="rounded-r-md bg-blue-900 px-3.5 py-1 text-sm text-white"
                  >
                    Go
                  </button>
                </div>
                <button
                  class="rounded-md bg-white px-2 py-1 text-sm text-blue-800"
                >
                  Clear
                </button>

                <button
                  id="dropdownCheckboxButton"
                  data-dropdown-toggle="dropdownDefaultCheckbox"
                  class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Dropdown checkbox
                  <svg
                    class="ms-3 h-2.5 w-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <!-- Dropdown menu -->
                <div
                  id="dropdownDefaultCheckbox"
                  class="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                >
                  <ul
                    class="space-y-3 p-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownCheckboxButton"
                  >
                    <li>
                      <div class="flex items-center">
                        <input
                          id="checkbox-item-1"
                          type="checkbox"
                          value=""
                          class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                        />
                        <label
                          for="checkbox-item-1"
                          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >Group</label
                        >
                      </div>
                    </li>
                    <li>
                      <div class="flex items-center">
                        <input
                          checked
                          id="checkbox-item-2"
                          type="checkbox"
                          value=""
                          class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                        />
                        <label
                          for="checkbox-item-2"
                          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >Private</label
                        >
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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

<script lang="ts" setup>
definePageMeta({
  layout: "navbar",
});
</script>
