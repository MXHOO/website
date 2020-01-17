<template>
  <div v-if="'nofeedback'==this.$route.params.type">
    <el-row>
      <el-col style="margin-top:20px;padding-left:15px"><span
          class="catalogue"
          @click="my_appoint"
        >未反馈课程</span> > 详情</el-col>
    </el-row>
    <div
      class="t_border details_item"
      style="padding:20px 0;margin-bottom:30px"
    >
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >学生</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.$route.params.sname}}</el-col>
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
        >课程上传时间</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.$route.params.uploaddatetime}}</el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >课程次数</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >第{{this.classtime}}次</el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col
          :span="11"
          :offset="6"
        >
          <div class="video"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="12"
          :offset="5"
        >
          <center><button
              class="download_btn"
              @click="download_unreq"
            >下载视频</button></center>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >留言:</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.leavemessage}}</el-col>
      </el-row>
    </div>

  </div>
  <div v-else-if="'feedback'==this.$route.params.type">
    <el-row>
      <el-col style="margin-top:20px;padding-left:15px"><span
          class="catalogue"
          @click="my_appoint"
        >已反馈课程</span> > 详情</el-col>
    </el-row>
    <div
      class="t_border details_item"
      style="padding:20px 0;margin-bottom:30px"
    >
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >学生</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.$route.params.sname}}</el-col>
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
        >第{{this.classtime}}次</el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="12">
          <el-row>
            <el-col
              :span="9"
              class="detail_title"
            >课程上传时间</el-col>
            <el-col
              :span="13"
              class="detail_con"
            >{{this.$route.params.uploaddatetime}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col
              :span="9"
              class="detail_title"
            >课程反馈时间</el-col>
            <el-col
              :span="13"
              class="detail_con"
            >{{this.$route.params.feedbackdatetime}}</el-col>
          </el-row>
        </el-col>
      </el-row>
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
          <center><button
              class="download_btn"
              @click="download_req"
            >下载视频</button></center>
        </el-col>
        <el-col :span="12">
          <center><button
              class="download_btn"
              @click="download_res"
            >下载视频</button></center>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:20px">
        <el-col
          :span="10"
          :offset="1"
          style="font-size:13px"
        ><span style="color:#999;">学生留言</span> &nbsp;&nbsp; {{this.leavemessage}} </el-col>
        <el-col
          :span="10"
          :offset="2"
          style="font-size:13px"
        ><span style="color:#999;">导师留言</span> &nbsp;&nbsp; {{this.a_leavemessage}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data: function() {
    return {
      leavemessage: "",
      classtime: "",
      req_video: "",
      a_leavemessage: "",
      res_video: "",
      unres_video: ""
    };
  },
  methods: {
    my_appoint: function() {
      this.$router.replace({ path: "/mycourse" });
    },
    download_req: function() {
      window.location.href = this.req_video;
    },
    download_res: function() {
      window.location.href = this.res_video;
    },
    download_unreq: function() {
      window.location.href = this.unres_video;
    }
  },
  mounted: function() {
    if ("feedback" == this.$route.params.type) {
      //已反馈
      var a = {
        cid: this.$route.params.cid,
        uid: this.$route.params.uid,
        fid: this.$route.params.fid
      };
      this.$http
        .post("http://139.9.115.22:8080/teacher/cdetails", JSON.stringify(a))
        .then(function(data) {
          var content = data.data;
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
        })
        .catch(function(err) {
          window.console.log(err);
        });
    } else if ("nofeedback" == this.$route.params.type) {
      //未反馈
      var a = JSON.stringify({
        cid: this.$route.params.cid,
        uid: this.$route.params.uid
      });
      this.$http
        .post("http://139.9.115.22:8080/teacher/cdetails", a)
        .then(function(data) {
          var content = data.data;
          if (
            content.umessage == undefined ||
            content.umessage == "" ||
            content.umessage == null
          ) {
            this.leavemessage = "无";
          } else {
            this.leavemessage = content.umessage;
          }
          this.classtime = content.classtime;
          this.unres_video = content.upath;
        })
        .catch(function(err) {
          window.console.log(err);
        });
    }
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
  padding: 5px 0;
  font-size: 13px;
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
