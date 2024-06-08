<template>
  <div class="flex "> 
    <StatusColumn status="Backlog"/>
    <StatusColumn status="To Do" />
    <StatusColumn status="Doing" />
    <StatusColumn status="Done"/>
  </div>
</template>


<script setup>
import StatusColumn from './statusColumn.vue'; 
</script>

<style scoped>
/* Board Styles */

</style>

