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

const selected = ref([]);
const courses = ref([]);

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return courses.value;
  }

  const query = q.value.toLowerCase();
  return courses.value.filter((course) => {
    return (
      course.studiengang.toLowerCase().includes(query) ||
      course.kuerzel.toLowerCase().includes(query) ||
      String(course.semester).toLowerCase().includes(query)
    );
  });
});

watch(
  courseData,
  (newData) => {
    courses.value = newData.result || [];
    selected.value = [];
  },
  { immediate: true },
);

console.log("hi1" + courseData.result);
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

  <div v-else>
    <div class="flex border-b border-gray-200 px-3 py-3.5 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter courses..." />
    </div>

    <UTable v-model="selected" :rows="filteredRows" />
  </div>
</template>
