// task.js (Vuex module)

const state = {
  tasks: []
}

const getters = {
  getTaskById: (state) => (id) => {
    return state.tasks.find((task) => task.id === id)
  }
}

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks
  },
  ADD_TASK(state, task) {
    state.tasks.push(task)
  },
  UPDATE_TASK(state, { taskId, updatedTask }) {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
      state.tasks.splice(taskIndex, 1, updatedTask)
    }
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId)
  }
}

const actions = {
  addTask({ commit }, task) {
    commit("ADD_TASK", task)
  },
  updateTask({ commit }, { taskId, updatedTask }) {
    commit("UPDATE_TASK", { taskId, updatedTask })
  },
  deleteTask({ commit }, taskId) {
    commit("DELETE_TASK", taskId)
  },
  initializeTasks({ commit }) {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      commit("SET_TASKS", JSON.parse(savedTasks))
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
