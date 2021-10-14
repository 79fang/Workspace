# 笔记

## 脚手架文件结构:

## 关于不同版本的 Vue:

- vue.js 与 vue.runtime.xxx.js 的区别:
  (1).vue.js 是完整版的 Vue,包含:核心功能+模板解析器.
  (2).vue.runtime.xxx.js 是运行版的 Vue,只包含:核心功能;没有模板解析器.
- 因为 vue.runtime.xxx.js 没有模板解析器,所以不能使用 template 配置项,需要使用 render 函数接收到的 createElement 函数去指定具体内容.

## vue.config.js 配置文件:

> 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置.
> 使用 vue.config.js 可以对脚手架进行个性化定制,详情见:http://cli.vuejs.org/zh

## ref 属性

1.被用来给元素或子组件注册引用信息(id 的替代者). 2.应用在 html 标签上获取的是真实 DOM 元素,应用在组件标签上是组件实例对象(vc) 3.使用方式:

- 打标识<h1 ref="xxx">...</h1> 或 <School ref="xxx"></School>
- 获取:this.\$refs.xxx

---

# vue_test01

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
