<script setup>
import { useQuery } from "vue-query";
import { useRoute, RouterLink } from "vue-router";
import ListItem from "../components/ListItem.vue";
import NavBar from "../components/NavBar.vue";

const route = useRoute();
const page = route.params.page || 1;

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
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data" class="grid-wrapper">
      <ListItem v-for="post in data.data" :key="post.id" :post="post" />
    </div>
  </main>
  <footer v-if="data">
    <RouterLink v-if="page > 1" :to="'/page/' + Number(page - 1)">
      {{ "<-" }}</RouterLink
    >
    <p>
      Page {{ page }} of
      {{ Math.floor(data.total / data.limit) }}
    </p>
    <RouterLink
      v-if="page < Math.floor(data.total / data.limit)"
      :to="{ path: `/page/${Number(page) + 1}` }"
    >
      {{ " ->" }}</RouterLink
    >
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
}

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
