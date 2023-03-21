<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Project title</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{ active: index == currentIndex }"
          v-for="(project, index) in projects"
          :key="index"
        >
          <td>{{ project.title }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="addProjectForm"
            >
              Add
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-secondary"
              @click="editProjectForm(project)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              @click="deleteProjectForm(project)"
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
          <label class="form-label">Project title</label>
          <input type="text" class="form-control" ref="project_name" />
        </div>

        <button type="submit" class="btn btn-primary" @click="addProject">
          Submit
        </button>
      </div>
      <div v-if="editflag">
        <div class="mb-3">
          <label class="form-label">Project title</label>
          <input
            type="text"
            class="form-control"
            ref="edit_task_name"
            v-model="currentProjectTitle"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="editProject">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ProjectService from "../services/ProjectService";

export default {
  name: "task",
  data() {
    return {
      projects: [],
      currentProject: { title: "" },
      currentIndex: -1,
      editflag: false,
      addflag: false,
      message: "",
      currentProjectId: "",
      currentProjectTitle: "",
    };
  },

  methods: {
    addProject() {
      this.currentProject.title = this.$refs["project_name"].value;
      console.log("Sending data " + this.currentTask);
      ProjectService.addProject(this.currentProject).then((response) => {
        console.log("Response " + response.data);
        this.message = response.data;
      });
    },
    editProject() {
      ProjectService.updateProject(
        this.currentProjectId,
        this.currentProject
      ).then((response) => {
        this.message = response.data;
      });
      this.retrieveProject();
    },
    addProjectForm() {
      (this.addflag = true), (this.editflag = false);
    },
    editProjectForm(project) {
      (this.editflag = true), (this.addflag = false);
      ProjectService.getProjectbyId(project.projectId).then((response) => {
        let data = response.data;
        this.currentProject.title = data["title"];
        this.currentProjectId = data["projectId"];
        this.currentProjectTitle = data["title"];
      });
    },
    deleteProjectForm(project) {
      ProjectService.deleteProject(project.projectId).then((response) => {
        this.message = response.data;
      });
      this.retrieveProject();
    },
    retrieveProject() {
      ProjectService.get()
        .then((response) => {
          this.projects = response.data;
          console.log(this.projects);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    console.log("Inside");
    this.retrieveProject();
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
