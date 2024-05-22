<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const {
  data: userCourses,
  pending,
  error,
  refresh,
} = useFetch("/api/courses/selected", {
  headers: useRequestHeaders(["cookie"]),
  // Additional options (e.g., method: 'GET', etc.)
});
const courses = computed(() => {
  return userCourses.value?.courses.map((item) => item.courses) || [];
});
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">Here you see your selected courses</h1>
  </div>
  <UTable v-if="!pending" :rows="courses" />
  <div v-else>Loading courses...</div>
</template>
