<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="header-wrapper">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="35" height="35" />
      <h2>Vue and Webix complex widgets</h2>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/gantt">Gantt</RouterLink>
      <RouterLink to="/spreadsheet">Spreadsheet</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
  header {
    text-align: center;
    padding-top: 1rem;
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }

  .logo {
    margin-right: 1rem;
  }

  nav {
    background-color: azure;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  nav a {
    font-size: 28px;
    font-weight: bold;
  }

  main {
    padding: 1rem;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 24px;
    }
    nav a {
      font-size: 20px;
    }
  }
</style>
