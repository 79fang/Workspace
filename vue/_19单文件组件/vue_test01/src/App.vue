<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现:子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现:子给父传递数据 -->
    <!-- <Student @atguigu="getStudentName" /> -->

    <Student ref="student" />
  </div>
</template>

<script>
  import School from './components/School'
  import Student from './components/Student.vue'

export default {
  name:'App',
  components:{School,StudentStudent},
  data(){
    return {
      msg: 'hello!!'
    }
  },
  methods: {
    getSchoolName(name){
      console.log('App 收到了 SchoolName:',name)
    },
   getStudentName(name){
      console.log('App get StudentName:',name)
    },
  }
}
</script>

<style >
.app {
  background-color:gray;
  padding: 5px;
}
</style>

