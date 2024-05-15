<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();

const { data } = useFetch("/api/user", {
  // for ssr, need to introduce cookie headers from user to nitro
  headers: useRequestHeaders(["cookie"]),
});

const {
  data: courseData,
  pending,
  error,
  refresh,
} = useFetch("/api/courses/", {
  headers: useRequestHeaders(["cookie"]),
  // Additional options (e.g., method: 'GET', etc.)
});
console.log(courseData);
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">This is the board page</h1>
  </div>
  <div
    v-if="data?.success"
    class="flex h-full w-full flex-col items-center justify-center font-comic-sans-ms"
  >
    <h1 class="mb-4 text-4xl font-bold">
      Hello , {{ `${data.result.name} ${data.result.surname}` }}
    </h1>
  </div>
  <div v-if="pending">Loading courses...</div>
  <div v-else-if="error">Error fetching courses: {{ error.message }}</div>
  <ul v-else>
    <li v-for="course in courseData" :key="course.id">
      Studiengang: {{ course.studiengang }}
    </li>
  </ul>
</template>
