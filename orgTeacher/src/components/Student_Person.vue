<template>
  <div>
    <el-row>
      <el-col style="margin-top:20px">
        <span
          @click="my_student"
          class="catalogue"
        >我的琴童</span> >
        <span>{{sname}}</span>
      </el-col>
    </el-row>
    <el-row class="tip_w">
      <el-col style="margin-top:20px;">基本信息</el-col>
    </el-row>
    <div
      class="t_border details_item"
      style="padding:20px 0;"
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
        >{{sage}}</el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >所属机构</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.organization}}</el-col>
      </el-row>
      <el-row>
        <el-col
          :span="11"
          class="detail_title"
        >机构老师</el-col>
        <el-col
          :span="11"
          class="detail_con"
        >{{this.tname}}老师</el-col>
      </el-row>
    </div>
    <el-row class="tip_w">
      <el-col style="margin-top:20px">标记</el-col>
    </el-row>
    <div
      class="t_border details_item"
      style="color:#999;font-size:15px;"
    >
      <div style="margin-top:20px">
        <el-row>
          <el-col
            :span="20"
            :offset="2"
          >
            <el-row
              class="test"
              style="padding-top:10px;padding-bottom:10px;"
              v-for="(value,index) in markData"
              :key="index"
            >
              <el-col
                class="date"
                :span="4"
                :offset="2"
              >{{value.data}}</el-col>
              <el-col
                class="mark"
                :span="10"
                :offset="1"
              >
                <center>{{value.markCon}}&nbsp;</center>
              </el-col>
              <el-col
                :span="2"
                :offset="1"
              >
                <span
                  style="color:#e8bd5f;font-size:20px"
                  class="el-icon-remove-outline"
                  @click="remove_mark(index,value)"
                ></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col
          :span="20"
          :offset="2"
        >
          <el-row
            v-show="isshow"
            style="margin-top:10px"
          >
            <el-col
              :span="4"
              :offset="2"
            >{{this.date}}</el-col>
            <el-col
              :span="13"
              :offset="1"
            >
              <el-input
                v-model.trim="mark"
                @blur="sure_add_mark"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top:20px;padding-bottom:20px">
        <el-col
          :span="4"
          :offset="10"
        >
          <button
            @click="add_mark"
            style="padding:10px;border:1px;background:#e8bd5f;border-radius:3px;color:white"
          >添加标记</button>
        </el-col>
      </el-row>
    </div>

    <el-row class="tip_w">
      <el-col style="margin-top:20px">课程详情</el-col>
    </el-row>
    <div
      class="t_border details_item"
      style="padding-bottom:20px"
    >
      <el-row style="margin-top:30px">
        <el-col
          :offset="2"
          :span="20"
        >
          <el-row style="font-size:14px;color:#999;text-align:center">已学习{{this.detailData.length}}次</el-row>
          <el-row style="font-size:10px;color:#999;text-align:center;padding-top:20px">
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="6">上传课程时间</el-col>
            <el-col :span="6">反馈课程时间</el-col>
            <el-col :span="4"></el-col>
          </el-row>
          <el-row
            v-show="detailData.length==0"
            style="margin-top:20px;color:#999;padding-left:70px"
          >您还没有琴童。</el-row>
          <el-row
            v-show="detailData.length>0"
            v-for="(value,index) in detailData"
            :key="index"
            class="test"
            style="font-size:16px;;text-align:center;padding:10px 0;"
          >
            <el-col :span="5">{{index+1}}</el-col>
            <el-col :span="6">{{value.uploaddate}}</el-col>
            <el-col :span="6">{{value.feedbackdate}}</el-col>
            <el-col :span="4">
              <template>
                <button
                  class="btn_de stu_details"
                  @click="details(index,value)"
                >详 情</button>
              </template>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Student_Person',
  data: function () {
    return {
      frequency: '',
      sname: '',
      sage: '',
      ssex: '',
      isshow: false,
      organization: '',
      tname: '',
      mark: '',
      date: '',
      markData: [],
      detailData: [
        // { index: 1, update_time: "2019-10-10", feedback_time: "2019-11-03" }
      ],
      asid: ''
    }
  },
  methods: {
    my_student: function () {
      this.$router.replace({ path: '/manage_student' })
    },
    download: function () {
      window.location.href = ''
    },
    remove_mark: function (index, value) {
      var content = JSON.stringify({
        aid: localStorage.getItem('aid'),
        sid: this.$route.params.sid,
        frequency: value.time
      })
      this.$http
        .post("http://139.9.115.22:8080/artist/design", content)
        .then(function (data) {
          if (data.body === 't') {
            var num = this.markData.length
            for (var i = 0; i < num; i++) {
              if (i === value.time - 1) {
                this.markData.splice(i, 1)
                break
              }
            }
            for (var i = 0; i < this.markData.length; i++) {
              // eslint-disable-next-line eqeqeq
              if (i != this.markData[i].time - 1) {
                this.markData[i].time = i + 1;
              }
            }
          } else {
            alert('删除失败!')
          }
        })
        .catch(function (err) {
          window.console.log(err)
        })
    },
    sure_add_mark: function () {
      var content = JSON.stringify({
        aid: localStorage.getItem('aid'),
        sid: localStorage.getItem('sid'),
        sdate: this.date,
        frequency: this.markData.length + 1,
        sign: this.mark
      })
      // eslint-disable-next-line eqeqeq
      if (this.mark != '') {
        this.$http
          .post("http://139.9.115.22:8080/artist/addsign", content)
          .then(function (data) {
            this.isshow = false
            if (data.body === 't') {
              this.markData.push({
                data: this.date,
                markCon: this.mark,
                time: this.markData.length + 1
              });
            }
          })
          .catch(function (err) {
            window.console.log(err)
          })
      } else {
        this.isshow = false
      }
    },
    add_mark: function () {
      this.mark = ''
      this.isshow = true
      var date = new Date()
      this.date =
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    details: function (index, row) {
      this.$router.replace({
        name: 'person_course_details',
        params: {
          sid: this.$route.params.sid,
          uid: this.detailData[index].uid,
          fid: this.detailData[index].fid,
          classtime: this.detailData[index].classtime,
          sname: this.$route.params.sname
        }
      });
    }
  },
  mounted: function () {
    this.sname = localStorage.getItem('sname')
    this.sage = localStorage.getItem('sage')
    this.frequency = localStorage.getItem('frequency')
    this.ssex = localStorage.getItem('ssex')
    var content = JSON.stringify({
      aid: localStorage.getItem('aid'),
      sid: localStorage.getItem('sid')
    })

    this.$http
      .post("http://139.9.115.22:8080/artist/sdetails", content)
      .then(function (data) {
        var content = data.body
        this.organization = content[0].organization
        this.tname = content[0].tname
        for (var i = 0; i < content.length; i++) {
          this.detailData.push({
            index: i + 1,
            uploaddate: content[i].uploaddate,
            feedbackdate: content[i].feedbackdate,
            uid: content[i].uid,
            fid: content[i].fid,
            classtime: content[i].classtime
          })
        }
        if (
          content[0].sign !== '' &&
          content[0].sign != null &&
          content[0].sign !== undefined
        ) {
          var signs = content[0].sign.split(',')
          for (var i = 0; i < signs.length; i++) {
            var sign = signs[i].split(':')
            this.markData.push({
              data: sign[1],
              markCon: sign[2],
              time: i + 1
            });
          }
        }
      })
      .catch(function (err) {
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
.video {
  background: #999;
  height: 150px;
}
.tip_w {
  color: #999;
  font-size: 14px;
  margin-left: 15px;
}
.btn_de {
  background: #e8bd5f;
  color: white;
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
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>
