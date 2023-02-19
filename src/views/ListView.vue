<script setup>
import { useQuery } from "vue-query";
import ListItem from "../components/ListItem.vue";
import NavBar from "../components/NavBar.vue";

const { isLoading, isError, data, error } = useQuery("post", () =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/post?page=2&limit=20`, {
    headers: {
      "APP-ID": import.meta.env.VITE_APP_ID,
    },
  }).then((res) => res.json())
);
</script>

<template>
  <NavBar button="create" />
  <main>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data" class="wrapper">
      <ListItem v-for="post in data.data" :key="post.id" :post="post" />
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  padding-top: 50px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .wrapper {
    padding-top: 100px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
