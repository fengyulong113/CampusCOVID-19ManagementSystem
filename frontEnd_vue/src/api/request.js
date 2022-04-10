import { axiosInstance } from "./config";

let token = window.localStorage.getItem('token');

export const loginRequest = (options) => axiosInstance({
  url: `/users/login`,
  method: 'POST',
  data: options
});


export const getUserDataByToken = () => axiosInstance({
  url: '/users/getUserDataByToken',
  method: 'GET',
  params: { token: token }
});

export const getNoticeRequest = (options) => axiosInstance({
  url: '/students/getNotice',
  method: 'GET',
  params: {
    ...options,
    token: token,
  }
});

export const getNoticeReadRequest = () => axiosInstance({
  url: '/students/getNoticeRead',
  method: 'GET',
  params: { token: token }
})

export const goUnreadRequest = (options) => axiosInstance({
  url: '/students/goUnread',
  method: 'GET',
  params: {
    ...options,
    token: token
  }
});

export const goReadRequest = (options) => axiosInstance({
  url: '/students/goRead',
  method: 'GET',
  params: {
    ...options,
    token: token
  }
});

export const getHealthNowDayByidRequest = () => axiosInstance({
  url: '/students/getHealthNowDayByid',
  method: 'GET',
  params: { token: token }
});

export const setHealthRequest = (options) => axiosInstance({
  url: `/students/setHealth`,
  method: 'POST',
  data: {
    token: token,
    ...options
  }
});

export const getHealthByIdRequest = (options) => axiosInstance({
  url:'/students/getHealthById',
  method:'GET',
  params:{ ...options, token: token }
  
})

export const upPwdRequest = (options) => axiosInstance({
  url: `/users/upPwd`,
  method: 'POST',
  data: {
    token: window.localStorage.getItem('token'),
    ...options
  }
});

export const getUsersByTypePageRequest = (options) => axiosInstance({
  url: `/users/getUsersByTypePage`,
  method: 'GET',
  params: { ...options }
});

export const getHealthNowDayRequest = () => axiosInstance({
  url: '/students/getHealthNowDay',
  method: 'GET',
});

export const getHealthNowMonthRequest = () => axiosInstance({
  url: '/students/getHealthNowMonth',
  method: 'GET'
});

export const getEnterVolunteerRequset = () => axiosInstance({
  url: '/students/getEnterVolunteer',
  method: 'GET',
  params: { token: token }
});

export const getAllVolunteerRequest = () => axiosInstance({
  url: '/students/getAllVolunteer',
  method: 'GET'
});

export const getVolunteerByIdRequest = () => axiosInstance({
  url: '/students/getVolunteerById',
  method: 'GET',
  params: { token: token }
});

export const setMaterialRequest = (options) => axiosInstance({
  url: '/students/setMaterial',
  method: 'POST',
  data: { ...options, token: token }
});

export const getAllNoticeRequest = (options) => axiosInstance({
  url: '/admin/getAllNotice',
  method: 'GET',
  params: { ...options, token: token }
});

export const announceRequest = (options) => axiosInstance({
  url: '/admin/announce',
  method: 'POST',
  data: { ...options, token: token }
});

export const NoticeDetailsRequest = (options) => axiosInstance({
  url: '/admin/NoticeDetails',
  method: 'GET',
  params: { ...options, token: token }
});

export const delNoticeRequest = (options) => axiosInstance({
  url: '/admin/delNotice',
  method: 'GET',
  params: { ...options, token: token }
});

export const getAllVolunteerByTeacherRequest = () => axiosInstance({
  url: '/admin/getAllVolunteerByTeacher',
  method: 'GET'
});

export const setVolunteer = (options) => axiosInstance({
  url: '/admin/setVolunteer',
  method: 'POST',
  data: { ...options }
});

export const getAllStudentsRequest = () => axiosInstance({
  url: '/admin/getAllStudents',
  method: 'GET'
});

export const getUsersByTypeAndCharRequest = (options) => axiosInstance({
  url: '/admin/getUsersByTypeAndChar',
  method: 'GET',
  params: { ...options, token: token }
});

export const setXlsxDataRequset = () => axiosInstance({
  url: '/users/setXlsxData',
  method: 'POST',
  data: { token: token }
});

export const upUserdataRequest = (options) => axiosInstance({
  url: '/users/upUserdata',
  method: 'POST',
  data: { ...options, token: token }
});

export const delUserdataRequest = (options) => axiosInstance({
  url: "/users/delUserdata",
  method:'GET',
  params: { ...options, token: token }
})

export const getStuHealthByTypeRequest = (options) => axiosInstance({
  url:'/students/getStuHealthByType',
  method:'GET',
  params:{ ...options }
});

export const getStuHealthByTempRequest = () => axiosInstance({
  url:'/students/getStuHealthByTemp',
  method:'GET'
});

export const getAllMaterialRequest = () => axiosInstance({
  url:'/admin/getAllMaterial',
  method:'GET',
  params:{ token:token }
})

