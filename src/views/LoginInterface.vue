<template>
  <div class="login-container">
    <div class="slider">
      <div :class="active === 1 ? 'form' : 'form hidden'">
        <div class="title">欢迎 <b>回来</b></div>
        <div class="subtitle">登录你的账户</div>
        <div class="inputFunction">
          <input type="text" placeholder="用户名" v-model="credentials.username" />
          <span class="label">用户名</span>
        </div>
        <div class="inputFunction">
          <input type="password" placeholder="密码" v-model="credentials.password" />
          <span class="label">密码</span>
        </div>
        <button @click="sendLoginFormData">登录</button>
        <p class="errorMessage" v-if="service_error_flag">服务请求失败，请联系维护人员!</p>
        <p class="notNullMessage" v-if="null_flag">用户名或密码不能为空!</p>
        <p class="failedMessage" v-if="login_failed_flag">请重新输入用户名和密码</p>
      </div>
      <div :class="active === 0 ? 'form' : 'form hidden'">
        <div class="title">开始</div>
        <div class="subtitle">创建你的账户</div>
        <div class="inputFunction">
          <input type="text" placeholder="用户名" />
          <span class="label">用户名</span>
        </div>
        <div class="inputFunction">
          <input type="text" placeholder="邮箱" />
          <span class="label">邮箱</span>
        </div>
        <div class="inputFunction">
          <input type="text" placeholder="联系方式" />
          <span class="label">联系方式</span>
        </div>
        <div class="inputFunction">
          <input type="text" placeholder="密码" />
          <span class="label">密码</span>
        </div>
        <button>注册</button>
      </div>
      <div :class="active === 1 ? 'card' : 'card active'">
        <div class="head">
          <div class="name">测试用<span>平台</span></div>
        </div>
        <div class="desc">
          这是一个测试用平台，目前这里是登录注册界面，需要上传一个由用户名和密码组成的Form给后端处理。
        </div>
        <div class="btn">
          {{ active === 1 ? '新用户 ?' : '已有账号 ?' }}
          <button @click="active = (active + 1) % 2">
            {{ active === 0 ? '登录' : '注册' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
// 定义登录接口
// 这个以后肯定得纳入独立模块

interface ApiResponse {
  [key: string]: unknown
}

interface ApiError {
  error: boolean
  message: string
}

const credentials = reactive({
  username: '',
  password: '',
})

// 为 credentials 赋值，在上面的标签中使用了v-model

const response = ref<ApiResponse | ApiError | null>(null)

const sendLoginFormData = async (): Promise<void> => {
  try {
    // 首先先对凭据进行检查，如果有一个输入了空数据就可以直接返回错误了
    // 如果以后用得多了，这个部分也抽离出来成一种方法
    if (credentials.username.length === 0 || credentials.password.length === 0) {
      null_flag.value = true
      // 设置好标志以后直接打断就是了
      // 也不要老是报错
      return
    }
    /*
     注意，前端的检查都是可以绕过的
     真要检查还得看后端
     这里检查的目的就是减少这种奇葩请求还能被数据库收到
     数据库要是打死了我负不起责
     现在不是空数据，那就可以先设置这个标志为false
    */
    null_flag.value = false
    // 因为准备进入正常的逻辑了，因此其他错误标志也可设置为false
    service_error_flag.value = false
    login_failed_flag.value = false

    // 接下来为正常的逻辑
    // 先生成一个form，然后将credentials中的数据绑定其中
    const form = new URLSearchParams()
    // 为form注入数据
    form.append('username', credentials.username)
    form.append('password', credentials.password)
    await axios.post<ApiResponse>('http://localhost:8000/auth/login', form, {
      maxRedirects: 0,
    })
      .then(res => {
          if (res.status === 302) {
            window.location.href = res.headers['location']
          }
        }
      )
      .catch(error => {
        if (error.status === 401) {
          login_failed_flag.value = true
        }
      })
// 成功了，那就尝试跳转到对应界面
    // 日后生成cookie就好办了，直接持续存储，失效就重新登录
  } catch (error) {
    if (axios.isAxiosError(error)) {
      response.value = {
        error: true,
        message: error.message || 'Unknown error',
      }
      // 服务没启动，告知用户
      if (error.code === 'ERR_NETWORK') {
        service_error_flag.value = true
      }

      // 如果用户手贱，就对用户致以诚挚问候
      if (error.message === 'AAA') {
        alert('再搞事，我让你飞起来!')
      }
    }
  }
}
// 服务运行情况标志
const service_error_flag = ref(false)
// 用户凭据输入检查标志
const null_flag = ref(false)
// 用户登录失败标志
const login_failed_flag = ref(false)
const active = ref(1)
</script>

<style lang="scss">
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/sliding-back.png') no-repeat center center;
  background-size: cover;
  .slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
      width: 400px;
      height: 500px;
      background: rgba(17, 25, 40, 0.75);
      backdrop-filter: blur(16px) saturate(0);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 40px 60px;
      box-shadow:
        rgba(50, 50, 93, 0.25) 50px 50px 100px -20px,
        rgba(0, 0, 0, 0.5) 30px 30px 60px -30px,
        rgba(212, 217, 222, 0.35) 2px -2px 6px 0px inset;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 10px;
      z-index: 3;
      transition: 0.25s ease-in-out;

      &.hidden {
        height: 395px;
        box-shadow: none;
        z-index: 1;
      }

      .title {
        font-size: 18px;
        color: rgb(246, 240, 255);
        letter-spacing: 1px;
        font-weight: 300;
      }
      .subtitle {
        font-size: 11px;
        color: rgb(246, 240, 255);
        letter-spacing: 1px;
        margin-bottom: 35px;
      }
      .inputFunction {
        width: 100%;
        position: relative;
        margin-bottom: 35px;
        input {
          width: 100%;
          height: 35px;
          border: none;
          outline: 1.5px solid rgb(200, 200, 220);
          background: transparent;
          border-radius: 8px;
          font-size: 12px;
          padding: 0 15px;
          color: rgb(246, 249, 255);
          &::placeholder {
            color: rgb(175, 180, 190);
          }
          &:focus {
            outline: 1.5px solid rgb(224, 229, 240);
            &::placeholder {
              opacity: 0;
            }
            & + .label {
              opacity: 1;
              top: -20px;
            }
          }
          &:not(:placeholder-shown) + .label {
            opacity: 1;
            top: -20px;
          }
        }
        .label {
          position: absolute;
          top: 0;
          left: 0;
          color: rgb(246, 249, 255);
          font-size: 11px;
          font-weight: bold;
          transition: 0.25s ease-out;
          opacity: 0;
        }
      }
      button {
        width: 100%;
        height: 35px;
        background: rgb(36, 217, 127);
        color: #ffffff;
        border: none;
        outline: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
      }
      .errorMessage {
        color: rgb(246, 249, 255);
        position: relative;
      }
      .notNullMessage {
        color: rgb(246, 249, 255);
        position: relative;
      }
      .failedMessage {
        color: rgb(246, 249, 255);
        position: relative;
      }
    }
    .card {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 430px;
      height: 400px;
      background: url('../assets/slider-form.png') white;
      background-size: contain;
      padding: 40px;
      border-radius: 0 10px 10px 0;
      transition: 0.5s ease-in-out;
      z-index: 2;
      &.active {
        right: calc(100% - 440px);
        border-radius: 10px 0 0 10px;
      }
      .head {
        font-size: 34px;
        margin-bottom: 35px;
        .name {
          font-weight: 300;
          span {
            color: rgb(36, 217, 127);
            font-weight: bold;
          }
        }
      }
      .desc {
        font-size: 14px;
        text-align: justify;
        margin-bottom: 35px;
      }
      .btn {
        font-size: 14px;
        button {
          background: rgb(36, 217, 127);
          font-size: 14px;
          padding: 5px 15px;
          border: none;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
