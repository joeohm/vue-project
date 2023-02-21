<script setup></script>

<template>
  <div class="flex-wrapper">
    <h3 class="header">Add a comment</h3>
    <form class="flex-wrapper form">
      <div class="flex-wrapper add-comment-name-wrapper">
        <label for="name">Name*</label>
        <input class="add-comment-input" type="text" id="name" name="name" />
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
      <button
        @click="
          ($event) => {
            $event.preventDefault();
            $router.go();
          }
        "
        class="add-comment-submit"
        type="submit"
      >
        POST
      </button>
    </form>
  </div>
</template>

<style scoped>
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
  cursor: pointer;
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
</style>
