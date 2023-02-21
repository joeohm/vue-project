<script setup>
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import ListItem from "../components/ListItem.vue";
import ListViewNavigation from "../components/ListViewNavigation.vue";
import NavBar from "../components/NavBar.vue";
import Spinner from "../components/TheSpinner.vue";

const route = useRoute();
const page = Number(route.params.page || 1);

const { isLoading, isError, data, error } = useQuery("post", () =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/post?page=${page}&limit=20`, {
    headers: {
      "APP-ID": import.meta.env.VITE_APP_ID,
    },
  }).then((res) => res.json())
);
</script>

<template :key="page">
  <NavBar button="create" />
  <main>
    <Spinner v-if="isLoading" />
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data" class="grid-wrapper">
      <ListItem v-for="post in data.data" :key="post.id" :post="post" />
    </div>
  </main>
  <ListViewNavigation v-if="data" :page="page" :data="data" />
</template>

<style scoped>
.grid-wrapper {
  max-width: 1200px;
  padding-top: 50px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .grid-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .grid-wrapper {
    padding-top: 100px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
