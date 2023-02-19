<script setup>
import { RouterLink, useRoute } from "vue-router";
const props = defineProps({
  button: String,
});
const route = useRoute();
const { id } = route.params;
</script>

<template>
  <header>
    <RouterLink
      v-if="props.button === 'edit'"
      :to="'/' + id + '/edit'"
      class="edit-button"
    >
      <p>edit</p>
    </RouterLink>
    <button v-if="props.button === 'save'">
      <p>save</p>
    </button>
    <RouterLink v-if="props.button === 'create'" to="/create">
      <img
        alt="Plus icon"
        src="@/assets/plus-icon.svg"
        width="57"
        height="57"
      />
    </RouterLink>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--color-bg-header);
  position: fixed;
  width: 100%;
  z-index: 10;
  height: 100px;
  padding-right: 100px;
}
</style>
