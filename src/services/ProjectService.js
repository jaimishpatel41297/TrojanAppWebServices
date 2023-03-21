import http from "../http-common.js";

class ProjectService {
    get() {
        return http.get('/projects');
    }
    getProjectbyId(id) {
        return http.get(`/projects/${id}`);
    }
    addProject(data) {
        return http.post(`/projects`, data);
    }
    updateProject(id, data) {
        return http.put(`/projects/${id}`, data);
    }
    deleteProject(id) {
        return http.delete(`/projects/${id}`);
    }
}


export default new ProjectService();