<script lang="ts" setup>
import { z } from "zod";
import { sub, format, isSameDay, type Duration } from "date-fns";

const ticketSchema = z.object({
  name: z.string(),
  start: z.date(),
  end: z.date(),
  category: z.string(),
});

const state = reactive({
  ticketName: undefined,
  ticketStart: undefined,
  ticketEnd: undefined,
  ticketCategory: undefined,
});

type ticketSchema = z.output<typeof ticketSchema>;

const emit = defineEmits(["addTicket"]);

async function onSubmit(event: FormSubmitEvent<ticketSchema>) {
  // Do something with data
  console.log("event");
}

// date picker
const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
];
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() });

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() };
}

// category dropdown

const categories = ["Categories", "Uni", "Freizeit", "Sport"];

const selectedCategory = ref(categories[0]);
</script>

<template>
  <!-- GPT -->
  <div
    class="mx-auto max-w-lg space-y-6 rounded-lg border-solid bg-white p-6 shadow-md"
  >
    <!-- Ticket Name and Category -->
    <div class="flex items-end space-x-4">
      <!-- Ticket Name -->
      <div class="flex flex-1 items-center">
        <UForm :schema="ticketSchema" :state="state" @submit="onSubmit">
          <UFormGroup label="Ticket Name" name="ticketName">
            <UInput v-model="state.ticketName" />
          </UFormGroup>
        </UForm>
      </div>
      <!-- Category Dropdown -->
      <div class="flex-1">
        <USelectMenu v-model="selectedCategory" :options="categories" />
      </div>
    </div>

    <!-- Date Picker -->
    <div class="text-center">
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
    <div class="text-center">
      <UButton type="submit" class="w-full text-justify">
        Create Ticket
      </UButton>
    </div>
  </div>
</template>
