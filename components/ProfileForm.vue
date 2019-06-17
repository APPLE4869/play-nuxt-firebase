<template>
  <form class="uk-form-stacked">
    <div class="uk-margin-large-bottom">
      <label class="uk-form-label">プロフィール画像</label>
      <div class="uk-form-controls">
        <div uk-form-custom="target: true">
          <input @change="selectedFile" type="file" />
          <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled>
        </div>
      </div>
    </div>

    <div class="uk-margin-large-bottom">
      <label class="uk-form-label">名前</label>
      <div class="uk-form-controls">
        <input v-model="profileName" placeholder="山田太郎" class="uk-input" />
      </div>
    </div>

    <div class="uk-margin-large-bottom">
      <label class="uk-form-label">自己紹介文</label>
      <div class="uk-form-controls">
        <textarea v-model="profileContent" placeholder="テキスト" class="uk-height-medium uk-textarea" row="5"></textarea>
      </div>
    </div>

    <div class="uk-flex uk-flex-center">
      <button @click="clickSubmit" type="button" class="uk-button uk-button-primary">
        {{buttonText}}
      </button>
    </div>
  </form>
</template>

<script>
import { uploadImageToStorage } from "~/support/firebase/storage"
import Profile from "~/models/Profile"

export default {
  props: ["profile", "submit", "formType"],
  data: function () {
    return {
      uploadFile: null,
      profileName: "",
      profileContent: "",
    }
  },
  mounted: function () {
    if (this.profile) {
      this.profileName = this.profile.name
      this.profileContent = this.profile.content
    }
  },
  methods: {
    selectedFile: function(e) {
      // 選択された File の情報を保存しておく
      e.preventDefault()
      const files = e.target.files
      this.uploadFile = files[0]
    },
    clickSubmit: async function () {
      // Validation
      if (this.__isInvalidForm()) {
        alert("未入力の内容があります")
        return
      }

      const imagePath = Profile.generateNewImagePath()
      const result = await uploadImageToStorage(imagePath, this.uploadFile)
      if (result.state !== "success") {
        alert("ファイルアップロードに失敗しました")
        return
      }

      const profileName = this.profileName
      const profileContent = this.profileContent
      this.submit({ imagePath, profileName, profileContent })
    },
    __isInvalidForm: function () {
      return (!this.profile && !this.uploadFile) || !this.profileName || !this.profileContent
    }
  },
  computed: {
    buttonText() {
      if (this.formType === "ADD") {
        return "登録する"
      } else if (this.formType === "EDIT") {
        return "編集する"
      }
    }
  }
}
</script>

<style>
</style>
