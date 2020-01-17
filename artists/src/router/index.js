import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import MyTeacher from "../components/MyTeacher"
import UploadVideo from "../components/UploadVideo"
import QinTong from "../components/QinTong"
import Details from "../components/Details"
import MyCourse from "../components/MyCourse";
import ManageStu from "../components/Manage_Stu"
import Manage_Stu_Person from "../components/Manage_Stu_Person"
import Teacher_Introduction from "../components/Teacher_Introduction"
import QinTong_Person_Details from "../components/QinTong_Person_Details"
import Login from '../components/Login'
Vue.use(Router)

export default new Router({
  // base:"/teacher/",
  routes: [
    {
      path: '/',
      component: Login,
      name: 'login'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [{
        path: "/mycourse",
        component: MyCourse
      }, {
        name: "details",
        path: "/details",
        component: Details
      }, {
        path: "/qintong",
        component: QinTong,
      }, {
        path: "/teacher",
        component: MyTeacher
      }, {

        path: '/qintong/manage_student',
        component: ManageStu
      }, {
        name: "qintong_manage_student_manage_stu_person",
        path: "/qintong/manage_student/manage_stu_person",
        component: Manage_Stu_Person
      }, {
        name: "qintong_person_detials",
        path: "/qintong/person/detials",
        component: QinTong_Person_Details
      }
      ]
    },
    {
      path: "/uploadvideo",
      component: UploadVideo
    }, {
      path: "/teacher_introduction",
      component: Teacher_Introduction
    }
  ]
})
