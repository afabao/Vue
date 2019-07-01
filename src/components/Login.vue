<template>
    <div>
        <input type="text" v-model="name">
        <input type="text" v-model="age">
        <button @click="getem">commit</button>
    </div>
</template>

<script>
  import axios from 'axios'
  const axiosInstance = axios.create({
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    withCredentials: true
  })
export default {
   data () {
     return {
       name:'',
       age:''
     }
   },

  methods: {
     getem: function(){
       axiosInstance({
         method: "get",
         url: "/api/test"
       }).then(response => {
         this.name = response.data[0].name;
         this.age = response.data[0].age;
       })
     }
  }
}
</script>

<style scoped>

</style>
