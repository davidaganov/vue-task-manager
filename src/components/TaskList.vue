<template>
  <section
    class="list"
    id="list"
  >
    <div class="list__inner inner">
      <h1 class="list__title title">List of tasks</h1>

      <form
        class="list__create"
        @submit.prevent="createTask"
      >
        <span
          v-if="titleError"
          class="error-text"
        >
          The name of the task is too short
        </span>

        <input
          class="list__create-input input"
          placeholder="Enter the name of the task"
          :class="{ 'input--error': titleError }"
          v-model="newTaskTitle"
        />
        <Button type="submit">Create</Button>
      </form>

      <ul
        class="list__tasks"
        v-if="tasks.length > 0"
      >
        <TransitionGroup name="tasks">
          <li
            class="list__task"
            :key="id"
            v-for="{ id, title } in tasks"
          >
            <span class="list__task-name">{{ title }}</span>

            <div class="list__task-control">
              <Button @click="editTask(id)">Edit</Button>
              <Button @click="deleteTask(id)">Delete</Button>
            </div>
          </li>
        </TransitionGroup>
      </ul>
      <p
        class="list__tasks-empty"
        v-else
      >
        The task list is empty.
        <br />
        It's time to add a new one!
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

import Button from "./Button.vue"

const newTaskTitle = ref("")
const titleError = ref(false)

const store = useStore()
const router = useRouter()

const tasks = computed(() => store.state.task.tasks)

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

const createTask = () => {
  if (newTaskTitle.value.length > 3) {
    const newTask = {
      id: generateUniqueId(),
      title: newTaskTitle.value
    }

    store.dispatch("task/addTask", newTask)

    newTaskTitle.value = ""
  } else {
    titleError.value = true
  }
}

const editTask = (taskId) => {
  router.push(`/tasks/${taskId}/edit`)
}

const deleteTask = (taskId) => {
  store.dispatch("task/deleteTask", taskId)
}

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks")
  if (savedTasks) {
    store.commit("task/SET_TASKS", JSON.parse(savedTasks))
  }
}

const saveTasksToLocalStorage = () => {
  const tasksToSave = JSON.stringify(store.state.task.tasks)
  localStorage.setItem("tasks", tasksToSave)
}

onMounted(() => {
  loadTasksFromLocalStorage()

  // Preservation of tasks in Localstorage when updating the state
  store.subscribe((mutation) => {
    if (mutation.type.startsWith("task/")) {
      saveTasksToLocalStorage()
    }
  })
})

watch(newTaskTitle, (newTaskTitle) => {
  if (newTaskTitle.length > 3) {
    titleError.value = false
  }
})
</script>

<style scoped lang="scss">
.tasks {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from {
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
}

.list {
  $parent: &;

  &__inner {
    padding-top: 4rem;
  }

  &__create {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin-top: 3rem;
  }

  &__tasks {
    display: grid;
    margin-top: 4rem;

    @media (min-width: 576px) {
      padding: 1rem;
      gap: 1rem;
      border: 0.2rem solid var(--color-white-700);
    }
    @media (max-width: 575px) {
      gap: 2rem;
    }

    &-empty {
      margin-top: 4rem;
      text-align: center;
      font: 400 2rem var(--main-font);
      color: var(--color-white);
    }
  }

  &__task {
    display: grid;

    @media (min-width: 576px) {
      grid-template-columns: 1fr auto;
      align-items: center;
      &:not(:first-of-type) {
        padding-top: 1rem;
      }
    }
    @media (max-width: 575px) {
      grid-template-columns: 1fr;
      gap: 1rem;
      &:not(:first-of-type) {
        padding-top: 2rem;
      }
    }

    &:not(:first-of-type) {
      border-top: 0.2rem solid var(--color-white-700);
    }

    &-name {
      display: -webkit-box;
      margin-right: 1rem;
      color: var(--color-white);
      font: 400 2rem var(--main-font);
      word-wrap: anywhere;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    &-control {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
}
</style>
