<template>
  <div>
    <div>
      <el-row style="margin:20px 0 3px 5px">
        <el-col
          :span="4"
          style="padding-left:8px"
        >我的琴童</el-col>
      </el-row>
      <div
        class="t_border qintong"
        v-if="tableData1.length>0"
      >
        <el-row style="margin-top:50px">
          <el-col
            :span="13"
            :offset="5"
          >
            <el-autocomplete
              style="width:100%"
              suffix-icon="el-icon-search"
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px">
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
              <el-col :span="4">学生</el-col>
              <el-col :span="3">性别</el-col>
              <el-col :span="3">学习次数</el-col>
              <el-col :span="6">最近上课时间</el-col>
              <el-col :span="4">学生标签</el-col>
              <el-col :span="4"></el-col>
            </el-row>
            <el-row
              v-show="tableData1.length>0"
              v-for="(value,index) in tableData1"
              :key="index"
              class="test"
              style="font-size:16px;;text-align:center;padding:10px 0;"
            >
              <el-col :span="4">{{value.sname}}</el-col>
              <el-col :span="3">{{value.ssex}}</el-col>
              <el-col :span="3">{{value.classtime}}</el-col>
              <el-col :span="6">{{value.uploaddate}}</el-col>
              <el-col :span="4">{{value.frequency}}</el-col>
              <el-col :span="4">
                <template>
                  <button
                    class="btn_de stu_details"
                    @click="details1(index,value)"
                  >详 情</button>
                </template>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin:30px 0;padding-bottom:20px;color:#999">
          <el-col
            :span="2"
            :offset="9"
          >共 {{this.tableData1.length}} 名</el-col>
          <el-col
            :span="4"
            :offset="1"
          >已学习共 {{this.num}} 次</el-col>
        </el-row>
      </div>
      <div
        v-else
        class="t_border qintong"
        style="height:100px;font-size:14px;color:#999"
      >
        <div style="margin:30px 0 0 30px">你还未获得琴童。</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Manage_Student',
  data: function () {
    return {
      tableData1: [],
      num: Number,
      search_for: [],
      state2: ''
    }
  },
  methods: {
    details1: function (index, row) {
      window.localStorage.setItem('sid', this.tableData1[index].sid)
      window.localStorage.setItem('sname', this.tableData1[index].sname)
      window.localStorage.setItem('ssex', this.tableData1[index].ssex)
      window.localStorage.setItem('sage', this.tableData1[index].sage)
      window.localStorage.setItem('frequency', this.tableData1[index].frequency)
      this.$router.replace({
        name: 'student_person',
        params: {
          sname: this.tableData1[index].sname,
          sid: this.tableData1[index].sid,
          ssex: this.tableData1[index].ssex,
          sage: this.tableData1[index].sage,
          frequency: this.tableData1[index].frequency
        }
      })
    },
    sort_stu_word: function () {
      // 按拼音排序
      var stu_word = []
      for (var i = 0; i < this.tableData1.length; i++) {
        stu_word.push(this.tableData1[i].sname)
      }
      var resultArray = stu_word.sort(function compareFunction(param1, param2) {
        return param1.localeCompare(param2, 'zh')
      })

      var extra = []
      for (var j = 0; j < resultArray.length; j++) {
        for (var k = 0; k < this.tableData1.length; k++) {
          if (resultArray[j] == this.tableData1[k].sname) {
            extra.push({
              sname: this.tableData1[k].sname,
              ssex: this.tableData1[k].ssex,
              classtime: this.tableData1[k].classtime,
              uploaddate: this.tableData1[k].uploaddate,
              frequency: this.tableData1[k].frequency,
              oid: this.tableData1[k].oid,
              sid: this.tableData1[k].sid,
              sage: this.tableData1[k].sage
            })
            this.tableData1.splice(k, 1)
            break
          }
        }
      }
      for (var i = 0; i < extra.length; i++) {
        this.tableData1.push({
          sname: extra[i].sname,
          ssex: extra[i].ssex,
          classtime: extra[i].classtime,
          uploaddate: extra[i].uploaddate,
          frequency: extra[i].frequency,
          oid: extra[i].oid,
          sid: extra[i].sid,
          sage: extra[i].sage
        })
      }
    },
    sort_classtime: function () {
      var stu_num = []
      for (var i = 0; i < this.tableData1.length; i++) {
        stu_num.push(this.tableData1[i].classtime)
      }
      stu_num.sort(function (a, b) {
        return a - b
      })

      var extra = []
      for (var j = 0; j < stu_num.length; j++) {
        for (var k = 0; k < this.tableData1.length; k++) {
          if (stu_num[j] == parseInt(this.tableData1[k].classtime)) {
            extra.push({
              sname: this.tableData1[k].sname,
              ssex: this.tableData1[k].ssex,
              classtime: this.tableData1[k].classtime,
              uploaddate: this.tableData1[k].uploaddate,
              frequency: this.tableData1[k].frequency,
              oid: this.tableData1[k].oid,
              sid: this.tableData1[k].sid,
              sage: this.tableData1[k].sage
            })
            this.tableData1.splice(k, 1)
            break
          }
        }
      }
      for (var i = 0; i < extra.length; i++) {
        this.tableData1.push({
          sname: extra[i].sname,
          ssex: extra[i].ssex,
          classtime: extra[i].classtime,
          uploaddate: extra[i].uploaddate,
          frequency: extra[i].frequency,
          oid: extra[i].oid,
          sid: extra[i].sid,
          sage: extra[i].sage
        })
      }
    },
    sort_uplaoddate: function () {
      var stu_upload = []
      for (var i = 0; i < this.tableData1.length; i++) {
        stu_upload.push({
          id: i + 1,
          publishTime: this.tableData1[i].uploaddate
        })
      }
      var extra = []
      var dateToTime = function (str) {
        return new Date(str.replace(/-/g, '/')).getTime() // 用/替换日期中的-是为了解决Safari的兼容
      }
      for (var i = 0; i < stu_upload.length; i++) {
        stu_upload[i].publishTimeNew = dateToTime(stu_upload[i].publishTime)
      }
      stu_upload.sort(function (a, b) {
        return b.publishTimeNew > a.publishTimeNew ? 1 : -1
      })
      for (let index = 0; index < stu_upload.length; index++) {
        var k = stu_upload[index].id - 1
        extra.push({
          sname: this.tableData1[k].sname,
          ssex: this.tableData1[k].ssex,
          classtime: this.tableData1[k].classtime,
          uploaddate: this.tableData1[k].uploaddate,
          frequency: this.tableData1[k].frequency,
          oid: this.tableData1[k].oid,
          sid: this.tableData1[k].sid,
          sage: this.tableData1[k].sage
        })
      }
      for (var i = 0; i < extra.length; i++) {
        this.tableData1[i].sname = extra[i].sname
        this.tableData1[i].ssex = extra[i].ssex
        this.tableData1[i].classtime = extra[i].classtime
        this.tableData1[i].uploaddate = extra[i].uploaddate
        this.tableData1[i].oid = extra[i].oid
        this.tableData1[i].sid = extra[i].sid
        this.tableData1[i].sage = extra[i].sage
        this.tableData1[i].frequency = extra[i].frequency
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.search_for
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect(item) {
      var name_s = item.value
      // var index=0;
      for (var i = 0; i < this.tableData1.length; i++) {
        if (name_s == this.tableData1[i].sname) {
          // index=i;
          this.details1(i, name_s)
        }
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    }
  },
  beforeCreate: function () {
    var content = JSON.stringify({
      aid: localStorage.getItem('aid')
    })
    this.$http
      .post('http://139.9.115.22:8080/artist/student', content)
      .then(function (data) {
        var content = data.data
        var a = 0
        for (var i = 0; i < content.length; i++) {
          a = a + parseInt(content[i].classtime)
          this.tableData1.push(content[i])
          this.search_for[i] = { value: content[i].sname }
        }
        this.num = a
      })
      .catch(function (err) {
        window.console.log(err)
      })
  }
}
</script>
<style scoped>
.tip {
  color: #979797;
  background: #fff;
}
.qintong {
  background: #fff;
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
