<template>
  <div class="navbar">
    <div class="navbar__inner inner">
      <nav class="navbar__menu">
        <ul class="navbar__list">
          <li
            class="navbar__item"
            :key="id"
            v-for="{ id, title } in list"
          >
            <router-link
              class="navbar__link inline-link"
              :to="title !== 'Home' ? `/${title.toLowerCase()}` : '/'"
            >
              {{ title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  &__inner {
    padding-top: 2rem;
  }

  &__menu {
    margin-left: -0.3rem;
  }

  &__list {
    display: flex;
    gap: 1rem;
  }
}
</style>
