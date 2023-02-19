<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import NavBar from "../components/NavBar.vue";
import { formatDate } from "../utils";

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
    <div class="wrapper">
      <div v-if="postIsLoading || commentIsLoading">Loading...</div>
      <div v-else-if="postIsError">
        An error has occurred while loading post: {{ postError }}
      </div>
      <div v-else-if="commentIsError">
        An error has occurred while loading comments: {{ commentError }}
      </div>
      <div v-else-if="postData && postData.owner" class="post-wrapper">
        <div class="user-wrapper">
          <img
            alt="User image"
            :src="postData.owner.picture"
            class="user-image"
          />

          <div class="title-wrapper">
            <h2>
              <span> {{ postData.owner.firstName }} {{ "" }} </span>
              <span>{{ postData.owner.lastName }}</span>
            </h2>
            <i>{{ formatDate(postData.publishDate) }}</i>
          </div>
        </div>
        <img alt="Post image" :src="postData.image" class="post-image" />

        {{ postData.text }}
        <ul class="tag-container">
          <li v-for="tag in postData.tags" :key="tag" class="tag">{{ tag }}</li>
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
              <!-- <p>{{ comment.owner.picture }}</p> -->
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
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 750px;
  padding-top: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: var(--color-theme-secondary);
}

@media (min-width: 1024px) {
  .wrapper {
    padding-top: 70px;
  }
}

.post-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-wrapper {
  display: flex;
  gap: 20px;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
}
.title-wrapper h2 {
  color: var(--color-theme-primary);
}

.post-image {
  /* max-height: 750px; */
  /* object-fit: cover; */
}

.user-image {
  border-radius: 50%;
  border: solid 5px var(--color-theme-primary);
}
</style>
