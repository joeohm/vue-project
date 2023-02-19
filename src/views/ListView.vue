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
    <div v-else-if="data">
      <ListItem
        v-for="post in data.data"
        :key="post.id"
        :message="hej"
        :testObject="testObject"
        :post="post"
      />
    </div>
  </main>
</template>
