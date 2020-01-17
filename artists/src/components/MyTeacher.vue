<template>
  <div>
    <div style="margin-top:20px;padding-left:15px">我的导师</div>
    <div class="t_border teachers">
      <el-row v-if="teacher_img.length==0" style="padding:30px;color:#999;text-size:12px">您还没有导师</el-row>
      <el-row v-else>
        <img
          class="teacher_head"
          @click="show_teacher"
          v-for="(value,index) in teacher_img"
          :key="index"
          :src="value.src"
        >
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      teacher_img: []
    };
  },
  name: "MyTeacher",
  methods: {
    show_teacher: function() {
      this.$router.replace({ path: "/teacher_introduction" });
      // alert("hello");
    }
  },
  created: function() {
    var a = JSON.stringify({
      oid: window.localStorage.getItem("tid")
    });
    this.$http
      .post("http://139.9.115.22:8080/teacher/artist", a)
      .then(function(data) {
        var a = data.body;
        for (var i = 0; i < a.length; i++) {
          this.teacher_img.push({ src: a[i].apath, name: a[i].aid });
        }
      })
      .catch(function(err) {
        window.console.log(err);
      });
  }
};
</script>
<style>
.teachers {
  background: white;
  margin: 5px 0;
  padding-bottom: 30px;
}
.teacher_head {
  margin-left: 30px;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-top: 30px;
}
</style>
