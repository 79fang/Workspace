<template>
  <div>
    <Student name="李四" sex="女" :age="20"></Student>
    <hr>
    <Student name="张三" sex="男" :age="18"></Student>
    <hr>
  </div>
</template>

<script>
import Student from './components/Student'

export default {
  name:'App',
  components:{Student},
}
</script>

<style>

</style>