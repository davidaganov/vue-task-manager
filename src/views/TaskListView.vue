<template>
  <Navbar :list="[{ id: 1, title: 'Home' }]" />
  <TaskList />
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import TaskList from "../components/TaskList.vue"
</script>
