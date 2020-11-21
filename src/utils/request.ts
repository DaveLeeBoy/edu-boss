import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";
import qs from "qs";

const request = axios.create({
  // 配置项
  // baseURL,
  // timeout
});
let isRefreshing = false;
// 存储刷新token 的请求
let requestCallbacks: any[] = [];
function redirectLogin() {
  router.push({
    name: "login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}
function refreshToken() {
  return axios.create()({
    method: "POST",
    // refresh_token 只能使用一次
    url: "/front/user/refresh_token",
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  });
}
// 请求拦截器
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const { user } = store.state;
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        Message.error("请求参数错误");
      } else if (status === 401) {
        if (!store.state.user) {
          redirectLogin();
          return Promise.reject(error);
        }
        if (!isRefreshing) {
          isRefreshing = true;
          return refreshToken()
            .then(res => {
              if (!res.data.success) {
                throw new Error("刷新Token失败");
              }
              // 刷新token 成功
              store.commit("setUser", res.data.content);
              requestCallbacks.forEach(cb => cb());
              requestCallbacks = [];
              return request(error.config);
            })
            .catch(err => {
              store.commit("setUser", null);
              redirectLogin();
              return Promise.reject(error);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
        return new Promise(resolve => {
          requestCallbacks.push(() => {
            resolve(request(error.config));
          });
        });
      } else if (status === 403) {
        Message.error("没有权限，请联系管理员");
      } else if (status === 404) {
        Message.error("请求资源不存在");
      } else if (status >= 500) {
        Message.error("服务器错误");
      }
    } else if (error.request) {
      Message.error("请求超时，请刷新重试");
      console.log(error.request);
    } else {
      Message.error(`请求失败:${error.message}`);
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  }
);
export default request;
