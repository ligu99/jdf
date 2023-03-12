<template>
  <div class="login" v-loading="loading">
    <div class="loginwrap">
      <div class="logowrap">
        <i class="logo"></i>
      </div>
      <!-- <div class="line"></div> -->
      <div class="formwrap">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="帳號：" prop="userName">
            <el-input
              placeholder="請輸入帳號"
              v-model="loginForm.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密碼：" prop="passWord">
            <el-input
              placeholder="請輸入密碼"
              v-model="loginForm.passWord"
              show-password
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="btnwrap">
          <el-button type="primary" size="medium" @click="handleLogin"
            >登入</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "./api";
import { setStore } from "@/utils/storage.js";
import { resetRouter } from "@/router";
export default {
  data() {
    return {
      loading:false,
      loginForm: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [
          { required: true, message: "請輸入用戶名", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    handleLogin() {
      resetRouter("admin")
      this.$router.push({
        path: "/jdf",
      });
      return
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.loading=true;
          api.login({
              account:this.loginForm.userName,
              password:this.loginForm.passWord
          }).then(res=>{
              if(res.systemCode===200){
                setStore("token",res.data.accessToken)
                setStore("userName",res.data.name)
                this.getAllroless();
              }else{
                this.loading=false;
              }
          }).catch(err=>{
            this.loading=false;
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     // 獲取当前角色權限
    getAllroless() {
      api.getCurpermissions().then(res=>{
        if(res.systemCode===200){
          setStore("permissions",res.data)
          resetRouter("admin")
          this.$router.push({
            path: "/jdf",
          });
          this.loading = false;
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #444;
  // background-image: linear-gradient(
  //   rgb(121, 165, 218),
  //   rgb(132, 184, 223),
  //   #fff
  // );
  .loginwrap {
    width: 420px;
    height: 400px;
    margin: 8% auto;
    // border: 1px solid #fff;
    background: #fff;
    border-radius: 0px;
    padding: 20px;
    text-align: left;
    box-sizing: border-box;
    .logowrap {
      width: 100%;
      height: 100px;
      // float: left;
    }
    .logo {
      display: block;
      width: 100px;
      height: 100px;
      background: url("~@/assets/images/logo.png") center center no-repeat;
      background-size: cover;
      margin: 0px auto 20px;
    }
    .line {
      width: 1px;
      background: #fff;
      height: 100%;
      float: left;
      margin: 0px 8px;
    }
    .formwrap {
      width: 100%;
      height: 100%;
      // float: right;
      // padding-top: 70px;
    }
    .btnwrap {
      text-align: center;
      padding-top: 15px;
      button {
        // margin-left: 60px;
        width: 100%;
      }
    }
  }
  ::v-deep {
    .el-form-item__label {
      color: #444;
    }
    .el-form-item .el-form-item__label:before {
      color: #444;
    }
  }
}
</style>
