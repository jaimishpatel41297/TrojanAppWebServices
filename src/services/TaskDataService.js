import http from "../http-common.js";

class ProjectService {
    gettask() {
        return http.get('/tasks');
    }
    gettaskbyId(id) {
        return http.get(`/tasks/${id}`);  
    }
    addtask(data) {
        return http.post(`/tasks`, data);
    }
    updatetask(id, data) {
        return http.put(`/tasks/${id}`, data);
    }
    deletetask(id) {
        return http.delete(`/tasks/${id}`);
    }
}


export default new ProjectService();