<script setup>
import { RouterLink } from "vue-router";
import { formatDate } from "../utils.js";
const props = defineProps({
  post: Object,
});
</script>

<template>
  <RouterLink :to="'/post/' + props.post.id" class="post">
    <img
      data-cy-post-image
      alt="Post image"
      :src="props.post.image"
      class="post-image"
    />
    <div class="post-name-container">
      <img
        alt="User icon"
        src="@/assets/user-icon.svg"
        class="post-icon"
        width="20"
        height="20"
      />
      <h2 data-cy-post-name class="post-name">
        <span> {{ props.post.owner.firstName }} {{ "" }} </span>
        <span>{{ props.post.owner.lastName }}</span>
      </h2>
    </div>
    <p data-cy-post-text>
      {{ props.post.text }}
    </p>
    <ul class="tag-container" data-cy-post-tags>
      <li v-for="tag in props.post.tags" :key="tag" class="tag">{{ tag }}</li>
    </ul>
    <i data-cy-post-date>{{ formatDate(props.post.publishDate) }}</i>
  </RouterLink>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  text-decoration: none;
  color: var(--color-theme-secondary);
}
.post-image {
  height: 250px;
  width: 100%;
  object-fit: cover;
}
.post-name-container {
  padding: 10px 0;
  align-items: baseline;
  display: flex;
  color: var(--color-theme-primary);
}
.post-icon {
  margin-right: 10px;
}
.post-name {
  font-weight: 700;
  display: inline;
}
</style>
