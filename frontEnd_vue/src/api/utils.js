

// 支援服务分组
export const groups = [
  { g_id: "001", g_name: "第一组" },
  { g_id: "002", g_name: "第二组" },
  { g_id: "003", g_name: "第三组" },
  { g_id: "004", g_name: "第四组" },
];

//支援服务地点
export const places = [
  { p_id: "01", p_name: "物资管理处" },
  { p_id: "02", p_name: "隔离点" },
  { p_id: "03", p_name: "一公寓" },
  { p_id: "04", p_name: "二公寓" },
];

//班级
export const classes = [
  {c_id:'001', c_class:'计科18401'},
  {c_id:'002', c_class:'计科18402'},
  {c_id:'003', c_class:'计科18403'},
  {c_id:'004', c_class:'计科18404'},
  {c_id:'005', c_class:'网络18405'},
  {c_id:'006', c_class:'网络18406'},
  {c_id:'007', c_class:'软件18407'},
  {c_id:'008', c_class:'软件18408'},
  {c_id:'008', c_class:'软件18409'}
];

//学生路由管理
export const studentsRouterAdmin = [
  {
    path: "/student/myNotice",
    title: "我的通知",
    icon: "el-icon-chat-dot-round",
  },
  {
    path: "/student/health",
    title: "健康填报",
    icon: "el-icon-date",
  },
  {
    path: "/student/material",
    title: "物品申请",
    icon: "el-icon-edit-outline",
  },
  {
    path: "/student/volunteer",
    title: "志愿者报名",
    icon: "el-icon-first-aid-kit",
  },
  {
    path: "/student/user",
    title: "个人信息",
    icon: "el-icon-s-custom",
  },
]

//教师路由管理
export const teacherRouterAdmin = [
  {
    path: "/teacher/notice",
    title: "通知管理",
    icon: "el-icon-chat-dot-round",
  },
  {
    path: "/teacher/studentsList",
    title: "学生管理",
    icon: "el-icon-s-data",
  },
  {
    path: "/teacher/studentsHealth",
    title: "学生健康信息管理",
    icon: "el-icon-c-scale-to-original",
  },
  {
    path: "/teacher/assignVolunteer",
    title: "志愿者分配",
    icon: "el-icon-s-grid",
  },
  {
    path: "/teacher/materialAdmin",
    title: "物资管理",
    icon: "el-icon-document",
  },
  {
    path: "/teacher/user",
    title: "个人信息",
    icon: "el-icon-s-custom",
  },
]

// 格式化日期(年-月-日 时:分:秒)
export const formatTime = (time) => {
  var dt = new Date(time);
  var y = dt.getFullYear();
  var m = Number(dt.getMonth() + 1) < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
  var d = Number(dt.getDate()) < 10 ? `0${dt.getDate()}` : dt.getDate();
  var hh = Number(dt.getHours()) < 10 ? `0${dt.getHours()}` : dt.getHours();
  var mm = Number(dt.getMinutes()) < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
  var ss = Number(dt.getSeconds()) < 10 ? `0${dt.getSeconds()}` : dt.getSeconds();
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
};

//格式化日期(年-月-日)
export const formatYear = (time) => {
  var dt = new Date(time);
  var y = dt.getFullYear();
  var m = Number(dt.getMonth() + 1) < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
  var d = Number(dt.getDate()) < 10 ? `0${dt.getDate()}` : dt.getDate();
  return `${y}-${m}-${d}`
}

// 格式化ID
export const formatID = (id) => {
  if(String(id)[0] === 1) return String(id)
  else return `0${id}`
}


