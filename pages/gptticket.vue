<script lang="ts" setup>
import { z } from "zod";
import { sub, format, isSameDay, type Duration } from "date-fns";
import { reactive, ref } from "vue";

const ticketSchema = z.object({
  name: z.string(),
  start: z.date(),
  end: z.date(),
  category: z.string(),
});

const state = reactive({
  ticketName: "",
  ticketCategory: "",
});

const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() });

const categories = ["Categories", "Uni", "Freizeit", "Sport"];
const selectedCategory = ref(categories[0]);

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
];

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: new Date(), end: new Date() };
}
async function onSubmit() {
  let request;
  try {
    console.log({
      name: state.ticketName,
      start: selected.value.start,
      end: selected.value.end,
      category: selectedCategory.value,
    });
    request = await $fetch("/api/ticket/", {
      method: "POST",
      body: {
        name: state.ticketName,
        start: selected.value.start.getTime(),
        end: selected.value.end.getTime(),
        category: selectedCategory.value,
      },
    });
    console.log("SUCCESS");

    if (!request.success) {
      console.log("zort");
    }
  } catch (e) {
    const error = e as NuxtError;
    return;
  }
}
</script>
<template>
  <div
    class="mx-auto max-w-lg space-y-6 rounded-lg border-solid bg-white p-6 shadow-md"
  >
    <!-- Ticket Name and Category -->
    <form @submit.prevent="onSubmit()">
      <div class="flex items-end space-x-4">
        <!-- Ticket Name -->
        <div class="flex flex-1 items-center">
          <UFormGroup label="Ticket Name" name="ticketName">
            <UInput v-model="state.ticketName" />
          </UFormGroup>
        </div>
        <!-- Category Dropdown -->
        <div class="flex-1">
          <USelectMenu v-model="selectedCategory" :options="categories" />
        </div>
      </div>

      <!-- Date Picker -->
      <div class="mt-4 text-center">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid">
            {{ format(selected.start, "d MMM, yyy") }} -
            {{ format(selected.end, "d MMM, yyy") }}
          </UButton>

          <template #panel="{ close }">
            <div
              class="flex items-center divide-gray-200 sm:divide-x dark:divide-gray-800"
            >
              <div class="hidden flex-col py-4 sm:flex">
                <UButton
                  v-for="(range, index) in ranges"
                  :key="index"
                  :label="range.label"
                  color="gray"
                  variant="ghost"
                  class="rounded-none px-6"
                  :class="[
                    isRangeSelected(range.duration) ?
                      'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                  ]"
                  truncate
                  @click="selectRange(range.duration)"
                />
              </div>
              <DatePicker v-model="selected" @close="close" />
            </div>
          </template>
        </UPopover>
      </div>

      <!-- Submit Button -->
      <div class="mt-6 text-center">
        <UButton type="submit" class="w-full"> Create Ticket </UButton>
      </div>
    </form>
  </div>
</template>
