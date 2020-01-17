<template>
  <div>
    <div style="margin:20px 0 5px 0;padding-left:5px">
      <span
        class="catalogue"
        @click="my_appoint"
      >我的预约课程</span> > 详情
    </div>
    <div
      class="t_border"
      style="background:white"
    >
      <el-row>
        <el-col
          :span="20"
          :offset="2"
          class="test"
        >
          <el-row>
            <el-col
              :span="11"
              class="detail_title"
            >日期</el-col>
            <el-col
              :span="11"
              class="detail_con"
            >{{this.sudate}}</el-col>
          </el-row>
          <el-row>
            <el-col
              :span="11"
              class="detail_title"
            >时间段</el-col>
            <el-col
              :span="11"
              class="detail_con"
            >{{this.sutime}}</el-col>
          </el-row>
          <el-row>
            <el-col
              :span="11"
              class="detail_title"
            >机构</el-col>
            <el-col
              :span="11"
              class="detail_con"
            >{{this.organization}}</el-col>
          </el-row>
          
        </el-col>
      </el-row>

      
      <el-row style="margin-top:15px">
        <center>
          <span style="color:#999;font-size:13px">参与琴童</span>
        </center>
      </el-row>
      <el-row style="margin-top:15px;padding-bottom:20px">
        <el-col
          :offset="5"
          :span="14"
        >
          <el-row>
            <el-col
              style="font-size:12px;text-align:center;color:#999"
              :span="6"
              v-for="(value,index) in studentArray"
              :key="index"
            >
              <div
                class="catalogue"
                @click="student_details(index)"
              >
                <center>{{value.sname}}</center>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: "AppointCourse_Details",
  data: function () {
    return {
      sudate: "",
      sutime: "",
      organization: "",
      song: "",
      sname: "",
      spectrum: "",
      studentArray: []
    };
  },
  methods: {
    my_appoint: function () {
      var type = window.localStorage.getItem("type");
      if (type == "CourseList") { this.$router.replace({ path: "/courseList" }); }
      else { this.$router.replace({ path: "/appoint_course" }); }
    },
    student_details: function (index) {
      this.$router.replace({
        name: 'appoint_course_details_person',
        path: "/appoint_course/details/person",
        params: {
          sname: this.studentArray[index].sname,
          song: this.studentArray[index].song,
          spectrum: this.studentArray[index].spectrum,
          spname: this.studentArray[index].spname
        }
      })
    }
  },
  mounted: function () {
    this.sudate = window.localStorage.getItem("sudate");
    this.sutime = window.localStorage.getItem("sutime");
    this.organization = window.localStorage.getItem("organization");
    var content = JSON.stringify({

      suid: this.window.localStorage.getItem("suid")

    });
    this.$http
      .post("http://139.9.115.22:8080/artist/sudetails", content)
      .then(function (data) {
        var content = data.body;
        for (var i = 0; i < content.length; i++) {
          this.studentArray.push({
            sname: content[i].sname,
            song: content[i].song,
            spectrum: content[i].spectrum,
            spname: content[i].spname
          })
        }
        // (this.song = content.song),
        //   (this.sname = content.allstudent),
        //   (this.spectrum = content.spectrum);
        // this.studentArray = content.allstudent.split(",");
      })
      .catch(function (err) {
        window.console.log(err);
      });
  }
};
</script>

<style>
.detail_title {
  margin-right: 10px;
  padding: 7px 0;
  text-align: right;
  font-size: 12px;
  color: #999;
}
.detail_con {
  margin-left: 10px;
  padding: 7px 0;
  font-size: 15px;
}
.down:hover {
  cursor: pointer;
}
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>
