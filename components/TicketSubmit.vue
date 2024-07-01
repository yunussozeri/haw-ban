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

const categories = ["default", "Uni", "Freizeit", "Sport"];
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
  <div
    data-theme="winter"
    class="flex min-h-screen flex-col items-center bg-gray-100 p-8"
  >
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="mb-4 text-center text-3xl font-bold">Create a new Ticket</h1>

        <div class="max-h-[400px] overflow-x-auto">
          <table class="table w-full table-fixed"></table>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="grid grid-cols-2 gap-4">
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
                <option disabled selected>Select a Category</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category.toLowerCase()"
                >
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-control mt-4 w-full">
            <label class="label">
              <span class="label-text">Comment</span>
            </label>
            <textarea
              v-model="comment"
              placeholder="Enter your comment"
              class="textarea textarea-bordered h-24 resize-none"
            ></textarea>
          </div>

          <div class="card-actions mt-4 flex justify-end">
            <div class="form-control">
              <UPopover :popper="{ placement: 'bottom-start' }">
                <button
                  class="btn btn-primary"
                  icon="i-heroicons-calendar-days-20-solid"
                >
                  {{ format(selected.start, "d MMM, yyy") }} -
                  {{ format(selected.end, "d MMM, yyy") }}
                </button>
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
            <Ubutton type="submit" class="btn btn-primary btn-wide ml-4">
              Create Ticket
            </Ubutton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
