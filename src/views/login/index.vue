<template>
  <div class="login_container">
    <div class="login">
      <h1>后台管理系统</h1>
      <!-- 表单校验：:model绑定表单数据内容, :rules绑定表单内容校验规则, ref绑定表单实例 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="refLoginForm" class="login_form">
        <!-- prop绑定该输入框为:model绑定的表单数据内容中的用户名 -->
        <el-form-item label="" prop="username">
          <h3>用户名：</h3>
          <el-input v-model="loginForm.username" :prefix-icon="Avatar" placeholder="请输入账号" />
        </el-form-item>
        <!-- prop绑定该输入框为:model绑定的表单数据内容中的密码 -->
        <el-form-item label="" prop="password">
          <h3>密码：</h3>
          <el-input
            v-model="loginForm.password"
            :prefix-icon="Promotion"
            show-password
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="btn_item">
          <!-- 登录按钮：isLoading为true时，禁用状态、加载状态 -->
          <el-button type="primary" :disabled="isLoading" :loading="isLoading" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, Promotion } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { getTime } from '@/utils/time'
import type { FormInstance } from 'element-plus'
import { errorNotification, successNotification } from '@/utils/notification.ts'

const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

// 登录按钮加载状态
const isLoading = ref(false)

// 登录表单数据
const loginForm = ref({
  username: 'admin',
  password: '111111',
})

// 表单实例引用：通过该实例的.value.validate()可判断表单数据是否都通过loginFormRules校验
const refLoginForm = ref<FormInstance>()

// 自定义校验规则：用户名
// rule：规则校验对象，value：表单元素内容，callback：规则通过调此回调，不通过要返回错误对象
// @ts-expect-error 组件库固定写法
const validateUserName = (rule, value, callback) => {
  if (value.length >= 5 && value.length <= 10) {
    // 规则通过
    callback()
  } else {
    callback(new Error('用户名至少五位，至多十位'))
  }
}

// 自定义校验规则：密码
// @ts-expect-error 组件库固定写法
const validatePwd = (rule, value, callback) => {
  // 正则校验：至少任意6位字符，至多20位字符
  if (/^.{6,20}$/.test(value)) {
    callback()
  } else {
    callback(new Error('密码至少六位，至多二十位'))
  }
}

// 表单数据校验规则
const loginFormRules = {
  username: [
    // 简单数据校验
    // { min: 5, max: 10, message: '用户名至少5位，至多10位', trigger: 'change' },
    // 自定义数据校验
    { validator: validateUserName, trigger: 'change' },
  ],
  password: [
    // 自定义数据校验
    { validator: validatePwd, trigger: 'change' },
  ],
}

// 登录按钮点击事件
const login = async () => {
  // 表单校验通过才允许提交
  const isValid = await refLoginForm.value?.validate().catch(() => false)
  if (!isValid) return

  // 登录按钮加载中
  isLoading.value = true
  try {
    // 登录成功则不报错
    await userStore.userLogin(loginForm.value)
    successNotification('登录成功', `${getTime()}，欢迎回来`)
    // redirect携带了退出登录时的路由，有则跳转回去，无则跳转首页
    const redirect = $route.query.redirect as string
    $router.push({ path: redirect || '/' })
  } catch (error) {
    // 登录失败则报错，进行错误提示
    errorNotification('登录失败', error as string)
  } finally {
    // 登录按钮加载中结束
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-color: #212e3c;

  .login {
    margin: 0 auto;
    position: relative;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    top: 25vh;
    width: 30vw;
    border: 1px solid #fff;
    border-radius: 10px;
    background-color: #384451;
    color: #b3b8bd;

    h1 {
      text-align: center;
      color: #fff;
    }

    :deep(.el-button) {
      margin-top: 10px;
      width: 100%;
      background-color: var(--el-button-hover-bg-color);
      border-color: var(--el-button-hover-border-color);
      color: #fff;
    }
  }
}
</style>
