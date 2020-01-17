<template>
  <div id="item">
    <div class="top">
      <center>
        <img style="height:50px" id="logo" src="../assets/logo.png">
      </center>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="3" :offset="5">
          <div>
            <div class="nav_top" style="ffont-weight:bold">
              <div class="block">
                <center style="padding-top:50px">
                  <img
                    style="border-radius:50px;height:100px;width:100px;background:#e8bd5f"
                    src="../assets/head.svg"
                  >
                </center>
                <div style="margin-top:10px;font-size:18px;font-weight:bold">
                
                   <center>{{this.organization}}</center>
                </div>
                <div style="margin-top:20px;font-size:18px;font-weight:bold">
                  <center>{{this.tname}}老师</center>
                </div>
                <div style="margin-top:10px;color:#999">
 
                  <center>{{this.password}}</center>
                </div>
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
                <el-menu-item index="1" style="padding-right:20px" @click="appoint_course">
                  <i class="el-icon-date"></i>
                  <span slot="title">预约课程</span>
                </el-menu-item>
                <el-menu-item index="2" @click="show_qintong">
                  <i class="el-icon-edit"></i>
                  <span slot="title">我的琴童</span>
                </el-menu-item>
                <el-menu-item index="3" @click="show_teacher">
                  <i class="el-icon-setting"></i>
                  <span slot="title">我的导师</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-col>
        <el-col :span="11" class="right">
          <div class="r_top"></div>
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  data: function() {
    return {
      circleUrl: "../assets/logo.png",
      organization: window.localStorage.getItem("organization"),
      tname:window.localStorage.getItem("tname"),
      password: window.localStorage.getItem("password")
    };
  },
  methods: {
    appoint_course: function() {
      this.$router.replace({ path: "/mycourse" });
    },
    show_qintong: function() {
      this.$router.replace({ path: "/qintong" });
    },
    show_teacher: function() {
      this.$router.replace({ path: "/teacher" });
    }
  },
  mounted: function() {
    this.$router.replace({ path: "/mycourse" });
  }
};
</script>
<style>
#item {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   font-family: "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", source-han-sans-simplified-c, sans-serif;
  height: 100%;
  background: #f9f9f9;
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
.btn {
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

