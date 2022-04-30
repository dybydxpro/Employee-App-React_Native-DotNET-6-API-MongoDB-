import axios from "axios";

export default axios.create({
    baseURL:"https://localhost:44367/api",
    header:{
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
})