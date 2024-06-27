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

const links2 = [
  [{ label: "HAW-BAN" }],
  [
    {
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      icon: "i-heroicons-arrow-right-start-on-rectangle-20-solid",
      to: "/",
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
  <div class="flex flex-col h-screen">
    <div class="flex items-center">
      <UButton @click="toggleSidebar" class=" mb-4 ml-4">
        <Icon name="heroicons:bars-3" />
      </UButton>
      <UHorizontalNavigation :links="links2" class="w-full mb-4 border-white-200 dark:border-white-800 border-b" />
    </div>

    <div class="flex h-full">
      <UVerticalNavigation :links="links" :class="isSidebarOpen ? 'w-64' : 'w-16'"
        class="vertical-nav border-r border-gray-300 dark:border-gray-700 p-4" />

      <div class="flex-grow p-4">
        <slot />
      </div>
    </div>
  </div>
</template>




<style scoped>
.vertical-nav {
  /* ... other styles ... */
  overflow: hidden;
  /* Hide overflowing content */
  transition: width 0.3s ease;


  /* Add a smooth transition effect */
}
</style>
