<template>
  <div style="background:black;text-align:center">
    <div class="top">
      <center>
        <img
          id="logo"
          src="../assets/logo.png"
        />
      </center>
    </div>
    <div style="color:#f9f9f9;letter-spacing:4px;font-size:30px;margin-top:70px">忘记密码?</div>
    <div style="color:#999;letter-spacing:2px;font-size:15px;margin-top:70px">
      <el-row>请确认您的身份</el-row>
      <el-row style="margin-top:8px">填写机构名称或导师姓名</el-row>
    </div>
    <div style="margin-top:35px">
      <el-row>
        <el-col
          :span="6"
          :offset="9"
        >
          <input v-model.trim="value" />
        </el-col>
      </el-row>
    </div>
    <div style="margin-top:85px">
      <el-row>
        <center>
          <button
            id="commit"
            @click="commit"
          >确认提交</button>
        </center>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data: function () {
    return {
      value: ''
    }
  },
  methods: {
    commit: function () {
      var content = JSON.stringify({
        aname: this.value
      })
      this.$http
        .post('http://10.12.91.17:8080/artist/forget', content)
        .then(function (data) {

          if (data.body == 't') {
            this.$router.replace({ path: '/commit_success' })
          } else {
            alert('申请失败,请重新申请')
          }
        })
        .catch(function (error) {
          window.console.log(error)
        })
    }
  }
}
</script>

<style>
#commit {
  width: 160px;
  letter-spacing: 2px;
  font-size: 20px;
  height: 40px;
  border: 1px solid #e8bd5f;
  border-radius: 3px;
  box-shadow: 1px;
  background: #e8bd5f;
  color: #f9f9f9;
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
</style>
