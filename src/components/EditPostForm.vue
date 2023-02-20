<script setup></script>

<template>
  <div class="flex-wrapper">
    <form class="edit-post-form">
      <label for="image">Image*</label>
      <input
        class="edit-post-input"
        type="text"
        id="image"
        name="image"
        placeholder="https://www.example.com/image/1"
      />
      <label for="text">Text*</label>
      <textarea class="edit-post-input" type="text" id="text" name="text" />
      <label for="tags">Tags</label>
      <input
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
.edit-post-form {
  color: var(--color-theme-secondary);
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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
