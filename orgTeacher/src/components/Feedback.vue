<template>
  <div class="uploadCourse">
    <el-row>
      <el-col style="margin-top:20px;padding-left:8px">未反馈课程 > 详情 > 反馈</el-col>
    </el-row>
    <div class="t_border">
      <el-row>
        <el-col
          :offset="6"
          :span="12"
        ></el-col>
      </el-row>
    </div>
    <div id="details_item">
      <el-row>
        <el-col
          :span="15"
          :offset="4"
        >
          <div
            class="upload_item"
            style="font-size:14px"
          >
            <div style="padding:5px 0">选择视频<span style="color:#e8bd5f">(必填)</span></div>
            <el-upload
              multiple
              :action="loadUrl"
              :http-request="upLoad"
              :on-success="uploadSuccess"
              :on-error="uploadError"
            >
              <button
                style="width:100%;height:40px;border-radius:5px;background:#f9f9f9;border:0.8px #999 solid"
                value="upath"
              >
                <span
                  style="font-size:30px;color:#999;margin-right:20px;float:right"
                  class="el-icon-caret-top"
                ></span>
              </button>
            </el-upload>
            <span class="upload_tips">视频大小请控制在200M以内，视频支持MP4、AVI与MOV格式。</span>
          </div>
          <div
            class="upload_item"
            style="font-size:14px"
          >
            <div style="padding:5px 0">留言<span style="color:#999">(选填)</span></div>
            <el-input v-model="message" />
          </div>
          <div>
            <center>
              <button
                class="download_btn"
                @click="feedback"
              >反馈课程</button>
            </center>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { client } from '../assets/ali-oss.js'
export default {
  name: 'UploadVideo',
  data: function () {
    return {
      loadUrl: 'http://wuxindx.oss-cn-beijing.aliyuncs.com',
      file: {
        g_dirname: '',
        g_object_name: ''
      },
      message: ''
    }
  },
  methods: {
    back_appoint: function () {
      this.$router.replace({ path: '/' })
    },
    feedback: function () {
      var content = JSON.stringify({
        cid: this.$route.params.cid,
        fpath: this.file.g_object_name,
        fmessage: this.message
      })
      this.$http
        .post('http://139.9.115.22:8080/artist/uf', content)
        .then(function (data) {
          if (data.body == "t") {
            alert("反馈成功")
            this.$router.replace({
              path: "/manage_course"
            })
          } else {
            alert("反馈失败！")
          }
          window.console.log(data)
        })
        .catch(function (err) {
          window.console.log(err)
        })
    },
    upLoad(file) {
      var s_file = file.file

      var s_filename = file.file.name

      this.calculate_object_name(s_filename)

      client().multipartUpload(this.file.g_object_name, s_file)
    },
    handleExceed: function () {
      alert('123')
    },
    uploadSuccess: function (file, fileList) {
      alert(this.file.g_dirname)
    },
    uploadError: function (file, fileList) {
      alert(file.file.name + '....' + fileList.name)
    },
    get_dirname: function () {
      // 要发送的文件名
      var dir =
        '网站/机构' +
        '/' +
        this.$route.params.oid +
        '/' +
        this.$route.params.tid +
        '/' +
        localStorage.getItem('aid') +
        '/' +
        this.$route.params.sid +
        '/'
      this.file.g_dirname = dir
    },
    get_suffix: function (filename) {
      // 得到后缀
      var pos = filename.lastIndexOf('.')
      var suffix = ''
      if (pos != -1) {
        suffix = filename.substring(pos)
      }
      return suffix
    },
    random_string: function (len) {
      // 随机名
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    calculate_object_name: function (filename) {
      // 最终文件名
      var suffix = this.get_suffix(filename)
      this.get_dirname()
      this.file.g_object_name =
        this.file.g_dirname + this.random_string(10) + suffix
    }
  }
}
</script>

 <style>
.uploadCourse {
  background: #f9f9f9;
  height: 100%;
}
#logo {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -37px;
  margin-left: -59px;
}
.icon {
  line-height: 120px;
  margin-left: 50px;
}
#upload_icon {
  height: 80px;
  width: 80px;
}
.teacher_img {
  width: 110px;
  height: 110px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 15px;
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
.download_btn {
  padding: 5px;
  width: 80px;
  border: 1px;
  border-radius: 3px;
  color: white;
  background: #e8bd5f;
  margin: 20px 0;
}
#details_item {
  background: white;
  height: 100%;
  width: 100%;
  padding: 10px 0;
}
.el-upload {
  width: 100%;
}
</style>
