<script setup>
import { ref } from "vue";
const props = defineProps({
  data: Object,
});

const image = ref(props.data?.image || "");
const text = ref(props.data?.text || "");
const tags = ref(props.data ? [...props.data.tags].join(", ") : "");
</script>

<template>
  <div class="flex-wrapper">
    <form class="flex-wrapper form">
      <label data-cy-label="image" for="image">Image*</label>
      <input
        data-cy-input="image"
        v-model="image"
        class="edit-post-input"
        type="text"
        id="image"
        name="image"
        placeholder="https://www.example.com/image/1"
      />
      <label data-cy-label="text" for="text">Text*</label>
      <textarea
        data-cy-input="text"
        class="edit-post-input"
        v-model="text"
        type="text"
        id="text"
        name="text"
        placeholder="Write a nice message here!"
      />
      <label data-cy-label="tags" for="tags">Tags</label>
      <input
        data-cy-input="tags"
        v-model="tags"
        class="edit-post-input"
        type="text"
        id="tags"
        name="tags"
        placeholder="dog, puppy, outdoors, husky"
      />
    </form>
  </div>
</template>

<style scoped>
.edit-post-input {
  font-family: inherit;
  padding: 10px;
  border: none;
  border-radius: 3px;
  height: 40px;
  margin-bottom: 10px;
}

.edit-post-input::placeholder {
  opacity: 0.8;
}

#text {
  resize: none;
  height: 150px;
}
</style>
