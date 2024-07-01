<script lang="ts" setup>
definePageMeta({
  layout: "navbar",
  middleware: ["auth"],
});

const user = useSupabaseUser();

const { data: userData } = useFetch("/api/user", {
  headers: useRequestHeaders(["cookie"]),
});

const {
  data: courseData,
  pending,
  error,
  refresh,
} = useFetch("/api/courses/", {
  headers: useRequestHeaders(["cookie"]),
});

const selected = ref([]);
const courses = ref([]);

const q = ref(""); // Search query
const activeSemester = ref(null); // Selected semester filter

// Compute unique semester options from the course data
const semesterOptions = computed(() => {
  const uniqueSemesters = new Set(
    courses.value.map((course) => course.semester),
  );
  return Array.from(uniqueSemesters).map((semester) => ({
    label: semester,
    value: semester,
  }));
});

const filteredCourses = computed(() => {
  let filtered = courses.value;

  // Apply search filter (on all fields)
  if (q.value) {
    const query = q.value.toLowerCase();
    filtered = filtered.filter((course) => {
      return (
        course.studiengang.toLowerCase().includes(query) ||
        course.kuerzel.toLowerCase().includes(query) ||
        String(course.semester).toLowerCase().includes(query)
      );
    });
  }

  // Apply semester filter
  if (activeSemester.value) {
    filtered = filtered.filter(
      (course) => course.semester === activeSemester.value,
    );
  }

  return filtered;
});

watch(
  courseData,
  (newData) => {
    if (newData && newData.result) {
      courses.value = newData.result;
      selected.value = [];
    }
  },
  { immediate: true },
);

// ... (rest of the script remains the same)
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 p-8">
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="mb-4 text-center text-3xl font-bold">Course Selection</h1>

        <div class="mb-4 flex items-center justify-center space-x-4">
          <input
            v-model="q"
            type="text"
            placeholder="Search courses..."
            class="input input-bordered w-full max-w-xs"
          />

          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn m-1">
              <Icon
                name="heroicons:adjustments-horizontal"
                class="mr-1 h-4 w-4"
              >
              </Icon>
            </label>
            <ul
              tabindex="0"
              class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li v-for="option in semesterOptions" :key="option.value">
                <a @click="activeSemester = option.value">{{ option.label }}</a>
              </li>
            </ul>
          </div>

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
              <tr v-for="row in filteredCourses" :key="row.id">
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
