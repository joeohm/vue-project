<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import NavBar from "../components/NavBar.vue";
import UserWrapper from "../components/UserWrapper.vue";
import { formatDate } from "../utils.js";
import Spinner from "../components/TheSpinner.vue";
import CommentForm from "../components/CommentForm.vue";

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
    <div class="flex-wrapper page-container">
      <Spinner v-if="postIsLoading || commentIsLoading" />
      <div v-else-if="postIsError">
        An error has occurred while loading post: {{ postError }}
      </div>
      <div v-else-if="commentIsError">
        An error has occurred while loading comments: {{ commentError }}
      </div>
      <div v-else-if="postData">
        <div data-cy-wrapper="post" class="flex-wrapper">
          <UserWrapper :postData="postData" />
          <img data-cy-post-image alt="Post image" :src="postData.image" />

          <p data-cy-post-text>
            {{ postData.text }}
          </p>
          <ul data-cy-post-tags class="tag-container">
            <li v-for="tag in postData.tags" :key="tag" class="tag">
              {{ tag }}
            </li>
          </ul>
          <hr />
        </div>
        <CommentForm />
        <hr />
        <div
          data-cy-wrapper="comments"
          v-if="commentData && commentData.total > 0"
          class="flex-wrapper"
        >
          <h3 data-cy-header class="header">
            {{ commentData.total }}
            {{ commentData.total > 1 ? "comments" : "comment" }}
          </h3>
          <ul class="flex-wrapper comments-wrapper">
            <li
              data-cy-post-comment
              class="flex-wrapper comment-wrapper"
              v-for="comment in commentData.data"
              :key="comment.id"
            >
              <div class="comment-owner-wrapper">
                <img
                  data-cy-comment-owner-image
                  class="comment-owner-image"
                  :src="comment.owner.picture"
                  alt="User image"
                />
                <h4 data-cy-comment-owner-name>
                  <span> {{ comment.owner.firstName }} {{ "" }} </span>
                  <span>{{ comment.owner.lastName }}</span>
                </h4>
              </div>
              <p data-cy-comment-text>{{ comment.message }}</p>
              <i data-cy-comment-date>{{ formatDate(comment.publishDate) }}</i>
            </li>
          </ul>
        </div>
        <div data-cy-wrapper="comments" v-else>
          <h3 data-cy-header class="header">No comments</h3>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
hr {
  margin-top: 20px;
}

.comments-wrapper {
  gap: 40px;
}
.comment-wrapper {
  gap: 15px;
}

.comment-owner-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: var(--color-theme-primary);
}
.comment-owner-image {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>
