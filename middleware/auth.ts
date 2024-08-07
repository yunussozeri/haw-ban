/**
 * Checks if user completed auth flow
 *
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  //if user is not authenticated, send to login for auth
  if (!user.value) {
    return navigateTo("/");
  }
  // fetch when calling backend, from frontend use useFetch() from nuxt to get data from backend
  const dbUser = await $fetch("/api/user/", {
    method: "GET",
    headers: useRequestHeaders(["cookie"]),
  });

  // user logged in but hasnt registered aka has no name
  if (!dbUser.success) {
    return navigateTo("/githubregister");
  }
});
