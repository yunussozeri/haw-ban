<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { NuxtError } from "#app";

const toast = useToast();

const schema = z.object({
  name: z.string(),
  surname: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  surname: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  let request;
  try {
    request = await $fetch("/api/user/register", {
      method: "POST",
      body: {
        name: event.data.name,
        surname: event.data.surname,
      },
    });
  } catch (e) {
    const error = e as NuxtError;
    toast.add({
      title: error.message,
    });
    return;
  }

  try {
    const boardRequest = await $fetch("/api/board/initboard", {
      method: "POST",
      body: {
        name: event.data.name,
        surname: event.data.surname,
      },
    });
  } catch (e) {
    const error = e as NuxtError;
    toast.add({
      title: error.message,
    });
    return;
  }

  await navigateTo("/board/addCourse");
}
</script>

<template>
  <div>
    <div>
      Enter your name to complete registration and create a board for yourself
      :d
    </div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Surname" name="surname">
        <UInput v-model="state.surname" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
</template>
