<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-8">
    <div
      class="card flex w-96 flex-grow flex-col items-center justify-center bg-white shadow-xl"
    >
      <h2 class="card-title">Pomodoro Timer</h2>
      <div class="mb-8 text-6xl font-bold">
        {{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }}
      </div>
      <div class="btn-group">
        <button @click="startTimer" class="btn btn-primary">Start</button>
        <button @click="pauseTimer" class="btn">Pause</button>
        <button @click="resetTimer" class="btn btn-warning">Reset</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

definePageMeta({
  layout: "navbar",
  middleware: ["auth"],
});

export default defineComponent({
  name: "PomodoroTimer",
  setup() {
    const workDuration = 25 * 60; // 25 minutes in seconds
    const breakDuration = 5 * 60; // 5 minutes in seconds
    const isBreak = ref(false);
    const timeLeft = ref(workDuration);
    const intervalId = ref<number | null>(null);

    const minutes = computed(() => Math.floor(timeLeft.value / 60));
    const seconds = computed(() => timeLeft.value % 60);

    const startTimer = () => {
      if (intervalId.value) return;
      intervalId.value = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--;
        } else {
          isBreak.value = !isBreak.value;
          timeLeft.value = isBreak.value ? breakDuration : workDuration;
        }
      }, 1000);
    };

    const pauseTimer = () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    };

    const resetTimer = () => {
      pauseTimer();
      isBreak.value = false;
      timeLeft.value = workDuration;
    };

    onMounted(() => {
      resetTimer();
    });

    onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return {
      minutes,
      seconds,
      startTimer,
      pauseTimer,
      resetTimer,
    };
  },
});
</script>

<style>
.card-body {
  display: flex; /* Make card-body a flex container */
  flex-direction: column; /* Arrange elements vertically */
  align-items: center; /* Center items horizontally */
}
</style>
