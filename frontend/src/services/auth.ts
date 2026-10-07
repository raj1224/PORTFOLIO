import api from "../api/client";import type {User} from "../types";
export const login=async(data:{email:string;password:string})=>(await api.post("/auth/login",data)).data.data.user as User;
export const currentUser=async()=>(await api.get("/auth/current-user")).data.data as User;
export const logout=async()=>{await api.post("/auth/logout")};
