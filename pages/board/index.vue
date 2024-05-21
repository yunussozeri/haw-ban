<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();

const { data: userData } = useFetch("/api/user", {
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
    // Check if newData and newData.result are not null
    if (newData && newData.result) {
      courses.value = newData.result;
      selected.value = [];
    }
  },
  { immediate: true },
);

const message = ref(""); // Store feedback message
const messageType = ref(""); // Store message type (success or error)

//post selected courses to database
const submitSelectedCourses = async () => {
  if (selected.value.length === 0) {
    message.value = "Please select at least one course.";
    messageType.value = "error";
    return;
  }
  try {
    const response = await $fetch("/api/courses/selected", {
      method: "POST",
      body: selected.value.map((course) => ({
        courseId: course.id,
      })),
      headers: useRequestHeaders(["cookie"]),
    });

    if (response.success) {
      message.value = "Courses saved successfully!";
      messageType.value = "success";
      //clear selectedCourses after successful save
      selected.value = [];
    } else {
      message.value =
        "Error saving courses: " + (response.message || "Unknown error");
      messageType.value = "error";
    }
  } catch (error) {
    // ... (error handling)
    message.value = "An error occurred while saving courses.";
    messageType.value = "error";
  }
};
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">This is the board page</h1>
  </div>
  <div
    v-if="userData?.success"
    class="flex h-full w-full flex-col items-center justify-center font-comic-sans-ms"
  >
    <h1 class="mb-4 text-4xl font-bold">
      Hello , {{ `${userData.result.name} ${userData.result.surname}` }}
    </h1>
  </div>
  <UButton size="xl">
    <NuxtLink to="/board/selectedCourses">See your selected courses</NuxtLink>
  </UButton>
  <div v-if="pending">Loading courses...</div>
  <div v-else-if="error">Error fetching courses: {{ error.message }}</div>

  <div v-else>
    <div class="flex border-b border-gray-200 px-3 py-3.5 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter courses..." />
    </div>

    <UTable v-model="selected" :rows="filteredRows" />
    <UButton @click="submitSelectedCourses"> Save Selected Courses </UButton>
    <div
      v-if="message"
      :class="{
        'bg-green-200 text-green-800': messageType === 'success',
        'bg-red-200 text-red-800': messageType === 'error',
      }"
      class="mt-2 rounded p-2"
    >
      {{ message }}
    </div>
  </div>
</template>
