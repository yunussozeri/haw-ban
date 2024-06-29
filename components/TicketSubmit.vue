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
  selected.value = { start: sub(new Date(), duration), end: new Date() };
}

async function onSubmit() {
  try {
    console.log({
      name: state.ticketName,
      start: selected.value.start.toISOString(),
      end: selected.value.end.toISOString(),
      category: selectedCategory.value,
    });
    const request = await $fetch("/api/ticket/", {
      method: "POST",
      body: {
        name: state.ticketName,
        start: selected.value.start.toISOString(),
        end: selected.value.end.toISOString(),
        category: selectedCategory.value?.toLowerCase(),
      },
    });

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
  <div class="card mx-auto w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <form @submit.prevent="onSubmit()">
        <h2 class="card-title">Create a New Ticket</h2>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Ticket Name</span>
          </label>
          <input
            v-model="state.ticketName"
            type="text"
            placeholder="Enter ticket name"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select
            v-model="selectedCategory"
            class="select select-bordered w-full"
          >
            <option
              v-for="category in categories"
              :key="category"
              :value="category.toLowerCase()"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Date Range</span>
          </label>
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

        <div class="card-actions mt-4 justify-end">
          <UButton type="submit" class="btn-primary">Create Ticket</UButton>
        </div>
      </form>
    </div>
  </div>
</template>
