<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  page: Number,
  data: Object,
});
</script>

<template>
  <footer>
    <div class="inner-wrapper">
      <div class="arrow-container">
        <RouterLink v-if="props.page > 1" :to="'/page/' + (props.page - 1)">
          <img
            alt="Edit icon"
            src="@/assets/arrow-left.svg"
            width="20"
            height="20"
          />
        </RouterLink>
      </div>
      <p class="current-page">
        Page {{ props.page }} of
        {{ Math.floor(props.data.total / props.data.limit) }}
      </p>
      <div class="arrow-container">
        <RouterLink
          v-if="props.page < Math.floor(props.data.total / props.data.limit)"
          :to="{ path: `/page/${props.page + 1}` }"
        >
          <img
            alt="Edit icon"
            src="@/assets/arrow-right.svg"
            width="20"
            height="20"
          />
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  z-index: 10;
  height: 100px;
  box-shadow: 0px 3px 9px #80808014;
}

.inner-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.arrow-container {
  width: 20px;
}

.current-page {
  padding: 0 50px;
  color: var(--color-theme-primary);
  font-weight: 700;
}
</style>
