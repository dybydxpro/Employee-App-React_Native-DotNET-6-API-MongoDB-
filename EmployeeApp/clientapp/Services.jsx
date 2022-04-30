import http from "./http-common";

class Services{
    getEmployee(){
        return http.get("/Employee")
    }

    /*getOneEmployee(id){
        return http.get("/Employee")
    }

    postEmployee(){
        return http.get("/Employee")
    }

    putEmployee(){
        return http.get("/Employee")
    }

    deleteEmployee(){
        return http.get("/Employee")
    }*/
}

export default new Services();