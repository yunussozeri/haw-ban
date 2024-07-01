<script lang="ts" setup>
definePageMeta({
  layout: "navbar",
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
    message.value = "Course save failed: Already selected";
    messageType.value = "error";
  }
};
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 p-8">
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <div
          v-if="message"
          class="alert mt-4"
          :class="{
            'alert-success': messageType === 'success',
            'alert-error': messageType === 'error',
          }"
        >
          <div>
            <svg
              v-if="messageType === 'success'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-if="messageType === 'error'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ message }}</span>
          </div>
        </div>
        <h1 class="mb-4 text-center text-3xl font-bold">Course Selection</h1>

        <div class="mb-4 flex items-center justify-center space-x-4">
          <input
            v-model="q"
            type="text"
            placeholder="Filter courses..."
            class="input input-bordered w-full max-w-xs"
          />
          <button @click="submitSelectedCourses" class="btn btn-primary">
            Save Selected Courses
          </button>
        </div>

        <div class="max-h-[400px] overflow-x-auto">
          <table class="table w-full table-fixed">
            <thead>
              <tr>
                <th class="w-10"></th>
                <th>Course Name</th>
                <th>Code</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id">
                <th>
                  <input type="checkbox" :value="row" v-model="selected" />
                </th>
                <td>{{ row.studiengang }}</td>
                <td>{{ row.kuerzel }}</td>
                <td>{{ row.semester }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
