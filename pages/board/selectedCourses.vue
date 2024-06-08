<script lang="ts" setup>
definePageMeta({
  layout: 'navbar',
  middleware: ["auth"],
});

const selected = ref([]);

const {
  data: userCourses,
  pending,
  error,
  refresh,
} = useFetch("/api/courses/selected", {
  headers: useRequestHeaders(["cookie"]),
  // Additional options (e.g., method: 'GET', etc.)
});



// Computed property for courses
const courses = computed(() => {
  return userCourses.value?.courses.map((item) => item.courses) || [];
});

const deleteSelectedCourses = async () => {
  try {
    if (!selected.value.length) {
      return; 
    }

    await $fetch("/api/courses/delete", {
      method: "DELETE",
      body: selected.value.map((course) => ({
        courseId: course.id,
      })),
      headers: useRequestHeaders(["cookie"]),
    });

    // Update the selected array to remove deleted courses
    const deletedCourseIds = selected.value.map(course => course.id);
    selected.value = selected.value.filter(course => !deletedCourseIds.includes(course.id));

    // Manually trigger a refresh of the useFetch composable
    refresh();

  } catch (error) {
    console.error("Error deleting courses:", error);
  }
};
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">Here you see your selected courses</h1>
  </div>
  <UTable v-model="selected" :rows="courses" :loading="pending">
  <template #loading-state>
    <div class="flex items-center justify-center h-32">
      <i class="loader --6" />
    </div>
  </template>
</UTable>
  <UButton @click="deleteSelectedCourses" variant="solid" color="blue">
    Delete Selected Courses
  </UButton>
</template>

/**
 * redudant
 */
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
    content: '';
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
    0%, 100% {
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
