<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import NavBar from "../components/NavBar.vue";
import UserWrapper from "../components/UserWrapper.vue";
import { formatDate } from "../utils.js";
import Spinner from "../components/TheSpinner.vue";

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
      <div v-else>
        <div class="flex-wrapper">
          <UserWrapper :postData="postData" />
          <img alt="Post image" :src="postData.image" />

          {{ postData.text }}
          <ul class="tag-container">
            <li v-for="tag in postData.tags" :key="tag" class="tag">
              {{ tag }}
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="!postIsLoading && !commentIsLoading" class="flex-wrapper">
          <h3 class="header">Add a comment</h3>
          <form class="flex-wrapper form">
            <div class="flex-wrapper add-comment-name-wrapper">
              <label for="name">Name*</label>
              <input
                class="add-comment-input"
                type="text"
                id="name"
                name="name"
              />
              <label for="surname">Surname*</label>
              <input
                class="add-comment-input"
                type="text"
                id="surname"
                name="surname"
              />
            </div>
            <label for="message">Message*</label>
            <textarea
              class="add-comment-input"
              type="text"
              id="message"
              name="message"
            />
            <button class="add-comment-submit" type="submit">POST</button>
          </form>
        </div>
        <hr />

        <div v-if="commentData && commentData.total > 0" class="flex-wrapper">
          <h3 class="header">
            {{ commentData.total }}
            {{ commentData.total > 1 ? "comments" : "comment" }}
          </h3>
          <ul class="flex-wrapper comments-wrapper">
            <li
              class="flex-wrapper comment-wrapper"
              v-for="comment in commentData.data"
              :key="comment.id"
            >
              <div class="comment-owner-wrapper">
                <img
                  class="comment-owner-image"
                  :src="comment.owner.picture"
                  alt="User image"
                />
                <h4>
                  <span> {{ comment.owner.firstName }} {{ "" }} </span>
                  <span>{{ comment.owner.lastName }}</span>
                </h4>
              </div>
              <p>{{ comment.message }}</p>
              <i>{{ formatDate(comment.publishDate) }}</i>
            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="header">No comments</h3>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
hr {
  margin-top: 20px;
}

@media (min-width: 768px) {
  .add-comment-name-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.add-comment-input {
  font-family: inherit;
  padding: 10px;
  border: none;
  border-radius: 3px;
  height: 40px;
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .add-comment-input {
    order: 1;
  }
}

#message {
  resize: none;
  height: 150px;
}

.add-comment-submit {
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 700;
  margin: 15px auto 0;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: var(--color-theme-primary);
  order: 2;
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
