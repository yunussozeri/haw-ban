<template>
  <div style="display: flex;">
    <div style="flex: 1;">
      <img src=https://raw.githubusercontent.com/wdm373/MyKanbanBoard-Logo/6ac26beea3482351aa356ea9bf0b216a3a694f3b/Login-Seite.png>
    </div>
    <div style="flex: 1; align-items: flex-start;">
      <h1 style="font-size: 8rem; font-weight: bold; margin-bottom: 1rem; margin-left: 6rem; margin-top: 2rem;"><span style="font-family: Arial; font-size: 45px;">login</span></h1>
      <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; margin-left: 10rem; margin-top: -5rem;"><span style="font-family: 'Comic Sans MS'; font-size: 15px;">MY KANBAN BOARD</span></h2>
      <h3 style="font-size: 2rem; font-weight: normal; margin-bottom: 3rem; margin-left: 6rem; margin-top: -1rem; color: #737373;"><span style="font-family: 'Arial'; font-size: 18px;">Welcome back! Please login to your account. </span></h3>
      <form @submit.prevent="login" style="margin-left: 6rem;">

        <div style="display: flex; flex-direction: column;">
          <label for="username" style="font-size: 1.3rem;font-weight: 600;"><span style="font-family: 'Arial'; font-size: 12px;color: #737373;"></span>Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" style="font-size: 1.2rem; margin-bottom: 3rem; border: 2px solid #ccc; padding: 0.5rem; border-radius: 25px;width: 350px">
        </div>
        <div style="display: flex; flex-direction: column;">
          <label for="password" style="font-size: 1.3rem;font-weight:600"><span style="font-family: 'Arial'; font-size: 12px;color: #737373;"></span>Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" style="font-size: 1.2rem; margin-bottom: 1rem;border: 2px solid #ccc; padding: 0.5rem; border-radius: 25px;width: 350px">
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <input type="checkbox" id="rememberMe" v-model="rememberMe">
          <label for="rememberMe" style="font-size: 0.8rem; margin-left: 0.5rem;color: #737373; align-self: flex-start;">Remember Me</label>
          <a href="#" style="font-size: 0.8rem; margin-left: 8rem; color: #737373;">Forgot Password?</a>
        </div>
        <button type="submit" style="font-size: 1.0rem; margin-top: 2rem;margin-bottom: 1rem;margin-left: 6rem; color: #737373;">New User? Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false
    };
  },
  methods: {
    login() {
      // Implement login logic here
    }
  }
}
</script>
