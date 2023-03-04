<script setup>
import EditPostForm from "../components/EditPostForm.vue";
import NavBar from "../components/NavBar.vue";
import { ref } from "vue";

const name = ref("");
const surname = ref("");
const avatar = ref("");
</script>

<template>
  <NavBar button="save" />
  <main>
    <div data-cy-wrapper="create" class="page-container">
      <h2 data-cy-header class="header">Create new post</h2>
      <h3 data-cy-subheader="owner" class="header">Post owner</h3>
      <form class="flex-wrapper form">
        <div class="flex-wrapper post-owner-name-wrapper">
          <label data-cy-label="name" for="name">Name*</label>
          <input
            data-cy-input="name"
            v-model="name"
            class="post-owner-input"
            type="text"
            id="name"
            name="name"
            placeholder="First name"
          />
          <label data-cy-label="surname" for="surname">Surname*</label>
          <input
            data-cy-input="surname"
            v-model="surname"
            class="post-owner-input"
            type="text"
            id="surname"
            name="surname"
            placeholder="Surname"
          />
        </div>
        <label data-cy-label="avatar" for="avatar">Avatar*</label>
        <input
          data-cy-input="avatar"
          v-model="avatar"
          class="post-owner-input"
          type="text"
          id="avatar"
          name="avatar"
          placeholder="https://www.example.com/avatar-url/"
        />
      </form>

      <h3 data-cy-subheader="post" class="header">Post</h3>
      <EditPostForm />
    </div>
  </main>
</template>

<style scoped>
@media (min-width: 768px) {
  .post-owner-name-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.post-owner-input {
  font-family: inherit;
  padding: 10px;
  border: none;
  border-radius: 3px;
  height: 40px;
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .post-owner-input {
    order: 1;
  }
}
</style>
