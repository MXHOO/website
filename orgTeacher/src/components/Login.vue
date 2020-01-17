<template>
  <div class="login">
    <div class="top">
      <center>
        <img
          id="logo"
          src="../assets/logo.png"
        />
      </center>
    </div>
    <div style="margin-top:40px">
      <el-row>
        <center>
          <img src="../assets/piano.svg" />
        </center>
      </el-row>
      <el-row style="font-size:25px;margin-top:10px">导师登录</el-row>
    </div>
    <div style="margin-top:40px;color:#f9f9f9">
      <el-row>
        <el-col
          :span="6"
          :offset="9"
        >
          <el-row style="text-align:left">用户名</el-row>
          <el-row style="margin-top:10px">
            <input v-model.trim="username" />
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px">
        <el-col
          :span="6"
          :offset="9"
        >
          <el-row style="text-align:left">密码</el-row>
          <el-row style="margin-top:10px">
            <input
              type="password"
              v-model.trim="password"
            />
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
          >登&nbsp;&nbsp;录</button>
        </el-col>
      </el-row>
    </div>
    <div
      class="forget_pwd"
      @click="forget_pwd"
    >忘记密码?</div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    Login: function () {
      var item = JSON.stringify({
        username: this.username,
        password: this.password
      })
      if (this.username == '' || this.password == '') {
        alert('请输入用户名或密码')
      } else {
        this.$http
          .post('http://139.9.115.22:8080/artist/login', item)
          .then(function (data) {
            var content = data.body
            if (content == 'f') {
              alert('用户名或密码错误!')
            } else {
              window.localStorage.setItem('aid', content.aid)
              window.localStorage.setItem('aname', content.aname)
              this.$store.dispatch('actionUpdateName', content)
              if (content.one == '0') {
                this.$router.replace({
                  path: '/change_pwd'
                })
              } else {
                this.$router.replace({
                  path: '/index'
                })
              }
            }
          })
          .catch(function (error) {
            window.console.log(error)
          })
      }
    },
    forget_pwd: function () {
      this.$router.replace({
        path: ' / forget_passwor'
      })
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  color: white;
  height: 50px;
  background: black;
  border: 1px #999 solid;
  border-radius: 5px;
}
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
.forget_pwd {
  padding-top: 10px;
  color: #999999;
  font-size: 14px;
  text-align: center;
}
.forget_pwd:hover {
  color: #e8bd5f;
  cursor: pointer;
}
</style>
