<script setup lang="ts">
const route = useRoute()

const links = [[{
  label: 'Board',
  icon:"i-heroicons-table-cells-solid",
  to: "/board/"
}, {
  label: 'Add Ticket',
  icon: 'i-heroicons-plus-circle-20-solid',
  to: '/'
}, {
  label: 'Discussion',
  icon: 'i-heroicons-chat-bubble-left-right-solid',
  to: '/'
}, {
  label: 'Pomodoro Timer',
  icon: 'i-heroicons-clock-solid',
  to: '/'
},
{
  label: 'Filter',
  icon: 'i-heroicons-adjustments-horizontal',
  to: '/'
},{
    label:'Course Overview',
  icon: 'i-heroicons-user-solid',
  to: '/board/selectedCourses'
},],
[
{
  icon: 'i-heroicons-arrow-right-start-on-rectangle-20-solid',
}]]


</script>

<template>
    <div class="flex items-center"> 
        <NuxtImg src="/images/myKanbanBoard.svg" class="h-32 w-32 mr-5" /> 
        <UHorizontalNavigation :links="links" class="text text-white border-b border-white-200 dark:border-white-800" />
      </div>
    
  <slot />
</template>

