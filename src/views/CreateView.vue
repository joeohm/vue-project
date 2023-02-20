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
    <div class="page-container">
      <h2 class="header">Create new post</h2>
      <h3 class="header">Post owner</h3>
      <form class="flex-wrapper form">
        <div class="flex-wrapper post-owner-name-wrapper">
          <label for="name">Name*</label>
          <input
            v-model="name"
            class="post-owner-input"
            type="text"
            id="name"
            name="name"
          />
          <label for="surname">Surname*</label>
          <input
            v-model="surname"
            class="post-owner-input"
            type="text"
            id="surname"
            name="surname"
          />
        </div>
        <label for="avatar">Avatar*</label>
        <input
          v-model="avatar"
          class="post-owner-input"
          type="text"
          id="avatar"
          name="avatar"
        />
      </form>

      <h3 class="header">Post</h3>
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
