/**
 *
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  //if user is not authenticated, send to login for auth
  if (!user.value) {
    return navigateTo("/login");
  }
  // fetch when calling backend, from frontend use useFetch() from nuxt to get data from backend
  const dbUser = await $fetch("/api/user/", {
    method: "GET",
  });

  // user logged in but hasnt registered aka has no name
  if (!dbUser) {
    return navigateTo("/register");
  }
});
