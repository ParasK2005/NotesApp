import api from "./api"

export const registeruser = (data)=>{
    return api.post("/auth/register",data)
}

export const loginuser = (data)=>{
    return api.post("/auth/login",data)
}