<script lang="ts" setup>
definePageMeta({
  layout: 'navbar',
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
  <div v-if="pending">
    <div class="flex h-screen items-center justify-center">
      <USpinnner /> Loading courses...
    </div>
  </div>
  <div v-else-if="error">
    <UAlert color="red" icon="i-heroicons-exclamation-triangle-20-solid">
      Error fetching courses: {{ error.message }}
    </UAlert>
  </div>
  <div v-else class="container mx-auto mt-8">
    <h1 class="mb-4 text-center text-3xl font-bold">Course Selection</h1>

    <div class="mb-4 flex items-center justify-center space-x-4">
      <UInput
        v-model="q"
        placeholder="Filter courses..."
        class="rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
      />
      <UButton @click="submitSelectedCourses" variant="solid" color="blue">
        Save Selected Courses
      </UButton>
    </div>

    <div class="mx-auto max-w-3xl overflow-hidden rounded-lg shadow-md">
      <UTable
        v-model="selected"
        :rows="filteredRows"
        class="max-h-[400px] table-auto overflow-y-auto"
      />
    </div>

    <div
      v-if="message"
      :class="{
        'bg-green-100 text-green-800': messageType === 'success',
        'bg-red-100 text-red-800': messageType === 'error',
      }"
      class="mt-4 rounded-md border p-4 shadow-sm"
    >
      {{ message }}
    </div>
  </div>
</template>
