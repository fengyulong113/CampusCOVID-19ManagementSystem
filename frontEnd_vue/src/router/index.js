import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  //login
  { path: '/', name: 'Login', component: () => import('@/components/login/Login.vue') },
  //stdent
  {
    path: '/student', name: 'Student', component: () => import('@/components/student/Student.vue'),
    children: [
      { path: 'home', component: () => import('@/components/common/homepage.vue') },
      { path: 'user', component: () => import('@/components/common/userInfo.vue') },
      { path: 'myNotice', component: () => import('@/components/student/myNotice.vue') },
      { path: 'health', component: () => import('@/components/student/healthTable.vue') },
      { path: 'volunteer', component: () => import('@/components/student/volunteer.vue') },
      { path: 'material', component: () => import('@/components/student/material.vue') },
    ]
  },
  // teacher
  {
    path: '/teacher', name: 'Teacher', component: () => import('@/components/teacher/Teacher.vue'),
    children: [
      { path: 'home', component: () => import('@/components/common/homepage.vue') },
      { path: 'user', component: () => import('@/components/common/userInfo.vue') },
      { path: 'notice', component: () => import('@/components/teacher/noticeSend.vue') },
      { path: 'assignVolunteer', component: () => import('@/components/teacher/assignVolun.vue') },
      { path: 'studentsList', component: () => import('@/components/teacher/studentAdmin.vue') },
      { path: 'studentsHealth', component: () => import('@/components/teacher/stuHealth.vue') },
      { path: 'materialAdmin', component: () => import('@/components/teacher/materialAdmin.vue') },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
