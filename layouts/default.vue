<template>
  <div>
    <NuxtImg src="/haw-logo.png" class="h-16 w-16" />
    <p>Visible on every Page</p>
    <NuxtLink to="/"> Navigate to Home</NuxtLink>
    <NuxtLink to="/board/"> Navigate to Board</NuxtLink>
    <slot />
  </div>
</template>
