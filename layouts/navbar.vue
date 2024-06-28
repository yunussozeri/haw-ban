<script setup lang="ts">
import type { RoutePathSchema } from "@typed-router/__paths";

export interface HorizontalNavigationLink {
  label: string;
  labelClass?: string;
  icon?: string;
  iconClass?: string;
  click?: () => void;
  badge?: string | number;
  to: RoutePathSchema;
}
const route = useRoute();

const links: HorizontalNavigationLink[][] = [
  [
    {
      label: "Board",
      icon: "i-heroicons-table-cells-solid",
      to: "/board",
    },
    {
      label: "Add Ticket",
      icon: "i-heroicons-plus-circle-20-solid",
      to: "/ticket-submit",
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
  [
    {
      label: "",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "",
      icon: "i-heroicons-arrow-right-start-on-rectangle-20-solid",
      to: "/logout",
    },
  ],
];

//TODO : implement logou
const { signOut } = useAuth();
</script>

<template>
  <div>
    <div class="flex items-center">
      <NuxtImg src="/images/myKanbanBoard.svg" class="mr-2 h-32 w-32" />
      <UHorizontalNavigation
        :links="links"
        class="border-white-200 dark:border-white-800 border-b"
      />
    </div>

    <slot />
  </div>
</template>
