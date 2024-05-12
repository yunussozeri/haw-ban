<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();

const { data } = useFetch("/api/user", {
  // for ssr, need to introduce cookie headers from user to nitro
  headers: useRequestHeaders(["cookie"]),
});
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <h1 class="mb-4 text-4xl font-bold">This is the board page</h1>
  </div>
  <div
    v-if="data?.success"
    class="flex h-full w-full flex-col items-center justify-center font-comic-sans-ms"
  >
    <h1 class="mb-4 text-4xl font-bold">
      Hello , {{ `${data.result.name} ${data.result.surname}` }}
    </h1>
  </div>
</template>
