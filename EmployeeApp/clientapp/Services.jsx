import http from "./http-common";

class Services{
    getEmployee(){
        return http.get("/Employee")
    }

    getOneEmployee(id){
        return http.get(`/Employee/${id}`)
    }

    postEmployee(data){
        return http.post("/Employee", data)
    }

    putEmployee(data){
        return http.put("/Employee", data)
    }

    deleteEmployee(id){
        return http.delete(`/Employee/${id}`)
    }
}

export default new Services();