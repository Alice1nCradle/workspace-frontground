<template>
  <div class="login-container">
    <div class="slider">
      <div :class="active === 1 ? 'form' : 'form hidden'">
        <div class="title">欢迎 <b>回来</b></div>
        <div class="subtitle">登录你的账户</div>
        <div class="inputFunction">
          <input type="text" placeholder="用户名" />
          <span class="label">用户名</span>
        </div>
        <div class="inputFunction">
          <input type="text" placeholder="密码" />
          <span class="label">密码</span>
        </div>
        <button @click="sendLoginFormData">登录</button>
      </div>
      <div :class="active === 2 ? 'form' : 'form hidden'">
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
          {{ active === 1 ? '新用户 ?' : '已有账号' }}
          <button @click="active = active === 1 ? 2 : 1">
            {{ active === 1 ? '去注册 ?' : '去登录' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
// 定义登录接口
// 这个以后肯定得纳入独立模块
interface LoginFormData {
  username: string;
  password: string;
}

// 创建函数以发送登录请求
// 这个以后和登录接口放一个模块中
async function sendLoginFormData(data: LoginFormData) {
    // 将对象序列化为application/x-www-form-urlencoded格式
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    // 使用axios向后端post相关数据
    axios.post(
      "http://localhost:8000/login",
      params,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        }
      }
    )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })

}

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
