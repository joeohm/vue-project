<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  post: Object,
});
</script>

<template>
  <RouterLink :to="'/post/' + props.post.id">
    <div>
      <p>{{ props.post.image }}</p>
      <p>
        <span>
          {{ props.post.owner.firstName }}
        </span>
        <span>{{ props.post.owner.lastName }}</span>
      </p>
      {{ props.post.text }}
      <ul>
        <li v-for="tag in props.post.tags" :key="tag">{{ tag }}</li>
      </ul>
      <p>{{ props.post.publishDate }}</p>
    </div>
  </RouterLink>
</template>
