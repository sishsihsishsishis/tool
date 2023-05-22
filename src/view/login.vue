<template>
  <div class="login-bg">

    <el-row class="login-style" justify="center">
      <el-col :span="20" :lg="{ span: 8 }" :md="{ span: 10 }" :xs="{ span: 22 }" class="login">
        <h1>Meeting Analysis Tool</h1>
        <label>User</label>
        <el-input placeholder="username" v-model="username"></el-input>
        <label>Password</label>
        <el-input type="password" placeholder="password" v-model="password"></el-input>
        <el-button type="info" @click="login()" style="width: 100%;">登录</el-button>
      </el-col>
    </el-row>
  </div>

</template>
  
<script setup lang="ts">

import axios from 'axios'
import { ref, reactive, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

let username = ref<string>('root');
let password = ref<string>('admin');
let verifyCodeImg = ref<string>('');
let verifyCode = ref<string>('');
let uuid = ref<string>('');

onMounted(async () => {

})

const router = useRouter();
let redirect = router.currentRoute.value.query.redirect?.toString() || ''


const userLogin = (data: {
    username: string,
    password: string,
  }
) => axios.post('/user/login', data)


function login() {
  if (username.value === '') {
    ElMessage.warning('username null')
  } else if (password.value === '') {
    ElMessage.warning('password null')
  } else {
          router.push(decodeURIComponent(redirect || '/home'))
  }
}


</script>
  
<style scoped lang="scss">
.login-bg {
  height: 100vh;
  background: linear-gradient(to bottom right,#1d4a7e,#1B202E);
}

.login {
  padding: 2em 3em;
  border-radius: 0.5em;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  width: 2em;
  margin-top: 10vh;
  background-color: rgba(216, 224, 233, 0.678);
  h1 {
    text-align: center;
    color: #0000008b;
  }

  font-size: 1.2em;
  text-align: left;

  .el-input {
    margin: 1em 0;
  }
}
</style>