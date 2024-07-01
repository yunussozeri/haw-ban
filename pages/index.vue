<template>
  <div class="hero min-h-screen" data-theme="winter">
    <!-- Add padding-top to avoid overlap with the fixed header -->
    <div class="hero-content flex-col lg:flex-row">
      <div>
        <h1 class="text-5xl font-bold">Ready? Set. Organize!</h1>
        <div class="text-5xl font-bold text-primary">HAW-BAN</div>
        <p class="py-6">
          Simplify student life one task at a time. Use the Kanban board to
          create and organize your daily academic and personal tasks, ensuring a
          balanced and productive student experience.
        </p>
        <UButton
          class="btn btn-primary"
          size="xl"
          icon="i-mdi-github"
          @click="signIn"
          >Get Started</UButton
        >
      </div>
      <img
        src="../public/images/startseite.svg"
        class="max-w-sm rounded-lg shadow-2xl"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

async function signIn() {
  const client = useSupabaseClient();

  client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/board",
    },
  });
}
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
}

nav a {
  color: #333;
  font-size: 1rem;
  padding: 0.5rem;
  text-decoration: none;
}

nav a:hover {
  color: #000;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.btn-outline {
  border: 1px solid #333;
  color: #333;
}

.btn-outline:hover {
  background-color: #333;
  color: #fff;
}

.btn-primary {
  background-color: #ff6b6b;
  color: white;
}

.btn-primary:hover {
  background-color: #ff5252;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat {
  text-align: center;
  padding: 1rem;
}

.stat-title {
  font-size: 1.25rem;
  color: #555;
}

.stat-value {
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .stats {
    flex-direction: column;
  }

  .stat {
    margin-bottom: 1rem;
  }
}
</style>
