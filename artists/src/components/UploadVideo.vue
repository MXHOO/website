<template>
  <div class="uploadCourse">
    <div class="top">
      <div
        class="icon"
        @click="back_appoint"
        style="color:#fafafa"
      >
        <i
          class="el-icon-arrow-left"
          style="color:#e8bd5f"
        ></i> <span class="catalogue">返回预约课程</span>
      </div>
      <center>
        <img
          id="logo"
          src="../assets/logo.png"
        >
      </center>
    </div>
    <div style="margin-top:10px">
      <center>
        <img src="../assets/上传.svg">
      </center>
      <center style="font-size:25px">上传课程</center>
    </div>
    <div
      class="step"
      style="margin-top:20px"
    >
      <el-row>
        <el-col
          :offset="6"
          :span="12"
        >
          <el-steps
            :active="active"
            finish-status="success"
            :align-center="true"
          >
            <el-step
              v-for="(value,index) in stepData"
              :title="value.title"
              :key="index"
            ></el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>
    <div id="show_content">
      <el-row>
        <el-col
          :span="12"
          :offset="6"
        >
          <div
            v-if="active==0"
            style="margin-top:20px"
          >
            <el-row>
              <el-col
                :span="6"
                v-for="(value,index) in teacher_img"
                :key="index"
              >
                <div class="show_img">
                  <img
                    @click="selectTeacher(index)"
                    :src="value.src"
                    class="teacher_img"
                  >
                  <span class="name">{{value.teacher_name}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div
            v-else-if="active==1"
            style="margin:80px 0"
          >
            <el-row>
              <el-col
                :span="12"
                :offset="6"
              >
                <el-select
                  style="width:100%;background:#f9f9f9;outline:0"
                  v-model="value"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in student"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div v-else-if="active==2">
            <el-row>
              <el-col
                :span="12"
                :offset="6"
                style="font-size:15px"
              >
                <div class="upload_item">
                  <el-row style="padding-left:5px;margin-bottom:5px">
                    选择视频
                    <span style="color:#e8bd5f">(必填)</span>
                  </el-row>
                  <el-upload
                    multiple
                    :action="loadUrl"
                    :http-request="upLoad"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                  >
                    <button style="width:100%;height:40px;border-radius:5px;background:#f9f9f9;border:0.8px #999 solid;outline:0">
                      <span
                        style="font-size:30px;color:#999;float:right"
                        class="el-icon-caret-top"
                      ></span>
                    </button>
                  </el-upload>
                  <span class="upload_tips">&nbsp;*视频大小请控制在200M以内，视频支持MP4、AVI与MOV格式。</span>
                </div>
                <div class="upload_item">
                  <el-row style="padding-left:5px;margin-bottom:5px">
                    选择曲谱
                    <span style="color:#999">(选填)</span>
                  </el-row>
                  <el-upload
                    multiple
                    :action="loadUrl"
                    :http-request="upLoad1"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                  >
                    <button
                      style="width:100%;height:40px;border-radius:5px;background:#f9f9f9;border:0.8px #999 solid;outline:0"
                      id="usong"
                    >
                      <span
                        style="font-size:30px;color:#999;float:right"
                        class="el-icon-caret-top"
                      ></span>
                    </button>
                  </el-upload>
                  <span class="upload_tips">&nbsp;*图片大小请控制在1M以内，图片支持JPG与PNG格式。</span>
                </div>
                <div class="upload_item">
                  <el-row style="padding-left:5px;margin-bottom:5px">
                    留言
                    <span style="color:#999">(选填)</span>
                  </el-row>
                  <el-row>
                    <input
                      style="width:100%;height:40px;border-radius:5px;background:#f9f9f9;border:0.8px #999 solid;outline:0"
                      v-model="message"
                    >
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <div
        v-if="active>0"
        style="margin-top:30px;"
      >
        <el-row>
          <el-col
            :span="1"
            :offset="11"
          >
            <div @click="prev">
              <img src="../assets/left_arrow.svg">
            </div>
          </el-col>
          <el-col :span="1">
            <div @click="next">
              <img src="../assets/right_arrow.svg">
            </div>
          </el-col>
        </el-row>
      </div>
      <center v-else>
        <div @click="next">
          <img src="../assets/right_arrow.svg">
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import { client } from "../assets/ali-oss.js";
export default {
  name: "UploadVideo",
  data: function() {
    return {
      loadUrl: "http://wuxindx.oss-cn-beijing.aliyuncs.com",
      file: {
        g_dirname: "",
        g_object_name: ""
      },
      student: [],
      uploadData: {
        oid: window.localStorage.getItem("oid"),
        tid: window.localStorage.getItem("tid"),
        aid: "",
        sid: "",
        upath: "",
        usong: "",
        umessage: ""
      },
      options: [],
      value: "",
      message: "",
      stepData: [
        { title: "选择导师" },
        { title: "选择琴童" },
        { title: "上传视频" }
      ],
      teacher_img: [],
      active: 0,
      title: ""
    };
  },
  methods: {
    back_appoint: function() {
      this.$router.replace({ path: "/mycourse" });
    },
    next() {
      if (this.active == 0) {
        ++this.active;
      } else if (this.active == 1) {
        this.uploadData.sid = this.value;
        ++this.active;
      } else if (this.active == 2) {
        this.uploadData.umessage = this.message;
        ++this.active;
      } else if (this.active == 3) {
        var content = JSON.stringify(this.uploadData);

        this.$http
          .post("http://139.9.115.22:8080/teacher/upload", content)
          .then(function(data) {
            var content = data.body;
            if (content == "t") {
              alert("上传成功");
              this.$router.replace({
                path: "/mycourse"
              });
            } else {
              alert("上传失败,请重新上传");
              this.$router.replace({
                path: "/uploadvideo"
              });
            }
          })
          .catch(function(err) {
            window.console.log(err);
          });
      }
    },
    prev: function() {
      this.active--;
    },
    selectTeacher: function(index) {
      this.uploadData.aid = this.teacher_img[index].name;
    },
    upLoad(file) {
      var s_file = file.file;
      var s_filename = file.file.name;
      this.calculate_object_name(s_filename);
      this.uploadData.upath = this.file.g_object_name;
      client().multipartUpload(this.file.g_object_name, s_file);
    },
    upLoad1(file) {
      var s_file = file.file;
      var s_filename = file.file.name;
      this.calculate_object_name(s_filename);
      this.uploadData.usong = this.file.g_object_name;
      client().multipartUpload(this.file.g_object_name, s_file);
    },
    handleExceed: function() {
      alert("123");
    },
    uploadSuccess: function(file, fileList) {
      alert(this.file.g_dirname);
    },
    uploadError: function(file, fileList) {
      alert(file.file.name + "...." + fileList.name);
    },
    get_dirname: function() {
      //要发送的文件名
      var dir =
        "网站/机构" +
        "/" +
        window.localStorage.getItem("oid") +
        "/" +
        window.localStorage.getItem("tid") +
        "/" +
        this.uploadData.aid +
        "/" +
        this.uploadData.sid +
        "/";
      this.file.g_dirname = dir;
    },
    get_suffix: function(filename) {
      //得到后缀
      var pos = filename.lastIndexOf(".");
      var suffix = "";
      if (pos != -1) {
        suffix = filename.substring(pos);
      }
      return suffix;
    },
    random_string: function(len) {
      //随机名
      len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    calculate_object_name: function(filename) {
      //最终文件名
      var suffix = this.get_suffix(filename);
      this.get_dirname();
      this.file.g_object_name =
        this.file.g_dirname + this.random_string(10) + suffix;
    }
  },
  created: function() {
    for (var i = 0; i < this.teacher_img.length; i++) {
      this.teacher_img[i].src = require("../assets/" + this.teacher_img[i].src);
   
    }
    var a = JSON.stringify({
      oid: window.localStorage.getItem("oid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/artist", a)
      .then(function(data) {
        var a = data.body;
        for (var i = 0; i < a.length; i++) {
          this.teacher_img.push({
            src: a[i].apath,
            name: a[i].aid,
            teacher_name:a[i].aname
          });
        }
      })
      .catch(function(err) {
        window.console.log(err);
      });
    var b = JSON.stringify({
      tid: window.localStorage.getItem("tid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/find", b)
      .then(function(data) {
        var content = data.body;
        for (var i = 0; i < content.length; i++) {
          this.student.push({
            value: content[i].sid,
            label: content[i].sname
          });
        }
      })
      .catch(function(err) {
        window.console.log(err);
      });
  }
};
</script>

 <style lang="scss">
.show_img {
  position: relative;
}
.show_img:hover .teacher_img {
  opacity: 0.8;
}
.teacher_img {
  // position: absolute;
  width: 105px;
  height: 105px;
  border-radius: 50%;
  margin: 10px;
}
.name {
  left: 0px;
  visibility: hidden;
  position: absolute;
  width: 105px;
  height: 105px;
  border-radius: 50%;
  margin: 10px;
}
.show_img:hover .name {
  width: 105px;
  height: 105px;
  border-radius: 50%;
  margin: 10px;
  text-align: center;
  background: black;
  line-height: 100px;
  color: #e8bd5f;
  font-size: 20px;
  opacity: 0.7;
  visibility: visible;
}
.uploadCourse {
  background: #f9f9f9;
  height: 100%;
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
.icon {
  line-height: 100px;
  margin-left: 50px;
}
.icon:hover {
  cursor: pointer;
}
#upload_icon {
  height: 80px;
  width: 80px;
}

.step {
  margin-top: 10px;
}
.el-row {
  margin: 0;
}
.el-input {
  background: #999;
  border-radius: 3px;
}
.upload_tips {
  color: #999;
  font-size: 5px;
}
.upload_item {
  margin-top: 10px;
}
.el-upload {
  width: 100%;
}

$border-sizes: 0.5px;
$background_color: #c0c4cc;
$el-step-icon-height: 45px;
$el-step-icon-width: 45px;
$el-step-icon-font-size: 20px;
$el-step-icon-background: #e8bd5f;
$el-step-icon-margin: 2.5%;
$is-finish-background: #fff;
$el-step_title_is-process: #e8bd5f;
$el-step__description_is-finish: #999999;
.text-color {
  color: white;
}

/*is-finish 圆圈颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-finish {
  color: $is-finish-background !important;
  border-color: $is-finish-background !important;
}

/*is-success 圆圈颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-success {
  color: white !important;
  border-color: #e8bd5f !important;
}

/*is-process 圆圈颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-process {
  color: $background_color;
  border-color: $background_color;
}
/*is-wait 圆圈颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-wait {
  color: white;
  border-color: $el-step__description_is-finish;
}
/*is-wait title 颜色*/

.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__title.is-wait {
  color: #f9f9f9;
}

/*is-success title 颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__title.is-success {
  color: #f9f9f9;
}
/*is-finish title 颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__title.is-finish {
  color: #f9f9f9;
}
/*is-process  title 颜色*/
.el-steps.el-steps--horizontal[data-v-9ebad220]
  .el-step.is-horizontal.is-center
  .el-step__title.is-process {
  color: $el-step_title_is-process;
}
/*description 颜色*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__description.is-finish {
  color: $el-step__description_is-finish;
}
/*is-finish 进程结束，is-process 状态颜色非加粗*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__title.is-process {
  color: $el-step_title_is-process;
}

/* is-finish line连线粗细*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-finish
  .el-step__line {
  position: absolute;
  background-color: $el-step_title_is-process;
  margin-top: 10px;
  border: $border-sizes solid $el-step_title_is-process;
}

/* is-success line连线粗细*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-success
  .el-step__line {
  position: absolute;
  background-color: $el-step_title_is-process;
  margin-top: 10px;
  border: $border-sizes solid $el-step_title_is-process;
}

/* is-process line连线粗细*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-process
  .el-step__line {
  position: absolute;
  background-color: $el-step__description_is-finish;
  margin-top: 10px;
  border: $border-sizes solid $el-step__description_is-finish;
}
/* is-wait line连线粗细*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-wait
  .el-step__line {
  position: absolute;
  background-color: $el-step__description_is-finish;
  margin-top: 10px;
  border: $border-sizes solid $el-step__description_is-finish;
}

/* is-finish 圆圈大小修改*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-finish
  .el-step__icon {
  z-index: 1;
  width: $el-step-icon-width;
  height: $el-step-icon-height;
  font-size: $el-step-icon-font-size;
  border: $border-sizes solid;
  background: $el-step-icon-background;
}
/* is-process 圆圈大小修改*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-process
  .el-step__icon {
  z-index: 1;
  width: $el-step-icon-width;
  height: $el-step-icon-height;
  border: $border-sizes solid;
  font-size: $el-step-icon-font-size;
  background: $el-step-icon-background;
  color: $is-finish-background !important;
  border-color: $is-finish-background !important;
}

/* is-wait 圆圈大小修改*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-wait
  .el-step__icon {
  z-index: 1;
  margin-top: 5px;
  width: 35px;
  height: 35px;
  font-size: $el-step-icon-font-size;
  border: $border-sizes solid;
  background: $el-step__description_is-finish;
}
/* is-success 圆圈大小修改*/
.el-steps.el-steps--horizontal
  .el-step.is-horizontal.is-center
  .el-step__head.is-success
  .el-step__icon {
  z-index: 1;
  width: $el-step-icon-width;
  height: $el-step-icon-height;
  font-size: $el-step-icon-font-size;
  border: $border-sizes solid;
  background: $el-step-icon-background;
}
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>

