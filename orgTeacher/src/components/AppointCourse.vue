<template>
  <div>
    <el-row style="margin-bottom:-10px;margin-top:20px">
      <button
        @click="courseList"
        style="color:white;background:#e8bd5f;float:right;padding-right:1px;outline:0;padding:7px 20px;border:0px;border-radius:4px; box-shadow: 2px"
      >预约列表</button>
    </el-row>
    <el-row>
      <div style="float:left;padding-left:8px">我的课程日历</div>
    </el-row>
    <div
      class="t_border"
      style="background:white"
    >
      <el-row>
        <el-col
          :offset="2"
          :span="20"
          class="test"
        >
          <el-row>
            <el-calendar
              v-model="value"
              id="calendar"
              :currentmonth="true"
            >
              <template
                slot="dateCell"
                slot-scope="{date, data}"
              >
                <div>
                  <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                  <div
                    v-for="(item,index) in dataC"
                    :key="index"
                  >
                    <div></div>
                    <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                      <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                        <el-tooltip
                          popper-class="tooltip"
                          class="item"
                          effect="dark"
                          placement="right"
                        >
                          <div
                            slot="content"
                            style="text-align:center"
                          >
                            <div>{{item.year}}.{{item.months}}.{{item.days}}</div>
                            <br />
                            <div
                              v-for="(item1,index1) in item.things"
                              :key="index1"
                            >
                              <div
                                v-for="(item2,index2) in item1.content"
                                :key="index2"
                              >
                                {{item2}}
                                <br />
                                {{item1.time[index2]}}
                              </div>
                            </div>
                            <br />
                          </div>
                          <div class="is-selected">{{item.classtime}}节课</div>
                        </el-tooltip>
                      </div>
                      <div v-else></div>
                    </div>
                    <div v-else></div>
                  </div>
                </div>
              </template>
            </el-calendar>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-row style="margin-top:15px">
          <center>今日课程</center>
        </el-row>
        <div
          style="margin-top:10px;padding-bottom:50px"
          v-if="course.length>0"
        >
          <el-row>
            <el-col
              :span="20"
              :offset="2"
              style="padding:0 10px"
            >
              <el-row
                v-for="(value,index) in course"
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
                    style="padding:5px 10px;color:white;background:#e8bd5f;border-radius:3px;border:1px"
                  >详情</button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div
          v-else
          style="color:#999;font-size:11;text-align:center;padding:20px 0"
        >您没有课程。</div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointCourse",
  data() {
    return {
      calendarData: [],
      calendarData1: [],
      value: new Date(),
      course: [],
      sudate: "",
      sutime: "",
      organization: "",
      suid: "",
      dataC: []
    };
  },
  methods: {
    courseList: function () {
      this.$router.replace({ path: "/courseList" });
    },
    course_detail: function (index) {
      window.localStorage.setItem("type", "AppointCourse")
      window.localStorage.setItem("suid", this.course[index].suid);
      window.localStorage.setItem("sudate", this.course[index].sudate);
      window.localStorage.setItem("sutime", this.course[index].sutime);
      window.localStorage.setItem("organization", this.course[index].organization)
      this.$router.replace({
        name: "appoint_course_details",
        params: {
          suid: this.course[index].suid,
          sutime: this.course[index].sutime,
          sudate: this.course[index].sudate,
          organization: this.course[index].organization
        }
      });
    }
  },
  created: function () {
    var content = JSON.stringify({
      aid: localStorage.getItem("aid")
    });
    var d = this.value;
    var datetime =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.$http
      .post("http://139.9.115.22:8080/artist/subscribe", content)
      .then(function (data) {
        var content = data.data;
        for (var i = 0; i < content.length; i++) {
          if (datetime == content[i].sudate) {
            this.course.push({
              sudate: content[i].sudate,
              sutime: content[i].sutime,
              suid: content[i].suid,
              organization: content[i].organization
            });
          } else {
            var a = content[i].sudate.split("-");
            this.calendarData.push({
              year: a[0].toString(),
              months: a[1],
              days: a[2],
              things: content[i].organization,
              time: content[i].sutime
            });
            if (parseInt(a[1]) < 10) {
              this.calendarData[i].months = "0" + a[1];
            }
            if (parseInt(a[2]) < 10) {
              this.calendarData[i].days = "0" + a[2];
            }
          }
        }
        var count = 0;
        var flag = 0;
        for (var i = 0; i < this.calendarData.length; i++) {
          if (i >= flag) {
            var cont = []; //存放每天的课程
            var time1 = []; //课程的时间
            count = 0;
            for (var j = i; j < this.calendarData.length; j++) {
              if (
                this.calendarData[i].year == this.calendarData[j].year &&
                this.calendarData[i].months == this.calendarData[j].months &&
                this.calendarData[i].days == this.calendarData[j].days
              ) {
                cont.push(this.calendarData[j].things);
                time1.push(this.calendarData[j].time);
                count++;
                if (j == this.calendarData.length - 1) {
                  this.dataC.push({
                    year: this.calendarData[i].year,
                    months: this.calendarData[i].months,
                    days: this.calendarData[i].days,
                    things: [{ content: cont, time: time1 }],
                    classtime: count
                  });
                }
              } else {
                this.dataC.push({
                  year: this.calendarData[i].year,
                  months: this.calendarData[i].months,
                  days: this.calendarData[i].days,
                  things: [{ content: cont, time: time1 }],
                  classtime: count
                });
                flag = j;
                break;
              }
            }
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

.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 10px;
  font-size: 12px;
}
.is-selected {
  text-align: center;
  color: #999;
  font-size: 8px;
  margin-top: 5px;
}
/* .tooltip{
  background: grey !important
} */
</style>