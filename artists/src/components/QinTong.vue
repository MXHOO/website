<template>
  <div style="padding-bottom:20px">
    <el-row style="margin-bottom:-10px;margin-top:20px">
      <button
        style="float:right;padding-right:1px;outline:0;padding:7px 20px;border:0px;border-radius:4px; box-shadow: 2px;color:white;background:#e8bd5f"
        class="btn_de"
        @click="manage_stu"
      >琴童管理</button>
    </el-row>
    <el-row>
      <div style="float:left;padding-left:15px">我的琴童</div>
    </el-row>
    <div
      class="t_border qintong"
      style="padding-bottom:20px"
    >
      <el-row style="margin-top:30px">
        <el-col
          :span="13"
          :offset="5"
        >
          <!-- <el-input suffix-icon="el-icon-search" @click="search_for" v-model="content"></el-input> -->
          <el-autocomplete
            suffix-icon="el-icon-search"
            style="width:100%"
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder=""
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col
          :span="13"
          :offset="5"
        >
          <el-row>
            <el-col
              :span="8"
              class="sort"
            >
              <div @click="sort_stu_word">按拼音排序</div>
            </el-col>
            <el-col
              :span="8"
              class="sort"
            >
              <div @click="sort_classtime">按学习次数排序</div>
            </el-col>
            <el-col
              :span="8"
              class="sort"
            >
              <div @click="sort_uplaoddate">按上传时间排序</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top:35px">
        <el-col
          :offset="2"
          :span="20"
        >
          <el-row style="font-size:10px;color:#999;text-align:center">
            <el-col :span="5">学生</el-col>
            <el-col :span="4">性别</el-col>
            <el-col :span="4">学习次数</el-col>
            <el-col :span="6">最近上课时间</el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <el-row
            v-show="qintong_table.length==0"
            style="margin-top:20px;color:#999;padding-bottom:20px;margin-left:243px"
          >您还没有琴童。</el-row>
          <el-row
            v-show="qintong_table.length>0"
            v-for="(value,index) in qintong_table"
            :key="index"
            class="test"
            style="font-size:16px;;text-align:center;padding:10px 0;"
          >
            <el-col :span="5">{{value.sname}}</el-col>
            <el-col :span="4">{{value.ssex}}</el-col>
            <el-col :span="4">{{value.classtime}}</el-col>
            <el-col :span="6">{{value.uploaddate}}</el-col>
            <el-col :span="4">
              <template>
                <button
                  class="btn stu_details"
                  @click="qintong_details(index,value)"
                >详 情</button>
              </template>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="letter-spacing:2px;color:#999;text-align:center;font-size:14px;margin:20px 0">
        <span>共&nbsp;{{this.qintong_table.length}}&nbsp;名</span>
        <span style="padding-left:23px">已学习共&nbsp;{{this.num}}&nbsp;次</span>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "QinTong",
  data: function() {
    return {
      state2: "",
      search_for: [],
      qintong_table: [],
      num: Number
    };
  },
  methods: {
    qintong_details: function(index, value) {
      window.localStorage.setItem("sid",this.qintong_table[index].sid);
      window.localStorage.setItem("sname",this.qintong_table[index].sname);
      window.localStorage.setItem("ssex",this.qintong_table[index].ssex);
      this.$router.replace({
        name: "qintong_manage_student_manage_stu_person",
        params: {
          sid: this.qintong_table[index].sid,
          sname: this.qintong_table[index].sname,
          ssex: this.qintong_table[index].ssex
        }
      });
    },
    sort_stu_word: function() {
      //按拼音排序
      var stu_word = [];
      for (var i = 0; i < this.qintong_table.length; i++) {
        stu_word.push(this.qintong_table[i].sname);
      }
      var resultArray = stu_word.sort(function compareFunction(param1, param2) {
        return param1.localeCompare(param2, "zh");
      });

      var extra = [];
      for (var j = 0; j < resultArray.length; j++) {
        for (var k = 0; k < this.qintong_table.length; k++) {
          if (resultArray[j] == this.qintong_table[k].sname) {
            extra.push({
              sname: this.qintong_table[k].sname,
              ssex: this.qintong_table[k].ssex,
              classtime: this.qintong_table[k].classtime,
              uploaddate: this.qintong_table[k].uploaddate
            });
            this.qintong_table.splice(k, 1);
            break;
          }
        }
      }
      for (var i = 0; i < extra.length; i++) {
        this.qintong_table.push({
          sname: extra[i].sname,
          ssex: extra[i].ssex,
          classtime: extra[i].classtime,
          uploaddate: extra[i].uploaddate
        });
      }
    },
    sort_classtime: function() {
      var stu_num = [];
      for (var i = 0; i < this.qintong_table.length; i++) {
        stu_num.push(this.qintong_table[i].classtime);
      }
      stu_num.sort(function(a, b) {
        return a - b;
      });

      var extra = [];
      for (var j = 0; j < stu_num.length; j++) {
        for (var k = 0; k < this.qintong_table.length; k++) {
          if (stu_num[j] == parseInt(this.qintong_table[k].classtime)) {
            extra.push({
              sname: this.qintong_table[k].sname,
              ssex: this.qintong_table[k].ssex,
              classtime: this.qintong_table[k].classtime,
              uploaddate: this.qintong_table[k].uploaddate
            });
            this.qintong_table.splice(k, 1);
            break;
          }
        }
      }
      for (var i = 0; i < extra.length; i++) {
        this.qintong_table.push({
          sname: extra[i].sname,
          ssex: extra[i].ssex,
          classtime: extra[i].classtime,
          uploaddate: extra[i].uploaddate
        });
      }
    },
    sort_uplaoddate: function() {
      var stu_upload = [];
      for (var i = 0; i < this.qintong_table.length; i++) {
        stu_upload.push({
          id: i + 1,
          publishTime: this.qintong_table[i].uploaddate
        });
      }
      var extra = [];
      var dateToTime = function(str) {
        return new Date(str.replace(/-/g, "/")).getTime(); //用/替换日期中的-是为了解决Safari的兼容
      };
      for (var i = 0; i < stu_upload.length; i++) {
        stu_upload[i].publishTimeNew = dateToTime(stu_upload[i].publishTime);
      }
      stu_upload.sort(function(a, b) {
        return b.publishTimeNew > a.publishTimeNew ? 1 : -1;
      });
      for (let index = 0; index < stu_upload.length; index++) {
        var k = stu_upload[index].id - 1;
        extra.push({
          sname: this.qintong_table[k].sname,
          ssex: this.qintong_table[k].ssex,
          classtime: this.qintong_table[k].classtime,
          uploaddate: this.qintong_table[k].uploaddate
        });
      }
      for (var i = 0; i < extra.length; i++) {
        this.qintong_table[i].sname = extra[i].sname;
        this.qintong_table[i].ssex = extra[i].ssex;
        this.qintong_table[i].classtime = extra[i].classtime;
        this.qintong_table[i].uploaddate = extra[i].uploaddate;
      }
    },
    manage_stu: function() {
      this.$router.push({ path: "/qintong/manage_student" });
    },
    querySearch(queryString, cb) {
      var restaurants = this.search_for;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
     var name_s = item.value;
      // var index=0;
      for (var i = 0; i < this.qintong_table.length; i++) {
        if (name_s == this.qintong_table[i].sname) {
          // index=i;
          this.qintong_details(i, name_s);
        }
      }
    }
  },
  beforeCreate: function() {
    var a = JSON.stringify({
      tid: window.localStorage.getItem("tid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/student", a)
      .then(function(data) {
        var content = data.data;
        var a = 0;
        for (var i = 0; i < content.length; i++) {
          a = a + parseInt(content[i].classtime);
          if (content[i].classtime == 0) {
            content[i].uploaddate = "————";
          }
          this.qintong_table.push(content[i]);
          this.search_for[i] = { value: content[i].sname };
        }
        if(this.qintong_table.length==0){
          this.num=0;
        }
        this.num = a;
      })
      .catch(function(err) {
        window.console.log(err);
      });
  }
};
</script>

<style>
.test {
  padding: 1em;
  border-bottom: 0.7px dashed transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-90deg, #ccc 0, #ccc 0.3em, white 0, white 0.5em);
}
.sort {
  font-weight: bold;
  text-align: center;
  font-size: 11px;
  color: #999;
}
.sort:hover {
  color: #e8bd5f;
  cursor: pointer;
}
.qintong {
  background: white;
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

