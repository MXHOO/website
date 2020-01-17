<template>
  <div class="change_pwd">
    <div class="top">
      <center>
        <img id="logo" src="../assets/logo.png">
      </center>
    </div>
    <div v-show="!isSuccess">
      <div>
        <el-row style="font-size:25px;margin-top:80px">欢迎，蔡楠老师</el-row>
        <el-row style="color:#e3bc61;margin-top:40px;font-size:25px">修改密码</el-row>
        <el-row style="margin-top:10px;color:#999;font-zize:20px">为了您账户的安全请修改密码</el-row>
      </div>
      <div style="margin-top:70px">
        <el-row>
          <el-col :offset="8" style="text-align:left">新密码</el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="5" :offset="8">
            <input type="password" v-model="new_pwd">
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :offset="8" style="text-align:left">确认新密码</el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="5" :offset="8">
            <input type="password" v-model="new_pwd_commit">
          </el-col>
          <el-col :offset="1" :span="3">
            <button @click="change_pwd" class="btn">修改密码</button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-show="isSuccess">
        <el-row style="margin-top:110px">
            <center><img src="../assets/right.svg"></center>
        </el-row>
        <el-row style="font-size:22px;margin-top:70px;coloe:#f9f9f9">您已成功修改密码!</el-row>
        <el-row style="margin-top:60px"><el-col :offset="10" :span="4"> <button class="btn" @click="personal_index">个人主页</button></el-col></el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data: function() {
    return {
      isSuccess:false,
      new_pwd: "",
      new_pwd_commit: ""
    };
  },
  methods: {
    change_pwd: function() {
      this.$http
        .post("", {})
        .then(function(data) {
            this.isSuccess=true;
        })
        .catch(function(err) {
          window.console.log(err);
        });
    },
    personal_index:function(){
        this.$router.replace({path:""});
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
  border: 1px #999 solid;
  border-radius: 5px;
}
.btn {
  font-size: 15px;
  width: 100%;
  height: 45px;
  border: 1px solid #e8bd5f;
  border-radius: 3px;
  box-shadow: 1px;
  background: #e8bd5f;
  color: #f9f9f9;
}
</style>
