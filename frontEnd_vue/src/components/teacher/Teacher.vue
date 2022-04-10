<template>
  <div class="common">

    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link tag="a" to="/teacher/home" class="nav-link"
            >Home</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <span>Campus COVID-19 Management System</span>
      </ul>
      <ul class="navbar-nav ml-auto">
        <el-dropdown>
          <span class="el-dropdown-link">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
              <i class="el-icon-s-tools"></i>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>
              <el-button type="text" @click="outlogin">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="dropdown-divider"></div>
      </ul>
    </nav>

    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <span class="font-weight-light brand-link">{{ type }}</span>
      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              :src="avatar"
              class="img-circle elevation-2"
              alt="User Image"
              style="width: 3rem; height: 3rem"
            />
          </div>
          <div class="info">
            <a href="#/teacher/user" class="d-block">{{username}}</a>
          </div>
        </div>
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <router-link
              tag="li"
              v-for="(item, index) in navActive"
              :key="index"
              class="nav-item"
              :to="item.path"
            >
              <a class="nav-link">
                <i :class="item.icon"></i>
                <p>
                  {{ item.title }}
                </p>
              </a>
            </router-link>
          </ul>
        </nav>
      </div>
    </aside>

    <div class="content-wrapper">
      <section class="content" style="height: 48rem; overflow-y: scroll">
        <div class="container-fluid">
          <el-row style="padding: 10px 10px">
            <el-col :span="24">
              <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getUserDataByToken } from '@/api/request';
import { baseURL } from "@/api/config";
import { teacherRouterAdmin } from '@/api/utils';
export default {
  name: "Admin",
  data() {
    return {
      type: "",
      avatar: "",
      username: "",
      navActive: teacherRouterAdmin
    };
  },
  created() {
    getUserDataByToken()
      .then((res) => {
        this.username = res.username;
        this.avatar = baseURL + "/file/" + res.head;
        if (res.type == 2) this.type = "Student";
        else if (res.type == 3) this.type = "Teacher";
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    outlogin() {
      window.location.href = "http://localhost:80/#/Login";
    },
  },
};
</script>
<style lang="scss" scoped>
.content::-webkit-scrollbar {
  display: none;
}
</style>
