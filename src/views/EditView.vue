<script setup>
import NavBar from "../components/NavBar.vue";
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import UserWrapper from "../components/UserWrapper.vue";
import EditPostForm from "../components/EditPostForm.vue";
import Spinner from "../components/TheSpinner.vue";

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
      <Spinner v-if="isLoading" />
      <div v-else-if="isError">
        An error has occurred while loading post: {{ error }}
      </div>
      <div v-else-if="data">
        <div data-cy-wrapper="edit" class="page-container">
          <h2 data-cy-header class="header page-header">Edit post</h2>
          <UserWrapper v-if="data && data.owner" :postData="data" />
          <EditPostForm :data="data" />
        </div>
      </div>
    </main>
  </div>
</template>
