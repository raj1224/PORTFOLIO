import axios,{AxiosError,InternalAxiosRequestConfig} from "axios";
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||"http://localhost:8000/api/v1",withCredentials:true,headers:{"Content-Type":"application/json"}});
let refreshing:Promise<void>|null=null;
api.interceptors.response.use(r=>r,async(error:AxiosError)=>{
 const config=error.config as (InternalAxiosRequestConfig & {_retry?:boolean})|undefined;
 const status=error.response?.status;
 const url=config?.url||"";
 if(status!==401||!config||config._retry||url.includes("/auth/refresh-token")||url.includes("/auth/login")||url.includes("/auth/register")) throw error;
 config._retry=true;
 try{refreshing??=api.post("/auth/refresh-token").then(()=>undefined).finally(()=>{refreshing=null});await refreshing;return api(config)}catch{throw error}
});
export default api;
