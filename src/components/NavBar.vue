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
    <div class="inner-wrapper">
      <RouterLink
        v-if="props.button === 'edit'"
        :to="{ path: `/${id}/edit` }"
        class="edit-button"
      >
        <img
          alt="Edit icon"
          src="@/assets/edit-icon.svg"
          width="57"
          height="57"
        />
      </RouterLink>
      <RouterLink to="/" v-if="props.button === 'save'">
        <img
          alt="Save icon"
          src="@/assets/save-icon.svg"
          width="57"
          height="57"
        />
      </RouterLink>
      <RouterLink v-if="props.button === 'create'" to="/create">
        <img
          alt="Plus icon"
          src="@/assets/plus-icon.svg"
          width="57"
          height="57"
        />
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: var(--color-bg-header);
  position: fixed;
  width: 100%;
  z-index: 10;
  height: 100px;
  padding-right: 20px;
  box-shadow: 0px 3px 9px #80808014;
}

@media (min-width: 768px) {
  header {
    padding-right: 50px;
  }
}
@media (min-width: 1300px) {
  header {
    padding-right: 0;
  }
}

.inner-wrapper {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
