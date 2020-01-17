<template>
  <div>
    <el-row>
      <el-col style="margin-top:20px"><span
          class="catalogue"
          @click="my_student"
        >我的琴童</span> > <span
          class="catalogue"
          @click="student_person"
        >{{sname}}</span> > 课程详情</el-col>
    </el-row>
    <div class="t_border details_item">
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >学生</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{sname}}</el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >导师</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.$route.params.aname}}</el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >课程次数</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >第{{this.$route.params.classtime}}次</el-col>
      </el-row>
      <el-col :span="12">
        <el-row>
          <el-col
            :span="8"
            class="detail_title"
          >课程上传时间</el-col>
          <el-col
            :span="14"
            class="detail_con"
          >{{this.uploaddatetime}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col
            :span="8"
            class="detail_title"
          >课程反馈时间</el-col>
          <el-col
            :span="14"
            class="detail_con"
          >{{this.feedbackdatetime}}</el-col>
        </el-row>
      </el-col>
      <el-row>
        <el-col
          :span="10"
          :offset="1"
        >
          <div class="video"></div>
        </el-col>
        <el-col
          :span="10"
          :offset="2"
        >
          <div class="video"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <center>
            <button
              class="download_btn"
              @click="download_req"
            >下载</button>
          </center>
        </el-col>
        <el-col :span="12">
          <center>
            <button
              class="download_btn"
              @click="download_res"
            >下载</button>
          </center>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="10"
          :offset="1"
        >留言 {{this.leavemessage}}</el-col>
        <el-col
          :span="10"
          :offset="2"
        >留言 {{this.a_leavemessage}}</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "QinTong_Person_Details",
  data: function() {
    return {
      sname:"",
      leavemessage: "",
      req_video: "",
      a_leavemessage: "",
      res_video: "",
      uploaddatetime: "",
      feedbackdatetime: ""
    };
  },
  methods: {
    student_person: function() {
      this.$router.replace({
        path: "/qintong/manage_student/manage_stu_person"
      });
    },
    my_student: function() {
      this.$router.replace({ path: "/qintong" });
    },
    download_req: function() {
      window.location.href = this.req_video;
    },
    download_res: function() {
      window.location.href = this.res_video;
    }
  },
  mounted: function() {
    this.sname=window.localStorage.getItem("sname");
    var content = JSON.stringify({
      uid: this.$route.params.uid,
      fid: this.$route.params.fid
    });

    this.$http
      .post("http://139.9.115.22:8080/teacher/sdetailsclasstime", content)
      .then(function(data) {
        var content = data.body;
        if (
          content.umessage == undefined ||
          content.umessage == "" ||
          content.umessage == null
        ) {
          this.leavemessage = "无";
        } else {
          this.leavemessage = content.umessage;
        }
        if (
          content.fmessage == undefined ||
          content.fmessage == "" ||
          content.fmessage == null
        ) {
          this.a_leavemessagessage = "无";
        } else {
          this.a_leavemessage = content.fmessage;
        }
        this.classtime = content.classtime;
        this.req_video = content.upath;
        this.res_video = content.fpath;
        this.uploaddatetime = content.uploaddatetime;
        this.feedbackdatetime = content.feedbackdatetime;
      })
      .catch(function(err) {
        window.console.log(err);
      });
  }
};
</script>
<style>
.details_item {
  background: white;
}
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
.video {
  background: #999;
  height: 150px;
}
.download_btn {
  padding: 5px;
  width: 80px;
  border: 1px;
  border-radius: 3px;
  color: white;
  background: #e8bd5f;
  margin: 20px 0;
}
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>