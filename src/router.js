import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/project",
            alias: "/project",
            name: "project",
            component: () => import("./components/project")
        }
        ,
        {
            path: "/task",
            name: "task",
            component: () => import("./components/task")
        }
    ]
});
