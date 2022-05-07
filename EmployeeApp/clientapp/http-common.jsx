import axios from "axios";

export default axios.create({
    baseURL:"https://localhost:44367/api",
    header:{
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
    /** 
     * https://localhost:44367/api 
     * https://192.168.8.168:44367/api
     * */
})