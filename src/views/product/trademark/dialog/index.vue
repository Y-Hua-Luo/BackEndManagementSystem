<template>
  <el-dialog v-model="dialogVisible" title="添加品牌">
    <el-form-item label="品牌名称" label-width="80px" style="width: 70%">
      <el-input v-model="tradeMarkParams.tmName" placeholder="请输入品牌名称" />
    </el-form-item>
    <el-form-item label="品牌LOGO" label-width="80px">
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:10086/admin/product/fileUpload"
        :show-file-list="false"
        :headers="uploadHeaders"
        :on-success="handlePictureUploadSuccess"
        :before-upload="beforePictureUpload"
      >
        <img v-if="tradeMarkParams.logoUrl" :src="tradeMarkParams.logoUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <!--  底部 确定/取消 按钮，具名插槽footer   -->
    <template #footer>
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button type="info" @click="cancle">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useUserStore from '@/stores/modules/user.ts'
import { errorMessage, successMessage } from '@/utils/notification'
import type { UploadProps } from 'element-plus'
import { reqAddOrUpdateTradeMark } from '@/api/product/trademark'

const emits = defineEmits(['updateTabbleData'])

const dialogVisible = defineModel<boolean>('modelValue', { default: false })

const tradeMarkParams = ref({
  tmName: '',
  logoUrl: '',
})

// 获取用户token
const userStore = useUserStore()
const uploadHeaders = computed(() => {
  return {
    token: userStore.token,
  }
})

// 确认按钮点击事件
const confirm = async () => {
  // 判断产品名称和图片是否已有
  if (tradeMarkParams.value.tmName === '' || tradeMarkParams.value.logoUrl === '') {
    errorMessage('产品名称和图片不能为空')
    return
  }
  // 发送请求
  const result = await reqAddOrUpdateTradeMark(tradeMarkParams.value)
  if (result.code === 200) {
    successMessage('添加成功')
    // 清空对话框数据
    tradeMarkParams.value.tmName = ''
    tradeMarkParams.value.logoUrl = ''
    // 关闭对话框
    dialogVisible.value = false
    // 更新产品列表数据
    emits('updateTabbleData')
  }
}

// 取消按钮点击事件
const cancle = () => {
  // 清空对话框数据
  tradeMarkParams.value.tmName = ''
  tradeMarkParams.value.logoUrl = ''
  // 关闭对话框
  dialogVisible.value = false
}

// 图片上传前验证
const beforePictureUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 验证文件类型，只允许JPG和PNG
  const isJPG =
    rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif'
  const isLt4M = rawFile.size / 1024 / 1024 < 4 // 限制文件大小为4MB

  if (!isJPG) {
    errorMessage('上传图片只能是 JPG/PNG/gif 格式!')
    return false
  }
  if (!isLt4M) {
    errorMessage('上传图片大小不能超过4MB!')
    return false
  }
  return true
}

// 图片上传成功回调函数
const handlePictureUploadSuccess: UploadProps['onSuccess'] = (response) => {
  // 检查返回的URL是否已经包含完整地址
  if (response.code === 200 && response.data) {
    const imageUrl = response.data.startsWith('http')
      ? response.data
      : `${import.meta.env.VITE_SERVE}${response.data}`
    tradeMarkParams.value.logoUrl = imageUrl
  } else {
    errorMessage(`上传失败: ${response}`)
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<!-- UI库样式可以用:deep穿透也可以单写一个不带scoped的style标签 -->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
