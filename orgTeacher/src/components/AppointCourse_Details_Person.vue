<template>
  <div>
    <div style="margin:20px 0 5px 0"><span
        class="catalogue"
        @click="my_subscribeclass"
      >我的课程预约</span> > <span
        class="catalogue"
        @click="my_subscribe"
      >详情 > </span> <span>{{this.$route.params.sname}}</span></div>
    <div
      class="t_border"
      style="background:white"
    >
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >姓名</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.$route.params.sname}}</el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >曲目</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.$route.params.song}}</el-col>
      </el-row>
      <el-row>
        <span
          @click="my_spectrum"
          class="catalogue"
        >
          <center> {{this.$route.params.spname}} </center>
        </span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointCourse_Details_Person',
  methods: {
    my_subscribe: function () {
      this.$router.replace({
        path: "/appoint_course/details"
      })
    },
    my_spectrum: function () {
      window.location.href = this.$route.params.spectrum
    },
    my_subscribeclass: function () {
      var type = window.localStorage.getItem("type");
      if (type == "CourseList") { this.$router.replace({ path: "/courseList" }); }
      else { this.$router.replace({ path: "/appoint_course" }); }
    }
  }
}
</script>

<style>
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>
