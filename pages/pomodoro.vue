<template>
  <div class="flex h-screen flex-col items-center justify-center bg-gray-100">
    <div class="mb-8 text-6xl font-bold">
      {{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }}
    </div>
    <div>
      <button @click="startTimer" class="btn btn-green mr-4">Start</button>
      <button @click="pauseTimer" class="btn btn-yellow mr-4">Pause</button>
      <button @click="resetTimer" class="btn btn-red">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

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

<style scoped>
.btn {
  @apply rounded px-4 py-2 text-white;
}
.btn-green {
  @apply bg-green-500 hover:bg-green-700;
}
.btn-yellow {
  @apply bg-yellow-500 hover:bg-yellow-700;
}
.btn-red {
  @apply bg-red-500 hover:bg-red-700;
}
</style>
