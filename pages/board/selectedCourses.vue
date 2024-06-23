<script lang="ts" setup>
import type { Course } from "@@/types";
definePageMeta({
  layout: "navbar",
  middleware: ["auth"],
});

const { user } = useAuth();

const toast = useToast();

const selected = ref<Course[]>([]);

const {
  data: courses,
  pending,
  error,
  refresh,
} = useFetch("/api/courses/selected", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
  transform: (data) => {
    return data.courses.map((item) => item.courses) || [];
  },
});

async function createBoardFromCourses() {
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
      await navigateTo("/board");
    } else {
      toast.add({ title: "Error creating board: " + response.message });
    }
    console.log("after req");
  } catch (error) {
    toast.add({ title: "Error creating board: " + (error || "Unknown error") });
  }
}

async function deleteSelectedCourses() {
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
      // message.value = "Courses deleted successfully!";
      // messageType.value = "success";
      toast.add({ title: "Courses deleted successfully!" });
      selected.value = [];
    } else {
      toast.add({
        title:
          "Error deleting courses: " + (response.message || "Unknown error"),
      });
    }
  } catch (error) {
    toast.add({ title: "Could not delete courses. Please try again later." });
  }
}
</script>

<template>
  <div class="container mx-auto mt-8">
    <h1 class="mb-4 text-center text-3xl font-bold">Selected Courses</h1>
    <div class="mb-4 flex items-center justify-center space-x-4">
      <UButton variant="solid" color="blue" @click="createBoardFromCourses">
        Add Courses to your board
      </UButton>
      <UButton variant="solid" color="blue" @click="deleteSelectedCourses">
        Delete Selected Courses
      </UButton>
    </div>
    <div class="mx-auto max-w-3xl overflow-hidden rounded-lg shadow-md">
      <UTable v-model="selected" :rows="courses" :loading="pending">
        <template #loading-state>
          <div class="flex h-32 items-center justify-center">
            <i class="loader --6" />
          </div>
        </template>
      </UTable>
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
