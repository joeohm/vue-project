<script setup>
import NavBar from "../components/NavBar.vue";
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";

const route = useRoute();
const { id } = route.params;

const { isLoading, isError, data, error } = useQuery("post", () =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`, {
    headers: {
      "APP-ID": import.meta.env.VITE_APP_ID,
    },
  }).then((res) => res.json())
);
</script>

<template>
  <div>
    <NavBar button="save" />
    <main>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">
        An error has occurred while loading post: {{ error }}
      </div>

      <div v-else-if="data && data.owner">
        <p>{{ data.owner.picture }}</p>
        <p>
          <span>
            {{ data.owner.firstName }}
          </span>
          <span>{{ data.owner.lastName }}</span>
        </p>
        <p>{{ data.publishDate }}</p>

        <p>{{ data.image }}</p>

        {{ data.text }}
        <ul>
          <li v-for="tag in data.tags" :key="tag">{{ tag }}</li>
        </ul>
        <hr />
      </div>

      <hr />
    </main>
  </div>
</template>
