<script setup>
import { formatDate } from "../utils.js";
const props = defineProps({
  postData: Object,
});
</script>

<template>
  <div class="user-wrapper">
    <img
      data-cy-poster-image
      alt="User image"
      :src="props.postData.owner.picture"
      class="user-image"
    />

    <div class="title-wrapper">
      <h2 data-cy-poster-name>
        <span> {{ props.postData.owner.firstName }} {{ "" }} </span>
        <span>{{ props.postData.owner.lastName }}</span>
      </h2>
      <i data-cy-post-date>{{ formatDate(props.postData.publishDate) }}</i>
    </div>
  </div>
</template>

<style scoped>
.user-wrapper {
  padding: 10px 0;
  display: flex;
  gap: 20px;
}

.user-image {
  border-radius: 50%;
  border: solid 5px var(--color-theme-primary);
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
</style>
