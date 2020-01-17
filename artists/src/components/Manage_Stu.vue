<template>
  <div>
    <div style="margin-top:20px">
      <el-row><span
          @click="my_student"
          class="catalogue"
        >我的琴童</span> > 琴童管理</el-row>
    </div>
    <div
      class="t_border manage_item"
      style="margin-bottom:30px"
    >
      <div class="added_stu ">
        <el-row style="font-size:13px;color:#999;margin-top:30px">
          <el-col
            :span="10"
            :offset="3"
          >已添加的琴童</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="18"
            :offset="3"
            class="test"
            style="padding-bottom:30px"
          >
            <div
              v-for="(value,index) in add_list"
              :key="index"
              style="margin-top:20px;padding:0 40px 0 9px;float:left;font-size:15px;"
            >
              {{value.name}}
              <i
                class="el-icon-remove icon1"
                @click="delete_stu(value,index)"
              ></i>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="org_stu">
        <el-row style="font-size:13px;color:#999;margin-top:30px;padding-bottom:10px">
          <el-col
            :span="10"
            :offset="3"
          >机构琴童列表</el-col>
        </el-row>
        <el-row>
          <el-col
            :offset="7"
            :span="10"
          >
            <input
              suffix-icon="el-icon-search"
              style="width:100%;border-radius:3px;outline:0px;border:#999 0.5px solid;height:25px"
            />
          </el-col>
        </el-row>
        <el-row style="padding-bottom:30px">
          <el-col
            :offset="3"
            :span="18"
          >
            <div
              style="margin-top:30px;padding:0 30px 0 20px;float:left;font-size:15px"
              v-for="(value,index) in org_stu_list"
              :key="index"
            >
              {{value.name}}
              <i
                class="el-icon-circle-plus icon1"
                @click="add_student(value,index)"
              ></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage_Stu",
  data: function() {
    return {
      org_stu_list: [
        // { name: "123" }, { name: "123" }, { name: "123" }
      ],
      add_list: [
        // { name: "123" }, { name: "123" }, { name: "123" }
      ]
    };
  },
  methods: {
    my_student: function() {
      this.$router.replace({ path: "/qintong" });
    },
    add_student: function(value, index) {
      var content = JSON.stringify({
        sid: value.sid,
        tid: localStorage.getItem("tid")
      });

      this.$http
        .post("http://139.9.115.22:8080/teacher/adds", content)
        .then(function(data) {
          if (data.body == "t") {
            this.org_stu_list = [];
            this.add_list = [];
            var content = JSON.stringify({
              oid: window.localStorage.getItem("oid"),
              tid: window.localStorage.getItem("tid")
            });
            this.$http
              .post("http://139.9.115.22:8080/teacher/astudent", content)
              .then(function(data) {
                var content = data.data;

                for (var i = 0; i < content.length; i++) {
                  this.org_stu_list.push({
                    name: content[i].sname,
                    sid: content[i].sid
                  });
                }
              })
              .catch(function(err) {
                window.console.log(err);
              });
            var a = JSON.stringify({
              tid: window.localStorage.getItem("tid")
            });
            this.$http
              .post("http://139.9.115.22:8080/teacher/zhaos", a)
              .then(function(data) {
                var content = data.data;
                for (var i = 0; i < content.length; i++) {
                  this.add_list.push({
                    name: content[i].sname,
                    sid: content[i].sid
                  });
                }
              })
              .catch(function(err) {
                window.console.log(err);
              });
          } else {
            alert("添加失败");
          }
        })
        .catch(function(err) {
          window.console.log(err);
        });
    },
    delete_stu: function(value, index) {
      var content = JSON.stringify({
        oid: window.localStorage.getItem("oid"),
        tid: window.localStorage.getItem("tid"),
        sid: value.sid
      });
      this.$http
        .post("http://139.9.115.22:8080/teacher/deletes", content)
        .then(function(data) {
          if (data.body == "t") {
            this.org_stu_list = [];
            this.add_list = [];
            var content = JSON.stringify({
              oid: window.localStorage.getItem("oid"),
              tid: window.localStorage.getItem("tid")
            });
            this.$http
              .post("http://139.9.115.22:8080/teacher/astudent", content)
              .then(function(data) {
                var content = data.data;
                for (var i = 0; i < content.length; i++) {
                  this.org_stu_list.push({
                    name: content[i].sname,
                    sid: content[i].sid
                  });
                }
              })
              .catch(function(err) {
                window.console.log(err);
              });
            var a = JSON.stringify({
              tid: window.localStorage.getItem("tid")
            });
            this.$http
              .post("http://139.9.115.22:8080/teacher/zhaos", a)
              .then(function(data) {
                var content = data.data;
                for (var i = 0; i < content.length; i++) {
                  this.add_list.push({
                    name: content[i].sname,
                    sid: content[i].sid
                  });
                }
              })
              .catch(function(err) {
                window.console.log(err);
              });
          } else {
            alert("删除失败！");
          }
        })
        .catch(function(err) {
          window.console.log(err);
        });
    }
  },
  created: function() {
    var content = JSON.stringify({
      oid: window.localStorage.getItem("oid"),
      tid: window.localStorage.getItem("tid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/astudent", content)
      .then(function(data) {
        var content = data.data;
        for (var i = 0; i < content.length; i++) {
          this.org_stu_list.push({
            name: content[i].sname,
            sid: content[i].sid
          });
        }
      })
      .catch(function(err) {
        window.console.log(err);
      });
    var a = JSON.stringify({
      tid: window.localStorage.getItem("tid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/zhaos", a)
      .then(function(data) {
        var content = data.data;
        for (var i = 0; i < content.length; i++) {
          this.add_list.push({
            name: content[i].sname,
            sid: content[i].sid
          });
        }
      })
      .catch(function(err) {
        window.console.log(err);
      });
  }
};
</script>

<style>
.t_border {
  border-top: #e9bc5e 3px solid;
  border-radius: 3px;
  margin-top: 5px;
}
.manage_item {
  background: white;
}
.icon1 {
  color: #e9bc5e;
}
.catalogue:hover {
  cursor: pointer;
  color: #e8bd5f;
}
</style>
