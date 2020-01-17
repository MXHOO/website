<template>
  <div>
    <div>
      <el-row style="margin-top:20px">
        <el-col><span
            @click="my_student"
            class="catalogue"
          >我的琴童</span> > {{sname}}</el-col>
      </el-row>
    </div>
    <div class="t_border details_item">
      <el-row>
        <el-col
          :offset="2"
          :span="20"
          class="test"
        >
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
            >性别</el-col>
            <el-col
              :span="11"
              class="detail_con"
            >{{ssex}}</el-col>
          </el-row>
          <el-row>
            <el-col
              :span="11"
              class="detail_title"
            >年龄</el-col>
            <el-col
              :span="11"
              class="detail_con"
            >{{this.sage}}</el-col>
          </el-row>
          <!-- <el-row>
                 <div style="line-height:100%;text-align:center"><u @click="download">合光计划1v1锦囊课申请表-{{this.$route.params.sname}}.docx</u><img style="margin-top:-8.5px;top:50%;position:absolute" src="../assets/download.svg"></div> 
          </el-row> -->
        </el-col>
      </el-row>

      <el-row style="margin-top:35px">
        <el-col
          :offset="3"
          :span="18"
        >
          <el-row style="font-size:10px;color:#999;text-align:center">
            <el-col :span="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
            <el-col :span="4">导师</el-col>
            <el-col :span="6">上传课程时间</el-col>
            <el-col :span="6">反馈课程时间</el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <el-row
            v-show="qintong_table.length==0"
            style="margin-top:20px;color:#999;padding-left:70px"
          >您还没有反馈课程。</el-row>
          <el-row
            v-show="qintong_table.length>0"
            v-for="(value,index) in qintong_table"
            :key="index"
            class="test"
            style="font-size:16px;;text-align:center;padding:10px 0;"
          >
            <el-col :span="3">{{index+1}}</el-col>
            <el-col :span="4">{{value.aname}}</el-col>
            <el-col :span="6">{{value.uploaddate}}</el-col>
            <el-col :span="6">{{value.feedbackdate}}</el-col>
            <el-col :span="4">
              <template>
                <button
                  class="btn stu_details"
                  @click="qintong_person_detail(index,value)"
                >详 情</button>
              </template>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div style="margin-top:30px;padding-bottom:30px">
        <center> <button
            @click="remove_stu"
            class="btn"
            style="border-radius:3px;padding:8px;border:0;outline:0"
          >移除该琴童</button></center>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage_Stu_Person",
  data: function() {
    return {
      sage: "",
      sname:"",
      ssex:"",
      qintong_table: [
      ],
      num: 0
    };
  },
  methods: {
    my_student: function() {
      this.$router.replace({ path: "/qintong" });
    },
    qintong_person_detail: function(index, row) {
      this.$router.replace({
        name: "qintong_person_detials",
        params: {
          sname: this.$route.params.sname,
          aname: this.qintong_table[index].aname,
          classtime: this.qintong_table[index].classtime,
          uid: this.qintong_table[index].uid,
          fid: this.qintong_table[index].fid
        }
      });
    },
    remove_stu: function() {
      var name = this.$route.params.sname;

      var content = JSON.stringify({
        tid: window.localStorage.getItem("tid"),
        sid: this.$route.params.sid,
        oid: window.localStorage.getItem("oid")
      });
      this.$http
        .post("http://139.9.115.22:8080/teacher/deletes", content)
        .then(function(data) {
          if (data.body == "t") {
            this.$router.replace({
              path: "/qintong"
            });
          } else {
            alert("移除失败！");
          }
        })
        .catch(function(err) {
          window.console.log(err);
        });
    }
    // download: function(){
    //   window.location.href="www.baidu.com";
    // }
  },
  mounted: function() {
    this.sname=window.localStorage.getItem("sname");
    this.ssex=window.localStorage.getItem("ssex");
    var content = JSON.stringify({
      tid: window.localStorage.getItem("tid"),
      sid: window.localStorage.getItem("sid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/sdetails", content)
      .then(function(data) {
        var content = data.body;
        this.sage = content[0].sage;
        for (var i = 0; i < content.length; i++) {
          if (content[i].uid != null) {
            this.qintong_table.push({
              number: i + 1,
              aname: content[i].aname,
              uploaddate: content[i].uploaddate,
              feedbackdate: content[i].feedbackdate,
              uid: content[i].uid,
              fid: content[i].fid,
              classtime: content[i].classtime
            });
          }
        }
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
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>
