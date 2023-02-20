<script setup>
import NavBar from "../components/NavBar.vue";
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import UserWrapper from "../components/UserWrapper.vue";
import EditPostForm from "../components/EditPostForm.vue";

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
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">
      An error has occurred while loading post: {{ error }}
    </div>
    <div v-else>
      <main>
        <div class="page-container">
          <h2 class="header page-header">Edit post</h2>
          <div v-if="isLoading">Loading...</div>
          <div v-else-if="isError">
            An error has occurred while loading post: {{ error }}
          </div>
          <UserWrapper v-else-if="data && data.owner" :postData="data" />
          <EditPostForm :data="data" />
        </div>
      </main>
    </div>
  </div>
</template>
