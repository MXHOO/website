<template>
  <div class="change_pwd">
    <div class="top">
      <center>
        <img id="logo" src="../assets/logo.png" />
      </center>
    </div>
    <div v-show="!isSuccess">
      <div>
        <el-row style="font-size:25px;margin-top:45px;color:f9f9f9be">欢迎,{{this.name}}老师</el-row>
        <el-row style="color:#e3bc61;margin-top:55px;font-size:25px">修改密码</el-row>
        <el-row style="margin-top:10px;color:#999;font-zize:20px">为了您账户的安全请修改密码</el-row>
      </div>
      <div style="margin-top:70px">
        <el-row>
          <el-col :offset="7" style="text-align:left">新密码</el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="6" :offset="7">
            <input type="password" v-model.trim="new_pwd" />
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :offset="7" style="text-align:left">确认新密码</el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="6" :offset="7">
            <input type="password" v-model.trim="new_pwd_commit" />
          </el-col>
          <el-col :offset="1" :span="3">
            <button @click="change_pwd" class="btn">修改密码</button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-show="isSuccess">
      <el-row style="margin-top:120px">
        <center>
          <img src="../assets/right.svg" style="background:#f9f9f9;border-radius:50px none;border:0px" />
        </center>
      </el-row>
      <el-row style="font-size:22px;margin-top:60px;coloe:#f9f9f9db">您已成功修改密码!</el-row>
      <el-row style="margin-top:100px">
        <el-col :offset="10" :span="4">
          <button class="btn" @click="personal_index">个 人 主 页</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data: function() {
    return {
      isSuccess: false,
      new_pwd: "",
      new_pwd_commit: "",
      name:window.localStorage.getItem("aname"),
    };
  },
  methods: {
    change_pwd: function() {
      var content = JSON.stringify({
        aid:  localStorage.getItem("aid"),
        password: this.new_pwd
      });
      if (
        this.new_pwd == this.new_pwd_commit &&
        this.new_pwd_commit != "" &&
        this.new_pwd != ""
      ) {
        this.$http
          .post("http://139.9.115.22:8080/artist/modify", content)
          .then(function(data) {
            var content = data.body;
            if (content == "t") {
              this.isSuccess = true;
            } else {
              alert("修改密码失败");
            }
          })
          .catch(function(err) {
            window.console.log(err);
          });
      } else {
        alert("两次密码输入不一致");
      }
    },
    personal_index: function() {
      this.$router.replace({ path: "/manage_student" });
    }
  }
};
</script>

<style>
.change_pwd {
  background: black;
  color: white;
  text-align: center;
}
input {
  padding: 0px;
  width: 100%;
  color: white;
  height: 45px;
  background: black;
  border: 1px rgba(153, 153, 153, 0.767) solid;
  border-radius: 5px;
}
.btn {
  font-size: 18px;
  width: 100%;
  height: 50px;
  border: 1px solid #e8bd5f;
  border-radius: 3px;
  box-shadow: 1px;
  background: #e8bd5f;
  color: #f9f9f9;
}
</style>
