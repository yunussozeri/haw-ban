<script setup lang="ts">
const route = useRoute();

const links = [
  [
    {
      label: "Board",
      icon: "i-heroicons-table-cells-solid",
      to: "/board/",
    },
    {
      label: "Add Ticket",
      icon: "i-heroicons-plus-circle-20-solid",
      to: "../../ticket-submit",
    },
    {
      label: "Discussion",
      icon: "i-heroicons-chat-bubble-left-right-solid",
      to: "/",
    },
    {
      label: "Pomodoro Timer",
      icon: "i-heroicons-clock-solid",
      to: "/board/pomodoro",
    },
    {
      label: "Filter",
      icon: "i-heroicons-adjustments-horizontal",
      to: "/board/filter",
    },
    {
      label: "Import Course",
      icon: "i-heroicons-arrow-down-tray",
      to: "/board/addCourse",
    },
    {
      label: "Course Overview",
      icon: "i-heroicons-user-solid",
      to: "/board/selectedCourses",
    },
  ],
];

async function logout() {
  const client = useSupabaseClient();
  console.log("logging out");
  client.auth.signOut();
}

const isSidebarOpen = ref(true); // Start with sidebar open

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="flex h-screen flex-col">
    <div
      class="navbar border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800"
    >
      <div class="navbar-start">
        <button @click="toggleSidebar" class="btn btn-ghost btn-sm mr-4">
          <Icon name="heroicons:bars-3" class="h-6 w-6" />
        </button>
        <img
          src="public/images/testlogo.svg"
          alt="Your Logo"
          class="mr-2 h-8 w-auto"
        />

        <a class="btn btn-ghost text-2xl normal-case" href="/">HAW-BAN</a>

        <label class="input input-bordered ml-10 flex items-center">
          <input type="text" class="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div class="navbar-end">
        <a class="btn btn-ghost btn-sm mr-2" href="/">
          <Icon name="heroicons:home" class="h-6 w-6" />
        </a>
        <button @click="logout" class="btn btn-ghost btn-sm" href="/">
          <Icon name="heroicons:arrow-right-on-rectangle" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <div class="flex h-full">
      <UVerticalNavigation
        v-if="isSidebarOpen"
        :links="links"
        class="vertical-nav space-y-2 border-r border-gray-200 p-4 text-gray-800 transition-all duration-300 dark:bg-gray-800 dark:text-gray-200"
        :class="isSidebarOpen ? 'w-64' : 'w-16'"
      >
      </UVerticalNavigation>

      <div
        :class="[
          isSidebarOpen ? 'ml-0 bg-gray-100' : 'ml-0',
          'flex-grow bg-gray-100 p-4 transition-all duration-300',
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
