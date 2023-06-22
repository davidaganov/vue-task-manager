import HomeView from "../views/HomeView.vue"
import TaskListView from "../views/TaskListView.vue"
import TaskEditView from "../views/TaskEditView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/tasks", component: TaskListView },
  { path: "/tasks/:id/edit", component: TaskEditView }
]

export default routes
