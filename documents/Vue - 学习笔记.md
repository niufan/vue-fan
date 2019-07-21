
# Vue - 学习笔记

[TOC]

## 项目开发流程

```flow
st=>start: 开始
op1=>operation: 产品立项
op2=>operation: 产品原型
op3=>operation: 项目开发
op4=>operation: 项目测试
op5=>operation: 项目上线
hasBug=>condition: 是否有缺陷？
hasOpt=>condition: 是否有需求优化？
op6=>operation: 缺陷修复
op7=>operation: 需求优化
end=>end: 结束

st->op1->op2->op3->op4->hasBug
hasBug(no)->op5
hasBug(yes, right)->op6
op6(right)->op4
op5->hasOpt
hasOpt(no)->end
hasOpt(yes, right)->op7
op7(right)->op4
```

### 产品立项（产品经理、项目经理）

需求分析
需求文档
项目成立会

### 产品原型（UI）

产品原型图 -- Axure
UI设计 -- PS、AI

### 项目开发

```text
1. 项目需求分析
2. 项目工期评估
3. 项目责任划分
    前端
        静态页面制作
        前端框架选型
        前端页面架构
    后端
        数据库设计
        API接口文档
        API接口实现
```

### 项目测试

```text
开发测试
    单元测试
    E2E测试
灰度测试
    功能测试
    压力测试
    服务器测试
    用力测试
线上测试
    指定群体测试
    反馈收集
    版本迭代
```

### 项目上线

```text
打包
远程服务器部署
监控异常
```

## 项目代码管理

~~~text
主要解决的问题：
    1、开发的新功能代码与发布代码分开 （master、develop）
        开发的新功能代码可能还需测试，才能发布
    2、线上紧急BUG修复和优化 与 新功能的开发代码 分开 (hotfix)
        新功能代码可能还没测试好不能发布，不能阻塞紧急BUG修复和优化的发布
    3、多个独立的新功能可能完成时间不同等原因，（feature/a、feature/b）
        每个独立的新功能要建立分支
    4、新功能完成后，可能由于某种原因不能在下个版本发布，需要有预发布版本（release/1.0.0）
        完成的且需要发布的合并到release分支
常设分支
    master
        发布代码稳定版本；
        每个稳定历史版本通过打TAG来区分（每次发布需要打TAG；
    develop
        开发分支
临时分支（合并后，最好删除）
    功能分支（feature）
        各个新功能开发分支，从develop签出，合并至develop
    预发布分支（release）
        预发布版本控制，从master签出，合并至develop、master
    修复紧急缺陷分支（hotfix）
        从master签出，合并至develop、master
~~~

## Vue 初始化项目

~~~text
-- 配置npm的全局模块的存放路径以及cache的路径
npm config set prefix "D:\Program Files\nodejs\node_global"
npm config set cache "D:\Program Files\nodejs\node_cache"
-- cnpm 安装
npm install -g cnpm --registry=https://registry.npm.taobao.org
-- vue cli 3.0 安装
cnpm install -g @vue/cli
-- vue 创建项目
vue create vue-fan
~~~

### Vue项目目录结构规范

~~~text
vue-fan # 项目根目录
    node_modules # js package 存放目录
    public # 静态资源目录
        favicon.ico # 项目标题图标
        index.html  # 项目主页
    src # 项目源码目录
        assets # 静态资源目录
        components # 项目通用组件目录
        plugins # 项目插件目录
        router # 项目路由目录
        store # 项目状态目录
        views # 项目页面目录
        App.vue # 项目根组件
        main.js # 项目入口JS
    .browserslistrc #
    .gitignore # git文件忽略版本控制配置
    babel.config.js #
    package.json # npm JS包管理配置文件
    package-lock.json # npm JS包管理配置文件
    postcss.config.js #
    README.md # 项目说明文件
    vue.config.js # vue 配置文件
~~~

### vue.config.js 配置

```javascript
module.exports = {
    devServer: {
        proxy: { // 配置参考（http-proxy-middleware）：https://github.com/chimurai/http-proxy-middleware
            '/api': { // 代理路径
                target: 'https://api2.bmob.cn/1/classes', // 目标
                changeOrigin: true,
                pathRewrite: {'/api': ''}, // 去除/api路径
                logLevel: 'debug'
            }
        }
    }
};
```

## Vue ajax [axios](http://www.axios-js.com)

### axios的引入

~~~javascript
// cnpm install --save axios
import axios from 'axios'
Vue.prototype.$axios = axios;

// cnpm install --save axios vue-axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// vue add axios

~~~

### [axios的使用](http://www.axios-js.com/zh-cn/docs/)

#### 方法

~~~text
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
~~~

#### 请求配置

~~~text
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
~~~

#### 响应结构

~~~text
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
~~~

#### 拦截器

~~~javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
~~~

## Vue filter

### 内置过滤器

#### capitalize

#### uppercase

#### lowercase

#### currency

#### pluralize

#### debounce

#### limitBy

#### filterBy

#### orderBy
