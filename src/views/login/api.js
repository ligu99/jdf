import { postRequest,getRequest } from "@/http/request_service.js";
import { API } from "@/api/api.js"

export const login=(params)=>{
   return postRequest(API.login,params);
}

export const getCurpermissions=(params)=>{
   return getRequest(API.getCurpermissions,params);
}
