import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import StudentPerson from '../components/Student_Person'
import ManageStudent from '../components/Manage_Student'
import PersonCourseDetails from '../components/Person_Course_Details'
import ManageCourse from '../components/ManageCourse'
import Details from '../components/Details'
import Feedback from '../components/Feedback'
import AppointCourse from '../components/AppointCourse'
import AppointCourseDetails from '../components/AppointCourse_Details'
import AppointCourseDetailsPerson from '../components/AppointCourse_Details_Person'
import Login from '../components/Login'
import ChangePwd from '../components/ChangePassword'
import CourseList from '../components/CourseList'
import TeacherIntroduction from '../components/Teacher_Introduction'
import ForgetPassword from '../components/ForgetPassword'
import CommitSuccess from '../components/SubmitSuccess'
Vue.use(Router)

export default new Router({
  // base: '/artist/',
  routes: [{
    path: '/',
    component: Login,
    name: 'login'
  },
  {
    path: '/forget_password',
    component: ForgetPassword,
    name: 'ForgetPassword'
  },
  {
    path: '/commit_success',
    component: CommitSuccess,
    name: 'CommitSuccess'
  },
  {
    name: 'changepassword',
    component: ChangePwd,
    path: '/change_pwd'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [{
      path: '/manage_student',
      component: ManageStudent,
      name: 'manage_Student'
    }, {
      name: 'courseList',
      component: CourseList,
      path: '/courseList'
    },
    {
      name: 'student_person',
      path: '/student_person',
      component: StudentPerson
    },
    {
      name: 'person_course_details',
      path: '/person_course_details',
      component: PersonCourseDetails
    },
    {
      path: '/manage_course',
      component: ManageCourse
    },
    {
      name: 'details',
      path: '/details',
      component: Details
    },
    {
      name: 'feedback',
      path: '/feedback',
      component: Feedback
    },
    {
      path: '/appoint_course',
      component: AppointCourse
    },
    {
      name: 'appoint_course_details',
      path: '/appoint_course/details',
      component: AppointCourseDetails
    }, {
      name: 'appoint_course_details_person',
      path: '/appoint_course/details/person',
      component: AppointCourseDetailsPerson
    }
    ]
  }, {
    path: '/teacher_introduction',
    component: TeacherIntroduction
  }
  ]
})
