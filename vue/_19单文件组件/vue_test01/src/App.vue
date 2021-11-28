<template>
  <div class="app">
    <h1>{{msg}}</h1>

    <!-- 通过父组件给子组件传递函数类型的props实现:子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现:子给父传递数据(第一种写法,使用@或v-on) -->
    <!-- //once 触发一次 -->
    <!-- <Student @atguigu.once="getStudentName" />   -->
    <Student @atguigu="getStudentName" @demo="m1" /> 


    <!-- 通过父组件给子组件绑定一个自定义事件实现:子给父传递数据(第二种写法,使用ref) -->
    <!-- <Student ref="student" /> -->
  </div>
</template>

<script>
 import Student from './components/Student'
  import School from './components/School'
 

export default {
  name:'App',
  components:{School,Student},
  data(){
    return {
      msg: 'hello!!'
    }
  },
  methods: {
    getSchoolName(name){
      console.log('App 收到了 SchoolName:',name)
    },
    //收到的第一个参数作为name,后面的参数放入params数组
   getStudentName(name,...params) {
      console.log('App get StudentName:',name,params)
    },
    m1(){
      console.log('demo事件被触发了')
    }

  },
  mounted() {
    // this.$refs.student.$on('atguigu',this.getStudentName)    //绑定自定义事件,可以setTimeout
    // this.$refs.student.$once('atguigu',this.getStudentName)   //绑定自定义事件(一次性),触发一次
    
  },
}
</script>

<style >
.app {
  background-color:gray;
  padding: 5px;
}
</style>

