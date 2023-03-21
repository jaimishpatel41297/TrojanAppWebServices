<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Task Name</th>
          <th scope="col">Created Date</th>
          <th scope="col">Priority</th>
          <th scope="col">Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{ active: index == currentIndex }"
          v-for="(task, index) in tasks"
          :key="index"
        >
          <td>{{ task.name }}</td>
          <td>{{ task.date }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ task.completed ? "True" : "False" }}</td>

          <td>
            <button type="button" class="btn btn-primary" @click="addTaskForm">
              Add
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-secondary"
              @click="editTaskForm(task, index)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              @click="deleteTaskForm(task, index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <form>
      <div v-if="addflag">
        <div class="mb-3">
          <label class="form-label">Task name</label>
          <input type="text" class="form-control" ref="task_name" />
        </div>
        <div class="mb-3">
          <label class="form-label">Date</label>
          <input
            type="date"
            class="form-control"
            ref="date"
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Priority</label>
          <input type="text" class="form-control" ref="priority" />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" ref="IsCompleted" />
          <label class="form-check-label">Is completed</label>
        </div>
        <button type="submit" class="btn btn-primary" @click="addTask">
          Submit
        </button>
      </div>
      <div v-if="editflag">
        <div class="mb-3">
          <label class="form-label">Task name</label>
          <input
            type="text"
            class="form-control"
            ref="edit_task_name"
            v-model="currentTaskName"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Date</label>
          <input
            type="date"
            class="form-control"
            ref="edit_date"
            v-model="currenttaskDate"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Priority</label>
          <input
            type="text"
            class="form-control"
            ref="editpriority"
            v-model="currentpriority"
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            ref="editIsCompleted"
          />
          <label class="form-check-label">Is completed</label>
        </div>
        <button type="submit" class="btn btn-primary" @click="editTask">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import taskDataService from "../services/TaskDataService";

export default {
  name: "task",
  data() {
    return {
      tasks: [],
      currentTask: { name: "", date: "", completed: false, priority: 0 },
      currentIndex: -1,
      editflag: false,
      addflag: false,
      message: "",
      currentTaskId: "",
      currentTaskName: "",
      currenttaskDate: "",
      currentpriority: "",
    };
  },

  methods: {
    addTask() {
      this.currentTask.name = this.$refs["task_name"].value;
      this.currentTask.date = this.$refs["date"].value;
      console.log("Sending data " + this.currentTask);
      taskDataService.addtask(this.currentTask).then((response) => {
        console.log("Response " + response.data);
        this.message = response.data;
      });
    },
    editTask() {
      taskDataService
        .updatetask(this.currentTaskId, this.currentTask)
        .then((response) => {
          this.message = response.data;
        });
      this.retrieveTask();
    },
    addTaskForm() {
      (this.addflag = true), (this.editflag = false);
    },
    editTaskForm(task) {
      (this.editflag = true), (this.addflag = false);
      console.log("Editing task ID" + task.id);
      taskDataService.gettaskbyId(task.id).then((response) => {
        let data = response.data;
        this.currentTask.name = data["name"];
        this.currentTask.date = data["date"];
        this.currentTaskId = data["id"];
        this.currentTaskName = data["name"];
        this.currenttaskDate = data["date"];
        this.currentpriority = data["priority"];
      });
    },
    deleteTaskForm(task) {
      taskDataService.deletetask(task.id).then((response) => {
        this.message = response.data;
      });
      this.retrieveTask();
    },
    retrieveTask() {
      taskDataService
        .gettask()
        .then((response) => {
          this.tasks = response.data;
          console.log(this.tasks);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    console.log("Inside");
    this.retrieveTask();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
