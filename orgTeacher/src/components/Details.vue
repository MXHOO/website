<template>
  <div v-if="'no_feedback'==this.$route.params.type">
    <el-row>
      <el-col style="margin-top:20px;padding-left:5px;padding-bottom:2px">
        <span
          @click="my_course"
          class="catalogue"
        >未反馈课程</span> > 详情
      </el-col>
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
        >{{this.$route.params.sname}}</el-col>
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
          <center>
            <button
              class="download_btn"
              @click="download_unreq"
            >下载视频</button>
          </center>
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
      <el-row>
        <el-col
          :span="12"
          :offset="5"
        >
          <center>
            <button
              class="download_btn"
              @click="feedback"
            >反馈</button>
          </center>
        </el-col>
      </el-row>
    </div>
  </div>
  <div v-else-if="'feedback'==this.$route.params.type">
    <el-row>
      <el-col style="margin-top:20px;padding-left:5px">
        <span
          @click="my_course"
          class="catalogue"
        >已反馈课程</span> > 详情
      </el-col>
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
        >{{this.$route.params.sname}}</el-col>
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
      <el-row style="margin-top:10px">
        <el-col :span="12">
          <el-row>
            <el-col
              :span="8"
              class="detail_title"
            >课程上传时间</el-col>
            <el-col
              :span="14"
              class="detail_con"
            >{{this.$route.params.uploaddatetime}}</el-col>
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
          <center>
            <button
              class="download_btn"
              @click="download_req"
            >下载视频</button>
          </center>
        </el-col>
        <el-col :span="12">
          <center>
            <button
              class="download_btn"
              @click="download_res"
            >下载视频</button>
          </center>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:20px">
        <el-col
          :span="10"
          :offset="1"
          style="font-size:13px"
        >
          <span style="color:#999;padding-left:5px">学生留言</span>
          &nbsp;&nbsp;&nbsp;{{this.leavemessage}}
        </el-col>
        <el-col
          :span="10"
          :offset="2"
          style="font-size:13px"
        >
          <span style="color:#999;padding-left:5px">导师留言</span>
          &nbsp;&nbsp;&nbsp;{{this.a_leavemessage}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data: function () {
    return {
      leavemessage: '',
      classtime: '',
      req_video: '',
      a_leavemessage: '',
      res_video: '',
      unres_video: '',
      oid: '',
      tid: ''
    }
  },
  methods: {
    my_course: function () {
      this.$router.replace({ path: '/manage_course' })
    },
    download_req: function () {
      window.location.href = this.req_video
    },
    download_res: function () {
      window.location.href = this.res_video
    },
    download_unreq: function () {
      window.location.href = this.unres_video
    },
    feedback: function () {
      this.$router.replace({
        name: 'feedback',
        params: {
          oid: this.oid,
          tid: this.tid,
          sid: this.$route.params.sid,
          cid: this.$route.params.cid
        }
      })
    }
  },
  mounted: function () {
    if (this.$route.params.type == 'feedback') {
      // 已反馈
      var a = {
        uid: this.$route.params.uid,
        fid: this.$route.params.fid
      }
      this.$http
        .post('http://139.9.115.22:8080/artist/findufd', JSON.stringify(a))
        .then(function (data) {
          var content = data.data
          if (
            content.umessage == undefined ||
            content.umessage == '' ||
            content.umessage == null
          ) {
            this.leavemessage = '无'
          } else {
            this.leavemessage = content.umessage
          }
          if (
            content.fmessage == undefined ||
            content.fmessage == '' ||
            content.fmessage == null
          ) {
            this.a_leavemessagessage = '无'
          } else {
            this.a_leavemessage = content.fmessage
          }
          this.req_video = content.upath
          this.res_video = content.fpath
        })
        .catch(function (err) {
          window.console.log(err)
        })
    } else if (this.$route.params.type == 'no_feedback') {
      // 未反馈
      var a = JSON.stringify({
        uid: this.$route.params.uid,
        cid: this.$route.params.cid
      })
      this.$http
        .post('http://139.9.115.22:8080/artist/findufd', a)
        .then(function (data) {
          var content = data.data
          if (
            content.umessage == undefined ||
            content.umessage == '' ||
            content.umessage == null
          ) {
            this.leavemessage = '无'
          } else {
            this.leavemessage = content.umessage
          }
          this.oid = content.oid
          this.tid = content.tid
          this.sid = content.sid
          this.unres_video = content.upath
        })
        .catch(function (err) {
          window.console.log(err)
        })
    }
  }
}
</script>

<style>
.details_item {
  padding-top: 20px;
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
  font-size: 14px;
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
</style>
