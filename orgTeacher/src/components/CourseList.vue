<template>
  <div>
    <el-row style="margin-bottom:-10px;margin-top:20px">
      <button
        @click="appointCourse"
        style="color:white;background:#e8bd5f;float:right;padding-right:1px;outline:0;padding:7px 20px;border:0px;border-radius:4px; box-shadow: 2px"
      >预约日历</button>
    </el-row>
    <el-row>
      <div style="float:left;padding-left:8px">我的课程列表</div>
    </el-row>
    <div
      class="t_border"
      style="background:white"
    >
      <el-row style="margin:30px;text-align:center">
        <el-col
          :span="20"
          :offset="2"
        >
          <el-row style="padding-bottom:30px">
            <div>
              <el-row style="padding-bottom:20px">
                <el-col
                  :span="2"
                  :offset="5"
                >
                  <img
                    @click="prev"
                    src="../assets/left_r.svg"
                  />
                </el-col>
                <el-col :span="10">{{year}}年{{month}}月</el-col>
                <el-col :span="2">
                  <img
                    @click="next"
                    src="../assets/right_r.svg"
                  />
                </el-col>
              </el-row>
              <el-row
                v-if="list.length==0"
                style="color:#999;font-size:14px;padding-bottom:30px"
              >您还没有课程。</el-row>
              <div v-if="list.length>0">
                <el-row
                  v-for="(value,index) in list"
                  :key="index"
                  class="test"
                  style="text-align:center;margin-top:10px;padding-bottom:5px"
                >
                  <el-col :span="6">{{value.sudate}}&nbsp;</el-col>
                  <el-col :span="6">{{value.sutime}}&nbsp;</el-col>
                  <el-col :span="6">{{value.organization}}&nbsp;</el-col>
                  <el-col :span="6">
                    <button
                      @click="course_detail(index)"
                      style="padding:5px 13px;color:white;background:#e8bd5f;border-radius:3px;border:1px"
                    >详情</button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  data: function () {
    return {
      list: [],
      value: new Date(),
      year: Number,
      month: Number
    }
  },
  methods: {
    appointCourse: function () {
      this.$router.replace({
        path: '/appoint_course'
      })
    },
    req_details: function (y, m) {
      var datetime = y + '-' + m
      var content = JSON.stringify({
        aid: localStorage.getItem('aid'),
        sub: datetime
      })
      this.$http
        .post('http://139.9.115.22:8080/artist/list', content)
        .then(function (data) {
          var content = data.body
          for (var i = 0; i < content.length; i++) {
            this.list.push(content[i])
          }
        })
        .catch(function (err) {
          window.console.log(err)
        })
    },
    next: function () {
      if (this.month == 12) {
        var year = this.year
        year++
        this.year = year
        this.month = 1
      } else {
        var month = this.month
        month++
        this.month = month
      }
      this.list = []
      this.req_details(this.year, this.month)
    },
    prev: function () {
      var l_year = this.value.getFullYear()
      var l_month = this.value.getMonth() + 1
      if (this.year > l_year || (this.year == l_year && this.month > l_month)) {
        if (this.month == 1) {
          var year = this.year
          year--
          this.year = year
          this.month = 12
        } else {
          var month = this.month
          month--
          this.month = month
        }
        this.list = []
        this.req_details(this.year, this.month)
      } else {
        this.$message({
          message: '不能查看之前课程',
          center: true,
          type: 'error'
        })
      }
    },
    course_detail: function (index) {
      window.localStorage.setItem("type", "CourseList");
      window.localStorage.setItem("suid", this.list[index].suid);
      window.localStorage.setItem("sudate", this.list[index].sudate);
      window.localStorage.setItem("sutime", this.list[index].sutime);
      window.localStorage.setItem("organization", this.list[index].organization)
      this.$router.replace({
        name: 'appoint_course_details',
        params: {
          suid: this.list[index].suid,
          sutime: this.list[index].sutime,
          sudate: this.list[index].sudate,
          organization: this.list[index].organization
        }
      })
    }
  },
  created: function () {
    var d = this.value
    this.year = this.value.getFullYear()
    this.month = this.value.getMonth() + 1
    var y = this.value.getFullYear()
    var m = this.value.getMonth() + 1
    this.req_details(y, m)
  }
}
</script>

<style>
.test {
  padding: 1em;
  border-bottom: 0.7px dashed transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-90deg, #ccc 0, #ccc 0.3em, white 0, white 0.5em);
}
img:hover {
  cursor: pointer;
}
</style>
