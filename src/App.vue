<template>
  <div id="app">
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
      <router-link to="/project" class="navbar-brand">Project</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/task" class="nav-link">Task</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view>
        <Task />
      </router-view>
    </div>
  </div>
</template>

<script>
import Task from "./components/task";
export default {
  name: "app",
  components: {
    Task,
  },
};
</script>


