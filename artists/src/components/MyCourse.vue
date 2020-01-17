<template>
  <div style="margin-bottom:30px">
    <div class="r_bottom">
      <el-row style="margin-bottom:-10px">
        <button
          style="float:right;padding-right:1px;outline:0;padding:7px 20px;border:0px;border-radius:4px; box-shadow: 2px"
          class="btn"
          @click="uploadCourse"
        >上传课程</button>
      </el-row>
      <el-row>
        <div style="float:left;padding-left:15px">未反馈课程</div>
      </el-row>
      <el-row>
        <div class="t_border">
          <el-row style="background:white;padding:20px 0 30px 0;">
            <el-col :offset="2" :span="20">
              <el-row style="font-size:10px;color:#999;text-align:center">
                <el-col :span="3">学生</el-col>
                <el-col :span="3">导师</el-col>
                <el-col :span="7">课程上传时间</el-col>
                <el-col :span="7">课程反馈时间</el-col>
                <el-col :span="4"></el-col>
              </el-row>
              <el-row
                v-show="tableData1.length==0"
                style="margin-top:20px;color:#999;padding-bottom:20px"
              >您还没有琴童。</el-row>
              <el-row
                v-show="tableData1.length>0"
                v-for="(value,index) in tableData1"
                :key="index"
                class="test"
                style="font-size:15px;;text-align:center;padding:10px 0;"
              >
                <el-col :span="3">{{value.sname}}</el-col>
                <el-col :span="3">{{value.aname}}</el-col>
                <el-col :span="7">{{value.uploaddatetime}}</el-col>
                <el-col :span="7">————</el-col>
                <el-col :span="4">
                  <template>
                    <button class="btn stu_details" @click="details1(index,value)">详 情</button>
                  </template>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row style="margin-top:20px">
        <div style="float:left;padding-left:15px;">已反馈课程</div>
      </el-row>
      <el-row class="no_feedback">
        <div class="t_border">
          <el-row style="background:white;padding:20px 0 30px 0">
            <el-col :offset="2" :span="20">
              <el-row style="font-size:10px;color:#999;text-align:center">
                <el-col :span="3">学生</el-col>
                <el-col :span="3">导师</el-col>
                <el-col :span="7">课程上传时间</el-col>
                <el-col :span="7">课程反馈时间</el-col>
                <el-col :span="4"></el-col>
              </el-row>
              <el-row
                v-show="tableData2.length==0"
                style="margin-top:20px;color:#999;padding-bottom:20px"
              >您还没有琴童。</el-row>
              <el-row
                v-show="tableData2.length>0"
                v-for="(value,index) in tableData2"
                :key="index"
                class="test"
                style="font-size:15px;;text-align:center;padding:10px 0;"
              >
                <el-col :span="3">{{value.sname}}</el-col>
                <el-col :span="3">{{value.aname}}</el-col>
                <el-col :span="7">{{value.uploaddatetime}}</el-col>
                <el-col :span="7">{{value.feedbackdatetime}}</el-col>
                <el-col :span="4">
                  <template>
                    <button class="btn stu_details" @click="details2(index,value)">详 情</button>
                  </template>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div></div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyCourse",
  data: function() {
    return {
      tableData1: [],
      tableData2: []
    };
  },
  methods: {
    details1: function(index, row) {
      this.$router.replace({
        name: "details",
        params: {
          type: "nofeedback",
          cid: this.tableData1[index].cid,
          uid: this.tableData1[index].uid,
          sname: this.tableData1[index].sname,
          aname: this.tableData1[index].aname,
          uploaddatetime: this.tableData1[index].uploaddatetime
        }
      });
    },
    details2: function(index, row) {
      this.$router.replace({
        name: "details",
        params: {
          type: "feedback",
          cid: this.tableData2[index].cid,
          uid: this.tableData2[index].uid,
          fid: this.tableData2[index].fid,
          sname: this.tableData2[index].sname,
          aname: this.tableData2[index].aname,
          feedbackdatetime: this.tableData2[index].feedbackdatetime,
          uploaddatetime: this.tableData2[index].uploaddatetime
        }
      });
    },
    uploadCourse: function() {
     
      this.$router.push({ path: "/uploadvideo" });
    }
  },
  created: function() {
    var content = JSON.stringify({
      oid: window.localStorage.getItem("oid"),
      tid: window.localStorage.getItem("tid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/classshow", content)
      .then(function(data) {
        var table_data = data.data;
      
        for (var i = 0; i < table_data.length; i++) {
          if (table_data[i].fid == undefined) {
            var table1 = table_data[i];
            this.tableData1.push(table1);
          } else {
            var table1 = table_data[i];
            this.tableData2.push(table1);
     
          }
        }
      })
      .catch(function(err) {
        window.console.log(err);
      });
  }
};
</script>
<style scoped>
.test {
  padding: 1em;
  border-bottom: 0.7px dashed transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-90deg, #ccc 0, #ccc 0.3em, white 0, white 0.5em);
}
.tip {
  color: #979797;
  background: #fff;
}
.stu_details {
  float: right;
  padding-right: 1px;
  outline: 0;
  padding: 4px 20px;
  border: 0px;
  border-radius: 2px;
  box-shadow: 2px;
}
</style>