<template>
  <section
    class="task-edit"
    id="task-edit"
  >
    <div class="task-edit__inner inner">
      <h2 class="title">Edit task</h2>

      <form
        class="task-edit__form"
        @submit.prevent="saveTask"
      >
        <span
          v-if="titleError"
          class="error-text"
        >
          The name of the task is too short
        </span>

        <input
          class="task-edit__input input"
          placeholder="Enter the name of the task"
          :class="{ 'input--error': titleError }"
          v-model="editedTask.title"
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

import Button from "./Button.vue"

const editedTask = ref({})
const titleError = ref(false)

const store = useStore()
const router = useRouter()

const saveTask = () => {
  if (editedTask.value.title.length > 3) {
    store.dispatch("task/updateTask", {
      taskId: editedTask.value.id,
      updatedTask: editedTask.value
    })

    router.push("/tasks")
  } else {
    titleError.value = true
  }
}

const taskId = computed(() => {
  return router.currentRoute.value.params.id
})

const fetchTask = () => {
  const task = store.state.task.tasks.find((t) => t.id === taskId.value)
  editedTask.value = { ...task }
}

onMounted(() => {
  fetchTask()
})

watch(editedTask, (editedTask) => {
  if (editedTask.title.length > 3) {
    titleError.value = false
  }
})
</script>

<style scoped lang="scss">
.task-edit {
  &__inner {
    padding-top: 4rem;
  }

  &__form {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin-top: 3rem;
  }
}
</style>
