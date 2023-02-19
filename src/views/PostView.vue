<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import NavBar from "../components/NavBar.vue";

const route = useRoute();
const { id } = route.params;

const {
  isLoading: postIsLoading,
  isError: postIsError,
  data: postData,
  error: postError,
} = useQuery("post", () =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`, {
    headers: {
      "APP-ID": import.meta.env.VITE_APP_ID,
    },
  }).then((res) => res.json())
);
const {
  isLoading: commentIsLoading,
  isError: commentIsError,
  data: commentData,
  error: commentError,
} = useQuery("comment", () =>
  fetch(`${import.meta.env.VITE_API_BASE_URL}/post/${id}/comment`, {
    headers: {
      "APP-ID": import.meta.env.VITE_APP_ID,
    },
  }).then((res) => res.json())
);
</script>

<template>
  <NavBar button="edit" />
  <main>
    <div v-if="postIsLoading || commentIsLoading">Loading...</div>
    <div v-else-if="postIsError">
      An error has occurred while loading post: {{ postError }}
    </div>
    <div v-else-if="commentIsError">
      An error has occurred while loading comments: {{ commentError }}
    </div>
    <div v-else-if="postData && postData.owner">
      <p>{{ postData.owner.picture }}</p>
      <p>
        <span>
          {{ postData.owner.firstName }}
        </span>
        <span>{{ postData.owner.lastName }}</span>
      </p>
      <p>{{ postData.publishDate }}</p>

      <p>{{ postData.image }}</p>

      {{ postData.text }}
      <ul>
        <li v-for="tag in postData.tags" :key="tag">{{ tag }}</li>
      </ul>
      <hr />
    </div>

    <div class="add-comment"></div>
    <hr />

    <div v-if="commentData" class="comments">
      <div v-if="commentData.total > 0">
        <h4>{{ commentData.total }} comments</h4>
        <ul>
          <li v-for="comment in commentData.data" :key="comment.id">
            <p>{{ comment.owner.picture }}</p>
            <p>
              <span>
                {{ comment.owner.firstName }}
              </span>
              <span>{{ comment.owner.lastName }}</span>
            </p>
            <p>{{ comment.message }}</p>
            <p>{{ comment.publishDate }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No comments</p>
      </div>
    </div>
  </main>
</template>
