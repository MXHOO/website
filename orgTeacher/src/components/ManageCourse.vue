
<template>
  <div>
    <div class="r_bottom">
      <el-row>
        <el-col :span="4">未反馈课程</el-col>
      </el-row>
      <div class="t_border" style="background:white;padding-bottom:30px">
        <el-row>
          <el-row style="margin-top:35px">
            <el-col :offset="2" :span="20">
              <div v-show="tableData1.length>0">
                <el-row style="font-size:10px;color:#999;text-align:center">
                  <el-col :span="5">学生</el-col>
                  <el-col :span="7">课程上传时间</el-col>
                  <el-col :span="4">曲谱</el-col>
                  <el-col :span="4">留言</el-col>
                  <el-col :span="4"></el-col>
                </el-row>

                <el-row
                  v-for="(value,index) in tableData1"
                  :key="index"
                  class="test"
                  style="font-size:16px;;text-align:center;padding:10px 0;"
                >
                  <el-col :span="5">{{value.sname}}</el-col>
                  <el-col :span="7">{{value.uploaddatetime}}</el-col>
                  <el-col :span="4">{{value.usong}}</el-col>
                  <el-col :span="4">{{value.umessage}}&nbsp;</el-col>
                  <el-col :span="4">
                    <template>
                      <button class="btn_de stu_details" @click="details1(index,value)">详 情</button>
                    </template>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-row>
        <el-row v-show="tableData1.length==0" style="color:#999;font-size:13px;">您没有未反馈课程。</el-row>
      </div>
      <el-row>
        <el-col :span="4" style="margin-top:20px">已反馈课程</el-col>
      </el-row>
      <el-row class="no_feedback">
        <div class="t_border" style="background:white;padding-bottom:30px">
          <el-row>
            <el-row style="margin-top:35px">
              <el-col :offset="2" :span="20">
                <div v-show="tableData2.length>0">
                  <el-row style="font-size:10px;color:#999;text-align:center">
                    <el-col :span="4">学生</el-col>
                    <el-col :span="8">课程上传时间</el-col>
                    <el-col :span="8">课程反馈时间</el-col>
                    <el-col :span="4"></el-col>
                  </el-row>

                  <el-row
                    v-for="(value,index) in tableData2"
                    :key="index"
                    class="test"
                    style="font-size:16px;;text-align:center;padding:10px 0;"
                  >
                    <el-col :span="4">{{value.sname}}</el-col>
                    <el-col :span="8">{{value.uploaddatetime}}&nbsp;</el-col>
                    <el-col :span="8">{{value.feedbackdatetime}}&nbsp;</el-col>
                    <el-col :span="4">
                      <template>
                        <button class="btn_de stu_details" @click="details2(index,value)">详 情</button>
                      </template>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-row v-show="tableData2.length==0" style="color:#999;font-size:13px;">您没有已反馈课程。</el-row>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "ManageCourse",
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
          type: "no_feedback",
          sname: this.tableData1[index].sname,
          classtime: this.tableData1[index].classtime,
          cid: this.tableData1[index].cid,
          uid: this.tableData1[index].uid,
          sid: this.tableData1[index].sid,
          uploaddatetime: this.tableData1[index].uploaddatetime
        }
      });
    },
    details2: function(index, row) {
      this.$router.replace({
        name: "details",
        params: {
          type: "feedback",
          sname: this.tableData2[index].sname,
          classtime: this.tableData2[index].classtime,
          uid: this.tableData2[index].uid,
          fid: this.tableData2[index].fid,
          uploaddatetime: this.tableData2[index].uploaddatetime,
          feedbackdatetime: this.tableData2[index].feedbackdatetime
        }
      });
    }
  },
  created: function() {
    var content = JSON.stringify({
      aid: localStorage.getItem("aid")
    });
    this.$http
      .post("http://139.9.115.22:8080/artist/classad", content)
      .then(function(data) {
        var content = data.data;
        for (var i = 0; i < content.length; i++) {
          if (content[i].fid == undefined) {
            var table_Data1 = content[i];

            this.tableData1.push(table_Data1);
          } else {
            this.tableData2.push(content[i]);
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
.test {
  padding: 1em;
  border-bottom: 0.7px dashed transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-90deg, #ccc 0, #ccc 0.3em, white 0, white 0.5em);
}
</style>