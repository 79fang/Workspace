# 笔记

## 脚手架文件结构:

    ├── node_modules
    ├── public
    │   ├── favicon.ico: 页签图标
    │   └── index.html: 主页面
    ├── src
    │   ├── assets: 存放静态资源
    │   │   └── logo.png
    │   │── component: 存放组件
    │   │   └── HelloWorld.vue
    │   │── App.vue: 汇总所有组件
    │   │── main.js: 入口文件
    ├── .gitignore: git版本管制忽略的配置
    ├── babel.config.js: babel的配置文件
    ├── package.json: 应用包配置文件
    ├── README.md: 应用描述文件
    ├── package-lock.json：包版本控制文件

## 关于不同版本的 Vue:

- vue.js 与 vue.runtime.xxx.js 的区别:
  (1).vue.js 是完整版的 Vue,包含:核心功能+模板解析器.
  (2).vue.runtime.xxx.js 是运行版的 Vue,只包含:核心功能;没有模板解析器.
- 因为 vue.runtime.xxx.js 没有模板解析器,所以不能使用 template 配置项,需要使用 render 函数接收到的 createElement 函数去指定具体内容.

## vue.config.js 配置文件:

> 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置.
> 使用 vue.config.js 可以对脚手架进行个性化定制,详情见:http://cli.vuejs.org/zh

## ref 属性

(1).被用来给元素或子组件注册引用信息(id 的替代者).
(2).应用在 html 标签上获取的是真实 DOM 元素,应用在组件标签上是组件实例对象(vc)
(3).使用方式:

- 打标识<h1 ref="xxx">...</h1> 或 <School ref="xxx"></School>
- 获取:this.\$refs.xxx

## 配置项 props

    功能:让组件接收外部传过来的数据
    (1).传递数据:
      <Demo name="xxx"/>
    (2).接收数据:
      第一种方式(只接收):
        props:['name']

      第二种方式(限制类型):
        props:{
          name:Number
        }
      第三种方式(限制类型,限制必要性,指定默认值):
        props:{
          name:{
            type:String, //类型
            required:true, //必要性
            default:'老王' //默认值
          }
        }

    >备注:props是只读的,Vue底层会监测你对props的修改,如果进行了修改,就会发出警告,若业务需求确实需要修改,那么请复制props的内容到data中一份,然后去修改data中的数据.

## mixin(混入)

功能:可以把多个组件共用的配置提取成一个混入对象
使用方式:
第一步定义混合,例如:
{
data(){....},
methods:{....},
.....
}
第二步使用混入,例如:
(1).全局混入:Vue.mixin(xxx)
(2).局部混入:mixins:['xxx']

## 插件

    功能:用于增强Vue
    本质:包含install方法的一个对象,install的第一个参数是Vue,第二个以后的参数是插件使用者传递的数据.
    定义插件:
      对象.install = function(Vue,options){
        //1. 添加全局过滤器
        Vue.filter(....)

        //2.添加全局指令
        Vue.directive(...)

        //3.配置全局混入(合)
        Vue.mixin(...)

        //4.添加实例方法
        Vue.prototype.$myMethod = function(){...}
        Vue.prototype.$myProperty = xxx
      }
    使用插件:Vue.use()

## scoped 样式

    作用: 让样式在局部生效,防止冲突.
    写法:<style scoped>

## 总结 TodoList 案例

1. 组件化编码流程：

   ​ (1).拆分静态组件：组件要按照功能点拆分，命名不要与 html 元素冲突。

   ​ (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

   ​ 1).一个组件在用：放在组件自身即可。

   ​ 2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

   ​ (3).实现交互：从绑定事件开始。

2. props 适用于：

   ​ (1).父组件 ==> 子组件 通信

   ​ (2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用 v-model 时要切记：v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的！

4. props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

## webStorage

1. 存储内容大小一般支持 5MB 左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关 API：

   1. `xxxxxStorage.setItem('key', 'value');`
      该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. `xxxxxStorage.getItem('person');`

      ​ 该方法接受一个键名作为参数，返回键名对应的值。

   3. `xxxxxStorage.removeItem('key');`

      ​ 该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. `xxxxxStorage.clear()`

      ​ 该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage 存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage 存储的内容，需要手动清除才会消失。
   3. `xxxxxStorage.getItem(xxx)`如果 xxx 对应的 value 获取不到，那么 getItem 的返回值是 null。
   4. `JSON.parse(null)`的结果依然是 null。
