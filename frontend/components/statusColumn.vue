<template>
    <div class="status-column flex-grow">
      <h2
        class="status-column__header text-xl font-semibold mb-2 p-3 rounded-t-md flex items-center justify-center"
        :style="{ backgroundColor: headerColor, color: headerTextColor }"
      >
        {{ status }}
      </h2>
      <div
        class="status-column__content bg-gray-100 p-4 rounded-b-md min-h-[300px]"
      >
        </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    status: {
      type: String,
      required: true,
    },
  });
  
  // Computed properties for header color and text color based on status
  const headerColor = computed(() => {
    switch (props.status) {
      case 'Backlog': return '#6366f1'; // Indigo-600
      case 'To Do': return '#0ea5e9'; // Sky-500
      case 'Doing': return '#facc15'; // Yellow-400
      case 'Done': return '#22c55e'; // Green-500
      default: return '#64748b';  // Slate-500 
    }
  });
  
  const headerTextColor = computed(() => {
    return '#ffffff'; 
  });
  </script>
  
  <style scoped>
  .status-column {
    min-height: 100%;
    border-right: 1px solid #e5e7eb;
    transition: background-color 0.3s ease;
  }
  
  </style>
  