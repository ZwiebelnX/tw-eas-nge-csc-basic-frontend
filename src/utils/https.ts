import axios from 'axios';
import { Notification } from 'element-ui';
import router from '@/router/index';

const service = axios.create({
  baseURL: '/api',
  timeout: 50000,
});

service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error('send request error:', error);
    return error;
  },
);

service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    console.error('response in error:' + error); // for debug
    let response = error.response
    const message = response ? `状态码：${response.status}；错误码：${response.data.code}；错误内容：${response.data.message}` : ''
    Notification({
      title: '请求失败',
      message: message,
      type: 'error'
    })
    if (response.status === 401) {
      router.push('/login').then()
    }
    return error.response;
  },
);

export default service;
