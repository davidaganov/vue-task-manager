<template>
  <Navbar
    :list="[
      { id: 1, title: 'Home' },
      { id: 2, title: 'Tasks' }
    ]"
  />
  <TaskEdit />
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import TaskEdit from "../components/TaskEdit.vue"
</script>
