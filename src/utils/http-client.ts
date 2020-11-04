import axios from 'axios';
import { Notification } from 'element-ui';
import router from '@/router/index';

const service = axios.create({
  baseURL: '/api',
  timeout: 50000,
});

service.interceptors.request.use(
  (config: any) => config,
  (error: any) => {
    console.error('send request error:', error);
    return error;
  },
);

service.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const response = { ...error };
    if (response.status === 401) {
      router.push('/login').then();
      Notification({
        title: '登录凭证失效',
        message: '登录凭证失效，请重新登录',
        type: 'error',
      });
    } else {
      const message = response.data ? `状态码：${response.status}；错误码：${response.data.errorCode}；错误内容：${response.data.errorMessage}` : '';
      Notification({
        title: '请求失败',
        message,
        type: 'error',
      });
    }
    return response;
  },
);

export default service;
