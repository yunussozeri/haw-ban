<script lang="ts" setup>
import type { Course } from "@@/types";
definePageMeta({
  layout: "navbar",
  middleware: ["auth"],
});

const user = useSupabaseUser();
const selected = ref<Course[]>([]);

const {
  data: userCourses,
  pending,
  error,
  refresh,
} = useFetch("/api/courses/selected", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
  // Additional options (e.g., method: 'GET', etc.)
});

// Computed property for courses
const courses = computed(() => {
  return userCourses.value?.courses.map((item) => item.courses) || [];
});

const createBoardFromCourses = async () => {
  const u = user.value;

  if (!u) {
    return console.log("user auth error");
  }

  console.log("before req");
  console.log("Data sent to backend:", {
    userId: u.id,
    courses: selected.value,
  });
  try {
    const response = await $fetch("/api/courses/addtoboard", {
      method: "POST",
      body: {
        userId: u.id,
        courses: selected.value,
      },
    });
    if (response.success) {
      navigateTo("/board");
    }
    console.log("after req");
  } catch (error) {
    message.value = "Error creating board: " + (error || "Unknown error");
    messageType.value = "error";
  }
};

const message = ref(""); // Store feedback message
const messageType = ref(""); // Store message type (success or error)

const deleteSelectedCourses = async () => {
  try {
    if (!selected.value.length) {
      return;
    }

    const response = await $fetch("/api/courses/delete", {
      method: "DELETE",
      body: selected.value.map((course) => ({
        courseId: course.id,
      })),
      headers: useRequestHeaders(["cookie"]),
    });

    // Update the selected array to remove deleted courses
    const deletedCourseIds = selected.value.map((course) => course.id);
    selected.value = selected.value.filter(
      (course) => !deletedCourseIds.includes(course.id),
    );

    // Manually trigger a refresh of the useFetch composable
    refresh();
    if (response.success) {
      message.value = "Courses deleted successfully!";
      messageType.value = "success";
      selected.value = [];
    } else {
      message.value =
        "Error deleting courses: " + (response.message || "Unknown error");
      messageType.value = "error";
    }
  } catch (error) {
    message.value = "Could not delete courses. Please try again later.";
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
          class="alert mb-4"
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
        <h1 class="mb-4 text-center text-3xl font-bold">Selected Courses</h1>

        <div class="mb-4 flex items-center justify-center space-x-4">
          <button @click="createBoardFromCourses" class="btn btn-primary">
            Add Courses to your board
          </button>
          <button @click="deleteSelectedCourses" class="btn btn-error">
            Delete Selected Courses
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
              <template v-if="courses.length > 0">
                <tr v-for="row in courses" :key="row.id">
                  <th>
                    <input
                      type="checkbox"
                      :value="row"
                      v-model="selected"
                      checked
                    />
                  </th>
                  <td>{{ row.studiengang }}</td>
                  <td>{{ row.kuerzel }}</td>
                  <td>{{ row.semester }}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="6" class="text-center">No courses selected</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

/** * redudant */
<style scoped>
.loader {
  --color: rgb(var(--color-primary-400));
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;

  display: block;
  position: relative;
  width: 50%;
  display: grid;
  place-items: center;
}

.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
}

/**
    loader --6
**/
.loader.--6::before {
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}
</style>
