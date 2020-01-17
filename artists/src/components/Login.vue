<template>
  <div class="login">
    <div class="top">
      <center>
        <img
          id="logo"
          src="../assets/logo.png"
        >
      </center>
    </div>
    <div style="margin-top:40px">
      <el-row>
        <center>
          <img src="../assets/orgnization.svg">
        </center>
      </el-row>
      <el-row style="font-size:25px;margin-top:10px;color:#f9f9f9">机构老师登录</el-row>
    </div>
    <div style="margin-top:60px;color:#f9f9f9">
      <el-row>
        <el-col
          :span="6"
          :offset="9"
        >
          <el-row style="text-align:left;padding-left:5px;font-size:15px">机构全名</el-row>
          <el-row style="margin-top:10px">
            <input v-model.trim="value">
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px">
        <el-col
          :span="6"
          :offset="9"
        >
          <el-row style="text-align:left;padding-left:5px;font-size:15px">邀请码</el-row>
          <el-row style="margin-top:10px">
            <input
              v-model.trim="invite_code"
              type="password"
            >
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:50px">
      <el-row>
        <el-col
          :span="6"
          :offset="9"
        >
          <button
            id="btn_login"
            @click="Login"
          >登录</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      value: "",
      username: "",
      invite_code: "",
    };
  },
  methods: {
    Login: function() {
      var content = JSON.stringify({
        organization: this.value,
        password: this.invite_code
      });

      if (this.value == "" || this.invite_code == "") {
        alert("请选择机构或输入密码");
      } else {
        this.$http
          .post("http://139.9.115.22:8080/teacher/login", content)
          .then(function(data) {
            var content = data.body;
            if (content == "f") {
              alert("机构或密码错误");
            } else {
              
              window.localStorage.setItem("oid",content.oid);
             
              window.localStorage.setItem("password",content.password);
    
              window.localStorage.setItem("tid",content.tid);
      
              window.localStorage.setItem("tname",content.tname);
        
              window.localStorage.setItem("organization",content.organization);

         
            this.$router.replace({
                path: "/index"
              });
               
            //  this.$store.dispatch("actionUpdateName", content);
            }
          })
          .catch(function(err) {
            window.console.log(err);
          });
      }
    }
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  margin: 0px;
  height: 100px;
  background: black;
  position: relative;
}
#logo {
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -29px;
  margin-left: -40px;
}
#login {
  height: 100%;
}
input {
  color: #f9f9f9be;
  font-size: 15px;
  width: 100%;
  color: white;
  height: 50px;
  background: black;
  border: 0.5pt rgba(153, 153, 153, 0.575) solid;
  border-radius: 5px;
  outline: 0;
}
.login {
  text-align: center;
  background: black;
  color: white;
}
#btn_login {
  font-size: 20px;
  width: 100%;
  height: 50px;
  border: 1px solid #e8bd5f;
  border-radius: 3px;
  box-shadow: 1px;
  background: #e8bd5f;
  color: #f9f9f9;
}
.el-input,
.el-input--suffix {
  background: black;
}
.el-select {
  background: black;
}
</style>
