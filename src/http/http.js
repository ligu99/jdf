import axios from "axios";
import { Message } from 'element-ui';
import { getStore } from '@/utils/storage';
import router from '../router';

const service = axios.create();

service.defaults.timeout = 60*1000*5;
// http request 拦截器
service.interceptors.request.use(
  config => {
    // 在每一个请求发送之前做一些调整
    if (getStore("token")) {
      config.headers['Authorization'] = `Bearer ${getStore("token")}`;
    }
    // 解决IE下浏览器一直拿缓存的问题，加时间戳处理
    if (config.method) {
      config.params = {
        t: Date.parse(new Date()),
        ...config.params
      }
    }

    return config;
  },
  err => {
    console.error(err);
    Promise.reject(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  response => {
    // http状态码是正确的
    if (response.status === 200 ) {
      // 未登录
      if(response.data.systemCode===401){
        Message.error(response.data.Message);
        router.push({
          path: "/login"
        })
      }
      if(response.data.systemCode!==200){
        Message.error(response.data.message);
        return response.data || response;
      }
      return response.data || response;
    }
    return response;
  },
  error => {
    if(error.response.status ===401){
      Message.error(error.response.data.message || "請求失敗，請稍後重試");
      router.push({
        path: "/login"
      })
      return
    }
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      Message.error("請求超時");
      return Promise.reject(error.response);
    }
    Message.error(error.response.data.message || "請求失敗，請稍後重試");
    return Promise.reject(error.response);
  }
);

export default service;
