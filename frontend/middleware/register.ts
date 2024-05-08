export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  if (!user.value?.id) {
    return navigateTo("/login");
  }
  // fetch when calling backend, from frontend use useFetch() from nuxt to get data from backend
  const dbUser = await $fetch("/api/user/", {
    method: "POST",
    body: {
      userId: user.value.id,
    },
  });

  if (!dbUser) {
    return navigateTo("/register");
  }
});
