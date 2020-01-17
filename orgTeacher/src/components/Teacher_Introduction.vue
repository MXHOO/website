<template>
  <div class="back_item" style="z-index:-2">
    <div class="top">
      <div class="icon" @click="back_teacher" style="margin-left:60px;">
        <i class="el-icon-arrow-left" style="color:#e8bd5f"></i> &nbsp;&nbsp;返回预约课程
      </div>
      <center>
        <img id="logo" src="../assets/logo.png" />
      </center>
      <div style="right:60px;color:white; position: absolute;top:35px">
        <i class="el-icon-user"></i> 蔡男老师
      </div>
    </div>
    <el-row style="position:absolute">
      <el-col :span="14" :offset="5" style="margin-top:40px;padding-left:-30px">
        <img src="../assets/teacher.png" style="width:100%" />
      </el-col>
    </el-row>
    <div class="teacher_item" style>
      <el-row style="margin-top:290px">
        <el-col :span="6" :offset="6">
          <el-row style="font-size:25px; padding-left:70px">蔡 男</el-row>
          <el-row
            style="color:#999;margin-top:15px; padding-left:70px;letter-spacing:1px"
          >美国波士顿大学钢琴演奏博士</el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top:110px">
        <el-col :offset="8" :span="8">
          <center>
            <ul>
              <li>
                <span class="span">旅美青年钢琴家</span>
              </li>
              <li>
                <span class="span">美国国际学者联盟荣誉会员</span>
              </li>
              <li>
                <span class="span">美国波士顿地区中国学生学者联合会主席</span>
              </li>
              <li>
                <span class="span">美国波士顿大学全额奖学金钢琴演奏博士</span>
              </li>
            </ul>
          </center>
        </el-col>
      </el-row>
      <el-row style="margin:90px 0">
        <el-col :span="6" :offset="6" class="message" style=" border-right:1px solid #999;">
          <img src="../assets/t.svg" />
          <div class="show">
            <div style="color:#e8bd5f;font-size:18px;padding-bottom:10px">师 从</div>
            <div class="f_t">著名教育家 朱亚芬</div>
            <div class="f_t">中国钢琴家协会秘书长 李民教授</div>
            <div class="f_t">美国罗格斯大学钢琴系主任 John Perry</div>
            <div class="f_t">美国波士顿大学钢琴系主任 Boaz Sharon</div>
          </div>
        </el-col>
        <el-col :span="6" class="message">
          <center>
            <img src="../assets/honor.svg" />
          </center>
          <div class="show">
            <div style="color:#e8bd5f;font-size:18px;padding-bottom:10px">荣 誉</div>
            <div class="f_t">香港青少年艺术大赛钢琴比赛 评委</div>
            <div class="f_t">中国文化部“领导力大赛” 嘉宾</div>
            <div class="f_t">美国加州钢琴教师联盟钢琴比赛 金奖</div>
            <div class="f_t">美国 Snio-US国际钢琴比赛 金奖</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="message">
        <div style="font-size:24px;padding-bottom:12px">蔡楠老师的钢琴启蒙课</div>
        <div class="course_intr">教材学习：Hoffman</div>
        <div class="course_intr">适合四岁及以上</div>
      </el-row>

      <el-row style="margin-top:30px;background:black;padding-bottom:30px">
        <el-col :span="8" :offset="8">
          <img style="width:100%" src="../assets/in.jpg" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import {mapState,mapGetters,mapActions} from 'vuex'
export default {
  name: 'Teacher_Introduction',
  methods: {
    back_teacher: function () {
      this.$router.replace({ path: '/index' })
    }
  }
}
</script>
<style>
.f_t {
  letter-spacing: 1px;
  color: #fafafad7;
  padding-top: 5px;
  font-size: 13px;
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
.back_item {
  font-family: "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans",
    source-han-sans-simplified-c, sans-serif;
  width: 100%;
  height: 100%;
  background: black;
}
.icon {
  line-height: 90px;
  color: #fafafa;
}
.icon:hover{
  cursor: pointer;
}
.teacher_item {
  color: #fafafa;
  background: black;
}
.message {
  letter-spacing: 3px;
  text-align: center;
}
li {
  font-size: 14px;
  padding: 10px 0 0 0;
  color: #ecd6a7;
  list-style: inside;
}
.span {
  color: #f9f9f9d7;
}
.show {
  font-size: 13px;
  color: #f9f9f9;
}
.course_intr {
  color: #999;
  font-size: 13px;
}
</style>
