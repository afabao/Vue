<template>
  <div>
    <div>
      <el-menu

        class="el-menu-demo"
        mode="horizontal"

        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

        <el-menu-item index="5" style="float: right;"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        <el-menu-item index="6" style="float: right;"><img src="" alt=""></el-menu-item>
      </el-menu>
      <div>
        <div>
          <p v-for="item in list">
            Line:
            <span v-text="item"></span>
          </p>
          <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面！-->
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      data() {
        return {
          list: [],
        };
      },
      methods: {
        infiniteHandler($state) {
          setTimeout(() => {
            const temp = [];
            for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
              temp.push(i);
            }
            this.list = this.list.concat(temp);
            $state.loaded();
          }, 1000);
        },
      },
    }
</script>

<style scoped>


</style>
