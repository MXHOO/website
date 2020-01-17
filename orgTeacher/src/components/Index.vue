<template>
  <div id="item">
    <div class="top">
      <center>
        <img
          id="logo"
          src="../assets/logo.png"
        >
      </center>
    </div>
    <div class="content">
      <el-row>
        <el-col
          :span="3"
          :offset="5"
        >
          <div>
            <div class="nav_top">
              <div class="block">
                <center style="padding-top:50px">
                  <img
                    style="background:#e9bc5e;border-radius:50px;height:100px;width:100px"
                    src="../assets/head.svg"
                  >
                </center>
                <center>
                  <p style="font-size:20px;margin:10px 0">{{this.name}}老师</p>
                </center>
                <el-row style="margin-top:25px">
                  <el-col
                    :span="14"
                    :offset="5"
                  >
                    <button
                      @click="show_person"
                      style="background:#e8bd5f;border-radius:5px;border:1px;padding:8px 0;width:100%;color:white"
                    >查看个人主页</button>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#000"
                active-text-color="#e5bd5b"
              >
                <el-menu-item
                  index="1"
                  @click="manage_student"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">琴童管理</span>
                </el-menu-item>
                <el-menu-item
                  index="2"
                  @click="appoint_course"
                >
                  <i class="el-icon-document"></i>
                  <span slot="title">课程预约</span>
                </el-menu-item>
                <el-menu-item
                  index="3"
                  @click="manage_course"
                >
                  <i class="el-icon-setting"></i>
                  <span slot="title">课程管理</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-col>
        <el-col
          :span="11"
          class="right"
        >
          <div class="r_top"></div>
          <router-view style="margin-bottom:100px" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data: function () {
    return {
      circleUrl: '../assets/logo.png',
      name: window.localStorage.getItem('aname')
    }
  },
  methods: {
    show_person: function () {
      this.$router.replace({ path: '/teacher_introduction' })
    },
    manage_student: function () {
      this.$router.replace({ path: '/manage_student' })
    },
    appoint_course: function () {
      this.$router.replace({ path: '/appoint_course' })
    },
    manage_course: function () {
      this.$router.replace({ path: '/manage_course' })
    }
  },
  mounted: function () {
    this.$router.replace({ path: '/manage_student' })
  }
}
</script>
<style>
.item {
  font-family: "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans",
    source-han-sans-simplified-c, sans-serif;
  font-weight: 1000;
}
.top {
  width: 100%;
  margin: 0px;
  height: 100px;
  background: black;
  position: relative;
}
#logo {
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -29px;
  margin-left: -40px;
}
.content {
  margin-top: 60px;
}
.nav_top {
  height: 300px;
  background: #fff7ea;
}
.el-menu-vertical-demo {
  font-size: 20px;
}
.right {
  margin-left: 30px;
}
.r_top {
  background: #999999;
  height: 120px;
}
.r_bottom {
  text-align: center;
  margin-top: 20px;
}
.btn_de {
  background: #e8bd5f;
  color: white;
}
.btn:hover {
  background: #e8bd5f;
  color: white;
}
.t_border {
  border-top: #e9bc5e 3px solid;
  border-radius: 3px;
  margin-top: 5px;
}
.no_feedback {
  margin-top: 5px;
}
</style>
